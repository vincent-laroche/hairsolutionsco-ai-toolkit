#!/usr/bin/env python3
import os
import sys
import argparse
import json
import google.auth
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def get_service():
    try:
        credentials, project = google.auth.default(scopes=SCOPES)
        service = build('searchconsole', 'v1', credentials=credentials)
        return service
    except Exception as e:
        print(f"Authentication failed: {e}")
        print("\nPlease authenticate by running the following command in your terminal:")
        print("  gcloud auth application-default login --scopes=\"https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly\"")
        sys.exit(1)

def list_sites(service):
    try:
        site_list = service.sites().list().execute()
        sites = site_list.get('siteEntry', [])
        if not sites:
            print("No sites found. Ensure the service account email is added as a user to your GSC properties.")
            return
            
        print("Accessible Properties:")
        for site in sites:
            print(f"- {site['siteUrl']}")
    except Exception as e:
        print(f"Error fetching sites: {e}")

def performance(service, site_url, start_date, end_date, dimensions):
    try:
        request = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': dimensions.split(','),
            'rowLimit': 20
        }
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
        
        rows = response.get('rows', [])
        if not rows:
            print("No data found for the given parameters.")
            return
            
        print(f"Performance Data ({start_date} to {end_date}) by {dimensions}:")
        print("-" * 80)
        print(f"{'Keys':<30} | {'Clicks':<8} | {'Impressions':<12} | {'CTR':<8} | {'Position':<8}")
        print("-" * 80)
        for row in rows:
            keys = ", ".join(row['keys'])
            # truncate keys if too long
            if len(keys) > 28:
                keys = keys[:25] + "..."
            print(f"{keys:<30} | {row['clicks']:<8} | {row['impressions']:<12} | {row['ctr']:.4f}   | {row['position']:.2f}")
    except Exception as e:
        print(f"Error fetching performance data: {e}")

def inspect_url(service, site_url, inspection_url):
    try:
        request = {
            'inspectionUrl': inspection_url,
            'siteUrl': site_url
        }
        response = service.urlInspection().index().inspect(body=request).execute()
        result = response.get('inspectionResult', {})
        
        index_status = result.get('indexStatusResult', {})
        print(f"Inspection Result for {inspection_url}:")
        print(f"Verdict: {index_status.get('verdict')}")
        print(f"Coverage State: {index_status.get('coverageState')}")
        print(f"Robots.txt status: {index_status.get('robotsTxtState')}")
        print(f"Indexing state: {index_status.get('indexingState')}")
        print(f"Last crawl time: {index_status.get('lastCrawlTime')}")
    except Exception as e:
        print(f"Error inspecting URL: {e}")

def sitemaps(service, site_url):
    try:
        response = service.sitemaps().list(siteUrl=site_url).execute()
        sitemaps = response.get('sitemap', [])
        
        if not sitemaps:
            print(f"No sitemaps found for {site_url}.")
            return
            
        print(f"Sitemaps for {site_url}:")
        print("-" * 80)
        print(f"{'Path':<40} | {'Type':<10} | {'Last Download':<20} | {'Warnings/Errors'}")
        print("-" * 80)
        for sm in sitemaps:
            path = sm.get('path', '')
            if len(path) > 38:
                path = "..." + path[-35:]
            type_ = sm.get('type', '')
            last_download = sm.get('lastDownloaded', '')
            warnings = sm.get('warnings', 0)
            errors = sm.get('errors', 0)
            print(f"{path:<40} | {type_:<10} | {last_download:<20} | W:{warnings} E:{errors}")
    except Exception as e:
        print(f"Error fetching sitemaps: {e}")

def main():
    parser = argparse.ArgumentParser(description="Google Search Console CLI Tool")
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # list-sites
    subparsers.add_parser('list-sites', help='List all properties accessible to the service account.')
    
    # performance
    perf_parser = subparsers.add_parser('performance', help='Fetch performance data (clicks, impressions, etc.)')
    perf_parser.add_argument('--site', required=True, help='The exact site URL (e.g., sc-domain:hairsolutions.co)')
    perf_parser.add_argument('--start', required=True, help='Start date (YYYY-MM-DD)')
    perf_parser.add_argument('--end', required=True, help='End date (YYYY-MM-DD)')
    perf_parser.add_argument('--dimensions', default='query', help='Comma-separated dimensions: date,query,page,country,device')
    
    # inspect
    inspect_parser = subparsers.add_parser('inspect', help='Inspect a specific URL.')
    inspect_parser.add_argument('--site', required=True, help='The exact site URL (property name)')
    inspect_parser.add_argument('--url', required=True, help='The full URL to inspect')
    
    # sitemaps
    sitemap_parser = subparsers.add_parser('sitemaps', help='List sitemaps for a property.')
    sitemap_parser.add_argument('--site', required=True, help='The exact site URL (property name)')

    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
        
    service = get_service()
    
    if args.command == 'list-sites':
        list_sites(service)
    elif args.command == 'performance':
        performance(service, args.site, args.start, args.end, args.dimensions)
    elif args.command == 'inspect':
        inspect_url(service, args.site, args.url)
    elif args.command == 'sitemaps':
        sitemaps(service, args.site)

if __name__ == "__main__":
    main()

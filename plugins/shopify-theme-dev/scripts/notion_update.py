#!/usr/bin/env python3
"""
notion_update.py — update a Notion "Sections" row after a change is implemented.

Fallback for when the Notion MCP connector is unresponsive. Reads the integration
token from the NOTION_TOKEN environment variable. NEVER hardcode a token here.

Typical post-implementation update:
    check "Changes Applied", clear the applied "Desired ..." field(s),
    set "Status", and append a note to "Claude Notes / Blockers".

Usage:
    NOTION_TOKEN=secret_xxx python3 notion_update.py \
        --page <page_id> \
        --applied \
        --clear "Desired Section Changes" --clear "Desired Text Typography Changes" \
        --status "In review" \
        --note "hs-home-band title -> '<em>' accent; templates/index.json; commit fd5d3c1"

You can also pass an arbitrary JSON properties patch with --props-json '<json>'
(merged after the convenience flags), for property types not covered by flags.
"""
import argparse
import json
import os
import sys
import urllib.request
import urllib.error

NOTION_VERSION = "2022-06-28"
API = "https://api.notion.com/v1"
NOTES_FIELD = "Claude Notes / Blockers"
APPLIED_FIELD = "Changes Applied"
STATUS_FIELD = "Status"


def _token() -> str:
    tok = os.environ.get("NOTION_TOKEN", "").strip()
    if not tok:
        sys.exit("ERROR: NOTION_TOKEN env var is not set. Provide a Notion integration "
                 "token at runtime; do not hardcode it.")
    return tok


def _request(path: str, payload: dict, method: str) -> dict:
    req = urllib.request.Request(
        f"{API}{path}",
        data=json.dumps(payload).encode("utf-8"),
        method=method,
        headers={
            "Authorization": f"Bearer {_token()}",
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        sys.exit(f"ERROR: Notion API {e.code}: {e.read().decode('utf-8', 'replace')}")
    except urllib.error.URLError as e:
        sys.exit(f"ERROR: network failure contacting Notion: {e}")


def _plain(rich) -> str:
    if not rich:
        return ""
    return "".join(part.get("plain_text", "") for part in rich)


def _get(path: str) -> dict:
    req = urllib.request.Request(
        f"{API}{path}",
        method="GET",
        headers={
            "Authorization": f"Bearer {_token()}",
            "Notion-Version": NOTION_VERSION,
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        sys.exit(f"ERROR: Notion API {e.code}: {e.read().decode('utf-8', 'replace')}")


def rich_text(value: str) -> list:
    return [{"type": "text", "text": {"content": value}}] if value else []


def build_patch(args) -> dict:
    props = {}

    if args.applied:
        props[APPLIED_FIELD] = {"checkbox": True}

    for field in (args.clear or []):
        props[field] = {"rich_text": []}  # clear a rich_text field

    if args.status:
        props[STATUS_FIELD] = {"status": {"name": args.status}}

    if args.note:
        # Append: read existing notes, prepend the new line.
        existing = ""
        if not args.no_append:
            page = _get(f"/pages/{args.page}")
            prop = page.get("properties", {}).get(NOTES_FIELD, {})
            if prop.get("type") == "rich_text":
                existing = _plain(prop.get("rich_text"))
        combined = (args.note + ("\n" + existing if existing else "")).strip()
        props[NOTES_FIELD] = {"rich_text": rich_text(combined)}

    if args.props_json:
        try:
            props.update(json.loads(args.props_json))
        except json.JSONDecodeError as e:
            sys.exit(f"ERROR: --props-json is not valid JSON: {e}")

    if not props:
        sys.exit("ERROR: nothing to update — pass at least one of "
                 "--applied/--clear/--status/--note/--props-json.")
    return {"properties": props}


def main():
    ap = argparse.ArgumentParser(description="Update a Notion Sections row.")
    ap.add_argument("--page", required=True, help="Notion page (row) ID.")
    ap.add_argument("--applied", action="store_true", help="Check 'Changes Applied'.")
    ap.add_argument("--clear", action="append", metavar="FIELD",
                    help="Clear a rich_text field (repeatable), e.g. a 'Desired ...' field.")
    ap.add_argument("--status", help="Set the 'Status' property by name (e.g. 'In review').")
    ap.add_argument("--note", help="Note to prepend to 'Claude Notes / Blockers'.")
    ap.add_argument("--no-append", action="store_true",
                    help="Overwrite the notes field instead of prepending.")
    ap.add_argument("--props-json", help="Extra raw Notion properties patch as JSON.")
    args = ap.parse_args()

    patch = build_patch(args)
    result = _request(f"/pages/{args.page}", patch, "PATCH")
    print(f"Updated page {result.get('id')}")
    print(f"URL: {result.get('url')}")


if __name__ == "__main__":
    main()

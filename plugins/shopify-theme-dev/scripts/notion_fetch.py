#!/usr/bin/env python3
"""
notion_fetch.py — paginated query of the Notion "Sections" database (REST API v1).

Fallback for when the Notion MCP connector is unresponsive. Reads the integration
token from the NOTION_TOKEN environment variable. NEVER hardcode a token here.

Usage:
    NOTION_TOKEN=secret_xxx python3 notion_fetch.py \
        --database 18647d9ecc9840e7b884cdf8bf0b15ec [--pending-only] [--out rows.json]

Output: JSON array of simplified rows to stdout (or --out file). Each row:
    { "id", "url", "props": { <Property Name>: <python value>, ... }, "pending": bool }

Pending rule: any of the four "Desired ..." fields non-empty AND "Changes Applied" unchecked.
"""
import argparse
import json
import os
import sys
import urllib.request
import urllib.error

NOTION_VERSION = "2022-06-28"
API = "https://api.notion.com/v1"

DESIRED_FIELDS = [
    "Desired Section Changes",
    "Desired Section Changes — Mobile Version",
    "Desired Text Typography Changes",
    "Desired Text Typography Changes — Mobile Version",
]
APPLIED_FIELD = "Changes Applied"


def _token() -> str:
    tok = os.environ.get("NOTION_TOKEN", "").strip()
    if not tok:
        sys.exit("ERROR: NOTION_TOKEN env var is not set. Provide a Notion integration "
                 "token at runtime; do not hardcode it.")
    return tok


def _post(path: str, payload: dict) -> dict:
    req = urllib.request.Request(
        f"{API}{path}",
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
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
    """Join a rich_text / title array into a plain string."""
    if not rich:
        return ""
    return "".join(part.get("plain_text", "") for part in rich)


def parse_prop(prop: dict):
    """Convert a single Notion property value object to a plain Python value."""
    t = prop.get("type")
    if t == "title":
        return _plain(prop.get("title"))
    if t == "rich_text":
        return _plain(prop.get("rich_text"))
    if t == "select":
        sel = prop.get("select")
        return sel.get("name") if sel else None
    if t == "status":
        st = prop.get("status")
        return st.get("name") if st else None
    if t == "multi_select":
        return [o.get("name") for o in prop.get("multi_select", [])]
    if t == "checkbox":
        return bool(prop.get("checkbox"))
    if t == "number":
        return prop.get("number")
    if t == "relation":
        return [r.get("id") for r in prop.get("relation", [])]
    if t == "url":
        return prop.get("url")
    if t == "date":
        d = prop.get("date")
        return d.get("start") if d else None
    if t == "people":
        return [p.get("id") for p in prop.get("people", [])]
    # Fallback: return the raw type so drift is visible rather than silently dropped.
    return {"_unparsed_type": t}


def is_pending(props: dict) -> bool:
    applied = bool(props.get(APPLIED_FIELD))
    has_desired = any(str(props.get(f) or "").strip() for f in DESIRED_FIELDS)
    return has_desired and not applied


def query_all(database_id: str) -> list:
    rows, cursor = [], None
    while True:
        payload = {"page_size": 100}
        if cursor:
            payload["start_cursor"] = cursor
        data = _post(f"/databases/{database_id}/query", payload)
        for page in data.get("results", []):
            props = {name: parse_prop(p) for name, p in page.get("properties", {}).items()}
            rows.append({
                "id": page.get("id"),
                "url": page.get("url"),
                "props": props,
                "pending": is_pending(props),
            })
        if data.get("has_more"):
            cursor = data.get("next_cursor")
        else:
            break
    return rows


def main():
    ap = argparse.ArgumentParser(description="Query the Notion Sections database.")
    ap.add_argument("--database", default="18647d9ecc9840e7b884cdf8bf0b15ec",
                    help="Notion database ID (default: Sections).")
    ap.add_argument("--pending-only", action="store_true",
                    help="Return only rows that match the pending rule.")
    ap.add_argument("--out", help="Write JSON to this file instead of stdout.")
    args = ap.parse_args()

    rows = query_all(args.database)
    if args.pending_only:
        rows = [r for r in rows if r["pending"]]
    # Stable order by the Order property where present.
    rows.sort(key=lambda r: (r["props"].get("Order") is None, r["props"].get("Order") or 0))

    out = json.dumps(rows, indent=2, ensure_ascii=False)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(out)
        print(f"Wrote {len(rows)} rows to {args.out}", file=sys.stderr)
    else:
        print(out)


if __name__ == "__main__":
    main()

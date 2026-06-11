#!/usr/bin/env python3
"""Dry-run-first Notion page property update and implementation note append."""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

API_VERSION = "2026-03-11"


def notion_token() -> str | None:
    return os.getenv("NOTION_TOKEN") or os.getenv("NOTION_API_KEY")


def load_payload(value: str) -> dict[str, Any]:
    path = Path(value)
    data = json.loads(path.read_text()) if path.exists() else json.loads(value)
    if not isinstance(data, dict):
        raise ValueError("payload must be a JSON object of Notion properties")
    return data


def call(url: str, token: str, payload: dict[str, Any]) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        method="PATCH",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Notion-Version": API_VERSION,
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")[:500]
        raise RuntimeError(f"Notion HTTP {error.code}: {detail}") from None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("page_id")
    parser.add_argument("payload", help="JSON string or path")
    parser.add_argument("--allow-property", action="append", required=True)
    parser.add_argument("--note", default="Storefront implementation completed and verified.")
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    properties = load_payload(args.payload)
    disallowed = sorted(set(properties) - set(args.allow_property))
    if disallowed:
        print(f"Refusing unapproved properties: {', '.join(disallowed)}", file=sys.stderr)
        return 2
    plan = {"page_id": args.page_id, "properties": properties, "note": args.note}
    if not args.apply:
        print(json.dumps({"dry_run": True, **plan}, indent=2))
        return 0
    token = notion_token()
    if not token:
        print("NOTION_TOKEN or NOTION_API_KEY is required; values are never logged.", file=sys.stderr)
        return 2
    call(f"https://api.notion.com/v1/pages/{args.page_id}", token, {"properties": properties})
    note_block = {
        "children": [{
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{"type": "text", "text": {"content": args.note[:2000]}}]
            },
        }],
        "position": {"type": "end"},
    }
    call(f"https://api.notion.com/v1/blocks/{args.page_id}/children", token, note_block)
    print(json.dumps({"dry_run": False, "updated": True, "page_id": args.page_id}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

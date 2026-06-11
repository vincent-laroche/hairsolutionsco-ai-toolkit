#!/usr/bin/env python3
"""Query a verified Notion data source with pagination."""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any

API_VERSION = "2026-03-11"


def notion_token() -> str | None:
    return os.getenv("NOTION_TOKEN") or os.getenv("NOTION_API_KEY")


def rich_text(items: list[dict[str, Any]]) -> str:
    return "".join(item.get("plain_text", "") for item in items)


def property_value(prop: dict[str, Any]) -> Any:
    kind = prop.get("type")
    value = prop.get(kind) if kind else None
    if kind in {"title", "rich_text"}:
        return rich_text(value or [])
    if kind in {"checkbox", "number", "url", "email", "phone_number", "status", "select"}:
        if isinstance(value, dict):
            return value.get("name")
        return value
    if kind == "multi_select":
        return [item.get("name") for item in value or []]
    if kind == "date":
        return value
    if kind in {"people", "relation"}:
        return [item.get("id") for item in value or []]
    if kind in {"formula", "rollup"}:
        return value
    return value


def flatten_page(page: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": page.get("id"),
        "url": page.get("url"),
        "properties": {
            name: property_value(prop)
            for name, prop in page.get("properties", {}).items()
        },
    }


def is_pending(
    row: dict[str, Any], desired_names: list[str], applied_name: str
) -> bool:
    props = row.get("properties", {})
    desired = any(props.get(name) not in (None, "", [], False) for name in desired_names)
    return desired and props.get(applied_name) is not True


def request_json(url: str, token: str, payload: dict[str, Any]) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        method="POST",
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


def query_data_source(
    data_source_id: str,
    token: str,
    requester: Any = request_json,
) -> list[dict[str, Any]]:
    pages: list[dict[str, Any]] = []
    cursor = None
    while True:
        payload: dict[str, Any] = {"page_size": 100}
        if cursor:
            payload["start_cursor"] = cursor
        result = requester(
            f"https://api.notion.com/v1/data_sources/{data_source_id}/query",
            token,
            payload,
        )
        pages.extend(result.get("results", []))
        if not result.get("has_more"):
            return pages
        cursor = result.get("next_cursor")
        if not cursor:
            raise RuntimeError("Notion pagination reported has_more without next_cursor")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-source-id", required=True)
    parser.add_argument("--raw", action="store_true")
    parser.add_argument("--pending-only", action="store_true")
    parser.add_argument("--desired-property", action="append", default=[])
    parser.add_argument("--applied-property", default="Changes Applied")
    parser.add_argument("--fixture", help="offline JSON response fixture")
    args = parser.parse_args()

    desired = args.desired_property or [
        "Desired Section Changes",
        "Desired Typography Changes",
        "Desired Section/Typography Changes",
    ]
    if args.fixture:
        with open(args.fixture, encoding="utf-8") as handle:
            pages = json.load(handle).get("results", [])
    else:
        token = notion_token()
        if not token:
            print("NOTION_TOKEN or NOTION_API_KEY is required; values are never logged.", file=sys.stderr)
            return 2
        pages = query_data_source(args.data_source_id, token)

    rows = pages if args.raw else [flatten_page(page) for page in pages]
    if args.pending_only and not args.raw:
        rows = [row for row in rows if is_pending(row, desired, args.applied_property)]
    print(json.dumps(rows, indent=2, ensure_ascii=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

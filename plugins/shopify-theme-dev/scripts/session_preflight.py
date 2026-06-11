#!/usr/bin/env python3
"""Emit a concise SessionStart summary only for the Shopify workspace."""

from __future__ import annotations

import json
import os
import subprocess
import sys

ROOTS = ("/Users/vMac/06_storefront", "/Users/vMac/Documents/Shopify Theme Dev")


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        payload = {}
    cwd = payload.get("cwd") or os.getcwd()
    if not any(cwd == root or cwd.startswith(root + "/") for root in ROOTS):
        return 0
    script = os.path.join(os.path.dirname(__file__), "storefront_preflight.py")
    result = subprocess.run([sys.executable, script], text=True, capture_output=True)
    if result.stdout:
        print(result.stdout.strip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

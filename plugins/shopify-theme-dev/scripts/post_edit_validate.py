#!/usr/bin/env python3
"""Run fast validation only when an edit targets the storefront."""

from __future__ import annotations

import json
import re
import subprocess
import sys

REPO = "/Users/vMac/06_storefront"


def paths_from_payload(payload: dict) -> list[str]:
    tool_input = payload.get("tool_input") or {}
    values = []
    for key in ("path", "file_path"):
        value = tool_input.get(key)
        if isinstance(value, str):
            values.append(value)
    patch = (
        tool_input.get("command")
        or tool_input.get("patch")
        or tool_input.get("input")
        or ""
    )
    if isinstance(patch, str):
        values.extend(re.findall(r"^\*\*\* (?:Add|Update|Delete) File: (.+)$", patch, re.M))
    return values


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        return 0
    paths = paths_from_payload(payload)
    if not any(path == REPO or path.startswith(REPO + "/") for path in paths):
        return 0
    result = subprocess.run(
        ["npm", "run", "--silent", "validate"],
        cwd=REPO,
        text=True,
        capture_output=True,
    )
    if result.returncode:
        print(result.stdout + result.stderr, file=sys.stderr)
        return 2
    print("Storefront fast validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

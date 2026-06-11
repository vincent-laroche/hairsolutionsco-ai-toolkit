#!/usr/bin/env python3
"""Block direct storefront deployment commands before execution."""

from __future__ import annotations

import json
import re
import sys

REPO = "/Users/vMac/06_storefront"


def deny(reason: str) -> int:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        },
        "systemMessage": reason,
    }))
    return 0


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        return 0
    tool_input = payload.get("tool_input") or {}
    command = tool_input.get("cmd") or tool_input.get("command") or ""
    cwd = tool_input.get("workdir") or tool_input.get("cwd") or payload.get("cwd") or ""
    if not isinstance(command, str) or not (cwd == REPO or cwd.startswith(REPO + "/") or REPO in command):
        return 0
    normalized = re.sub(r"\s+", " ", command)
    blocked = [
        (r"\bshopify\s+theme\s+(push|publish|delete)\b", "Direct Shopify theme deployment is prohibited."),
        (r"\bshopify\s+theme\s+pull\b.*\b(--force|--live)\b", "Destructive raw theme pulls require explicit approval."),
        (r"\bnpm\s+run\s+push\b", "The npm push path is disabled."),
        (r"(^|[;&|]\s*)git\s+push\b", "Use storefront_release.sh push or ship instead of raw git push."),
    ]
    for pattern, reason in blocked:
        if re.search(pattern, normalized):
            return deny(reason)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

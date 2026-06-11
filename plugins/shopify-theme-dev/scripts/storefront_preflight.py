#!/usr/bin/env python3
"""Read-only preflight for the canonical Hair Solutions storefront."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from pathlib import Path

REPO = Path("/Users/vMac/06_storefront")
ORIGIN = "https://github.com/vincent-laroche/storefront.git"
BRANCH = "main"


def git(*args: str, check: bool = True) -> str:
    result = subprocess.run(
        ["git", "-C", str(REPO), *args],
        text=True,
        capture_output=True,
        check=False,
    )
    if check and result.returncode:
        raise RuntimeError(result.stderr.strip() or "git command failed")
    return result.stdout.strip()


def active_operation() -> str:
    git_dir = Path(git("rev-parse", "--git-dir"))
    if not git_dir.is_absolute():
        git_dir = REPO / git_dir
    checks = {
        "rebase": ["rebase-merge", "rebase-apply"],
        "merge": ["MERGE_HEAD"],
        "cherry-pick": ["CHERRY_PICK_HEAD"],
        "revert": ["REVERT_HEAD"],
        "bisect": ["BISECT_START"],
    }
    for name, markers in checks.items():
        if any((git_dir / marker).exists() for marker in markers):
            return name
    return "none"


def server_state() -> str:
    runtime = REPO / ".runtime/theme-dev.pid"
    if runtime.exists():
        try:
            pid = int(runtime.read_text().strip())
        except ValueError:
            return "invalid-pid"
        result = subprocess.run(["kill", "-0", str(pid)], capture_output=True)
        if result.returncode == 0:
            return f"running:{pid}"
    listener = subprocess.run(
        ["lsof", "-nP", "-iTCP:9292", "-sTCP:LISTEN", "-t"],
        text=True,
        capture_output=True,
    ).stdout.splitlines()
    if listener:
        pid = listener[0]
        command = subprocess.run(
            ["ps", "-p", pid, "-o", "command="],
            text=True,
            capture_output=True,
        ).stdout
        if "shopify theme dev" in command and str(REPO) in command:
            return f"running-untracked:{pid}" if not runtime.exists() else f"running-replaced:{pid}"
        return f"port-occupied:{pid}"
    return "stale-pid" if runtime.exists() else "stopped"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--fetch", action="store_true")
    args = parser.parse_args()
    if not (REPO / ".git").exists():
        print(f"storefront repo missing: {REPO}")
        return 2
    if args.fetch:
        subprocess.run(["git", "-C", str(REPO), "fetch", "origin", "main"], check=True)
    local = git("rev-parse", "HEAD")
    remote = git("rev-parse", "origin/main", check=False) or "unknown"
    status = git("status", "--porcelain")
    data = {
        "repo": str(REPO),
        "branch": git("branch", "--show-current"),
        "origin": git("remote", "get-url", "origin"),
        "dirty": bool(status),
        "operation": active_operation(),
        "worktrees": len([line for line in git("worktree", "list", "--porcelain").splitlines() if line.startswith("worktree ")]),
        "local_remote": "equal" if local == remote else "different",
        "dev_server": server_state(),
        "tools": {
            "git": bool(shutil.which("git")),
            "python3": bool(shutil.which("python3")),
            "shopify": bool(shutil.which("shopify")),
            "node": bool(shutil.which("node")),
        },
    }
    data["ready"] = (
        data["branch"] == BRANCH
        and data["origin"] == ORIGIN
        and data["operation"] == "none"
        and data["local_remote"] == "equal"
    )
    if args.json:
        print(json.dumps(data, sort_keys=True))
    else:
        print(
            f"storefront={data['repo']} branch={data['branch']} "
            f"state={'dirty' if data['dirty'] else 'clean'} operation={data['operation']} "
            f"worktrees={data['worktrees']} remote={data['local_remote']} "
            f"dev={data['dev_server']}"
        )
    return 0 if data["ready"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

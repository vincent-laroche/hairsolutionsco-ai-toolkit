#!/bin/zsh
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"

if [[ $# -gt 0 && "$1" != "--apply" && "$1" != "--skip-chrome-check" ]]; then
  echo "Single-plugin installation has been replaced by the full toolkit installer." >&2
  echo "Usage: $0 [--apply] [--skip-chrome-check]" >&2
  exit 2
fi

exec python3 "$repo_root/scripts/install_antigravity_toolkit.py" "$@"

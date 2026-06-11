#!/bin/zsh
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <plugin-name>" >&2
  exit 2
fi

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
plugin_name="$1"
plugin_root="$repo_root/plugins/$plugin_name"
manifest="$plugin_root/gemini-extension.json"
skills_target="${HOME}/.gemini/antigravity/skills"
mcp_target="${HOME}/.gemini/antigravity/mcp_config.json"

if [[ ! -f "$manifest" ]]; then
  echo "Unknown or unsupported plugin: $plugin_name" >&2
  exit 1
fi

mkdir -p "$skills_target"

if [[ -d "$plugin_root/skills" ]]; then
  for skill in "$plugin_root"/skills/*; do
    [[ -d "$skill" && -f "$skill/SKILL.md" ]] || continue
    target="$skills_target/${skill:t}"
    if [[ -e "$target" ]]; then
      echo "Refusing to replace existing Antigravity skill: $target" >&2
      exit 1
    fi
  done
fi

servers="$(jq -c '.mcpServers // {}' "$manifest")"
if [[ "$servers" != "{}" ]]; then
  mkdir -p "${mcp_target:h}"
  if [[ -f "$mcp_target" ]]; then
    conflicts="$(jq -r --argjson servers "$servers" '
      [((.mcpServers // {}) | keys[]) as $key | select($servers | has($key)) | $key] | join(",")
    ' "$mcp_target")"
    if [[ -n "$conflicts" ]]; then
      echo "Refusing to replace existing Antigravity MCP server(s): $conflicts" >&2
      exit 1
    fi
  fi
fi

if [[ -d "$plugin_root/skills" ]]; then
  for skill in "$plugin_root"/skills/*; do
    [[ -d "$skill" && -f "$skill/SKILL.md" ]] || continue
    cp -R "$skill" "$skills_target/${skill:t}"
  done
fi

if [[ "$servers" != "{}" ]]; then
  if [[ -f "$mcp_target" ]]; then
    backup="${mcp_target}.backup.$(date -u +%Y%m%dT%H%M%SZ)"
    cp "$mcp_target" "$backup"
    jq --argjson servers "$servers" \
      '.mcpServers = ((.mcpServers // {}) + $servers)' \
      "$mcp_target" > "${mcp_target}.tmp"
  else
    jq -n --argjson servers "$servers" '{mcpServers: $servers}' > "${mcp_target}.tmp"
  fi
  mv "${mcp_target}.tmp" "$mcp_target"
fi

echo "Installed $plugin_name for Antigravity."

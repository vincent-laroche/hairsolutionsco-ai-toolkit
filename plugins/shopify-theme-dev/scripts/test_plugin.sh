#!/usr/bin/env bash
# Claude Cowork / Claude Code plugin test runner for shopify-theme-dev.
# Self-contained: no dependency on ~/.codex or external validators.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

echo "== plugin manifest =="
python3 -m json.tool .claude-plugin/plugin.json >/dev/null
python3 - <<'PY'
import json
m = json.load(open(".claude-plugin/plugin.json"))
assert m.get("name") == "shopify-theme-dev", m.get("name")
assert m.get("version"), "missing version"
print("manifest ok:", m["name"], m["version"])
PY

echo "== hooks + mcp json valid; Claude schema (no Codex tokens) =="
python3 -m json.tool hooks/hooks.json >/dev/null
python3 -m json.tool .mcp.json >/dev/null
if grep -qE '\$PLUGIN_ROOT|apply_patch|exec_command' hooks/hooks.json; then
  echo "FAIL: Codex-only token in hooks.json"; exit 1
fi
grep -q 'CLAUDE_PLUGIN_ROOT' hooks/hooks.json || { echo "FAIL: hooks.json missing CLAUDE_PLUGIN_ROOT"; exit 1; }

echo "== exactly one chrome-devtools MCP registration =="
python3 - <<'PY'
import json
m = json.load(open(".mcp.json"))
servers = m.get("mcpServers", {})
n = sum(1 for k in servers if k == "chrome-devtools")
assert n == 1, f"expected 1 chrome-devtools server, found {n}"
args = servers["chrome-devtools"]["args"]
assert "--no-usage-statistics" in args, "missing --no-usage-statistics"
assert any("@1." in a for a in args), "chrome-devtools not version-pinned"
print("mcp ok:", args)
PY

echo "== skills: exactly 7, valid frontmatter, unique descriptions =="
python3 - <<'PY'
import glob, re, pathlib
skills = sorted(glob.glob("skills/*/SKILL.md"))
assert len(skills) == 7, f"expected 7 skills, found {len(skills)}: {skills}"
descs = []
for s in skills:
    t = pathlib.Path(s).read_text()
    name = re.search(r"^name:\s*(.+)$", t, re.M)
    desc = re.search(r"^description:\s*(.+)$", t, re.M)
    assert name and desc, f"missing frontmatter in {s}"
    descs.append(desc.group(1).strip())
assert len(descs) == len(set(descs)), "duplicate skill descriptions"
print("skills ok:", ", ".join(pathlib.Path(s).parent.name for s in skills))
PY

echo "== bash syntax =="
find scripts hooks -name '*.sh' -print0 | xargs -0 -r -n1 bash -n
echo "== python compile =="
find scripts tests -name '*.py' -print0 | xargs -0 -r -n1 python3 -m py_compile

echo "== python unit tests =="
python3 -m unittest discover -s tests -v

echo "== marketplace source resolution (synced repo) =="
python3 - "$root" <<'PY'
import json, pathlib, sys
root = pathlib.Path(sys.argv[1])
mp = root.parent.parent / ".claude-plugin/marketplace.json"
data = json.loads(mp.read_text())
entry = next(p for p in data["plugins"] if p["name"] == "shopify-theme-dev")
src = entry["source"]
src = src if isinstance(src, str) else src.get("path", "")
resolved = (mp.parent.parent / src).resolve()
assert resolved == root.resolve(), f"marketplace mismatch: {resolved} != {root.resolve()}"
print("marketplace ok:", src, "->", resolved)
PY

echo "== canonical paths present (storefront docs) =="
python3 - <<'PY'
import json, pathlib
paths = json.loads(pathlib.Path("references/paths.json").read_text())
keys = ("storefront_repo", "storefront_agents")
missing = [paths[k] for k in keys if k in paths and not pathlib.Path(paths[k]).exists()]
if missing:
    print("WARN: canonical paths not present in this environment:", missing)
else:
    print("canonical paths ok")
PY

echo "ALL PLUGIN TESTS PASSED."

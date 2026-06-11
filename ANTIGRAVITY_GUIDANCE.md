# Antigravity Guidance for Hair Solutions Co. AI Toolkit

Antigravity does not currently consume the repository's multi-plugin marketplace
catalog directly. Use the repository installer to project the shared plugin
content into Antigravity's native skill and MCP locations:

```shell
# Inspect the planned changes.
./scripts/install-antigravity-plugin.sh

# Install or update the complete toolkit.
./scripts/install-antigravity-plugin.sh --apply
```

## Skills

Skills are installed into `~/.gemini/antigravity/skills/`.

- Unique skill names retain their original name.
- Every source instance of a duplicate skill name is installed as
  `<plugin-name>--<skill-name>`.
- Identical existing skills are adopted without being rewritten.
- A skill previously installed by this toolkit is updated only when its local
  copy still matches the prior managed version.
- Locally modified or unrelated existing skills are left untouched and reported
  as conflicts.

## Commands and Agents

Commands, agents, references, hooks, and scripts remain in their plugin
directories. Antigravity can read these files as supporting instructions, but
the installer does not pretend they are native Antigravity slash commands or
automatically execute hooks.

## MCP Servers

MCP configurations from every `gemini-extension.json` are merged into
`~/.gemini/antigravity/mcp_config.json`.

- Missing servers are added.
- Exact matches are left unchanged.
- Same-name servers with different configurations are left unchanged and
  reported as conflicts.
- A timestamped backup is created before the installer writes MCP changes.
- Different server names are not treated as conflicts, even when they launch
  related software.

The installer never prints MCP credentials or secret-bearing configuration
values.

## State And Reports

The installer records managed skill hashes and a redacted action report under:

- `~/.gemini/antigravity/hairsolutionsco-ai-toolkit-state.json`
- `~/.gemini/antigravity/hairsolutionsco-ai-toolkit-report.json`

These files make repeated installations safe and allow toolkit-managed skills
to update without overwriting local modifications.

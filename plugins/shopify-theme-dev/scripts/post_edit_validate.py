#!/usr/bin/env python3
"""PostToolUse(Edit|Write) design-system nudge for the storefront.

Non-blocking by design (always exits 0). Only reacts to .liquid/.css files
inside the GitHub-synced theme folder. Emits a short reminder listing likely
hardcoded hex colors in CSS-ish contexts and any oversized border-radius, so
the OKLCH-tokens / corner rules stay top of mind. It never edits or blocks.
"""
import json, re, sys

THEME_DIR = "shopify_github_synched_theme_files"

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)
    ti = data.get("tool_input") or {}
    fp = ti.get("file_path") or ti.get("path") or ""
    if THEME_DIR not in fp or not fp.endswith((".liquid", ".css")):
        sys.exit(0)
    try:
        with open(fp, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
    except Exception:
        sys.exit(0)

    notes = []
    # Hex colors used in CSS property values (ignore Shopify schema "default": "#fff").
    hex_in_css = re.findall(r":\s*#[0-9a-fA-F]{3,8}\b", text)
    if hex_in_css:
        notes.append(f"{len(hex_in_css)} hardcoded hex color(s) in CSS values — use OKLCH design-system tokens (var(--ink), var(--clay)...).")
    # Oversized radii.
    big_radius = [m for m in re.findall(r"border-radius:\s*([0-9]+)px", text) if int(m) > 8]
    if big_radius:
        notes.append(f"border-radius > 8px found ({', '.join(big_radius)}px) — UI <=4px, cards <=8px.")

    if notes:
        print("[storefront DoD reminder] " + " ".join(notes), file=sys.stderr)
    sys.exit(0)

if __name__ == "__main__":
    main()

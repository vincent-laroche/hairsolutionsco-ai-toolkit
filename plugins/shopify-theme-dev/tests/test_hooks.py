from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class HookTests(unittest.TestCase):
    def run_hook(self, name: str, payload: dict) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(ROOT / "scripts" / name)],
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=False,
        )

    def test_guard_blocks_direct_theme_push(self):
        result = self.run_hook("pre_command_guard.py", {
            "cwd": "/Users/vMac/06_storefront",
            "tool_name": "Bash",
            "tool_input": {"command": "shopify theme push"},
        })
        self.assertEqual(result.returncode, 0)
        output = json.loads(result.stdout)
        self.assertEqual(output["hookSpecificOutput"]["hookEventName"], "PreToolUse")
        self.assertEqual(output["hookSpecificOutput"]["permissionDecision"], "deny")
        self.assertIn("prohibited", output["hookSpecificOutput"]["permissionDecisionReason"])

    def test_guard_allows_validation(self):
        result = self.run_hook("pre_command_guard.py", {
            "cwd": "/Users/vMac/06_storefront",
            "tool_input": {"command": "npm run validate"},
        })
        self.assertEqual(result.stdout, "")

    def test_apply_patch_command_extracts_storefront_path(self):
        sys.path.insert(0, str(ROOT / "scripts"))
        import post_edit_validate

        paths = post_edit_validate.paths_from_payload({
            "tool_name": "apply_patch",
            "tool_input": {
                "command": "*** Begin Patch\n*** Update File: /Users/vMac/06_storefront/sections/hero.liquid\n*** End Patch"
            },
        })
        self.assertEqual(paths, ["/Users/vMac/06_storefront/sections/hero.liquid"])

    def test_session_hook_noops_outside_workspace(self):
        result = self.run_hook("session_preflight.py", {"cwd": "/tmp"})
        self.assertEqual(result.returncode, 0)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()

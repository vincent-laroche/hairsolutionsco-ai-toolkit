from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/storefront_release.sh"


class ReleaseScriptTests(unittest.TestCase):
    def setUp(self):
        self.temp = Path(tempfile.mkdtemp())
        self.remote = self.temp / "remote.git"
        self.repo = self.temp / "repo"
        subprocess.run(["git", "init", "--bare", str(self.remote)], check=True, capture_output=True)
        # Pin the bare remote's default branch to main so later clones (advance_remote)
        # check out main instead of a dangling master HEAD on hosts where
        # init.defaultBranch is still "master".
        subprocess.run(["git", "-C", str(self.remote), "symbolic-ref", "HEAD", "refs/heads/main"], check=True, capture_output=True)
        subprocess.run(["git", "init", "-b", "main", str(self.repo)], check=True, capture_output=True)
        subprocess.run(["git", "-C", str(self.repo), "config", "user.email", "test@example.com"], check=True)
        subprocess.run(["git", "-C", str(self.repo), "config", "user.name", "Test"], check=True)
        (self.repo / "scripts").mkdir()
        (self.repo / "scripts/status-theme-dev.sh").write_text("#!/bin/sh\nexit 0\n")
        (self.repo / "scripts/status-theme-dev.sh").chmod(0o755)
        (self.repo / "tracked.txt").write_text("base\n")
        subprocess.run(["git", "-C", str(self.repo), "add", "."], check=True)
        subprocess.run(["git", "-C", str(self.repo), "commit", "-m", "base"], check=True, capture_output=True)
        subprocess.run(["git", "-C", str(self.repo), "remote", "add", "origin", str(self.remote)], check=True)
        subprocess.run(["git", "-C", str(self.repo), "push", "-u", "origin", "main"], check=True, capture_output=True)
        self.bin = self.temp / "bin"
        self.bin.mkdir()
        (self.bin / "npm").write_text("#!/bin/sh\nexit 0\n")
        (self.bin / "npm").chmod(0o755)

    def tearDown(self):
        shutil.rmtree(self.temp)

    def run_script(self, *args: str) -> subprocess.CompletedProcess[str]:
        env = {
            **os.environ,
            "PATH": f"{self.bin}:{os.environ['PATH']}",
            "STOREFRONT_REPO": str(self.repo),
            "STOREFRONT_REMOTE": str(self.remote),
        }
        return subprocess.run([str(SCRIPT), *args], env=env, text=True, capture_output=True)

    def advance_remote(self, content: str = "remote\n") -> None:
        other = self.temp / "other"
        subprocess.run(["git", "clone", str(self.remote), str(other)], check=True, capture_output=True)
        subprocess.run(["git", "-C", str(other), "config", "user.email", "other@example.com"], check=True)
        subprocess.run(["git", "-C", str(other), "config", "user.name", "Other"], check=True)
        (other / "remote.txt").write_text(content)
        subprocess.run(["git", "-C", str(other), "add", "remote.txt"], check=True)
        subprocess.run(["git", "-C", str(other), "commit", "-m", "remote"], check=True, capture_output=True)
        subprocess.run(["git", "-C", str(other), "push", "origin", "main"], check=True, capture_output=True)

    def test_unrelated_unstaged_change_is_preserved(self):
        (self.repo / "tracked.txt").write_text("intended\n")
        (self.repo / "unrelated.txt").write_text("user\n")
        result = self.run_script("commit", "--message", "change", "--", "tracked.txt")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertTrue((self.repo / "unrelated.txt").exists())

    def test_unrelated_staged_change_aborts(self):
        (self.repo / "tracked.txt").write_text("intended\n")
        (self.repo / "other.txt").write_text("staged\n")
        subprocess.run(["git", "-C", str(self.repo), "add", "other.txt"], check=True)
        result = self.run_script("commit", "--message", "change", "--", "tracked.txt")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("unrelated staged", result.stderr)

    def test_deleted_intended_file(self):
        (self.repo / "tracked.txt").unlink()
        result = self.run_script("commit", "--message", "delete", "--", "tracked.txt")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_renamed_files(self):
        (self.repo / "tracked.txt").rename(self.repo / "renamed.txt")
        result = self.run_script("commit", "--message", "rename", "--", "tracked.txt", "renamed.txt")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_wrong_origin(self):
        result = self.run_script("preflight")
        self.assertEqual(result.returncode, 0)
        env = os.environ | {"STOREFRONT_REPO": str(self.repo), "STOREFRONT_REMOTE": "/wrong"}
        bad = subprocess.run([str(SCRIPT), "preflight"], env=env, text=True, capture_output=True)
        self.assertIn("unexpected origin", bad.stderr)

    def test_active_rebase(self):
        (self.repo / ".git/rebase-merge").mkdir()
        result = self.run_script("preflight")
        self.assertIn("active Git operation", result.stderr)

    def test_behind_branch(self):
        self.advance_remote()
        result = self.run_script("preflight")
        self.assertIn("behind", result.stderr)

    def test_diverged_branch(self):
        (self.repo / "local.txt").write_text("local\n")
        subprocess.run(["git", "-C", str(self.repo), "add", "local.txt"], check=True)
        subprocess.run(["git", "-C", str(self.repo), "commit", "-m", "local"], check=True, capture_output=True)
        self.advance_remote()
        result = self.run_script("preflight")
        self.assertIn("diverged", result.stderr)

    def test_missing_path(self):
        result = self.run_script("commit", "--message", "missing", "--", "missing.txt")
        self.assertIn("missing intended path", result.stderr)

    def test_noop_commit(self):
        result = self.run_script("commit", "--message", "noop", "--", "tracked.txt")
        self.assertIn("no-op commit", result.stderr)

    def test_push_verification_json(self):
        (self.repo / "tracked.txt").write_text("ship\n")
        commit = self.run_script("commit", "--message", "ship", "--", "tracked.txt")
        self.assertEqual(commit.returncode, 0, commit.stdout + commit.stderr)
        pushed = self.run_script("--json", "push")
        self.assertEqual(pushed.returncode, 0, pushed.stdout + pushed.stderr)
        self.assertIn('"event":"verified"', pushed.stdout)
        self.assertIn('"remote_equal":true', pushed.stdout)

    def test_preflight_json(self):
        result = self.run_script("--json", "preflight")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn('"event":"preflight"', result.stdout)
        self.assertIn('"remote_state":"current"', result.stdout)


if __name__ == "__main__":
    unittest.main()

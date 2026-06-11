---
description: Clear stale .git lock files left by the FUSE sandbox so git operations can proceed.
argument-hint: ""
---

# /fix-git-locks

Clear stale git lock files in the storefront repo that the FUSE sandbox failed to `unlink()`. Read the `git-ship-workflow` skill's lock-file section first. The underlying git operation has usually already succeeded — these locks are leftovers.

## Steps

1. `cd /Users/vMac/06_storefront`.

2. **Scan** for stale locks (do NOT touch `.git/worktrees/*/HEAD.lock` — those belong to other active sessions):
   ```bash
   ls -la .git/index.lock .git/HEAD.lock .git/packed-refs.lock 2>/dev/null
   find .git/refs -name '*.lock' 2>/dev/null
   find .git/objects -maxdepth 1 -name 'maintenance.lock*' 2>/dev/null
   ```

3. **For each lock found**, try to move it aside within the same directory (rename works where unlink/`rm` doesn't on this mount):
   ```bash
   mv .git/index.lock .git/index.lock.bak 2>/dev/null && echo "moved index.lock" || echo "could not mv index.lock"
   ```
   Repeat for `.git/HEAD.lock`, `.git/packed-refs.lock`, each `.git/refs/**/*.lock`, and any `.git/objects/maintenance.lock*`.

4. **Retry** the original failing git command (e.g. re-run `/ship`, or `git commit`/`git push`).

5. **Sweep residue from past lock-clear attempts.** Earlier `mv`-aside operations leave `*.lock.bak` files (and similar `leftover_*` / `_writetest`-style scratch files from other tasks) that the sandbox also can't `rm`. These are harmless — git ignores anything under `.git/` and the repo's whitelist `.gitignore` keeps stray top-level files untracked — but they clutter the tree. Find them:
   ```bash
   find .git -name '*.lock.bak' 2>/dev/null
   find . -maxdepth 2 -name 'leftover_*' -o -maxdepth 2 -name '_writetest*' 2>/dev/null
   ```
   Try `mv`-ing each into a single `.git/_stale_locks/` holding directory (rename across same filesystem usually works even when `rm` doesn't); if that also fails, include them in the consolidated cleanup command for step 6.

6. **If `mv` also fails** for any lock or residue file, do NOT keep retrying. Print one consolidated set of exact commands for the user to run in their **real Mac terminal** (where there is no restriction), e.g.:
   ```bash
   cd /Users/vMac/06_storefront
   rm -f .git/index.lock .git/HEAD.lock .git/packed-refs.lock
   find .git -name '*.lock.bak' -delete
   find .git/refs -name '*.lock' -delete
   find .git/objects -maxdepth 1 -name 'maintenance.lock*' -delete
   ```
   Then ask them to confirm so you can retry the git operation.

7. Report which locks/residue were cleared and the resulting `git status`.

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
   ```

3. **For each lock found**, try to move it aside within the same directory (rename works where unlink/`rm` doesn't on this mount):
   ```bash
   mv .git/index.lock .git/index.lock.bak 2>/dev/null && echo "moved index.lock" || echo "could not mv index.lock"
   ```
   Repeat for `.git/HEAD.lock`, `.git/packed-refs.lock`, and each `.git/refs/**/*.lock`.

4. **Retry** the original failing git command (e.g. re-run `/ship`, or `git commit`/`git push`).

5. **If `mv` also fails** for any lock, do NOT keep retrying. Print the exact commands for the user to run in their **real Mac terminal** (where there is no restriction), e.g.:
   ```bash
   rm -f "/Users/vMac/06_storefront/.git/index.lock"
   rm -f "/Users/vMac/06_storefront/.git/HEAD.lock"
   ```
   Then ask them to confirm so you can retry the git operation.

6. Report which locks were cleared and the resulting `git status`.

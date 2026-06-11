---
name: fix-git-locks
description: Use only when Git reports index.lock or another lock error, or when the user explicitly says "fix git locks", "recover a stale Git lock", or "another Git process is blocking Git".
---

# Fix Git Locks

1. Capture the exact Git error and lock path.
2. Confirm no active Git process, editor, merge, rebase, cherry-pick, or
   linked worktree owns it.
3. Inspect only the relevant lock and its age.
4. If stale, rename it in place to `<name>.bak.<UTC timestamp>` so recovery is
   possible. Do not delete it.
5. Retry the original non-destructive Git operation once.
6. Stop if the lock recurs or repository state is ambiguous.

Never touch locks in another active worktree. Never use destructive reset or
remove a lock solely because it exists.

Never invoke this skill automatically during storefront release.

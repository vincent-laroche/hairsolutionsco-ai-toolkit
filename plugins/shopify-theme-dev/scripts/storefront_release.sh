#!/usr/bin/env bash
set -euo pipefail

repo="${STOREFRONT_REPO:-/Users/vMac/06_storefront}"
expected_origin="${STOREFRONT_REMOTE:-https://github.com/vincent-laroche/storefront.git}"
expected_branch="${STOREFRONT_BRANCH:-main}"
json=0

die() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }
gitc() { git -C "$repo" "$@"; }

operation() {
  local git_dir
  git_dir="$(gitc rev-parse --git-dir)"
  [[ "$git_dir" == /* ]] || git_dir="$repo/$git_dir"
  [[ ! -d "$git_dir/rebase-merge" && ! -d "$git_dir/rebase-apply" ]] || { echo rebase; return; }
  [[ ! -f "$git_dir/MERGE_HEAD" ]] || { echo merge; return; }
  [[ ! -f "$git_dir/CHERRY_PICK_HEAD" ]] || { echo cherry-pick; return; }
  [[ ! -f "$git_dir/REVERT_HEAD" ]] || { echo revert; return; }
  [[ ! -f "$git_dir/BISECT_START" ]] || { echo bisect; return; }
  echo none
}

preflight() {
  [[ -d "$repo/.git" ]] || die "canonical repo missing: $repo"
  [[ "$(gitc branch --show-current)" == "$expected_branch" ]] || die "expected branch $expected_branch"
  [[ "$(gitc remote get-url origin)" == "$expected_origin" ]] || die "unexpected origin"
  [[ "$(operation)" == none ]] || die "active Git operation: $(operation)"
  gitc fetch origin "$expected_branch"
  local local_head remote_head base
  local_head="$(gitc rev-parse HEAD)"
  remote_head="$(gitc rev-parse "origin/$expected_branch")"
  base="$(gitc merge-base HEAD "origin/$expected_branch")"
  if [[ "$local_head" != "$remote_head" ]]; then
    [[ "$base" != "$local_head" ]] || die "local branch is behind origin/$expected_branch"
    [[ "$base" == "$remote_head" ]] || die "local branch diverged from origin/$expected_branch"
  fi
  "$repo/scripts/status-theme-dev.sh" >/dev/null 2>&1 || true
  local worktrees
  worktrees="$(gitc worktree list --porcelain | grep -c '^worktree ')"
  if ((json)); then
    printf '{"event":"preflight","branch":"%s","head":"%s","worktrees":%s,"remote_state":"current"}\n' \
      "$expected_branch" "$local_head" "$worktrees"
  else
    printf 'PREFLIGHT branch=%s head=%s worktrees=%s\n' \
      "$expected_branch" "$local_head" "$worktrees"
  fi
}

validate_fast() { (cd "$repo" && npm run --silent validate); }
validate_full() { (cd "$repo" && npm run --silent validate:full); }

path_is_intended() {
  local changed="$1" intended
  for intended in "${paths[@]}"; do
    [[ "$changed" == "$intended" || "$changed" == "$intended/"* ]] && return 0
  done
  return 1
}

check_paths() {
  local path
  for path in "${paths[@]}"; do
    [[ "$path" != /* && "$path" != *".."* ]] || die "paths must be safe repo-relative paths"
    [[ -e "$repo/$path" || -L "$repo/$path" ]] || gitc ls-files --error-unmatch -- "$path" >/dev/null 2>&1 ||
      die "missing intended path: $path"
  done
}

check_staged_scope() {
  local changed
  while IFS= read -r changed; do
    [[ -z "$changed" ]] || path_is_intended "$changed" || die "unrelated staged change: $changed"
  done < <(gitc diff --cached --name-only --diff-filter=ACDMRTUXB)
}

commit_paths() {
  [[ -n "${message:-}" ]] || die "commit message is required"
  ((${#paths[@]})) || die "at least one intended path is required"
  check_paths
  check_staged_scope
  validate_fast
  gitc add -A -- "${paths[@]}"
  check_staged_scope
  gitc diff --cached --check
  gitc diff --cached --quiet && die "no-op commit"
  gitc commit -m "$message"
  local commit
  commit="$(gitc rev-parse HEAD)"
  if ((json)); then
    printf '{"event":"committed","commit":"%s","branch":"%s"}\n' "$commit" "$expected_branch"
  else
    printf 'COMMITTED commit=%s\n' "$commit"
  fi
}

push_release() {
  validate_full
  gitc fetch origin "$expected_branch"
  local remote_head base
  remote_head="$(gitc rev-parse "origin/$expected_branch")"
  base="$(gitc merge-base HEAD "origin/$expected_branch")"
  [[ "$base" == "$remote_head" ]] || die "remote changed or branch diverged before push"
  gitc push origin "$expected_branch"
  verify_release
}

verify_release() {
  gitc fetch origin "$expected_branch"
  local local_head remote_head
  local_head="$(gitc rev-parse HEAD)"
  remote_head="$(gitc rev-parse "origin/$expected_branch")"
  [[ "$local_head" == "$remote_head" ]] || die "local HEAD does not equal origin/$expected_branch"
  if ((json)); then
    printf '{"event":"verified","commit":"%s","branch":"%s","remote_equal":true}\n' "$local_head" "$expected_branch"
  else
    printf 'VERIFIED commit=%s branch=%s remote_equal=true\n' "$local_head" "$expected_branch"
  fi
}

usage() {
  echo "usage: $0 [--json] preflight|validate|commit|push|verify|ship [options] [-- paths...]"
}

[[ $# -gt 0 ]] || { usage; exit 2; }
if [[ "$1" == "--json" ]]; then json=1; shift; fi
command="$1"; shift
message=""
paths=()
case "$command" in
  preflight) preflight ;;
  validate)
    validate_fast
    validate_full
    ((json)) && printf '{"event":"validated","fast":true,"full":true}\n'
    ;;
  commit|ship)
    [[ "${1:-}" == "--message" ]] || die "--message is required"
    message="$2"; shift 2
    [[ "${1:-}" == "--" ]] && shift
    paths=("$@")
    preflight
    commit_paths
    if [[ "$command" == ship ]]; then
      push_release
    fi
    ;;
  push) preflight; push_release ;;
  verify) verify_release ;;
  *) usage; exit 2 ;;
esac

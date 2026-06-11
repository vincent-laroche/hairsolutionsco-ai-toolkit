#!/usr/bin/env python3
"""Safely install the complete Hair Solutions Co. toolkit into Antigravity."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
MARKETPLACE = ROOT / ".claude-plugin" / "marketplace.json"
GUIDANCE = ROOT / "ANTIGRAVITY_GUIDANCE.md"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Install every marketplace plugin skill and MCP server into Antigravity."
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Apply changes. Without this flag, report the planned changes only.",
    )
    parser.add_argument(
        "--home",
        type=Path,
        default=Path.home(),
        help=argparse.SUPPRESS,
    )
    parser.add_argument(
        "--skip-chrome-check",
        action="store_true",
        help="Skip the Chrome DevTools MCP executable smoke check.",
    )
    return parser.parse_args()


def read_json(path: Path, default: Any | None = None) -> Any:
    if not path.exists() and default is not None:
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f"{path.name}.tmp")
    temporary.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    temporary.replace(path)


def tree_hash(path: Path) -> str:
    digest = hashlib.sha256()
    for item in sorted(candidate for candidate in path.rglob("*") if candidate.is_file()):
        digest.update(item.relative_to(path).as_posix().encode())
        digest.update(b"\0")
        digest.update(item.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def skill_metadata(skill_md: Path) -> dict[str, Any]:
    text = skill_md.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"{skill_md}: missing YAML frontmatter")
    try:
        _, frontmatter, _ = text.split("---", 2)
        metadata = yaml.safe_load(frontmatter)
    except (ValueError, yaml.YAMLError) as error:
        raise ValueError(f"{skill_md}: invalid YAML frontmatter: {error}") from error
    if not isinstance(metadata, dict):
        raise ValueError(f"{skill_md}: frontmatter must be a mapping")
    name = metadata.get("name")
    description = metadata.get("description")
    if not isinstance(name, str) or not name.strip():
        raise ValueError(f"{skill_md}: frontmatter requires a non-empty name")
    if not isinstance(description, str) or not description.strip():
        raise ValueError(f"{skill_md}: frontmatter requires a non-empty description")
    return metadata


def marketplace_plugins() -> list[tuple[str, Path]]:
    catalog = read_json(MARKETPLACE)
    plugins: list[tuple[str, Path]] = []
    for entry in catalog["plugins"]:
        plugin_root = ROOT / entry["source"]
        if not plugin_root.is_dir():
            raise ValueError(f"Missing plugin directory: {plugin_root}")
        plugins.append((entry["name"], plugin_root))
    return plugins


def discover_skills(
    plugins: list[tuple[str, Path]],
) -> tuple[list[dict[str, Any]], dict[str, list[str]]]:
    skills: list[dict[str, Any]] = []
    owners: dict[str, list[str]] = defaultdict(list)
    for plugin_name, plugin_root in plugins:
        for skill_md in sorted(plugin_root.glob("skills/*/SKILL.md")):
            metadata = skill_metadata(skill_md)
            skill_name = metadata["name"]
            owners[skill_name].append(plugin_name)
            skills.append(
                {
                    "plugin": plugin_name,
                    "name": skill_name,
                    "source": skill_md.parent,
                    "source_hash": tree_hash(skill_md.parent),
                }
            )
    collisions = {
        name: sorted(plugin_names)
        for name, plugin_names in owners.items()
        if len(plugin_names) > 1
    }
    for skill in skills:
        skill["target_name"] = (
            f"{skill['plugin']}--{skill['name']}"
            if skill["name"] in collisions
            else skill["name"]
        )
    return skills, collisions


def discover_mcp_servers(
    plugins: list[tuple[str, Path]],
) -> tuple[dict[str, Any], dict[str, list[str]]]:
    servers: dict[str, Any] = {}
    duplicate_sources: dict[str, list[str]] = defaultdict(list)
    for plugin_name, plugin_root in plugins:
        manifest_path = plugin_root / "gemini-extension.json"
        if not manifest_path.is_file():
            continue
        manifest = read_json(manifest_path)
        for server_name, config in manifest.get("mcpServers", {}).items():
            duplicate_sources[server_name].append(plugin_name)
            if server_name in servers and servers[server_name] != config:
                sources = ", ".join(duplicate_sources[server_name])
                raise ValueError(
                    f"Toolkit MCP conflict for {server_name}: differing configs from {sources}"
                )
            servers[server_name] = config
    return servers, {
        name: sources
        for name, sources in duplicate_sources.items()
        if len(sources) > 1
    }


def install_skills(
    skills: list[dict[str, Any]],
    skills_target: Path,
    prior_state: dict[str, Any],
    apply: bool,
) -> tuple[list[dict[str, str]], dict[str, Any]]:
    results: list[dict[str, str]] = []
    next_state: dict[str, Any] = {}
    prior_skills = prior_state.get("skills", {})
    if apply:
        skills_target.mkdir(parents=True, exist_ok=True)

    for skill in skills:
        target_name = skill["target_name"]
        target = skills_target / target_name
        source_hash = skill["source_hash"]
        previous = prior_skills.get(target_name, {})
        action = "install"

        if target.exists():
            if not target.is_dir():
                action = "conflict"
            else:
                target_hash = tree_hash(target)
                if target_hash == source_hash:
                    action = "unchanged"
                elif previous.get("installed_hash") == target_hash:
                    action = "update"
                else:
                    action = "conflict"

        if apply and action in {"install", "update"}:
            if action == "update":
                shutil.rmtree(target)
            shutil.copytree(skill["source"], target)

        if action != "conflict":
            next_state[target_name] = {
                "plugin": skill["plugin"],
                "skill": skill["name"],
                "installed_hash": source_hash,
            }
        results.append(
            {
                "plugin": skill["plugin"],
                "skill": skill["name"],
                "target": str(target),
                "action": action,
            }
        )
    return results, next_state


def merge_mcp_servers(
    source_servers: dict[str, Any],
    mcp_target: Path,
    apply: bool,
) -> tuple[list[dict[str, str]], str | None]:
    config = read_json(mcp_target, default={})
    if not isinstance(config, dict):
        raise ValueError(f"{mcp_target}: root must be a JSON object")
    current_servers = config.setdefault("mcpServers", {})
    if not isinstance(current_servers, dict):
        raise ValueError(f"{mcp_target}: mcpServers must be a JSON object")

    results: list[dict[str, str]] = []
    additions: dict[str, Any] = {}
    for name, source_config in sorted(source_servers.items()):
        if name not in current_servers:
            action = "add"
            additions[name] = source_config
        elif current_servers[name] == source_config:
            action = "unchanged"
        else:
            action = "conflict"
        results.append({"server": name, "action": action})

    backup: str | None = None
    if apply and additions:
        mcp_target.parent.mkdir(parents=True, exist_ok=True)
        if mcp_target.exists():
            timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
            backup_path = mcp_target.with_name(f"{mcp_target.name}.bak-{timestamp}")
            shutil.copy2(mcp_target, backup_path)
            backup = str(backup_path)
        current_servers.update(additions)
        write_json(mcp_target, config)
    return results, backup


def validate_installed_skills(
    skill_results: list[dict[str, str]],
) -> list[str]:
    errors: list[str] = []
    for result in skill_results:
        if result["action"] == "conflict":
            continue
        skill_md = Path(result["target"]) / "SKILL.md"
        try:
            skill_metadata(skill_md)
        except (OSError, ValueError) as error:
            errors.append(str(error))
    return errors


def chrome_smoke_check(source_servers: dict[str, Any]) -> dict[str, Any]:
    config = source_servers.get("chrome-devtools")
    if not isinstance(config, dict) or config.get("command") != "npx":
        return {"status": "skipped", "reason": "chrome-devtools npx config not found"}
    args = list(config.get("args", []))
    command = ["npx", *args, "--version"]
    completed = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=60,
        check=False,
    )
    return {
        "status": "passed" if completed.returncode == 0 else "failed",
        "version": completed.stdout.strip() if completed.returncode == 0 else None,
        "exit_code": completed.returncode,
    }


def print_report(report: dict[str, Any]) -> None:
    actions = defaultdict(int)
    for skill in report["skills"]:
        actions[f"skill_{skill['action']}"] += 1
    for server in report["mcp_servers"]:
        actions[f"mcp_{server['action']}"] += 1

    print(f"Mode: {'apply' if report['applied'] else 'dry-run'}")
    print(f"Plugins processed: {report['plugin_count']}")
    print(f"Skills processed: {report['skill_count']}")
    print(f"Skill collisions: {len(report['skill_collisions'])}")
    for name, plugins in report["skill_collisions"].items():
        print(f"  {name}: {', '.join(plugins)}")
    print(
        "Skill actions: "
        + ", ".join(
            f"{name.removeprefix('skill_')}={count}"
            for name, count in sorted(actions.items())
            if name.startswith("skill_")
        )
    )
    print(
        "MCP actions: "
        + ", ".join(
            f"{name.removeprefix('mcp_')}={count}"
            for name, count in sorted(actions.items())
            if name.startswith("mcp_")
        )
    )
    conflicts = [
        server["server"]
        for server in report["mcp_servers"]
        if server["action"] == "conflict"
    ]
    if conflicts:
        print(f"MCP conflicts left unchanged: {', '.join(conflicts)}")
    if report["mcp_backup"]:
        print(f"MCP backup: {report['mcp_backup']}")
    print(f"Chrome DevTools check: {report['chrome_check']['status']}")
    if report["validation_errors"]:
        print("Validation errors:")
        for error in report["validation_errors"]:
            print(f"  {error}")


def main() -> int:
    args = parse_args()
    antigravity_root = args.home.expanduser() / ".gemini" / "antigravity"
    skills_target = antigravity_root / "skills"
    mcp_target = antigravity_root / "mcp_config.json"
    state_target = antigravity_root / "hairsolutionsco-ai-toolkit-state.json"

    try:
        plugins = marketplace_plugins()
        skills, collisions = discover_skills(plugins)
        source_servers, duplicate_mcp_sources = discover_mcp_servers(plugins)
        prior_state = read_json(state_target, default={})
        skill_results, skill_state = install_skills(
            skills, skills_target, prior_state, args.apply
        )
        mcp_results, backup = merge_mcp_servers(
            source_servers, mcp_target, args.apply
        )
        validation_errors = (
            validate_installed_skills(skill_results) if args.apply else []
        )
        chrome_check = (
            {"status": "skipped", "reason": "requested"}
            if args.skip_chrome_check
            else chrome_smoke_check(source_servers)
        )
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"Installation failed: {error}", file=sys.stderr)
        return 1

    report = {
        "applied": args.apply,
        "plugins": [name for name, _ in plugins],
        "plugin_count": len(plugins),
        "skill_count": len(skills),
        "skill_collisions": collisions,
        "skills": skill_results,
        "duplicate_mcp_sources": duplicate_mcp_sources,
        "mcp_servers": mcp_results,
        "mcp_backup": backup,
        "chrome_check": chrome_check,
        "validation_errors": validation_errors,
        "paths": {
            "skills": str(skills_target),
            "mcp_config": str(mcp_target),
            "state": str(state_target),
            "guidance": str(GUIDANCE),
        },
    }

    if args.apply and not validation_errors:
        next_state = {
            "marketplace": "hairsolutionsco",
            "repository": str(ROOT),
            "installed_at": datetime.now(timezone.utc).isoformat(),
            "skills": skill_state,
            "mcp_servers": [
                result["server"]
                for result in mcp_results
                if result["action"] != "conflict"
            ],
        }
        write_json(state_target, next_state)
        report_target = antigravity_root / "hairsolutionsco-ai-toolkit-report.json"
        write_json(report_target, report)
        report["paths"]["report"] = str(report_target)

    print_report(report)
    return 1 if validation_errors or chrome_check["status"] == "failed" else 0


if __name__ == "__main__":
    raise SystemExit(main())

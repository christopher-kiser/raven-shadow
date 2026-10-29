#!/usr/bin/env python3
"""Dependency-free checks for this public, documentation-only repository.

This is not a code-security scanner, malware scanner, or proof of production safety.
"""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent
LINK = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
MD = [*ROOT.glob("*.md"), *ROOT.rglob("docs/**/*.md")]
ERRORS: list[str] = []


def check_relative_links(path: Path, data: str) -> None:
    for match in LINK.finditer(data):
        target = match.group(1).strip().split(maxsplit=1)[0].strip("<>\"'")
        if target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        rel = unquote(target.split("#", 1)[0])
        if not rel:
            continue
        resolved = (path.parent / rel).resolve()
        if not resolved.is_relative_to(ROOT.resolve()):
            ERRORS.append(f"{path.relative_to(ROOT)}: link escapes repository: {target}")
        elif not resolved.exists():
            ERRORS.append(f"{path.relative_to(ROOT)}: missing target: {target}")


def main() -> int:
    if not (ROOT / "README.md").exists():
        ERRORS.append("README.md is missing")
    if not MD:
        ERRORS.append("no markdown files found")
    for path in MD:
        data = path.read_text(encoding="utf-8")
        if not re.search(r"(?m)^#\s+\S", data):
            ERRORS.append(f"{path.relative_to(ROOT)}: missing H1 heading")
        check_relative_links(path, data)
    for name in ["docs/PRODUCT_BLUEPRINT.md", "docs/ROADMAP.md", "docs/REQUIREMENTS.md", "docs/CURRENT_STATE.md"]:
        if not (ROOT / name).exists():
            ERRORS.append(f"required product artifact missing: {name}")
    if ERRORS:
        print("Public documentation validation FAILED:")
        for error in ERRORS:
            print("  -", error)
        return 1
    print(f"Public documentation validation PASSED: {len(MD)} Markdown files; all local links resolved.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

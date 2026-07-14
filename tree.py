#!/usr/bin/env python3
"""
tree.py - Menampilkan struktur direktori seperti `tree /f` di CMD Windows,
tapi otomatis mengabaikan folder/file yang biasanya tidak di-commit ke GitHub.

Cara pakai:
    python tree.py                # tree dari folder saat ini
    python tree.py /path/ke/folder
    python tree.py . --files-only  # hanya tampilkan file, sembunyikan folder kosong dari output header
    python tree.py . --max-depth 3
"""

import os
import sys
import argparse

# Fix untuk Windows CMD/PowerShell lama yang tidak default UTF-8
# (kalau tidak di-set, karakter seperti └── bisa bikin error diam-diam)
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Folder yang akan di-skip (case-insensitive)
IGNORE_DIRS = {
    "node_modules", ".next", "dist", "build", ".git", ".svn", ".hg",
    "__pycache__", ".venv", "venv", "env", ".env",
    ".cache", ".parcel-cache", ".turbo", ".vercel",
    "coverage", ".nyc_output", ".pytest_cache", ".mypy_cache",
    "out", "target", ".idea", ".vscode", ".DS_Store",
    "bin", "obj", ".gradle", ".terraform",
}

# Ekstensi/file yang juga sering di-skip
IGNORE_FILES = {
    ".DS_Store", "Thumbs.db", "*.pyc", "*.log",
}


def should_ignore_dir(name: str) -> bool:
    return name in IGNORE_DIRS or name.startswith(".") and name not in {".", ".."} and name in IGNORE_DIRS


def should_ignore_file(name: str) -> bool:
    if name in IGNORE_FILES:
        return True
    if name.endswith(".pyc") or name.endswith(".log"):
        return True
    return False


def print_tree(root, prefix="", max_depth=None, depth=0, files_only_filter=False):
    if max_depth is not None and depth > max_depth:
        return

    try:
        entries = sorted(os.listdir(root))
    except PermissionError:
        return

    # Filter folder & file yang di-ignore
    filtered = []
    for e in entries:
        full_path = os.path.join(root, e)
        if os.path.isdir(full_path):
            if e in IGNORE_DIRS:
                continue
        else:
            if should_ignore_file(e):
                continue
        filtered.append(e)

    for i, entry in enumerate(filtered):
        full_path = os.path.join(root, entry)
        is_last = (i == len(filtered) - 1)
        connector = "└── " if is_last else "├── "
        print(prefix + connector + entry)

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            print_tree(
                full_path,
                prefix + extension,
                max_depth=max_depth,
                depth=depth + 1,
                files_only_filter=files_only_filter,
            )


def main():
    parser = argparse.ArgumentParser(description="Tree direktori tanpa folder/file yang tidak perlu di-commit.")
    parser.add_argument("path", nargs="?", default=".", help="Path folder yang ingin ditampilkan (default: folder saat ini)")
    parser.add_argument("--max-depth", type=int, default=None, help="Batas kedalaman tree")
    args = parser.parse_args()

    root = os.path.abspath(args.path)

    if not os.path.isdir(root):
        print(f"[ERROR] Folder tidak ditemukan: {root}")
        sys.exit(1)

    print(root)
    try:
        print_tree(root, max_depth=args.max_depth)
    except Exception as e:
        print(f"[ERROR] Terjadi kesalahan: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
#!/usr/bin/env bash
# copy-content.sh – sync new/changed files from the Obsidian vault (posts/) to Quartz's content/ folder
# Excludes the folder "ignored-material" so drafts or private notes never get published.

set -euo pipefail

# Resolve script directory (the repo root) regardless of where the script is called from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SRC="$SCRIPT_DIR/posts/"
DEST="$SCRIPT_DIR/content/"

# Ensure the destination directory exists
mkdir -p "$DEST"

# rsync options:
#   -a   archive mode (preserves permissions, timestamps, symlinks, etc.)
#   --delete   remove files from DEST that no longer exist in SRC
#   --exclude='ignored-material/'   skip the ignored-material folder and everything inside it
#   trailing slash on SRC copies the *contents* of the folder, preserving the relative structure.
rsync -a --delete --exclude='ignored-material/' "$SRC" "$DEST"

echo "✅ Content sync complete – posts/ → content/ (ignored-material excluded)"

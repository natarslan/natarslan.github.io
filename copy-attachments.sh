#!/usr/bin/env bash
# copy-attachments.sh – copy attachment files into the public assets folder for Quartz builds
# This script is intended to be run as a pre‑build step (npm "prebuild")

set -euo pipefail

# Ensure the destination directory exists
mkdir -p "$(dirname "$0")/public/assets"

# Copy everything from posts/attachments into public/assets, preserving sub‑folders
# -a = archive mode (preserves permissions, timestamps, etc.)
# --delete removes files from the destination that no longer exist in the source
rsync -a --delete "$(dirname "$0")/posts/attachments/" "$(dirname "$0")/public/assets/"

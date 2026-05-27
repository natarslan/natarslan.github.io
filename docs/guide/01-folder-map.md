---
title: "01 — Folder map"
---

These are the only folders most people need:

- `posts/` — your Markdown + your images/files (this is what gets published)
- `quartz/` — the Quartz engine (you rarely touch this)
- `.github/workflows/deploy.yml` — GitHub Pages deployment (rarely touch)
- `docs/` — documentation for you (this folder)

## What’s safe to ignore

- `node_modules/` — dependencies (big, noisy, required)
- `public/` — build output (generated, not committed)

## Drafts / private notes

Use `posts/ignored-material/` for drafts you do *not* want published.

This repo is configured to ignore `ignored-material/` during builds.

Next: [[02-write-a-post]]


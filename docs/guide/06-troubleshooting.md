---
title: "06 — Troubleshooting"
---

## Images not showing up

Checklist:

- The image file lives under `posts/` (Quartz only copies assets from the content directory).
- The link path matches the file path.
- Try the Obsidian embed form: `![[attachments/...]]`

## Drafts accidentally published

Put drafts under `posts/ignored-material/`.

This repo ignores `ignored-material/` during builds.

## Local preview won’t start

- Make sure you’re in the repo root: `cd /Users/narslan/Desktop/nebula/blog`
- Install deps: `npm ci`
- Run: `npx quartz build --serve -d posts`

## Port conflicts / server issues

See `docs/guide/server-troubleshooting.md`.


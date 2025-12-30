---
title: Step 13 – Routine update workflow
---

# Routine update workflow

Use this loop every time you want to refresh the live site.

1. Pull the latest commits (helpful if you edit on multiple devices):
   ```bash
   git pull origin main
   ```
2. Write or edit notes in Obsidian, making sure they live inside folders linked under `content/`.
3. Preview locally to catch issues:
   ```bash
   npm_config_cache=.npm-cache npx quartz build --serve --port 8080
   ```
4. When satisfied, stop the server (`Ctrl+C`) and build once without `--serve` to confirm a clean run.
5. Stage the files or folders you changed:
   ```bash
   git add content/travel-nature/new-story.md content/attachments/photo.jpg
   git commit -m "feat: publish new story"
   ```
   Adjust the `git add` paths to match the files you changed.
   - Removing a category? Remove it from Git so Pages stops serving it:
     ```bash
     git rm -r content/code posts/code
     ```
6. Push to GitHub:
   ```bash
   git push origin main
   ```
7. Watch the deployment at https://github.com/natarslan/natarslan.github.io/actions. Green checkmarks mean GitHub Pages published the new HTML.

Keeping this checklist handy ensures every update goes through build → commit → deploy with minimal surprises.

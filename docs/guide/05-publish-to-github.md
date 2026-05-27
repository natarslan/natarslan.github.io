---
title: "05 — Publish to GitHub Pages"
---

Publishing happens when you push to the `main` branch.

## Publish checklist

1. Preview locally (optional but recommended): [[04-preview-locally]]
2. Commit and push:

   ```bash
   cd /Users/narslan/Desktop/nebula/blog
   git add -A
   git commit -m "Update blog"
   git push
   ```

## What happens next

- GitHub Actions runs `.github/workflows/deploy.yml`
- The built site gets deployed to GitHub Pages

If something looks wrong after pushing, go to GitHub → your repo → **Actions** and open the latest run.

Next: [[06-troubleshooting]]


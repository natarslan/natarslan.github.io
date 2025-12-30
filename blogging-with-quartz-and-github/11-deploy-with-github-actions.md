---
title: Step 11 – Deploy with GitHub Actions
---

# Deploy with GitHub Actions

1. Create `.github/workflows/deploy.yml` (already included in this repo) with the following logic:
   - Trigger on pushes to `main`.
   - Use `actions/setup-node@v4` to install Node 22.
   - Run `npm ci` followed by `npx quartz build`.
   - Upload the `public/` folder and deploy via `actions/deploy-pages@v4`.
2. Commit the workflow file:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "chore: add GitHub Pages workflow"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. On GitHub, go to **Settings → Pages** for `natarslan.github.io` and select **GitHub Actions** as the source. The workflow will publish to https://natarslan.github.io automatically whenever you push new commits.

GitHub Actions handles the heavy lifting so you never have to upload files manually.

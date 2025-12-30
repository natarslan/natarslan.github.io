# 11 — Automate deployment with GitHub Actions

Aim: Let GitHub build your site and publish it to Pages automatically whenever you push.

What to check:
- `.github/workflows/deploy.yml` should checkout code, setup Node, run `npm ci`, `npx quartz build`, and upload `public/` to Pages.

Key config example (short):
```yaml
uses: actions/setup-node@v4
with:
  node-version: 25
run: npm ci
run: npx quartz build
```

Steps:
1. Commit your site and workflow to `main`.
2. Push to GitHub: `git push origin main`.
3. Open GitHub → Actions and watch the Deploy workflow run.

Troubleshooting:
- Workflow fails: open the failed run log to see which step failed (install/build/upload). Fix locally then commit.
- Node mismatch: align `node-version` in the workflow with your local Node (or change local Node with `nvm`).

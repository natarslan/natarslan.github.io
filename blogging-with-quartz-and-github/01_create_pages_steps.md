# Quick reference: Create & publish your Quartz site (step-by-step)

This short guide shows the exact commands and checks to run while you create the website and push it to GitHub Pages.

1) Verify local tooling
- Aim: ensure local Node/npm match CI or adjust CI.
- Commands:
  node -v
  npm -v
- Troubleshooting:
  - If your Node version differs from CI, either install the CI version locally with `nvm install 22` or update the workflow to `node-version: 25`.

2) Confirm Git remote and branch
- Aim: ensure `origin` points at your Pages repo.
- Commands:
  git remote -v
  git branch --show-current
- Troubleshooting:
  - If `origin` is wrong: `git remote set-url origin https://github.com/<user>/<repo>.git`
  - If you prefer the repository folder name `natarslan.github.io`, renaming is optional — not required.

3) Install dependencies (use short cache to avoid long path errors)
- Aim: download node modules; avoid ENAMETOOLONG errors on macOS.
- Commands:
  rm -rf .npm-cache
  npm_config_cache=/tmp/npm-cache npm ci
- Troubleshooting:
  - If you see ENAMETOOLONG related to `.npm-cache`, use the `/tmp` cache as above.

4) Build and preview locally
- Aim: check site output before pushing.
- Commands:
  npm_config_cache=/tmp/npm-cache npx quartz build
  npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8080
- Visit: http://localhost:8080
- Troubleshooting:
  - Missing frontmatter or broken wikilinks: add frontmatter (`title`, `date`) or fix links.
  - If server crashes, delete `node_modules` and re-run `npm ci`.

5) GitHub authentication (PAT)
- Aim: enable pushes and workflow access.
- Steps:
  - Create a PAT on GitHub with `repo` and `workflow` scopes.
  - Use Git credential helper or SSH to authenticate.

6) Resolve sync/merge issues
- Aim: reconcile remote/local history safely.
- Commands:
  git pull origin main
  # if histories unrelated: git pull origin main --allow-unrelated-histories
  # resolve conflicts, then
  git add . && git commit -m "fix: resolve conflicts"
- Troubleshooting:
  - If unsure which version to keep, inspect conflicts in your editor and use `git checkout --ours <file>` or `git checkout --theirs <file>`.

7) Push and verify CI
- Aim: trigger GitHub Actions to build and publish.
- Commands:
  git add . && git commit -m "chore: publish site"
  git push origin main
- After push: open GitHub → Actions → review the `Deploy Quartz site to GitHub Pages` workflow logs.

8) If Actions fails due to Node mismatch
- Quick fixes:
  - Update local Node to the workflow's pinned version: `nvm install 22`
  - Or update `.github/workflows/deploy.yml` `actions/setup-node` `node-version` to match your local Node (e.g., `25`).

---
File: blogging-with-quartz-and-github/01_create_pages_steps.md

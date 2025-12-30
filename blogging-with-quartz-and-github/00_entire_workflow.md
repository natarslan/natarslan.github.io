---
title: Step 00 – Entire workflow overview
---

# Entire workflow — clear step-by-step guide (with aims and troubleshooting)

This document restates the workflow in short, numbered steps. Each step explains its aim, exact commands, and common troubleshooting or fixes for beginners.

1) Create the GitHub Pages repository
   - Aim: Make an empty remote destination where GitHub Pages will publish your site.
   - Commands / actions:
     - In GitHub: create a new public repository named `natarslan.github.io`.
     - Leave it empty (do not add README/License) to simplify initial push.
   - Troubleshooting:
     - Error: “repository already exists” — either pick a different name or use the existing repo by cloning it locally.
     - If you accidentally initialized with a README, you can still proceed. You may need to pull and resolve a merge when you push local files (see Git sync step).

2) Install prerequisites on your machine
   - Aim: Ensure `node`, `npm`, and `git` are available for building and publishing.
   - Commands:
     - Install Node.js v22+ from nodejs.org and Git from git-scm.com.
     - Verify: `node -v`, `npm -v`, `git --version`.
   - Troubleshooting:
     - If `node` or `npm` not found, restart your terminal or re-open your shell. Use a Node version manager (nvm) if you need multiple versions.

3) Clone the empty Pages repo locally
   - Aim: Work inside a local copy of your publishing repository.
   - Commands:
     - cd to your workspace, e.g. `cd ~/Desktop/starbase`
     - `git clone https://github.com/natarslan/natarslan.github.io.git`
     - `cd natarslan.github.io`
   - Troubleshooting:
     - If clone fails with auth error, make sure your GitHub credentials or PAT are configured (see Authentication step).

4) Add Quartz starter files into your repo
   - Aim: Bring in Quartz’s build system, CLI, and templates without overwriting your repo history.
   - Commands (simple approach):
     - From your workspace root: `git clone https://github.com/jackyzha0/quartz.git .quartz-template`
     - Copy necessary files into your repo (exclude `.git` and `content/`):
       - macOS: `rsync -av --exclude='.git' --exclude='content' .quartz-template/ ./`
     - Remove the temporary template: `rm -rf .quartz-template`
   - Troubleshooting:
     - Permission or path errors: run the commands from the correct folder and check `ls -la` to confirm files copied.
     - If you already have a Quartz copy in the same folder (e.g., you cloned into `blog/`), you can skip re-copying — just ensure the `quartz.*` files and CLI are present.

5) Install node dependencies
   - Aim: Download packages Quartz needs to build the site.
   - Commands:
     - `npm install` (or `npm_config_cache=.npm-cache npm install` to use a local cache folder)
   - Troubleshooting:
     - Long or failing installs: try clearing the npm cache `npm cache clean --force` or use `--legacy-peer-deps` if dependency conflicts occur.
     - Path-length warnings on macOS are usually non-blocking. If you see a cache path length error, set `npm_config_cache=.npm-cache` as above.

6) Configure `quartz.config.ts` and basic site settings
   - Aim: Set site title, baseUrl, and basic behavior so builds use correct metadata.
   - Tasks:
     - Open `quartz.config.ts` and set `pageTitle`, `baseUrl` (e.g., `https://natarslan.github.io`), and analytics if used.
     - Verify theme options only if you plan to change styles.
   - Troubleshooting:
     - Build errors after editing: run `npx quartz build` to see TypeScript/compile errors and fix simple typos or missing commas.

7) Connect your content (Obsidian vault) to Quartz
   - Aim: Make your notes available to Quartz without duplicating files, folder-by-folder.
   - Commands/examples:
     - Keep all publishable material under `/Users/narslan/Desktop/starbase/blog/posts/<category>/…` (e.g., `posts/travel-nature/`, `posts/photography/`).
     - For each category you want live, create a symlink:  
       `ln -s ../posts/travel-nature content/travel-nature`, `ln -s ../posts/photography content/photography`, etc.
     - Leave `posts/ignored-material/` **without** a symlink; it holds drafts/private notes and is listed in `.gitignore`, so Quartz skips it.
   - Troubleshooting:
     - Missing/404 pages after reorganizing: remove the old symlink (`rm content/travel-nature`), create a new one pointing to the renamed folder, rebuild, then commit/push so GitHub Pages updates.
     - Use `find content -type l -ls` to verify every symlink points to `../posts/<category>`.

8) Preview and test locally (build + serve)
   - Aim: Verify the site builds and looks correct before pushing to GitHub.
   - Commands:
     - Build: `npm_config_cache=.npm-cache npx quartz build`
     - Serve: `npm_config_cache=.npm-cache npx quartz build --serve --port 8080`
     - Visit: http://localhost:8080
   - Troubleshooting & common fixes:
     - Warnings about missing frontmatter or unresolved wikilinks: add missing frontmatter fields (title, date) or fix links in your notes.
     - If the server crashes with an npm error, delete `node_modules` and re-run `npm install`.
     - If the port is in use, change `--port 8080` to another port.

9) Authentication with GitHub (PATs) and syncing remotes
   - Aim: Be able to push to GitHub and let Actions deploy the site.
   - Steps:
     - Create a Personal Access Token (PAT) on GitHub with `repo` and `workflow` scopes.
     - Configure Git to use the token: use HTTPS and credential helper, or set up SSH keys.
   - Commands for common sync errors:
     - If remote has changes: `git pull origin main --allow-unrelated-histories` (only when histories truly differ).
     - If branches diverge with merges you don't want: `git config pull.rebase false` to prefer merge-style pulls.
   - Troubleshooting:
     - “Password authentication is no longer supported” — replace your password with a PAT.
     - “fetch first” / remote has changes — run `git pull` and resolve conflicts locally before pushing.

10) Resolve merge conflicts (simple approach)
   - Aim: Fix file conflicts so you can push a clean commit.
   - Typical commands:
     - See conflicts: `git status`
     - Keep local version of a file: `git checkout --ours README.md`
     - Or open conflicted files and edit manually, then `git add <file>` and `git commit`.
   - Troubleshooting:
     - If unsure which version to keep, review both sides inside your editor. Use `git diff --ours --theirs <file>`.

11) Push and verify deployment
   - Aim: Upload your site source so GitHub Actions builds and publishes to Pages.
   - Commands:
     - `git add . && git commit -m "chore: add quartz site and content"`
     - `git push origin main`
   - Troubleshooting:
     - Large push failures: check `git lfs` if you accidentally added big binaries; avoid committing `node_modules/`.
     - After a successful push, open GitHub Actions → the deployment workflow. If it fails, click the failed job to see logs for build errors.

12) Common issues seen and quick fixes (summary)
   - Local server runs but Actions fails:
     - Compare local Node/npm versions with the workflow's Node version and align them.
   - Divergent or unrelated histories on push:
     - Use `git pull origin main --allow-unrelated-histories` once, resolve conflicts, then push.
   - GitHub auth errors:
     - Create and use a PAT, or configure SSH keys; don’t use account passwords.
   - Symlink content doesn’t appear in CI:
     - Some CI runners don't follow symlinks — copy content into `content/` for CI, or add an Action step to resolve symlinks.
   - Old pages (e.g., `/code/miners-strike/`) still appear on the live site:
      - Remove the corresponding files and symlinks (`git rm -r content/code posts/code`), rebuild locally, commit, and push so GitHub Pages redeploys without the stale HTML.

13) Routine update workflow (daily edit → publish)
   - Steps:
     - `git pull origin main` to sync
     - Edit or add Markdown under `posts/<category>/` in Obsidian (symlinks make Quartz see the same files)
     - `npx quartz build --serve` locally to preview
     - `git add <changed files>` (including `posts/...` and any updated symlinks), `git commit -m "feat: ..."`, and `git push origin main`
     - Watch GitHub Actions and confirm the Pages site publishes.

If you want, I can now:
- run a local build command and watch for the specific errors you saw, or
- update the repository's workflow file to pin Node versions that match your local machine.

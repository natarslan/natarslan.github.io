# 00 — Entire workflow: Quick, beginner-friendly overview

Aim: Give one simple, ordered set of steps to create, test, and publish a Quartz blog using GitHub Pages. Each step explains why it matters and shows exact commands.

1) Create the GitHub Pages repository (destination)
- Why: GitHub Pages hosts the final website for free. The repo name (username.github.io) determines the site URL.
- Do: On GitHub, create a *public* repo named `YOURUSERNAME.github.io`. Leave it empty.

2) Prepare your machine (tools: Node, npm, Git)
- Why: Quartz is a Node.js site builder; Git pushes files to GitHub. You need both locally.
- Do: Install Node (v22+ recommended) and Git. Verify with `node -v`, `npm -v`, `git --version`.

3) Add Quartz starter files to the repo
- Why: Quartz provides the build scripts and layout. You’ll copy its starter files into your Pages repo.
- Do: Clone the repo locally, clone the Quartz template to a temp folder, copy files (exclude `.git` and your `content/`).

4) Add your content and preview locally
- Why: Always check the site locally before publishing to catch errors early.
- Do: `npm install` then `npx quartz build --serve --port 8080`. Visit `http://localhost:8080`.

5) Commit and push to GitHub
- Why: Pushing triggers GitHub Actions which builds and publishes the site to Pages.
- Do: `git add` only the files you intend, `git commit -m "..."`, `git push origin main`.

6) Monitor GitHub Actions and Pages
- Why: Actions run the build in the cloud — check logs for errors and confirm the live site URL.
- Do: Open the repo → Actions → the Deploy workflow. Visit `https://YOURUSERNAME.github.io` after success.

Troubleshooting highlights
- ENAMETOOLONG on macOS: use a short npm cache, e.g. `npm_config_cache=/tmp/npm-cache npx quartz build`.
- Auth errors pushing: create a GitHub Personal Access Token (PAT) and use it instead of password.
- CI vs local Node mismatch: align Node versions or update the workflow's `actions/setup-node` `node-version` field.

If you want, I will now rewrite each step file (01–14) into full, beginner-friendly guides and place them here for review.
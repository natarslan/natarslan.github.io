# 01 — Create a GitHub Pages repository (step-by-step)

Aim: Make a remote place where your website will live. GitHub Pages serves static sites for free.

Why it matters: The repository name controls the site URL (e.g., `username.github.io`). GitHub Pages will publish whatever files the CI workflow outputs.

Steps:
1. Sign in to GitHub and click “New repository.”
2. Name it `YOURUSERNAME.github.io` (replace YOURUSERNAME).
3. Choose Public and don’t initialize with README — leave empty to avoid merge issues.
4. Click Create repository.

Commands (on your local machine):
- Clone it: `git clone https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git`
- Enter folder: `cd YOURUSERNAME.github.io`

Troubleshooting:
- If you accidentally added a README during creation, you can still use the repo. When you push, run `git pull origin main` first and resolve any merge conflicts.
- Auth error pushing: create a PAT (Settings → Developer settings → Personal access tokens) and use it when prompted for a password.

Small concepts explained:
- Repo: a folder tracked with Git that lives on GitHub.
- Push: upload your local commits to the remote repository.
- PAT: a token used instead of a GitHub password to authenticate from the command line.
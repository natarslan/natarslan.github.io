# 09 — Manage Git remotes (origin, upstream)

Aim: Keep your repository connected to the right remotes: `origin` (your Pages repo) and `quartz-upstream` (the Quartz template repo).

Commands:
- Show remotes: `git remote -v`
- Set origin: `git remote set-url origin https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git`
- Add upstream: `git remote add quartz-upstream https://github.com/jackyzha0/quartz.git`
- Fetch updates: `git fetch quartz-upstream`

Why:
- `origin` is where you push to publish. `quartz-upstream` lets you pull updates from Quartz without overwriting your content.

Troubleshooting:
- Divergent branches: run `git pull origin main` and resolve conflicts; only use `--allow-unrelated-histories` if histories truly differ.
- If you can’t push: check PAT or SSH key setup.

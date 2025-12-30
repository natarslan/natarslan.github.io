# 03 — Clone your Pages repository locally

Aim: Work in a local copy of the GitHub Pages repository so you can add files and push them to publish.

Steps:
1. Open Terminal and choose a workspace folder, e.g., `cd ~/Desktop` or `cd ~/Desktop/starbase`.
2. Clone the repo you created: `git clone https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git`
3. Move into it: `cd YOURUSERNAME.github.io`

Why:
- Cloning downloads the remote repository so you can edit files on your computer and push changes back.

Troubleshooting:
- Authentication error: create and use a PAT or set up SSH keys.
- Already cloned in a different folder: use `git remote -v` to see where `origin` points and adjust if needed.

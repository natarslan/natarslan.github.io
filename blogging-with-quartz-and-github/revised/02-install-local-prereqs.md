# 02 — Install local prerequisites (Node, npm, Git)

Aim: Install the tools required to build Quartz sites locally and to push to GitHub.

What to install:
- Node.js (includes `npm`) — runtime for JavaScript on your machine.
- Git — version control tool to manage and push files.

Steps:
1. Install Node: visit https://nodejs.org and download LTS or v22+. Follow the installer.
2. Install Git: https://git-scm.com/downloads or run `xcode-select --install` on macOS.
3. Verify in terminal:
```
node -v
npm -v
git --version
```

Why these matter:
- Quartz is a Node tool; `npx quartz` uses Node to run the site builder.
- Git allows you to track changes and publish to GitHub.

Troubleshooting:
- Command not found: restart your terminal after install or add the install folder to your PATH.
- Multiple Node versions: use nvm (Node Version Manager) to switch versions: `nvm install 22`.

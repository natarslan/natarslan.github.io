---
title: Step 02 – Install Node, npm, and Git
---

# Install Node, npm, and Git

Quartz expects Node.js v22+ and npm v10.9+ plus Git for version control.

1. Download Node.js LTS 22 from https://nodejs.org/en/download and install it with default settings. The installer bundles npm automatically.
2. Install Git from https://git-scm.com/downloads (macOS users can also run `xcode-select --install`). Accept the defaults so `git` becomes available in Terminal.
3. Open Terminal (macOS) or PowerShell (Windows) and verify the tools:
   - `node -v` should print something like `v22.x.x`.
   - `npm -v` should print `10.9.x` or newer.
   - `git --version` should show a recent release.

These checks confirm your computer can run Quartz’s build scripts and communicate with GitHub.

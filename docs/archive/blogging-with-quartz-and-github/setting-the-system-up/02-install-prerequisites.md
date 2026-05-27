---
title: 02 – Install prerequisites (Node, npm, Git)
---

# Step 02 – Install the tools you need

## What you’ll do
1. **Node.js** – download and install version 22 or newer from https://nodejs.org.
   * Run the installer and accept the defaults.
2. **npm** (Node Package Manager) comes bundled with Node, so after installing Node you already have npm.
3. **Git** – download and install from https://git-scm.com (choose the macOS installer).
4. Open a new terminal window and verify the installations:
   ```bash
   node -v   # should show v22.x.x or higher
   npm -v    # should show a version number
   git --version   # should show something like git version 2.45.0
   ```

## Why this matters
* **Node.js** runs the Quartz build scripts (they are written in JavaScript/TypeScript).
* **npm** fetches the libraries Quartz depends on.
* **Git** lets you copy the repository from GitHub to your computer and later push changes back.

## Key terms explained
* **Installer** – a program that puts the software on your computer and sets up shortcuts.
* **Terminal** – a text‑based interface where you type commands (you already have one open).
* **Version** – a specific release of a program; newer versions have bug fixes and features.

## What you’ll see after this step
* Running the three commands above prints version numbers instead of “command not found”.
* You are now ready to download the site repository in the next step.

---

When you’re comfortable with the versions, continue to **Step 03 – Clone the repository**.

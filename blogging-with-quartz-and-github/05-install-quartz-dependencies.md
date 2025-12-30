---
title: Step 05 – Install Quartz dependencies with npm
---

# Install Quartz dependencies with npm

Quartz relies on hundreds of Node packages, but `npm` installs them all at once.

1. From inside your repo run:
   ```bash
   npm install
   ```
   This creates a `node_modules` folder and a `package-lock.json` file describing exactly which versions were installed.
2. If you encounter permission issues, add a project-local cache to avoid writing to protected folders:
   ```bash
   npm install --cache .npm-cache
   ```
3. Keep `node_modules/` and `.npm-cache/` out of Git by listing them in `.gitignore` (the starter already does this).

Once this finishes successfully, you can run any Quartz CLI command such as `npx quartz build`.

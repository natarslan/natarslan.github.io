---
title: Step 09 – Manage Git remotes for your site and Quartz updates
---

# Manage Git remotes for your site and Quartz updates

Think of Git as a notebook on your computer. A **remote** is the online photocopy of that notebook stored on another computer (GitHub). You can sync changes between your local notebook and any number of remotes.

- **origin**: your own GitHub Pages repo (`natarslan.github.io`). You have full read/write access, so pushes from your laptop update the live site.
- **quartz-upstream**: the official Quartz template. You only read (pull) from it—never push—so you get new features without overwriting your custom notes.

Keeping both remotes means you can publish your content and still stay current with Quartz improvements.

> 📍 Run all commands below from inside your site folder, e.g. `cd /Users/narslan/Desktop/starbase/blog`.

1. Check which remotes currently exist:
   ```bash
   git remote -v
   ```
   - If `origin` already shows `https://github.com/natarslan/natarslan.github.io.git` (or the SSH equivalent), you are set.
   - If it points somewhere else, update it in the next step.
2. Point `origin` at your GitHub Pages repo:
   ```bash
   git remote set-url origin https://github.com/natarslan/natarslan.github.io.git
   # or use SSH
   git remote set-url origin git@github.com:natarslan/natarslan.github.io.git
   ```
3. See whether an upstream already exists:
   ```bash
   git remote -v | grep quartz-upstream
   ```
   - If nothing prints, the remote is missing and you should add it.
   - If it already points to `https://github.com/jackyzha0/quartz.git`, skip the add command.
4. Add the official Quartz repo as a read-only upstream (only if missing):
   ```bash
   git remote add quartz-upstream https://github.com/jackyzha0/quartz.git
   ```
5. When Quartz releases fixes, merge them into your repo without overwriting your notes:
   ```bash
   git fetch quartz-upstream
   git merge quartz-upstream/v4
   ```

Result: `origin` is your live site (`natarslan.github.io`), while `quartz-upstream` is the template source you can sync with when you want the latest features.

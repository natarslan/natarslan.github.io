---
title: 04 – Add Quartz starter files to your repository
---

# Step 04 – Bring the Quartz template into your site folder

## What you’ll do
1. **Download the Quartz starter** (a ready‑made set of files that knows how to build a site).
2. **Copy** those files into the repository you just cloned.

### Commands (run inside the folder you cloned in Step 03)
```bash
# 1️⃣ Clone the Quartz template into a temporary folder
git clone https://github.com/jackyzha0/quartz.git .quartz-template

# 2️⃣ Copy everything *except* the .git folder (we don’t want its history)
rsync -av --exclude='.git' .quartz-template/ ./

# 3️⃣ Remove the temporary folder
rm -rf .quartz-template
```

> **Tip:** If you see a warning about `rsync` not being found, install it via Homebrew: `brew install rsync`.

## Why this matters
* The Quartz template contains the **build scripts**, **configuration files**, and **default theme** that turn your Markdown notes into a website.
* By copying the files into your own repo you keep full control – you can edit them later without affecting the original template.

## Key terms explained
* **Template** – a starter set of files that provides a working foundation.
* **Copy** – duplicate files from one place to another on your computer.
* **`rsync`** – a command‑line tool that copies files while preserving permissions and folder structure.

## What you’ll see after this step
* Your repository now contains many new files: `package.json`, `quartz.config.ts`, `src/`, `public/`, etc.
* The `.git` folder of the original Quartz repo is **not** present, so your repository history stays clean.

---

When the files are in place, go to **Step 05 – Install the Node dependencies**.

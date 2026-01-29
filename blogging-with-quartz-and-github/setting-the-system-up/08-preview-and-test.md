---
title: 08 – Preview and test the site locally
---

# Step 08 – Build the site on your computer and view it

## What you’ll do
1. **Build** the static site files:
   ```bash
   npx quartz build
   ```
   This creates a `public/` folder with HTML, CSS, and images.
2. **Serve** the site locally so you can browse it in a web browser:
   ```bash
   npx quartz build --serve --port 8090
   ```
   *The command starts a tiny web server on port 8090.*
3. Open your browser and go to:
   ```
   http://localhost:8090
   ```
   You should see your home page, navigation, and the notes you linked in Step 07.

## Why this matters
* Building locally lets you catch **mistakes early** (broken links, missing front‑matter, syntax errors) before you push anything to GitHub.
* The `--serve` flag gives you a live preview that updates when you rebuild.

## Key terms explained
* **Build** – the process of converting Markdown files into static HTML pages.
* **`public/` folder** – the output directory that contains everything the web server will serve.
* **Port** – a numeric address (8090) that tells the browser which service on your computer to talk to.

## What you’ll see after this step
* The terminal prints something like:
   ```
   ✅ Build complete – 42 pages written to public/
   🌐 Serving at http://localhost:8090
   ```
* Opening the URL shows a fully‑styled website with your notes.
* If you see a blank page or errors, read the terminal output – it will point to the file and line number that caused the problem.

---

When the preview looks good, move on to **Step 09 – Authenticate with GitHub** so you can push the site.

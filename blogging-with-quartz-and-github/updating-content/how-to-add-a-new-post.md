---
title: 01 – Updating your site after the initial setup
---

# How to keep your Quartz‑powered site up‑to‑date

> This guide assumes you have already completed the **"setting‑the‑system‑up"** steps and that the site builds and deploys correctly.  From now on you only need to edit the notes in your Obsidian vault, add new folders, markdown files, or images, and then push the changes.

---

## 1️⃣ What you will be doing (high‑level view)
| Action | Where you do it | What the system does behind the scenes |
|--------|----------------|----------------------------------------|
| **Add a new folder** in your vault (e.g. `posts/photography/new‑series`) | In Obsidian (or Finder) | No immediate effect. The next time you run the pre‑build script the folder will be **symlinked** automatically if you add a matching symlink in `content/` (see step 3). |
| **Write a new markdown file** (`my‑note.md`) | In the new folder inside the vault | The file is read by Quartz during the next build and becomes a new page on the website. |
| **Add an image** (`my‑photo.jpg`) | Place the image anywhere under `posts/…/attachments/…` | The `copy‑attachments.sh` script (run automatically before every build) copies the image into `public/assets/`. The wikilink you write (`![[/assets/.../my‑photo.jpg]]`) will resolve on the live site. |
| **Commit & push** | Terminal inside the cloned GitHub Pages repo | Git records the changes, and GitHub Actions rebuilds the site and publishes it. |

---

## 2️⃣ Step‑by‑step workflow for a typical edit
### 2.1 Add a new folder (optional)
1. Open your vault folder (the one you pointed to in **Step 07** of the setup, e.g. `~/Desktop/starbase/blog/posts`).
2. Create a new sub‑folder, for example:
   ```bash
   mkdir -p posts/photography/new‑series
   ```
3. (If you want the new folder to appear on the site) create a matching symlink inside the repository’s `content/` directory:
   ```bash
   cd /Users/narslan/Desktop/starbase/blog 
   ln -s ../../posts/photography/new‑series content/photography‑new‑series
   ```
   *The `../../` part goes up two levels because `content/` lives inside the repo while `posts/` lives next to it.*
4. Verify:
   ```bash
   ls -l content | grep new‑series
   ```
   You should see something like `photography‑new‑series -> ../../posts/photography/new‑series`.

---

### 2.2 Write a new markdown note
1. Open Obsidian (or any editor) and create a file, e.g. `posts/photography/new‑series/episode‑1.md`.
2. Add front‑matter (optional but recommended) at the top:
   ```markdown
   ---
   title: "Episode 1 – First Look"
   date: 2026-01-01
   tags: [photography, series]
   ---
   ```
3. Write your content as normal markdown.
4. **Embed an image** that you have placed in the attachments folder:
   ```markdown
   From now on embed images using wikilink without initial /. So:
! + "double brackets" + path: attachments/photos/... Do not use / before attachments.

Wikilink: /attachments/photos/ 
![[/attachments/photos/2025-embroidery/_IMG20250205205913.jpg]]

   ```
   *The path after `/assets/` mirrors the folder structure under `posts/attachments/`. The `copy‑attachments.sh` script will copy the image to `public/assets/` before the build.*

---

### 2.3 Add new images (or other media)
1. Save the image file somewhere inside the vault’s `posts/attachments/` hierarchy, for example:
   ```bash
   cp ~/Downloads/my‑photo.jpg posts/attachments/photos/new‑series/my‑photo.jpg
   ```
2. Use the same wikilink syntax as in step 2.2 to embed it.
3. **What happens next?**
   * When you run `npm run build` (or `npx quartz build`) the **pre‑build** hook `copy‑attachments.sh` runs automatically. It copies everything under `posts/attachments/` into `public/assets/` preserving the folder tree.
   * Quartz then reads the markdown, resolves the `![[/assets/...]]` link to the copied image, and includes it in the generated HTML.

---

## 3️⃣ Commit the changes and push to GitHub
1. Open a terminal **inside the cloned GitHub Pages repo** (the folder you created in Step 03 of the initial setup). Example path:
   ```bash
   cd /Users/narslan/Desktop/starbase/blog
   ```
2. Stage all new/modified files:
   ```bash
   git add .
   ```
3. Commit with a clear message (the guide encourages simple, jargon‑free messages):
   ```bash
   git commit -m "feat: add new photography series and images"
   ```
4. Push to the remote `main` branch:
   ```bash
   git push origin main
   ```
   *If you set up a PAT in Step 09 of the initial guide, the push will succeed without further prompts.*
5. **Watch the deployment**
   * Go to the **Actions** tab of your repository on GitHub. The workflow will run `npm install`, `npm run build`, and publish the `public/` folder.
   * When the workflow finishes with a green check, open `https://your‑username.github.io` (or the `baseUrl` you set) and you should see the new page and images.

---

## 4️⃣ What the `attachments.md` file explains (quick recap)
The file `updating-content/attachments.md` already contains a short description of how the **`copy‑attachments.sh`** script works:
* It runs automatically before every Quartz build (`prebuild` script in `package.json`).
* It copies everything from `posts/attachments/` to `public/assets/`.
* Because the wikilink uses the `/assets/` prefix, the generated site can locate the image.

Feel free to read that file for the exact script contents, but you don’t need to edit it – it works out of the box.

---

## 5️⃣ Summary checklist (run after each edit session)
- [ ] Add new folder in `posts/…` (optional).  
- [ ] Create matching symlink in `content/` if you want the folder published.  
- [ ] Write new markdown files (front‑matter optional).  
- [ ] Place any new images under `posts/attachments/…`.  
- [ ] Use `![[/assets/.../image.jpg]]` to embed images.  
- [ ] Run `git add .`, `git commit -m "…"`, `git push origin main`.  
- [ ] Verify the GitHub Actions workflow succeeds.  
- [ ] Open the live site URL to confirm the new content appears.

That’s it! From now on, updating your digital garden is just a matter of editing notes in Obsidian and pushing the changes. The pre‑build script and Quartz take care of the rest.

---
title: Auto‑transfer of new folders and files (posts → content)
---

## 📂 Why we need this automation
| Situation | Problem | Solution |
|-----------|---------|----------|
| You add a new folder or markdown file in your Obsidian vault (`blog/posts/…`). | Quartz only reads files inside `content/`. Without copying, the new notes never appear on the website. | A **pre‑build script** (`copy‑content.sh`) automatically mirrors everything from `posts/` to `content/`, **excluding** the `ignored‑material` folder that holds private drafts. |
| You want a single source of truth for your notes. | Manually copying each new folder is error‑prone and tedious. | The script runs on every `npm run build` (or CI push), so you never have to remember to copy anything. |

---

## 🛠️ What we added
| File | What it does |
|------|--------------|
| `copy-content.sh` | Uses `rsync` to sync the whole `posts/` directory into `content/`, skipping `ignored‑material/`. It also deletes files from `content/` that were removed from `posts/`. |
| `package.json` (pre‑build script) | Updated `"prebuild"` to run **both** `copy‑attachments.sh` **and** `copy‑content.sh` before Quartz builds the site. |

---

## 📄 Guide – Auto‑transfer workflow
### 1️⃣  Add new folders / files in your vault
```bash
# Example: create a new series of photography notes
mkdir -p blog/posts/photography/new‑series
# Add a markdown file inside the new folder
touch blog/posts/photography/new‑series/episode‑1.md
# (Edit the file in Obsidian or any editor)
```
*All files must live somewhere under `blog/posts/`. Anything placed in `blog/posts/ignored‑material/` will **not** be copied to the site.*

### 2️⃣  Run the build (or push) – the scripts run automatically
```bash
# From the repository root (the folder that contains package.json)
npm run build   # runs prebuild → copy‑attachments.sh && copy‑content.sh → quartz build
```
What happens behind the scenes:
1. **`copy‑attachments.sh`** copies any new images from `posts/attachments/` → `public/assets/`.
2. **`copy‑content.sh`** runs:
   * `rsync -a --delete --exclude='ignored‑material/' "$(pwd)/posts/" "$(pwd)/content/"`
   * This mirrors the entire `posts/` tree into `content/`, preserving the folder hierarchy and removing stale files.
3. Quartz builds the static site using the freshly‑synced `content/` folder.

### 3️⃣  Verify locally (optional but recommended
```bash
# Serve the site locally to see the new page
npx quartz build --serve --port 8090
# Open http://localhost:8090 in a browser and check the new notes appear.
```
If everything looks good, you can push the changes.

### 4️⃣  Commit & push – CI will redeploy automatically
```bash
git add .
git commit -m "feat: add new photography series (auto‑transfer)"
git push origin main   # GitHub Actions runs the same pre‑build steps and publishes the site.
```
The live site (`https://<your‑username>.github.io/<repo>/`) will now contain the new folder and its markdown pages.

---

## ✅ Checklist after each edit session
- [ ] Add new folder / markdown file under `blog/posts/` (avoid `ignored‑material`).
- [ ] Run `npm run build` locally to confirm the sync works (or just push). 
- [ ] Verify the new content appears on the local preview.
- [ ] `git add . && git commit && git push` to trigger CI deployment.
- [ ] Open the live URL and confirm the new pages are visible.

---

## 🛎️ Tips & Gotchas
| Issue | Fix |
|-------|-----|
| **Forgot to exclude `ignored‑material`** – private notes appear on the site. | The `--exclude='ignored‑material/'` flag in `copy‑content.sh` ensures that folder is never copied. Keep the folder name exactly as shown. |
| **Large folder sync takes long** – you added many heavy assets. | Keep heavy binary files (e.g., raw photos) in `posts/attachments/` where they are handled by `copy‑attachments.sh`. The content sync only copies markdown and lightweight assets. |
| **Script fails because `rsync` not found** (rare on macOS). | Install it via Homebrew: `brew install rsync`. |
| **Changing the source or destination paths** (e.g., you renamed `posts/`). | Edit the `SRC` and `DEST` variables at the top of `copy‑content.sh` to match the new locations. |

---

## 📚 One‑liner for future reference
```bash
# Add folder/file → build → push (auto‑transfer runs automatically)
mkdir -p blog/posts/photography/new‑series && touch blog/posts/photography/new‑series/episode‑1.md
npm run build && git add . && git commit -m "add new series" && git push
```
That’s it – the two pre‑build scripts keep your site in sync with the vault without any manual copying.

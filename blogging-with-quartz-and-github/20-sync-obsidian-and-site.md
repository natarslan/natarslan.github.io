---
title: Step 20 – Keep Obsidian folders and the live Quartz site in sync
---

# Keep Obsidian folders and the live Quartz site in sync

Follow these checks whenever the website navigation looks out of date (e.g., `/code/miners-strike/` still shows up) or when you add/remove categories in Obsidian.

## 1. Start from a clean repo

```bash
cd /Users/narslan/Desktop/starbase/blog
npm_config_cache=.npm-cache npx quartz build    # quick sanity check
```

If the build only finds the categories you expect, the issue is likely that old HTML is still in Git. If the build picks up extra folders, move or delete the markdown inside `posts/` and rebuild.

## 2. Verify what Quartz sees through `content/`

```bash
find content -type l -ls
```

- Output should list symlinks such as `content/travel-nature -> ../posts/travel-nature`.
- If you see a category you no longer want (e.g., `content/code`), remove the symlink:
  ```bash
  rm content/code
  ```

## 3. Confirm the underlying `posts/` folders

```bash
ls posts
```

- Only keep folders you intend to publish (`attachments`, `travel-nature`, `photography`, `craft-art`, `fiction`, `productivity`, …).
- Put drafts/private material inside `posts/ignored-material/` (this folder is git-ignored and never symlinked).

## 4. Remove stale categories (example: `code`)

```bash
cd /Users/narslan/Desktop/starbase/blog
rm -rf posts/code                # or move into posts/ignored-material/
git rm -r content/code           # removes the dangling symlink from Git
npm_config_cache=.npm-cache npx quartz build
```

- The new build output should no longer mention `/code/…` pages.
- After staging and committing, GitHub Pages drops those URLs when the workflow runs.

## 5. Add or restore a category

```bash
cd /Users/narslan/Desktop/starbase/blog
mkdir -p posts/geospatial
ln -s ../posts/geospatial content/geospatial
# add markdown files under posts/geospatial/
npm_config_cache=.npm-cache npx quartz build
```

Stage both the new folder and the symlink:

```bash
git add posts/geospatial content/geospatial
```

## 6. Keep Git history tidy

Whenever you add/remove content, stage the exact paths involved:

```bash
git add posts/travel-nature/new-note.md content/travel-nature
# removing a folder and its symlink
git rm -r posts/code content/code
```

Then commit and push:

```bash
git commit -m "chore: sync site categories"
git push origin main
```

GitHub Actions rebuilds the site and removes any HTML for folders you deleted.

## 7. Quick troubleshooting checklist

- `find content -type l -ls` → checks symlinks.
- `npm_config_cache=.npm-cache npx quartz build --serve --port 8080` → preview the exact site that will publish.
- `git status` → ensures deletions/additions are staged before pushing.
- https://github.com/natarslan/natarslan.github.io/actions → confirm the deploy workflow went green. If a category still appears, make sure its files were removed from `posts/` and committed.

Keep this checklist handy and you’ll never end up with mismatched folders between Obsidian and the live Quartz site again.

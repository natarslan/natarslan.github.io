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

## Scenarios — quick recipes

### Adding a new MD under an existing folder

- Create the new Markdown file in the appropriate posts folder (example):

```bash
# inside repo
mkdir -p posts/photography
cp /path/to/draft.md posts/photography/new-shot.md
```

- If you have a symlink from `content/photography` to `../posts/photography`, Quartz will see the file automatically. Add attachments next to the markdown (see Attachments section).
- Preview locally to verify layout and image paths:

```bash
npm_config_cache=.npm-cache npx quartz build --serve --port 8080
```

- Commit both the `posts/...` file and the `content/...` symlink if you changed it:

```bash
git add posts/photography/new-shot.md
git commit -m "feat: add photography post"
git push
```

### New MD and new folder

- Create the new posts folder and a matching symlink under `content/`:

```bash
mkdir -p posts/travel/2026-iceland
ln -s ../posts/travel content/travel   # top-level category symlink
cp draft.md posts/travel/2026-iceland/index.md
```

- Put attachments inside the new folder (e.g., `posts/travel/2026-iceland/images/`) and reference them with relative or root paths (see image examples).
- Preview with `npx quartz build --serve` and then `git add` the new posts and symlink.

### Removing a single MD under a specific folder

- Remove and stage the deletion so Git and the site build know it is gone:

```bash
git rm posts/photography/old-shot.md
git commit -m "fix: remove old post"
```

- If the post had unique attachments, remove those as well after searching for other references:

```bash
rg "old-shot" -n || true   # verify no remaining references
git rm posts/photography/images/old-shot-* || true
```

### Removing an entire folder

- Remove the posts folder and its `content/` symlink together:

```bash
git rm -r posts/obsolete-category content/obsolete-category
git commit -m "chore: remove obsolete category"
```

- Preview and build locally to ensure tag/index pages and navigation are still correct.

### Drafts as status

- Mark drafts in YAML frontmatter so Quartz (or your processors) can ignore them in production builds:

```yaml
---
title: Draft title
date: 2026-01-01
draft: true
---
```

- Preview drafts locally with `npx quartz build --serve`. If you want drafts completely out of the repo, keep them on a private branch and do not symlink them into `content/`.

### Attachments & symlinked attachments (your symlink case)

- Problem you described: Obsidian shows `![[blog/posts/attachments/photos/street-lit-photos/_1_Final_SocialMediajpg.jpg]]` but the web build does not. Obsidian wikilinks are NOT converted to standard Markdown images by Quartz by default.

- Solution (use regular Markdown image links that the site will copy/serve):

1. Place or symlink attachments into a path that Quartz processes (commonly `content/attachments/...` or inside the folder served via `content/...`). You already have:

```
content/attachments/photos/street-lit-photos -> ../posts/attachments/photos/street-lit-photos
```

2. In the Markdown file, replace the Obsidian wikilink with a normal Markdown image. Prefer root-relative paths that match the `public/` structure after build. Example:

```markdown
![Street lit](/attachments/photos/street-lit-photos/_1_Final_SocialMediajpg.jpg)
```

or, if your post is in the same tree and you prefer relative paths:

```markdown
![Street lit](../attachments/photos/street-lit-photos/_1_Final_SocialMediajpg.jpg)
```

- Why this works: Quartz will copy or expose files reachable through `content/` into the generated `public/` site. Wikilinks like `![[...]]` are Obsidian-only; unless you run a processor that converts them, the static site generator won't turn them into `<img>` tags.

- Quick checks:

```bash
# Verify the symlink is visible to Quartz
find content -type l -ls | rg street-lit-photos

# Start a local preview and open the page to confirm the image loads
npm_config_cache=.npm-cache npx quartz build --serve --port 8080

# Check the generated output contains the image
ls public/attachments/photos/street-lit-photos/_1_Final_SocialMediajpg.jpg
```

- If the image is missing from `public/` after a build, ensure the symlink target is inside the repository (not an external path) and that your build user has read permissions. If using CI, ensure the workflows do not exclude the target path.

## Short checklist for images

- Replace `![[...]]` with `![alt text](path/to/file)` in published Markdown.
- Use root-relative paths (`/attachments/...`) when attachments are centralized.
- Keep attachments inside repo-tracked paths or ensure symlinks are committed and point to repo-relative locations.
- Preview and confirm with `npx quartz build --serve` and check `public/` for the expected files.

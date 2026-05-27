---
title: Step 16 – Directory structure & file organization
---

# Directory structure & file organization

This reference keeps the Quartz project and your Obsidian vault in sync.

## 1. Canonical content lives in `posts/`

```
posts/
  attachments/         # images, audio, PDFs used across the site
    images/
    flickr/
  travel-nature/       # published essays
  photography/
  craft-art/
  fiction/
  geospatial/
  productivity/
  tools/
  ignored-material/    # drafts/private, never published
```

- Every folder directly under `posts/` (except `ignored-material/`) corresponds to a top-level path on the website (`/travel-nature/…`, `/photography/…`, etc.).
- Keep private or in-progress material inside `posts/ignored-material/`. The repo’s `.gitignore` and the lack of a symlink ensure Quartz ignores it.

## 2. `content/` only contains symlinks

```
content/
  attachments -> ../posts/attachments
  travel-nature -> ../posts/travel-nature
  photography -> ../posts/photography
  ...
```

Commands to recreate a symlink:

```bash
cd /Users/narslan/Desktop/starbase/blog/content
ln -s ../posts/travel-nature travel-nature
```

Verification:

```bash
cd /Users/narslan/Desktop/starbase/blog
find content -type l -ls
```

Remove a category from the site by deleting its symlink:

```bash
rm content/code
```

Quartz will no longer see the folder, and once you rebuild/push, the page disappears from the site.

## 3. Adding a new category or note

```bash
cd /Users/narslan/Desktop/starbase/blog
mkdir -p posts/fieldwork
ln -s ../posts/fieldwork content/fieldwork
printf "---\ntitle: \"Snow Survey Notes\"\ndate: 2025-01-10\ndraft: false\ntags:\n  - fieldwork\n---\n\nFirst observations…\n" > posts/fieldwork/snow-survey.md
```

Bare minimum frontmatter:

```yaml
---
title: "Your Title"
date: 2025-01-10
draft: false
tags:
  - example
---
```

## 4. Media and attachments

- Store all reusable media in `posts/attachments/` so it is available to every note.
- Reference files with Obsidian syntax (`![[attachments/images/email logo.jpg]]`) or standard Markdown paths (`![Alt](attachments/images/email%20logo.jpg)`).
- Keep media for private drafts inside `posts/ignored-material/` alongside the note so nothing leaks.

## 5. Daily workflow recap

```bash
cd /Users/narslan/Desktop/starbase/blog
# edit notes inside posts/<category>/
npm_config_cache=.npm-cache npx quartz build --serve --port 8090
# when ready:
git add content/travel-nature/new-post.md posts/attachments/images/new-photo.jpg
git commit -m "feat: add new trail notes"
git push origin main
```

Staging both the `posts/…` source files and the symlinks (if changed) keeps the repo consistent and prevents GitHub Pages from showing stale folders such as `/code/miners-strike/`.

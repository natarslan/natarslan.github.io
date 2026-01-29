---
title: Step 17 – How to add new Markdown files
---

# How to add new Markdown files (Obsidian → Quartz)

Follow these commands whenever you add a new post so the folder structure, symlinks, and Git history stay aligned.

1. **Create the file inside `posts/<category>/`**

```bash
cd /Users/narslan/Desktop/starbase/blog
mkdir -p posts/travel-nature
cat <<'EOF' > posts/travel-nature/new-river-walk.md
---
title: "New River Walk"
date: 2025-01-03
draft: false
tags:
  - travel
  - nature
---

Write your post content here…
EOF
```

- The folder name (`travel-nature`) becomes the URL segment (https://natarslan.github.io/travel-nature/…).
- Store drafts in `posts/ignored-material/` if you are not ready to publish.

2. **Ensure a matching symlink exists in `content/`**

```bash
cd /Users/narslan/Desktop/starbase/blog/content
ln -s ../posts/travel-nature travel-nature  # skip if it already exists
```

3. **Preview locally (optional but recommended)**

```bash
cd /Users/narslan/Desktop/starbase/blog
npm_config_cache=.npm-cache npx quartz build --serve --port 8090
# visit http://localhost:8090
```

4. **Stage, commit, and push the new file (and any media)**

```bash
cd /Users/narslan/Desktop/starbase/blog
git add posts/travel-nature/new-river-walk.md content/travel-nature
git commit -m "feat: add new river walk post"
git push origin main
```

- Stage the `content/<category>` symlink only if it changed (e.g., you added a brand-new category).
- Include attachments if used: `git add posts/attachments/images/new-photo.jpg`.

5. **Watch GitHub Actions**

After pushing, open https://github.com/natarslan/natarslan.github.io/actions and confirm the “Deploy Quartz site to GitHub Pages” workflow succeeds. The new URL publishes a minute later.

Troubleshooting:
- If Quartz warns the file “isn’t yet tracked by git”, make sure you `git add` it.
- If the live site still shows an old folder (like `/code/miners-strike/`) after deleting content, confirm the obsolete files were removed (`git rm`) and the change was pushed. Actions only build what exists in the repo.

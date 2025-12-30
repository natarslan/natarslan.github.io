# 17 — How to add new Markdown files (step-by-step)

This file shows the exact steps and terminal commands to add a new Markdown (`.md`) content file to your Quartz site, commit it, and preview or build the site locally.

Notes:
- Replace `your-new-post.md`, `Your Title`, and dates with your real values.
- Use the repository root `/Users/narslan/Desktop/starbase/blog` as the working directory in these commands.

1) Create the file in the site `content` folder

From the repo root run:

```bash
cd /Users/narslan/Desktop/starbase/blog
mkdir -p content/posts
printf "---\ntitle: \"Your Title\"\ndate: 2025-12-30\n---\n\nWrite your post content here.\n" > content/posts/your-new-post.md
```

Alternative: open an editor (VS Code) and save the file there:

```bash
cd /Users/narslan/Desktop/starbase/blog
mkdir -p content/posts
code content/posts/your-new-post.md
# then paste frontmatter and content, save
```

2) Required frontmatter (recommended)

Always include a YAML frontmatter block near the top so Quartz picks up title/date and avoids "dates will be inaccurate" warnings. Minimal example:

```yaml
---
title: "Your Title"
date: 2025-12-30
---
```

Add other fields as needed (tags, summary, etc.).

3) Preview locally (use short npm cache to avoid path-length errors)

Use the short npm cache worked for this environment. From the repo root:

```bash
cd /Users/narslan/Desktop/starbase/blog
# preview with live server on port 8080
npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8080
```

Or just build (no serve):

```bash
cd /Users/narslan/Desktop/starbase/blog
npm_config_cache=/tmp/npm-cache npx quartz build
```

If you see warnings about files not tracked by git, either commit the file or add explicit `date:` frontmatter.

4) Stage, commit, and push the new file

From the repo root:

```bash
cd /Users/narslan/Desktop/starbase/blog
git add content/posts/your-new-post.md
git commit -m "Add: your-new-post — short description"
git push origin main
```

If you use a different branch workflow, push to your feature branch and open a PR instead.

5) Optional: run the deployed workflow locally (CI alignment)

If you want to run a build with the same Node version as CI, ensure your local Node version matches `.github/workflows/deploy.yml` or set the `node` action accordingly. For quick checks, running the `npx quartz build` command above is usually sufficient.

6) Troubleshooting & tips

- ENAMETOOLONG on macOS: use `npm_config_cache=/tmp/npm-cache` as shown.
- If pages do not show updated content: ensure file is committed and pushed (GitHub Pages / Actions deploy only committed content).
- If Quartz logs "isn't yet tracked by git, dates will be inaccurate", either commit the file or add `date:` in frontmatter.
- For large edits, preview locally with `--serve` before pushing.

- If pages still show removed/renamed files or stale output after editing, clean the generated output and Quartz cache, then rebuild locally:

```bash
cd /Users/narslan/Desktop/starbase/blog
rm -rf public .quartz-cache
npm run build
```

This ensures `public/` (the generated site) is fully regenerated and prevents stale files from remaining in your deployed output.

7) Quick checklist

- [ ] Add `content/posts/your-new-post.md` with frontmatter
- [ ] Preview locally: `npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8080`
- [ ] Commit & push
- [ ] Confirm GitHub Actions deploy logs (if using CI)

That's it — follow these commands and the new file will be created, previewed, and deployed.
# Nat's Quartz Blog (quick start)

This repo is a Quartz site that publishes Markdown notes as a static website on GitHub Pages.

## Where to write

- Write posts in `posts/` (this is the only content folder used for publishing).
- Put images / PDFs / other files either:
  - next to your post (recommended), e.g. `posts/travel/my-post/assets/photo.jpg`, or
  - in the shared `posts/attachments/` folder.

## Preview locally

```bash
cd /Users/narslan/Desktop/nebula/blog
npm ci
npx quartz build --serve -d posts
```

Then open `http://localhost:8090`.

## Publish

```bash
git add -A
git commit -m "Update posts"
git push
```

GitHub Actions builds + deploys to GitHub Pages on pushes to `main`.

## Full guide

Start at `docs/guide/00-start-here.md`.


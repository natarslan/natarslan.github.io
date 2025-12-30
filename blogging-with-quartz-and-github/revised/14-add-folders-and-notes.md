# 14 — Add new folders and notes safely

Aim: Add new sections (folders) to your site and keep history clean.

Steps:
1. Create folder under your notes location (e.g., `posts/travel-nature/new-story.md`).
2. Link or copy it into `content/` (if using symlinks, create a matching link in `content/`).
3. Run `npx quartz build` locally to check for broken links.
4. Stage only the new content files with `git add content/...` then commit and push.

Why:
- Staging only the new files avoids accidentally committing large or system files (like `.DS_Store`).

Troubleshooting:
- If pages 404 after deploy, check that the folder is in `content/` and that frontmatter includes `date` and `title`.
- If attachments missing, ensure they were added and paths are correct before committing.

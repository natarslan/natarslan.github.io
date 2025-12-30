# 12 — Manage content in Obsidian (how to write for the web)

Aim: Tips for writing Markdown in Obsidian so Quartz builds correctly.

Guidelines:
- Add frontmatter to every publishable note: `title`, `date`, `tags`.
- Use relative links for images: store images in `posts/attachments` and link as `![[attachments/photo.jpg]]` or `![alt](attachments/photo.jpg)`.
- Keep drafts marked as `draft: true` if you don’t want them published yet.

Why:
- Quartz reads frontmatter metadata to create listings, RSS, and dates.

Troubleshooting:
- Broken images: confirm the file exists under `content/` or your linked folder and the path is correct.
- Drafts published: ensure `draft: true` is recognized by the ExplicitPublish plugin or filter.

# 06 — Connect your Obsidian (or notes) to Quartz

Aim: Make your Markdown notes available to Quartz for publishing without duplicating data.

Options:
- Symlink (fast, keeps a single copy): `ln -s /full/path/to/your/posts content/posts`
- Copy (safer for CI): `cp -R /full/path/to/your/posts content/posts`

Why:
- Quartz processes files under the `content/` folder. Symlinks let you keep your notes where you already store them.

Troubleshooting:
- CI runners sometimes don’t follow symlinks. If GitHub Actions can’t see content, copy the folder into `content/` before commit.
- Broken links in your notes: check internal links and attachments paths; use relative paths where possible.

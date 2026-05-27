---
title: Step 14 – Add new folders and notes safely
---

# Add new folders and notes safely

1. Decide whether the new material is public. If it is, keep it inside one of the folders under `posts/` (travel-nature, photography, code, etc.) that Quartz already links. If not, store it elsewhere so it stays private.
2. When you need a brand-new section (for example `posts/fieldwork`), create the folder in your vault and add a symlink inside `content/`:
   ```bash
   mkdir -p posts/fieldwork
   ln -s ../posts/fieldwork content/fieldwork
   ```
   Use clear names so you remember what each link contains.
3. Every Markdown file should have frontmatter describing its title, tags, and draft status. This metadata drives Quartz filters and listings.
4. Attachments (photos, PDFs) should live in `posts/attachments/` or another dedicated media folder that has a matching symlink, so you can embed them with `![[relative/path.jpg]]` without breaking builds.
5. After reorganizing folders, run `npx quartz build` to make sure there are no broken links. Commit both the new folders and the updated symlinks.

Thinking ahead about folder locations and metadata keeps the Obsidian → Quartz pipeline reliable and mess-free.

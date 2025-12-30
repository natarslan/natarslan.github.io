---
title: Step 12 – Manage content with Obsidian
---

# Manage content with Obsidian

1. Continue writing inside your Obsidian vault (`/Users/narslan/Desktop/starbase/blog`). Quartz reads the same folders via the symlinks in `content/`.
2. For each publishable note, add frontmatter at the top:
   ```yaml
   ---
   title: My Post Title
   draft: false
   tags:
     - travel
   date: 2025-01-05
   ---
   ```
   - `draft: true` keeps it private.
   - `tags` fuel Quartz tag pages.
3. Store media under `posts/attachments/` (or another folder that is symlinked into `content/`) and embed them in Obsidian using the usual `![[path/to/image.jpg]]` syntax—Quartz resolves the same links.
4. Keep filenames short and descriptive. Quartz converts them into URLs, so `Blog/South Wales, Travel Notes.md` becomes `https://natarslan.github.io/Blog/South%20Wales,%20Travel%20Notes/`.
5. When you finish a writing session:
   ```bash
   git status        # review changes
   git add content/travel-nature/my-post.md
   git commit -m "feat: add south wales field notes"
   git push origin main
   ```

Think of Obsidian as your editor and Quartz as the publisher—the closer you keep metadata and attachments to each note, the smoother publishing will be.

---
title: Step 06 – Connect your Obsidian vault to Quartz
---

# Connect your Obsidian vault to Quartz

Quartz expects Markdown content inside its `content/` directory. Because your writing already lives in `/Users/narslan/Desktop/starbase/blog`, we can link folders instead of copying files.

1. Create the `content` directory if it does not exist:
   ```bash
   mkdir -p content
   ```
2. Keep all public-facing material (notes plus media) under `/Users/narslan/Desktop/starbase/blog/posts`. Create symlinks from each subfolder you want to publish into `content/`, for example:
   ```bash
   ln -s ../posts/attachments   content/attachments
   ln -s ../posts/travel-nature content/travel-nature
   ln -s ../posts/code          content/code
   ln -s ../posts/tools         content/tools
   ```
   Add more symlinks for any other folders inside `posts/` (photography, craft-art, fiction, etc.).
   Later, if you decide a folder should stay local but not publish, remove only the symlink (not the original folder) with:
   ```bash
   rm content/travel-nature
   ```
   This deletes the pointer inside `content/` while leaving your real `posts/travel-nature` directory untouched in the vault.
3. Add (or update) a homepage at `content/index.md`. This becomes the landing page visitors see at https://natarslan.github.io.

Using symlinks keeps Quartz and Obsidian in sync: edit in Obsidian, and Quartz instantly sees the same files when you build.

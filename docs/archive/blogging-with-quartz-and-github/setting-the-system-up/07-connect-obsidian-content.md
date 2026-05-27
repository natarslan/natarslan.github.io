---
title: 07 – Connect your Obsidian notes to Quartz (content symlinks)
---

# Step 07 – Make Quartz see the notes you write in Obsidian

## What you’ll do
1. Decide where your Obsidian vault lives. In this guide we assume it is at:
   ```
   /Users/narslan/Desktop/starbase/blog/posts
   ```
2. Inside the repository folder (the one you cloned in Step 03) create **symlinks** that point from Quartz’s `content/` directory to the folders inside your vault.
   ```bash
   # make sure you are in the repo root
   cd /Users/narslan/Desktop/starbase/blog/your-username.github.io   # replace with your actual folder name

   # create a symlink for each top‑level category you want published
   ln -s ../../posts/photography content/photography
   ln -s ../../posts/travel-nature content/travel-nature
   # add more as needed, e.g.
   # ln -s ../../posts/fiction content/fiction
   ```
   *The `../../` part goes up two directories because `content/` lives inside the repo folder, while `posts/` lives next to the repo folder.
3. Verify the links were created:
   ```bash
   ls -l content
   ```
   You should see something like `photography -> ../../posts/photography`.

## Why this matters
* Quartz builds the site by reading Markdown files **inside the `content/` folder**. By creating symbolic links, you avoid copying your notes – the same files are used both by Obsidian (which reads `posts/…`) and by Quartz (which reads `content/…`).
* Keeping a single source of truth means you edit notes in Obsidian and the changes appear automatically when you rebuild the site.

## Key terms explained
* **Symlink (symbolic link)** – a shortcut that points to another folder or file. It behaves like the target when accessed.
* **`ln -s`** – the command to create a symbolic link (`-s` = symbolic).
* **`content/`** – the folder Quartz expects to find the Markdown files that will become web pages.

## What you’ll see after this step
* Inside `content/` you will see the symlinks you created.
* Running `npx quartz build` will now include the notes from `posts/photography`, `posts/travel-nature`, etc., in the generated site.

---

When the links are working, continue to **Step 08 – Preview and test the site locally**.

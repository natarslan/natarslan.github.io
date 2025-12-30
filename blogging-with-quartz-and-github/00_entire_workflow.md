---
title: Step 00 – Entire workflow overview
---

# Entire workflow overview

1. Create the GitHub Pages repository
   1. Sign in to https://github.com/ and create a public repo named `natarslan.github.io`.
      - GitHub Pages only auto-publishes repos named `<username>.github.io`, so this sets up the destination.
   2. Leave the repo empty (no README, no template).
      - Quartz will supply every file, keeping the history clean.

2. Install local prerequisites
   1. Install Node.js v22+ from https://nodejs.org/en/download.
      - Quartz uses modern JavaScript tooling that depends on this runtime.
   2. Install Git from https://git-scm.com/downloads (or `xcode-select --install` on macOS).
      - Git tracks your files and communicates with GitHub.
   3. Verify in Terminal with `node -v`, `npm -v`, and `git --version`.
      - These commands confirm the tools are on your PATH before continuing.

3. Clone the empty Pages repository
   1. `cd` into the workspace you prefer (e.g. `cd ~/Desktop/starbase`).
      - All remaining commands assume you work inside this directory tree.
   2. Run `git clone https://github.com/natarslan/natarslan.github.io.git`.
      - This creates a local folder that mirrors the online repo.
   3. Enter it via `cd natarslan.github.io`.
      - Every subsequent setup command should run from here.

4. Download the Quartz starter
   1. Clone the Quartz template into a temporary folder: `git clone https://github.com/jackyzha0/quartz.git .quartz-template`.
      - Pulls the official starter files directly from the source.
   2. Copy everything (except the template’s `.git` and `content/`) into your repo using `rsync`.
      - You inherit Quartz’s configuration, CLI, and docs while keeping your own Git history.
   3. Remove `.quartz-template` once copied.
      - Keeps your repo tidy and prevents confusion later.

5. Install Quartz dependencies with npm
   1. Run `npm install` (add `--cache .npm-cache` if needed).
      - Downloads all libraries Quartz needs to build your site.
   2. Ensure `.gitignore` lists `node_modules/` and `.npm-cache/`.
      - These folders are large and auto-generated; they should not enter Git history.

6. Connect your Obsidian vault via symlinks
   1. Create a `content/` folder inside the repo (`mkdir -p content`).
      - Quartz only processes Markdown placed under `content/`.
   2. Keep all publishable material (notes plus media) under `/posts/<category>` and create matching symlinks, e.g. `ln -s ../posts/travel-nature content/travel-nature`.
      - Symlinks let Quartz read your Obsidian files without copying them.
   3. Remove a symlink with `rm content/FolderName` if you ever want to keep a folder private again.
      - This deletes only the pointer, not your actual notes inside `posts/`.

7. Configure Quartz basics
   1. Edit `quartz.config.ts` and update `pageTitle`, `pageTitleSuffix`, `baseUrl`, and `analytics`.
      - These values define branding and how the site behaves.
   2. Review theme fonts/colors and leave defaults unless you have a specific palette in mind.
      - Styling lives centrally here, so one change affects the whole site.
   3. Save and run `npx quartz build` to check for typos.
      - Validates that the config compiles.

8. Customize layouts and plugins when ready
   1. Tweak `quartz.layout.ts` to rearrange components such as Search, Graph, or RecentNotes.
      - Layout files control what visitors see on each page type.
   2. Adjust the `plugins` arrays in `quartz.config.ts` to add or remove features (e.g., ExplicitPublish, Latex).
      - Transformers, filters, and emitters define how Markdown becomes HTML.
   3. Edit `quartz/styles/custom.scss` for bespoke styling.
      - Keeps overrides separate from upstream defaults.

9. Manage Git remotes
   1. Run `git remote -v` to see which remotes already exist.
      - Helps you decide whether to update `origin` or add `quartz-upstream`.
   2. Still inside your repo folder, set `origin` to `https://github.com/natarslan/natarslan.github.io.git` (or the SSH URL).
      - `origin` is the remote you push to for publishing.
   3. If `quartz-upstream` isn’t listed, add it with `git remote add quartz-upstream https://github.com/jackyzha0/quartz.git`.
      - Lets you pull template updates later without disturbing `origin`.
   4. Fetch/merge from `quartz-upstream` when you need new features.
      - Keeps your local copy current with minimal manual edits.

10. Preview and test locally
   1. Build once: `npm_config_cache=.npm-cache npx quartz build`.
      - Generates static HTML in `public/`.
   2. Start the dev server: `npm_config_cache=.npm-cache npx quartz build --serve --port 8080`.
      - Opens a hot-reloading preview at http://localhost:8080.
   3. Fix warnings (missing frontmatter, unknown wikilinks) before deploying.
      - Prevents broken pages on GitHub Pages.

11. Automate deployment with GitHub Actions
   1. Ensure `.github/workflows/deploy.yml` exists with the Quartz build steps.
      - Defines how GitHub builds and uploads your site.
   2. Commit the workflow and push to `origin main`.
      - Triggers the action whenever you update the repo.
   3. In the repo’s GitHub Settings → Pages, choose “GitHub Actions” as the source.
      - Allows Pages to publish the artifacts produced by the workflow.

12. Manage content through Obsidian
   1. Write notes in the Obsidian vault folders linked under `content/`.
      - Any Markdown saved there becomes publishable.
   2. Add frontmatter (title, tags, draft, date) to each note.
      - Quartz uses this metadata for listings, filters, and RSS.
   3. Store media in `posts/attachments/` (or another linked folder) and embed using Obsidian syntax.
      - Quartz resolves the same links during builds.

13. Follow the routine update workflow
   1. Pull latest changes: `git pull origin main`.
      - Prevents conflicts if you edit on multiple machines.
   2. Build/serve locally, inspect output, then stop the server.
      - Ensures the new content renders correctly.
   3. Stage the exact files you changed (`git add content/travel-nature/new-story.md content/attachments/photo.jpg`), commit, and push (`git commit -m "feat: …"`, `git push origin main`).
      - Publishing is just another Git push thanks to the workflow.
   4. Monitor GitHub Actions for a green deployment.
      - Confirms the live site updated successfully.

14. Add new folders or reorganize safely
   1. Create new subfolders inside `posts/` (or wherever you keep public material) and add matching symlinks inside `content/`.
      - Keeps Quartz aware of every publishable directory.
   2. Run `npx quartz build` after structural changes to catch broken paths early.
      - Protects the site from 404s.
   3. Commit both the folder changes and the updated links.
      - Keeps history consistent and reproducible.

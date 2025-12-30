# 04 — Add the Quartz starter files to your repo

Aim: Bring Quartz’s project structure and build tools into your Pages repo so you can generate a static site.

Steps (safe approach):
1. From inside your cloned Pages repo folder:
```
# download a copy of the Quartz starter into a temp folder
git clone https://github.com/jackyzha0/quartz.git .quartz-template
# copy files (exclude the template's .git and its content folder)
rsync -av --exclude='.git' --exclude='content' .quartz-template/ ./
rm -rf .quartz-template
```
2. Inspect files: you should see `package.json`, `quartz.config.ts`, `quartz.layout.ts`, `quartz/` folder, etc.

Why:
- Quartz provides the CLI and build pipeline that turns your Markdown into an HTML site. Copying (not merging the template git history) keeps your repository clean.

Troubleshooting:
- If `rsync` not available, use `cp -R` carefully and avoid copying `.git`.
- If you already have files from Quartz elsewhere, ensure you don't accidentally overwrite custom content.

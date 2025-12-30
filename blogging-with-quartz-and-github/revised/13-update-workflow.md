# 13 — Keep Quartz and workflow updated safely

Aim: Pull updates from the Quartz template without losing your content.

Safe approach:
1. Add the upstream remote if not present:
```
git remote add quartz-upstream https://github.com/jackyzha0/quartz.git
git fetch quartz-upstream
```
2. Inspect upstream changes and merge selectively:
```
git checkout -b quartz-upstream-temp quartz-upstream/main
# review differences, copy only files you want into your working branch
```
3. Merge carefully into your `main` and test locally before pushing.

Why:
- Quartz may receive feature and bug fixes — merging helps you keep those improvements.

Troubleshooting:
- Conflicts with your custom files: resolve manually and keep your content files.
- Don’t blindly overwrite your `content/` folder when pulling updates.

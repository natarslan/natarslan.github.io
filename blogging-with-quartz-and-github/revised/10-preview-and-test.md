# 10 — Preview and test locally (build + serve)

Aim: Verify how the site looks and fix content issues before publishing.

Commands:
- Build once: `npm_config_cache=/tmp/npm-cache npx quartz build`
- Serve with hot reload: `npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8080`
- Visit: `http://localhost:8080`

Why:
- Local previews catch broken links, missing frontmatter, or plugin issues before triggering CI.

Troubleshooting:
- Missing frontmatter (no title/date): add YAML frontmatter at the top of each note:
```
---
title: My post
date: 2025-12-30
---
```
- ENAMETOOLONG errors: use short cache path (`/tmp/npm-cache`) as shown.

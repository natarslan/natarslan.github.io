---
title: Step 10 – Preview and test your Quartz site locally
---

# Preview and test your Quartz site locally

1. Run a one-off build to make sure everything compiles:
   ```bash
   npm_config_cache=.npm-cache npx quartz build
   ```
   - Quartz reads from `content/` and writes HTML into `public/`.
2. Start the hot-reload dev server:
   ```bash
   npm_config_cache=.npm-cache npx quartz build --serve --port 8080
   ```
   Open http://localhost:8080 in your browser. Quartz watches for Markdown changes and refreshes automatically.
3. Fix any warnings (missing frontmatter, broken wikilinks) before publishing; catching them locally saves failed deployments later.

Testing locally gives you confidence that GitHub Pages will see a clean, working build every time you push.

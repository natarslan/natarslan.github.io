---
title: Step 07 – Configure Quartz basics
---

# Configure Quartz basics

Quartz reads `quartz.config.ts` for site-wide settings.

1. Open `quartz.config.ts` in a code editor.
2. Update the `configuration` block:
   - `pageTitle`: choose a name, e.g., `Nat Arslan`.
   - `pageTitleSuffix`: optional tagline like `· Notes & Field Reports`.
   - `baseUrl`: set to `natarslan.github.io` (no `https://`).
   - `analytics`: set to `null` unless you plan to add analytics later.
3. Review the `theme` colors and fonts. Stick with defaults now; you can revisit later.
4. Save the file and run `npx quartz build` to ensure there are no typos.

This single file controls metadata, theme, RSS feeds, and which plugins run during builds.

---
title: Step 08 – Customize layouts, components, and plugins
---

# Customize layouts, components, and plugins

Quartz separates structure (`quartz.layout.ts`) from behaviour (`quartz.config.ts` plugins). Tweak them step by step.

1. Layout presets live in `quartz.layout.ts`. Each exported object describes which components (Search, RecentNotes, Graph, etc.) appear on pages. You can mix and match components from `quartz/components/` or wrap them with helpers like `Component.Flex` for responsive rows. See https://quartz.jzhao.xyz/layout for diagrams.
2. Plugins live inside the `plugins` section of `quartz.config.ts`:
   - **Transformers** read every Markdown file (frontmatter parser, TOC generator, Latex renderer).
   - **Filters** remove notes (e.g., `Plugin.RemoveDrafts()` hides notes with `draft: true`).
   - **Emitters** create output files (content pages, tag listings, RSS, custom 404 pages).
3. To add a new feature, import the plugin and append it to the right array. Example: enable Explicit Publish control by inserting `Plugin.ExplicitPublish()` inside `filters`.
4. For advanced styling, edit `quartz/styles/custom.scss` and re-run `npx quartz build` to regenerate CSS.

Work incrementally: change one setting, run a local build, and inspect `public/` or the dev server before moving on.

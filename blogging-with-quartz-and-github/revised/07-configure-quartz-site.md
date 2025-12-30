# 07 — Configure basic site settings (`quartz.config.ts`)

Aim: Set site title, base URL, and other basic options so your site is branded and links resolve correctly.

What to edit:
- `pageTitle` — site title visitors see
- `baseUrl` — set to `https://YOURUSERNAME.github.io` for GitHub Pages
- `plugins` and `analytics` — optional features

Steps:
1. Open `quartz.config.ts` in a code editor.
2. Set `pageTitle`, `pageTitleSuffix`, and `baseUrl`.
3. Save and test with `npx quartz build`.

Why:
- Correct `baseUrl` ensures internal links, RSS feeds, and sitemaps point to the right domain.

Troubleshooting:
- Type errors: run `npx quartz build` to see TypeScript errors; fix simple typos or missing commas.
- If layouts look wrong, check `quartz.layout.ts` for component ordering.

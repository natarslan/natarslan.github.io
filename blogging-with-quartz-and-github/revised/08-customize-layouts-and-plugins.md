# 08 — Customize layouts and plugins

Aim: Tweak how pages look and which features (search, math, etc.) are active.

Files to edit:
- `quartz.layout.ts` — controls page component placement (header, sidebar, footer)
- `quartz.config.ts` → `plugins` — add/remove functionality
- `quartz/styles/custom.scss` — for visual overrides

Steps:
1. Make small changes to layout or plugin arrays.
2. Run `npx quartz build --serve` and review locally.
3. Commit incremental changes so you can revert if needed.

Why:
- Small, incremental CSS/layout tweaks are easier to test than wholesale theme changes.

Troubleshooting:
- CSS not applied: ensure you import `custom.scss` and rebuild.
- Plugin errors: remove plugin, rebuild, then re-add after fixing configuration.

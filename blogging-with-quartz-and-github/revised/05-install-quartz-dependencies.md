# 05 — Install Quartz dependencies (npm)

Aim: Download all libraries Quartz needs to build your site.

Steps:
1. From your repo root run:
```
npm install
```
2. If you want a shorter path cache (fixes macOS long path errors), run:
```
npm_config_cache=/tmp/npm-cache npm ci
```

Why:
- `npm install` reads `package.json` and installs packages into `node_modules/` so `npx quartz` can run.

Troubleshooting:
- Use `npm ci` for reproducible installs in CI environments.
- If dependency errors appear, try `npm cache clean --force` or `npm install --legacy-peer-deps`.
- Don’t commit `node_modules/` — add it to `.gitignore`.

---
title: Server troubleshooting
date-created: '2026-01-29'
---

# Server Troubleshooting

If a locally served Quartz preview or Open WebUI refuses to respond, these quick checks save time:

1. **Confirm which port each service uses**
   - Quartz now defaults to `--port 8090` for previews, while Open WebUI/LocalAI still listen on `8080`.
   - Use `pgrep -fl quartz` / `ps` if you need to track down the preview process, or run `lsof -iTCP:8090 -sTCP:LISTEN`.

2. **Stop the preview before starting LocalAI**
   - If `localai-start` reports that port `8080` is occupied, kill the Quartz preview with:
     ```bash
     kill $(lsof -ti tcp:8090)
     ```
   - Follow up with `localai-start` so Open WebUI gets sole access to `8080`.

3. **Force the browser to refresh stale Quartz pages**
   - Open `http://localhost:8080` after starting LocalAI and hit **Command + Shift + R** (or equivalent) to drop any cached Quartz preview that might still appear on that port.

4. **When you need to preview Quartz again**
   - Run `npm_config_cache=… npx quartz build --serve --port 8090` and browse to `http://localhost:8090`.
   - Stop the preview (`Ctrl+C` or `kill $(lsof -ti tcp:8090)`) before running `localai-start` so 8080 stays available.

Keeping this doc beside the blog ensures the repeatable workflow—Quartz on 8090, LocalAI on 8080—stays clear for future editing sessions.
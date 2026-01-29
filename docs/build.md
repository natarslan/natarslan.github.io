---
title: "Building your Quartz"
---

Once you've [[index#🪴 Get Started|initialized]] Quartz, let's see what it looks like locally:

```bash
npx quartz build --serve
```

This will start a local web server to run your Quartz on your computer. By default, the preview server now listens at `http://localhost:8090/`; pass `--port` if you want to use a different port.

> [!hint] Flags and options
> For full help options, you can run `npx quartz build --help`.
>
> Most of these have sensible defaults but you can override them if you have a custom setup:
>
> - `-d` or `--directory`: the content folder. This is normally just `content`
> - `-v` or `--verbose`: print out extra logging information
> - `-o` or `--output`: the output folder. This is normally just `public`
> - `--serve`: run a local hot-reloading server to preview your Quartz
> - `--port`: what port to run the local preview server on
> - `--concurrency`: how many threads to use to parse notes

> [!warning] Not to be used for production
> Serve mode is intended for local previews only.
> For production workloads, see the page on [[hosting]].

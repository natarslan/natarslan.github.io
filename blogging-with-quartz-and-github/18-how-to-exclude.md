# 18 — How to exclude a file or folder from Quartz

This explains how to exclude specific files or folders from Quartz' input set by adding patterns to `configuration.ignorePatterns` in `quartz.config.ts`, plus exact terminal commands to edit, commit, and verify the change.

Notes:
- Quartz crawls the `content/` folder, so patterns should match the symlinked paths (e.g., `travel-nature/**`, not `posts/travel-nature/**`).
- Paths and globs are relative to the repo root.
- Use forward slashes `/` on macOS. Standard glob syntax (`*`, `**`) works.

A. Where to add ignore patterns

Open `quartz.config.ts` and find the `configuration.ignorePatterns` array. Add your patterns there (strings). Example section (showing new entries):

```ts
configuration: {
  // ...
  ignorePatterns: [
    "private",
    "templates",
    ".obsidian",
    // Add project-specific ignore patterns below:
    "code/1984MinersStrikeHeat/_pitch",
    "fiction/Haiku What We Leave Behind/_chatgpt dalle image prompt.md",
    "code/miners-strike/_output/**"
  ],
  // ...
},
```

B. Example patterns for your three cases (exact strings to add)

- Exclude only the single file `_pitch` inside `1984MinersStrikeHeat` (keep other files in that folder):  
  `code/1984MinersStrikeHeat/_pitch`

- Exclude the single file with spaces:  
  `fiction/Haiku What We Leave Behind/_chatgpt dalle image prompt.md`

- Exclude the entire `_output` folder and everything under it:  
  `code/miners-strike/_output/**`

Remember: you are matching paths as Quartz sees them under `content/`, so omit the `posts/` prefix.

C. Exact terminal steps (copy-paste)

1) Change to the repo root:

```bash
cd /Users/narslan/Desktop/starbase/blog
```

2) Open the config in your editor (edit `ignorePatterns` as shown above):

```bash
code quartz.config.ts
# or use your editor: vim/qu, etc.
```

3) After saving the change, stage, commit and push:

```bash
cd /Users/narslan/Desktop/starbase/blog
git add quartz.config.ts
git commit -m "chore: add project ignorePatterns (exclude specific files/folders)"
git push origin main
```

4) Rebuild locally to verify the excluded files/folders are not processed (use short npm cache to avoid ENAMETOOLONG):

```bash
cd /Users/narslan/Desktop/starbase/blog
npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8090
# or just build:
# npm_config_cache=/tmp/npm-cache npx quartz build
```

Watch the build logs. Quartz prints which files it finds and emits; confirm the paths you added do not appear in the "Found X input files" list or are omitted from emitted content.

D. Quick troubleshooting

- If your pattern didn't work, use a more specific or more general glob: prefix with `**/` to match anywhere, e.g. `**/1984MinersStrikeHeat/_pitch`.
- If a file still shows up, ensure it is not already emitted as a copied static asset by a plugin; the `Assets()` emitter copies non-Markdown files based on other patterns (but the code uses `ignorePatterns` when globbying assets too).
- To temporarily test ignoring a single file without editing config, rename the file (e.g., add `.bak`) and run a build.

E. If you want to ignore files from Git only (not Quartz), add entries to `.gitignore`. Quartz will call `isGitIgnored()` to respect gitignore when scanning when `gitignore: true` is used; but editing `quartz.config.ts` `ignorePatterns` is the direct way to control what Quartz processes.

F. Summary checklist

- [ ] Edit `quartz.config.ts` -> add patterns to `configuration.ignorePatterns`
- [ ] Commit & push
- [ ] Run local build with `npm_config_cache=/tmp/npm-cache npx quartz build --serve --port 8090`
- [ ] Confirm excluded paths are no longer processed

If you want, I can (A) apply these exact edits to `quartz.config.ts` for you, (B) commit & push them, and (C) run a local build to confirm. Which should I do next?

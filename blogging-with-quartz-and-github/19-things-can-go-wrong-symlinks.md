# 19 — Things Can Go Wrong: Symlinks, Ignore Patterns & How to Fix

This guide explains common issues that can break your Quartz site, specifically related to symlinks and ignore patterns, and how to recover.

## The Setup: Why Symlinks?

Your `content/` folder uses **symlinks** (symbolic links) that point to your actual content in the `posts/` folder. For example:

```bash
content/code -> ../posts/code
content/craft-art -> ../posts/craft-art
content/photography -> ../posts/photography
# ... etc
```

This setup allows you to organize all your content in `posts/` while Quartz reads from `content/`. However, symlinks can break if:

1. **Ignore patterns are misconfigured** — using wrong paths (e.g., `content/posts/code/...` instead of `content/code/...`).
2. **Symlinks become corrupted or deleted** — accidentally removed or overwritten.
3. **Paths don't match your folder structure** — the actual content lives in `content/code/`, not `content/posts/code/`.

## What Happened: The Broken Site Issue

**Symptoms:**
- Only the home page displays; other pages show nothing (e.g., `/craft-art/map-embroidery/` returns blank).
- Build output shows very few files parsed (e.g., "Found 10 input files" instead of 28).
- Symlinks in `content/` are broken or deleted.

**Root Cause:**
Incorrect ignore patterns combined with symlink traversal caused Quartz to skip critical files. When the symlinks got corrupted, the site lost access to all content.

## How to Diagnose

Check the status of symlinks in your `content/` folder:

```bash
cd /Users/narslan/Desktop/starbase/blog
find content -type l -ls
```

Expected output should show symlinks like:
```
content/code -> ../posts/code
content/craft-art -> ../posts/craft-art
content/photography -> ../posts/photography
```

If the output is empty or shows broken links, the symlinks need to be recreated.

## How to Fix: Recreate Symlinks

### Step 1: Remove broken symlinks

```bash
cd /Users/narslan/Desktop/starbase/blog/content
rm -f code craft-art fiction geospatial photography productivity tools attachments travel-nature
```

### Step 2: Recreate all necessary symlinks (excluding ignored folders)

```bash
cd /Users/narslan/Desktop/starbase/blog/content
ln -s ../posts/code code
ln -s ../posts/craft-art craft-art
ln -s ../posts/fiction fiction
ln -s ../posts/geospatial geospatial
ln -s ../posts/photography photography
ln -s ../posts/productivity productivity
ln -s ../posts/tools tools
ln -s ../posts/attachments attachments
ln -s ../posts/travel-nature travel-nature
```

**Important:** Do NOT create a symlink for `ignored-notes`:
```bash
# Do NOT run this:
# ln -s ../posts/ignored-notes ignored-notes
```

Ignored folders should only exist in `posts/` and be referenced in `quartz.config.ts` ignore patterns.

### Step 3: Verify symlinks are correct

```bash
cd /Users/narslan/Desktop/starbase/blog
find content -type l -ls
```

All symlinks should point to `../posts/...` with current timestamps (not old/stale).

### Step 4: Clean and rebuild locally

```bash
cd /Users/narslan/Desktop/starbase/blog
rm -rf public .quartz-cache
npm run build
```

You should see output like:
```
Found 10 input files from `content` in 10ms
Parsed 10 Markdown files in 122ms
Emitted 165 files to `public` in 172ms
```

### Step 5: Commit and push

```bash
cd /Users/narslan/Desktop/starbase/blog
git add -A
git commit -m "fix: recreate symlinks in content folder to restore functionality"
git push origin main
```

GitHub Actions will rebuild and redeploy your site. Check your live site in 1–2 minutes.

## Configuring Ignore Patterns Correctly

When setting `ignorePatterns` in `quartz.config.ts`, use **content-relative paths**, not `posts/` paths:

**Correct:**
```typescript
ignorePatterns: [
  "content/code/miners-strike/**",        // ✓ Correct
  "content/geospatial/umearally2025/**",  // ✓ Correct
  "content/photography/_tips to publish photos.md",
],
```

**Incorrect:**
```typescript
ignorePatterns: [
  "content/posts/code/miners-strike/**",        // ✗ Wrong path
  "content/posts/geospatial/umearally2025/**",  // ✗ Wrong path
  "posts/code/miners-strike/**",                // ✗ Wrong context
],
```

The reason: Quartz reads from `content/`, so patterns should match what's visible under `content/` after symlink traversal.

## Best Practices to Avoid Symlink Issues

1. **Never manually edit symlinks unless you know what you're doing.**
   - If you need to rename or reorganize, do it in the `posts/` folder and recreate symlinks.

2. **Always verify symlinks after git operations.**
   - Git tracks symlinks as files, not links. After pulling or switching branches, check:
     ```bash
     find content -type l -ls
     ```

3. **Keep `ignored-notes` (or other ignored folders) in `posts/` only.**
   - Add the ignore pattern to `quartz.config.ts` — don't create a symlink.

4. **Test locally before pushing.**
   - Run `npm run build` and check the output. Ensure the file count makes sense and no critical content is filtered out.

5. **Document your ignore patterns.**
   - In `quartz.config.ts`, add comments explaining which folders are ignored and why.

## Troubleshooting Checklist

- [ ] Run `find content -type l -ls` to verify symlinks exist and point to the right places.
- [ ] Check `quartz.config.ts` — ensure ignore patterns use `content/...` paths, not `posts/...`.
- [ ] Run `npm run build` locally and verify the file count is reasonable (should be > 10 files).
- [ ] If the build still shows few files, check for broken ignore patterns or missing content.
- [ ] Commit and push the symlinks; GitHub Actions will rebuild and redeploy.

## Quick Reference: One-Liner to Recreate All Symlinks

```bash
cd /Users/narslan/Desktop/starbase/blog/content && \
rm -f code craft-art fiction geospatial photography productivity tools attachments travel-nature && \
ln -s ../posts/{code,craft-art,fiction,geospatial,photography,productivity,tools,attachments,travel-nature} .
```

Then clean, build, commit, and push as described in Step 4–5 above.

---

**Remember:** Symlinks are powerful but can be fragile. If something breaks, the fix is usually to remove and recreate them cleanly, then rebuild.

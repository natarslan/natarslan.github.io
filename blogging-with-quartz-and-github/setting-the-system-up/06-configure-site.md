---
title: 06 – Configure the site (quartz.config.ts)
---

# Step 06 – Set up basic site information

## What you’ll do
1. Open the file `quartz.config.ts` in VS Code (or any editor).
2. Find the section that looks like this (the exact keys may vary):
   ```ts
   export const quartzConfig = {
     pageTitle: "My Quartz Site",
     baseUrl: "https://your-username.github.io",
     // …other options…
   };
   ```
3. Replace the placeholder values:
   * **`pageTitle`** – the title that appears in the browser tab and search results.
   * **`baseUrl`** – the full address where the site will live. Use the URL from Step 01, e.g. `https://natarslan.github.io`.
4. Save the file.

## Why this matters
* `quartz.config.ts` tells Quartz **where** the site will be published and what metadata to embed in each page (title, description, etc.).
* If the `baseUrl` is wrong, links inside the site may point to the wrong location or break when deployed.

## Key terms explained
* **Configuration file** – a file that stores settings for a program.
* **`ts` extension** – a TypeScript file; it is compiled to JavaScript when Quartz runs.
* **`export const`** – a way to make a variable (`quartzConfig`) available to other parts of the program.

## What you’ll see after this step
* The file is saved with your custom site title and URL.
* When you run a build later (`npm run build`), the generated HTML pages will contain the correct title and links.

---

Next, we’ll link your Obsidian notes to Quartz in **Step 07 – Connect your content**.

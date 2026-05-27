---
title: 05 – Install Node dependencies (npm install)
---

# Step 05 – Install the JavaScript packages Quartz needs

## What you’ll do
1. Make sure you are still inside the repository folder (the one you cloned in Step 03).
2. Run the npm install command:
   ```bash
   npm install
   ```
   *This reads the `package.json` file and downloads every library listed under `dependencies` and `devDependencies` into a folder called `node_modules`.*

## Why this matters
* Quartz is written in **TypeScript/JavaScript** and relies on many third‑party libraries (e.g., `preact`, `sharp`). Those libraries are not stored in the repo – they are fetched from the npm registry each time you run `npm install`.
* Without these packages the `quartz` command would fail with “module not found” errors.

## Key terms explained
* **npm** – the Node Package Manager; it downloads code packages from the public npm registry.
* **`package.json`** – a manifest that lists the project’s dependencies and scripts.
* **`node_modules`** – a folder that holds all the downloaded libraries; you normally do **not** commit this folder to Git.

## What you’ll see after this step
* The terminal prints a long list of packages being fetched and installed.
* When it finishes you will have a new folder `node_modules/` and a file `package-lock.json`.
* Running `npm install` again later will be fast because the packages are cached locally.

---

Now that the dependencies are installed, move on to **Step 06 – Configure the site settings**.

---
title: 10 – Push the site to GitHub and trigger deployment
---

# Step 10 – Send your site to GitHub so GitHub Pages can publish it

## What you’ll do
1. **Add** all the new and changed files to the Git index:
   ```bash
   git add .
   ```
2. **Commit** with a clear message:
   ```bash
   git commit -m "chore: initial Quartz site setup"
   ```
3. **Push** the commit to the remote repository (the `main` branch is the default for GitHub Pages):
   ```bash
   git push origin main
   ```
   *If you set up a PAT in Step 09, this push will succeed without further prompts.*
4. **Check the GitHub Actions workflow** (if the repo includes a `.github/workflows/` file). Go to the **Actions** tab on GitHub and watch the build run. When it finishes, the site will be live at the URL you set in `baseUrl`.

## Why this matters
* **Pushing** transfers your local changes to the remote repository on GitHub.
* The repository contains a **GitHub Actions** workflow that automatically runs `npx quartz build` and publishes the generated `public/` folder to GitHub Pages.
* Once the workflow succeeds, anyone can view your site at `https://your-username.github.io`.

## Key terms explained
* **Commit** – a snapshot of your project at a point in time; it records what changed.
* **Push** – sending your commits to the remote repository so others (and GitHub) can see them.
* **GitHub Actions** – an automated CI/CD system that runs scripts (like building the site) whenever you push.
* **Workflow** – a YAML file in `.github/workflows/` that defines the steps GitHub Actions will execute.

## What you’ll see after this step
* The terminal prints something like:
   ```
   Enumerating objects: 42, done.
   Counting objects: 100% (42/42), done.
   Delta compression using up to 8 threads
   Compressing objects: 100% (30/30), done.
   Writing objects: 100% (42/42), 12.34 KiB | 12.34 MiB/s, done.
   Total 42 (delta 12), reused 0 (delta 0)
   remote: Resolving deltas: 100% (12/12), done.
   To https://github.com/your-username/your-username.github.io.git
      abc1234..def5678  main -> main
   ```
* In the GitHub UI, the **Actions** tab shows a running workflow. When it finishes with a green check, your site is live.
* Visiting `https://your-username.github.io` (or the `baseUrl` you set) displays the home page you built.

---

You’ve now completed the full end‑to‑end setup! If you want a quick recap, see the **00‑entire‑workflow.md** index file.

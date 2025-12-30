# Your Ongoing Quartz Blog Workflow — Directory Structure & File Organization

This guide summarizes how to organize folders, files, frontmatter, images, and commands for an ongoing Quartz blog workflow.

## Adding New Folders
Commands:
```bash
cd ~/Desktop/starbase/blog
mkdir -p content/new-category
mkdir -p content/projects
mkdir -p content/notes
```

## File Naming and Conventions
- Use descriptive names with hyphens: `my-travel-blog.md`.
- Avoid spaces and special characters in filenames.
- Recommended folder layout:
```
content/
  attachments/
    images/
  travel/
    paris-2024.md
  projects/
    my-project.md
```

## YAML Frontmatter Template
Add this at the top of each publishable note:
```yaml
---
title: "Your Post Title"
date: 2024-01-15
tags:
  - travel
  - photography
categories:
  - blog
draft: false
description: "Brief description for SEO"
aliases:
  - alternative-title
---
```

## Images and Attachments
- Store images under `content/attachments/images` or a subfolder.
- Use Obsidian-style embedding or standard markdown:
```
![[image-name.jpg]]
![Alt text](attachments/images/image-name.jpg)
```

## Daily Workflow Commands
```bash
# Test locally
npx quartz build --serve --port 8080
# Stage changes
git add content/travel/paris-2024.md content/attachments/images/paris.jpg
git commit -m "feat: add Paris post"
git push origin main
```

## Best Practices
1. Test locally before pushing.
2. Keep commits focused and descriptive.
3. Organize images by topic.
4. Add `date` in frontmatter to ensure correct chronology.


# Your Ongoing Quartz Blog Workflow

#obsidian #blogging

## 🗂️ **Directory Structure & File Organization**

### Adding New Folders
```bash
cd ~/Desktop/starbase/blog
mkdir content/new-category
# or
mkdir content/projects
mkdir content/notes
```

### File Naming Convention
- Use descriptive names: `my-travel-blog.md`
- Avoid spaces in filenames (use hyphens or underscores)
- Keep folder structure logical: `content/travel/`, `content/tech/`, etc.

## 📝 **Creating New Markdown Files**

### YAML Frontmatter Template
```yaml
---
title: "Your Post Title"
date: 2024-01-15
tags:
  - travel
  - photography
  - personal
categories: 
  - blog
draft: false
description: "Brief description for SEO"
aliases:
  - alternative-title
---
```

### Basic Markdown Structure
```markdown
---
title: "My Travel Experience"
date: 2024-01-15
tags: [travel, europe, photography]
---

# Your Content Here

## Subheading

Your content with [[Internal Links]] to other notes.

![[image-name.jpg]]

#tag #another-tag
```

## 🔗 **Connecting Files for Graph View**

### Internal Links (Wikilinks)
```markdown
[[File Name Without Extension]]
[[folder/file-name]]
[[File Name|Custom Display Text]]
```

### Examples
```markdown
# Link to other posts
See my previous post on [[travel-tips]].

# Link with custom text
Check out [[complex-filename|this amazing guide]].

# Link to files in other folders
Related: [[projects/my-portfolio]]
```

## 🖼️ **Adding and Displaying Images**

### 1. Organize Your Images
```bash
# Create attachments folder
mkdir -p content/attachments/images
mkdir -p content/attachments/documents
```

### 2. Image Syntax Options
```markdown
# Quartz/Obsidian style (recommended)
![[image-name.jpg]]
![[folder/image-name.png]]

# With size control
![[image-name.jpg|300]]
![[image-name.jpg|300x200]]

# Standard Markdown (alternative)
![Alt text](attachments/images/image-name.jpg)
![Alt text](../attachments/images/image-name.jpg)
```

### 3. Image Organization
```
content/
├── attachments/
│   ├── images/
│   │   ├── travel/
│   │   ├── projects/
│   │   └── general/
│   └── documents/
├── travel/
│   └── my-trip.md
└── projects/
    └── my-project.md
```

## 🏷️ **Tagging System**

### Inline Tags
```markdown
#travel #europe #photography #food

#project/web-dev #project/completed
#note/permanent #note/literature
```

### YAML Tags
```yaml
tags:
  - travel
  - europe
  - photography
  - personal-experience
```

### Tag Hierarchy (use `/` for organization)
```markdown
#area/personal
#area/work
#project/active
#project/completed
#status/draft
#status/published
```

## 🚀 **Commands to Run After Each Change**

### Daily Workflow
```bash
# Navigate to your blog directory
cd ~/Desktop/starbase/blog

# Test locally (optional but recommended)
npx quartz build --serve --port 8080
# Check http://localhost:8080, then Ctrl+C to stop

# Add all new changes
git add .

# Commit with descriptive message
git commit -m "Add new travel post with images"

# Push to deploy
git push origin main
```

### For Major Changes
```bash
# If you've added many new folders/files
git add .
git status  # Review what you're adding
git commit -m "Reorganize content structure and add new categories"
git push origin main
```

## 📋 **Quick Reference Commands**

```bash
# Create new post
touch content/travel/paris-2024.md

# Add images
cp ~/Downloads/paris-photo.jpg content/attachments/images/travel/

# Test locally
npx quartz build --serve --port 8080

# Deploy changes
git add . && git commit -m "Add Paris travel post" && git push origin main

# Check deployment
# Visit: https://github.com/natarslan/natarslan.github.io/actions
# Then: https://natarslan.github.io
```

## 🎯 **Best Practices**

1. **Always test locally** before pushing to production
2. **Use descriptive commit messages** for easier tracking
3. **Organize images by topic/date** in subfolders
4. **Use consistent tagging** for better graph connections
5. **Link related posts** to build your knowledge graph
6. **Keep file names URL-friendly** (no spaces, special characters)

## 🔄 **Example Complete Workflow**

```bash
# 1. Create new post
touch content/tech/my-new-framework.md

# 2. Add content with your editor
code content/tech/my-new-framework.md

# 3. Add any images
cp ~/Desktop/screenshot.png content/attachments/images/tech/

# 4. Test locally
npx quartz build --serve --port 8080

# 5. Deploy
git add .
git commit -m "Add post about new framework with screenshots"
git push origin main

# 6. Check live site in ~2-5 minutes
# https://natarslan.github.io
```

Your site will automatically rebuild and deploy every time you push to the `main` branch! 🎉
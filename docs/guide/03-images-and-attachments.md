---
title: "03 — Images & attachments"
---

This file answers:

- Where to add new Markdown posts
- Where to add images / JPEGs / PDFs / other attachments
- How to link attachments from Markdown

## Where to put images/files (2 options)

### Option A (recommended): next to the post

Example:

- Post: `posts/travel-nature/winter-camping.md`
- Images: `posts/travel-nature/winter-camping/assets/fire.jpg`

Why this is good: everything for the post stays together, and links are short.

### Option B: shared attachments folder

Put shared images/files in:

- `posts/attachments/...`

Example:

- `posts/attachments/photos/2025-winter-camping/fire.jpg`

## How to link an image in Markdown

Quartz supports both:

### 1) Obsidian-style image embeds (recommended if you use Obsidian)

```md
![[attachments/photos/2025-winter-camping/fire.jpg]]
```

or if the file is next to the post:

```md
![[travel-nature/winter-camping/assets/fire.jpg]]
```

### 2) Standard Markdown links

```md
![Camp fire](attachments/photos/2025-winter-camping/fire.jpg)
```

If you store images next to the post, prefer a relative link:

```md
![Camp fire](winter-camping/assets/fire.jpg)
```

## How to link a PDF (download link)

```md
[Download the PDF](attachments/pdfs/my-file.pdf)
```

Next: [[04-preview-locally]]


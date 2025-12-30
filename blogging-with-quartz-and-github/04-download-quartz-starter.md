---
title: Step 04 – Download the Quartz starter project
---

# Download the Quartz starter project

Quartz is open source at https://github.com/jackyzha0/quartz and ships with a ready-to-go template.

1. Inside your `natarslan.github.io` folder, pull down Quartz:
   ```bash
   git clone https://github.com/jackyzha0/quartz.git .quartz-template
   ```
   This creates a temporary `.quartz-template` folder containing the starter files.
2. Copy the template files into your repo (excluding the template’s own `.git` so you do not nest repositories):
   ```bash
   rsync -av --exclude='.git' --exclude='content' .quartz-template/ .
   ```
3. Remove the temporary template folder:
   ```bash
   rm -rf .quartz-template
   ```

After these steps, your Pages repo now contains the Quartz source code, configuration files, and documentation, ready for customization.

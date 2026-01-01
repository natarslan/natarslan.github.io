---
title: 09 – Authenticate with GitHub (PAT or SSH)
---

# Step 09 – Let your computer talk to GitHub securely

## What you’ll do
1. **Create a Personal Access Token (PAT)** on GitHub:
   * Log in to GitHub, click your avatar → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
   * Give it a name like *"Quartz deploy token"*.
   * Select the scopes **`repo`** (full control of private/public repos) and **`workflow`** (to trigger GitHub Actions). You can leave the rest unchecked.
   * Click **Generate token** and **copy** the long string that appears – you will not see it again.
2. **Configure Git to use the token** for HTTPS pushes:
   ```bash
   # Replace <TOKEN> with the string you just copied
   git remote set-url origin https://<TOKEN>@github.com/your-username/your-username.github.io.git
   ```
   *Now every `git push` will authenticate using the token instead of prompting for a password.*
3. (Optional) **Set up SSH keys** if you prefer SSH over HTTPS:
   * Run `ssh-keygen -t ed25519 -C "your-email@example.com"` and follow the prompts.
   * Add the public key (`~/.ssh/id_ed25519.pub`) to GitHub under **Settings → SSH and GPG keys → New SSH key**.
   * Change the remote URL to the SSH form:
     ```bash
     git remote set-url origin git@github.com:your-username/your-username.github.io.git
     ```

## Why this matters
* GitHub disabled password authentication for pushes. A PAT or SSH key is required for any write operation (push, create a PR, etc.).
* Without proper authentication the `git push` step in the next guide will fail with *“remote: Invalid username or password”*.

## Key terms explained
* **Personal Access Token (PAT)** – a secret string that grants limited access to your GitHub account; think of it as a password for the command line.
* **Scope** – the permissions you give a token (e.g., `repo` lets you read/write repositories).
* **Remote** – the URL that points to the repository on GitHub; `origin` is the default name.
* **SSH key** – a cryptographic key pair used for secure, password‑less authentication.

## What you’ll see after this step
* Running `git remote -v` shows the remote URL now contains the token (or the SSH address).
* A test push (`git push origin main`) should succeed without asking for a password.

---

Now you’re ready to send your site to GitHub. Continue to **Step 10 – Push and deploy**.

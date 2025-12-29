tags: productivity, code
# **🔒 Password-Protected Private Journal in Blot (Using Dropbox & JavaScript)**

This guide walks you through setting up a **password-protected private journal** on **Blot**, using **Obsidian for writing** and **Dropbox for secure storage**.

✅ **Key Features:**

- **Journal entries stay private** (not published by Blot).
- **Password-protected journal page** (access required to load content).
- **Markdown properly formatted in Blot**.
- **Images work from anywhere in Obsidian** (via relative paths).

---

## **📌 Step 1: Understand the File Structure**

### **1.1 Two Separate Files for Journal and Webpage**

Blot treats files in different folders differently:

| **File**                                         | **Purpose**                                                                                                                         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/Users/Dropbox/MyBlog/_Journal/journal.md`  | **Main journal file** (where you write entries). **Blot will NOT upload this** since `_Journal` starts with `_`.                    |
| `/Users/Dropbox/MyBlog/Pages/NyJournal.md` | **Public Blot page** that runs JavaScript to fetch `journal.md` after password entry. **Blot publishes this as a standalone page**. |

---

## **📜 Step 2: Set Up the Journal File**

1. **Write your journal entries in Obsidian** in:
    
    ```
    /Users/Dropbox/MyBlog/_Journal/journal.md
    ```
    
2. Use **Markdown** as usual.
3. **Add images** using **relative paths** (e.g., if stored in `_attachments` folder):
    
    ```
    ![My Image](../_attachments/image.jpg)
    ```
    

### **🔹 Notes on Images**

- Blot won't upload `_attachments/`, but Obsidian can still reference them.
- The JavaScript will **correct relative paths automatically** when displaying the journal.

---

## **🔑 Step 3: Store the Password Securely**

### **3.1 Create the Password File**

4. Inside `_Journal`, create a file:
    
    ```
    /Users/Dropbox/MyBlog/_Journal/password.txt
    ```
    
5. Inside `password.txt`, write **only** your password:
    
    ```
    supersecret123
    ```
    
6. **Get a direct link** from Dropbox:
    - Right-click `password.txt` → **Copy Link**.
    - **Modify** the link to use `dl.dropboxusercontent.com`.
        
        ```
        https://dl.dropboxusercontent.com/s/YOUR_FILE_ID/password.txt
        ```
        

---

## **📜 Step 4: Create the Blot Page for Unlocking the Journal**

### **4.1 Open `NyJournal.md` in Obsidian**

- This is the file Blot will **publish as a public page**.
- Add the following **Markdown + JavaScript** to it:

```md
# Welcome to Your Journal

This journal is **password-protected**. Please enter the password to unlock.

<div id="container" style="display: none;">
    <div id="content"></div>
</div>

<script>
    async function getStoredPassword() {
        let passwordURL = "https://dl.dropboxusercontent.com/s/YOUR_FILE_ID/password.txt"; // Replace with your actual Dropbox link

        try {
            let response = await fetch(passwordURL);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            return (await response.text()).trim(); // Fetch password and remove spaces
        } catch (error) {
            console.error("Error fetching password:", error);
            alert("Could not verify password. Try again later.");
            return null;
        }
    }

    async function checkPassword() {
        let storedPassword = await getStoredPassword();
        if (!storedPassword) return; // Stop if password fetch fails

        let passcode = prompt("Enter PassCode");
        if (passcode === storedPassword) {
            alert("Access Granted!");
            document.getElementById("container").style.display = "block";
            fetchPrivateJournal();
        } else {
            alert("Incorrect Password");
            checkPassword(); // Retry if wrong
        }
    }

    async function fetchPrivateJournal() {
        let privateJournalURL = "https://dl.dropboxusercontent.com/s/YOUR_FILE_ID/journal.md?dl=1"; // Force download

        try {
            let response = await fetch(privateJournalURL);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            let text = await response.text();

            // Convert Markdown to HTML using marked.js
            document.getElementById("content").innerHTML = marked.parse(text);
        } catch (error) {
            console.error("Error loading journal:", error);
            document.getElementById("content").innerHTML = "<p>Error loading journal. Try again later.</p>";
        }
    }

    checkPassword();
</script>
```

---

## **🎨 Step 5: Improve Styling for Markdown Formatting**

Blot will **not** automatically style the loaded Markdown. To improve formatting, you can **add this CSS** to `NyJournal.md`:

```html
<style>
    body {
        font-family: Arial, sans-serif;
        max-width: 700px;
        margin: auto;
        padding: 20px;
    }
    #container {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    }
    pre, code {
        background: #eee;
        padding: 5px;
        border-radius: 4px;
    }
</style>
```

---

## **🚀 Step 6: Test Everything**

### ✅ **6.1 Check Password Protection**

1. Visit **your Blot journal page** (`yourblog.com/NyJournal`).
2. A **password prompt** should appear.
3. **Enter the correct password** from `password.txt`.
4. If correct → **Your journal should load!**
5. If incorrect → It **asks for the password again**.

### ✅ **6.2 Check Images**

- Ensure images display correctly using relative paths like:
    
    ```
    ![Example](../_attachments/photo.jpg)
    ```
    

### ✅ **6.3 Ensure Password is Secure**

- Right-click **→ View Page Source** on your Blot page.
- **Confirm:** The password **is NOT visible** in the HTML source code.

---

## **🎉 Done! You Now Have a Secure, Private Journal!**

### **🛠 Future Maintenance**

- **To change the password:**
    - Edit `password.txt` in Dropbox.
- **To update your journal:**
    - Edit `journal.md` in Obsidian.
- **To add images:**
    - Drop them in `_attachments/` and reference them with relative paths.

🚀 **Now you have a private, password-protected journal using Obsidian, Dropbox, and Blot!** 🚀

---

### **🔹 Troubleshooting**

❌ **Password not working?**

- Ensure `password.txt` is in `_Journal/` and its Dropbox link uses `dl.dropboxusercontent.com`.

❌ **Journal not loading?**

- Check that `journal.md` is accessible via `dl.dropboxusercontent.com?dl=1`.

❌ **Images not showing?**

- Ensure they’re in `_attachments/` and use relative paths.


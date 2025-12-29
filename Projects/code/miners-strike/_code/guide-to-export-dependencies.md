# 📦 Python Dependency Management Guide: Export & Reinstall  

This guide will walk you through exporting your Python project's dependencies and later reinstalling them in another environment.  

---

## 🔍 **Prerequisites**  
- Python installed (3.6+)  
- `pip` installed (Python's package manager)  
- A Python project with dependencies  

---

## 📤 **Step 1: Exporting Dependencies**  

### **Option 1: Using `pip freeze` (Basic Method)**  
This generates a list of all installed packages in the current environment.  

```bash
pip freeze > requirements.txt
```  
- `requirements.txt` will contain all packages with exact versions.  
- Example output:  
  ```text
  numpy==1.24.3
  pandas==2.0.2
  requests==2.28.2
  ```  

### **Option 2: Using `pipreqs` (Project-Specific Dependencies Only)**  
If you only want dependencies **actually used** in your project (not everything installed in the environment):  

1. Install `pipreqs`:  
   ```bash
   pip install pipreqs
   ```  
2. Generate `requirements.txt` from your project directory:  
   ```bash
   pipreqs /path/to/project-folder --force
   ```  
   - This scans `.py` files for imports.  
   - `--force` overwrites an existing `requirements.txt`.  

---

## 📥 **Step 2: Reinstalling Dependencies in a New Environment**  

### **1. Create a New Virtual Environment (Recommended)**  
```bash
python -m venv myenv       # Create virtual env
source myenv/bin/activate  # On Linux/Mac
myenv\Scripts\activate     # On Windows (Cmd)
```  

### **2. Install Dependencies from `requirements.txt`**  
```bash
pip install -r requirements.txt
```  
- This installs all packages with the exact versions listed.  

### **3. Verify Installed Packages**  
```bash
pip list
```  
or  
```bash
pip freeze
```  

---

## 🛠 **Bonus: Handling Different Environments (Dev vs. Prod)**  

### **Separate `requirements-dev.txt` for Development Tools**  
1. Export main dependencies:  
   ```bash
   pip freeze | grep -v "@" > requirements.txt
   ```  
2. Export dev-only dependencies (e.g., `pytest`, `black`):  
   ```bash
   pip freeze | grep -E "pytest|black|flake8" > requirements-dev.txt
   ```  
3. Install production + dev dependencies:  
   ```bash
   pip install -r requirements.txt -r requirements-dev.txt
   ```  

---

## 🔄 **Alternative: Using `pipenv` or `poetry`**  

### **Using `pipenv`**  
1. Export:  
   ```bash
   pipenv lock -r > requirements.txt
   ```  
2. Reinstall:  
   ```bash
   pipenv install -r requirements.txt
   ```  

### **Using `poetry`**  
1. Export:  
   ```bash
   poetry export -f requirements.txt --output requirements.txt
   ```  
2. Reinstall:  
   ```bash
   poetry install
   ```  

---

## 🚨 **Common Issues & Fixes**  
- **"Package not found"**: Some packages may be platform-specific.  
  - Fix: Use `--no-deps` and manually install missing packages.  
- **Version conflicts**: Use `pip install --upgrade` or adjust versions in `requirements.txt`.  
- **Slow installs**: Use a mirror (`pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`).  

---

## ✅ **Final Checklist**  
✔ Export dependencies (`pip freeze` or `pipreqs`)  
✔ Store `requirements.txt` in your project  
✔ Reinstall in a fresh environment (`pip install -r requirements.txt`)  

Now you can easily share your project with others! 🎉
# How to Rename Your GitHub Repository

## Steps to Rename Repository to `alroshdi.github.io`

This will give you the simple URL: **https://alroshdi.github.io**

### Step 1: Rename on GitHub

1. Go to your repository: https://github.com/alroshdi/hajeralroshdi.github.io
2. Click on **Settings** (top right of the repository page)
3. Scroll down to the **Repository name** section
4. Change the name from `hajeralroshdi.github.io` to `alroshdi.github.io`
5. Click **Rename**

### Step 2: Update Local Git Remote

After renaming on GitHub, run these commands in your terminal:

```bash
git remote set-url origin https://github.com/alroshdi/alroshdi.github.io.git
```

### Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages** in your repository
2. Under **Source**, select **Deploy from a branch**
3. Select branch: **main**
4. Select folder: **/ (root)**
5. Click **Save**

### Step 4: Wait for Deployment

GitHub Pages will automatically deploy your site. It may take 5-10 minutes.

Your site will be available at: **https://alroshdi.github.io**

---

## Alternative: Use a Custom Name

If you prefer a different name like `portfolio`:
- Repository name: `portfolio`
- URL will be: `https://alroshdi.github.io/portfolio`
- Update the remote: `git remote set-url origin https://github.com/alroshdi/portfolio.git`

---

**Note:** Make sure your repository is public for free GitHub Pages hosting.



# GitHub Pages Deployment Guide

This guide will help you deploy your Text Styles Calculator to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project code ready to push

## Method 1: Automated Deployment with GitHub Actions (Recommended)

### Step 1: Update the Homepage URL

1. Open `package.json`
2. Update the `homepage` field with your actual GitHub username and repository name:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```
   Replace `yourusername` with your GitHub username and `your-repo-name` with your repository name.

### Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `text-styles-calculator`)
3. Don't initialize with README, .gitignore, or license (since we already have code)

### Step 3: Initialize Git and Push to GitHub

Run these commands in your project directory:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click on **Settings**
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Save the settings

### Step 5: Trigger Deployment

Your site will automatically deploy when you push to the main branch. The GitHub Actions workflow has been set up for you.

After the workflow completes (check the "Actions" tab), your site will be live at:
```
https://yourusername.github.io/your-repo-name
```

## Method 2: Manual Deployment with gh-pages

If you prefer manual deployment instead of automatic:

### Step 1: Follow steps 1-3 from Method 1

### Step 2: Deploy Manually

Run this command in your project directory:

```bash
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the build files to that branch

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **gh-pages** and **/ (root)**
4. Click Save

Your site will be live at `https://yourusername.github.io/your-repo-name` in a few minutes.

## Updating Your Site

### For Automated Deployment (Method 1):
Simply push changes to the main branch:
```bash
git add .
git commit -m "Update site"
git push
```

### For Manual Deployment (Method 2):
Run the deploy command:
```bash
npm run deploy
```

## Troubleshooting

### Issue: 404 Page Not Found
- Make sure the `homepage` in `package.json` matches your GitHub Pages URL exactly
- Verify that the repository name and username are correct
- Wait a few minutes after deployment for changes to propagate

### Issue: Blank Page
- Check the browser console for errors
- Ensure all resource paths are correct
- Verify the `homepage` URL in `package.json` is correct

### Issue: GitHub Actions Workflow Fails
- Check the Actions tab for error messages
- Ensure you've selected "GitHub Actions" as the source in Pages settings
- Verify all dependencies are in package.json

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Enable custom domain in repository Settings → Pages

## Notes

- The deployment includes all files from the `build` folder
- Environment variables should be prefixed with `REACT_APP_` to work in production
- The site uses client-side routing, so GitHub Pages will handle it correctly

## Support

For more information, visit:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Deployment Guide](https://create-react-app.dev/docs/deployment/)


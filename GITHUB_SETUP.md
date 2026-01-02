# GitHub Release Setup Guide

## Step 1: Push Code to GitHub

```bash
cd /home/vishnu/Desktop/per

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Permission Management System v2.0.0"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Create GitHub Release

1. Go to your GitHub repository
2. Click **Releases** on the right sidebar
3. Click **Draft a new release**
4. Fill in:
   - **Tag version:** `v2.0.0`
   - **Release title:** `MITS CSE AIML Permission System v2.0.0`
   - **Description:**
   ```
   Release Notes for v2.0.0
   
   - Font style updated to Poppins/Inter
   - All apps updated to v2.0.0
   - Web version: permissions.onrender.com
   - Student & Faculty apps with improved UI
   
   ## Downloads
   - Student App (com.aiml.permissions)
   - Faculty App (com.aiml.faculty)
   ```

5. Click **Attach binaries** or drag & drop:
   - `student-app-v2.0.0.apk` (56.4 MB)
   - `faculty-app-v2.0.0.apk` (52.8 MB)

6. Click **Publish release**

## Step 3: Get Download URLs

After uploading, GitHub will generate URLs like:
```
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/student-app-v2.0.0.apk
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/faculty-app-v2.0.0.apk
```

## Step 4: Update script.js

Replace `YOUR_USERNAME/YOUR_REPO` in [script.js](script.js) with your actual GitHub details:

```javascript
const APP_CONFIG = {
    student: {
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/student-app-v2.0.0.apk',
        ...
    },
    faculty: {
        downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v2.0.0/faculty-app-v2.0.0.apk',
        ...
    }
};
```

Then commit and push:
```bash
git add script.js
git commit -m "Update GitHub download URLs"
git push
```

## Step 5: Deploy to Render

1. Push to GitHub (above)
2. Go to [render.com](https://render.com)
3. Connect your GitHub repo
4. Deploy as Static Site
5. Access at `permissions.onrender.com`

## Download Links Format

Each release asset gets a download link:
- Format: `https://github.com/{owner}/{repo}/releases/download/{tag}/{filename}`
- Example: `https://github.com/your-name/permissions/releases/download/v2.0.0/student-app-v2.0.0.apk`

## Files to Upload to Release

1. **student-app-v2.0.0.apk** - 56.4 MB
   - Source: `mits_permissions/build/app/outputs/flutter-apk/app-release.apk`
   - Package: `com.aiml.permissions`

2. **faculty-app-v2.0.0.apk** - 52.8 MB
   - Source: `permission_checker_faculty_cr/build/app/outputs/flutter-apk/app-release.apk`
   - Package: `com.aiml.faculty`

3. (Optional) **hod-app-v2.0.0.apk** - if you want to keep it
   - Source: `mits_hod/build/app/outputs/flutter-apk/app-release.apk`
   - Package: `com.aiml.hod`

## Website Deployment Checklist

- ✓ Update script.js with GitHub URLs
- ✓ Create GitHub release with APKs
- ✓ Deploy website to Render.com
- ✓ Test download buttons
- ✓ Verify APK installations

## Support

For issues with GitHub releases:
- Check file sizes are reasonable (not 0 bytes)
- Verify download URLs are correct
- Test on mobile device
- Check network connectivity

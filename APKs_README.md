# APK Files Directory

This directory contains the APK files for the MITS CSE AIML Permission Management System.

## Files

### Student App
- **File:** `mits_permissions-release.apk`
- **Package:** `com.aiml.permissions`
- **Size:** ~56.4 MB
- **Location:** `mits_permissions/build/app/outputs/flutter-apk/app-release.apk`

### Faculty App
- **File:** `mits_faculty-release.apk`
- **Package:** `com.aiml.faculty`
- **Size:** ~52.8 MB
- **Location:** `permission_checker_faculty_cr/build/app/outputs/flutter-apk/app-release.apk`

### HOD App
- **File:** `mits_hod-release.apk`
- **Package:** `com.aiml.hod`
- **Size:** ~48.5 MB
- **Location:** `mits_hod/build/app/outputs/flutter-apk/app-release.apk`

## How to Upload APKs

### Option 1: GitHub Releases

1. Go to your repository on GitHub
2. Click on "Releases" → "Create a new release"
3. Tag version (e.g., `v1.0.0`)
4. Add release notes
5. Attach APK files
6. Publish release

Then update the download links in `script.js`:

```javascript
const APP_CONFIG = {
    student: {
        downloadUrl: 'https://github.com/yourrepo/releases/download/v1.0.0/mits_permissions-release.apk',
        ...
    },
    faculty: {
        downloadUrl: 'https://github.com/yourrepo/releases/download/v1.0.0/mits_faculty-release.apk',
        ...
    },
    hod: {
        downloadUrl: 'https://github.com/yourrepo/releases/download/v1.0.0/mits_hod-release.apk',
        ...
    }
};
```

### Option 2: Firebase Hosting

1. Set up Firebase project
2. Upload APKs to Firebase Storage
3. Generate download links
4. Update `script.js` with Firebase URLs

### Option 3: AWS S3

1. Create S3 bucket
2. Upload APKs
3. Generate shareable links
4. Update `script.js` with S3 URLs

## Installation Instructions

1. Enable "Unknown Sources" in Android Settings → Security
2. Download APK from the website
3. Open Downloads folder
4. Tap the APK file to install
5. Grant permissions when prompted
6. Launch the app

## Versioning

- Keep APKs organized by version (e.g., `v1.0.0/`, `v1.1.0/`)
- Update version numbers in `script.js` when releasing new versions
- Keep a CHANGELOG documenting updates

## Security

- Always verify APKs are signed with proper certificates
- Test APKs on multiple devices before releasing
- Keep APK download links secure
- Monitor download statistics

## Support

For installation issues:
- Check Android version compatibility
- Verify APK is not corrupted
- Clear app cache and try again
- Contact support if problems persist

# Installation Guide

## Quick Start

### 1. Install a Userscript Manager

First, you need to install a userscript manager extension. Choose one based on your browser:

#### For Chrome/Edge/Brave
- **Violentmonkey** (Recommended): [Chrome Web Store](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- **Tampermonkey**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojp/overview)

#### For Firefox
- **Violentmonkey** (Recommended): [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
- **Tampermonkey**: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Greasemonkey**: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

#### For Safari
- **Userscripts**: [App Store](https://apps.apple.com/us/app/userscripts/id1463298887)

### 2. Install the Script

#### Method 1: Direct Installation (Easiest)
1. Click this link: [microsoft-rewards-auto-search.user.js](https://raw.githubusercontent.com/u5720002/572/main/microsoft-rewards-auto-search.user.js)
2. Your userscript manager will detect the script and show an installation page
3. Click **"Install"** or **"Confirm Installation"**

#### Method 2: Manual Installation
1. Download the `microsoft-rewards-auto-search.user.js` file
2. Open your userscript manager dashboard
3. Click the "+" button or "Add new script"
4. Copy and paste the script content
5. Save the script

#### Method 3: From GitHub
1. Go to the [repository](https://github.com/u5720002/572)
2. Click on `microsoft-rewards-auto-search.user.js`
3. Click the "Raw" button
4. Your userscript manager will prompt for installation

### 3. Verify Installation

1. Click on your userscript manager icon in the browser toolbar
2. You should see "Microsoft Rewards Auto Search" listed
3. Make sure it's enabled (toggle should be on/green)

### 4. Test the Script

1. Go to [Bing.com](https://www.bing.com)
2. You should see a purple panel in the top-right corner
3. The panel shows "MS Rewards Auto Search" with buttons

## Mobile Installation

### Android (Firefox)

1. **Install Firefox for Android**
   - Download from [Google Play Store](https://play.google.com/store/apps/details?id=org.mozilla.firefox)

2. **Install Violentmonkey**
   - Open Firefox on your Android device
   - Go to Menu > Add-ons
   - Search for "Violentmonkey"
   - Tap "Add to Firefox"

3. **Install the Script**
   - Open the script URL in Firefox mobile
   - Violentmonkey will prompt you to install
   - Tap "Install"

4. **Use the Script**
   - Go to Bing.com
   - The control panel will appear
   - Tap "Start Mobile" to run mobile searches

### iOS (Safari)

1. **Install Userscripts App**
   - Download from App Store
   - Follow the app's setup instructions to enable Safari extension

2. **Install the Script**
   - Copy the script content
   - Open Userscripts app
   - Create new script
   - Paste and save

3. **Enable in Safari**
   - Go to Settings > Safari > Extensions
   - Enable Userscripts

## Troubleshooting Installation

### Script Manager Not Detecting Script

**Solution:**
1. Make sure the file has `.user.js` extension
2. Try opening the raw file URL directly
3. Check that your script manager is enabled

### Script Not Showing on Bing

**Solution:**
1. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
2. Check script manager to ensure script is enabled
3. Verify the match pattern includes `https://www.bing.com/*`
4. Check browser console for errors (F12)

### Script Manager Icon Not Visible

**Solution:**
1. Check if the extension is installed and enabled
2. Pin the extension to the toolbar
3. Try restarting your browser

### Permission Issues

**Solution:**
1. Grant necessary permissions when prompted
2. Check site permissions in browser settings
3. Ensure the script has access to Bing.com

## Updating the Script

### Automatic Updates (Violentmonkey/Tampermonkey)

1. Open your script manager dashboard
2. The script will auto-check for updates
3. Click "Update" when a new version is available

### Manual Update

1. Reinstall the script using the installation link
2. The new version will replace the old one
3. Refresh Bing.com to see changes

## Uninstallation

### To Remove the Script

1. Click your script manager icon
2. Find "Microsoft Rewards Auto Search"
3. Click the trash/delete icon
4. Confirm deletion

### To Remove Script Manager

1. Go to browser extensions/add-ons
2. Find your script manager
3. Click "Remove" or "Uninstall"

## Next Steps

After installation:
1. Visit [USAGE.md](USAGE.md) for detailed usage instructions
2. Check [README.md](README.md) for features and tips
3. Start earning Microsoft Rewards points!

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify you're using a compatible browser
3. Make sure you're on Bing.com when running the script
4. Try disabling other extensions that might conflict

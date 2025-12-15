# Installation Guide

## Step 1: Install a Userscript Manager

First, you need to install a userscript manager extension in your browser:

### For Chrome/Edge/Brave/Opera
1. Go to [Violentmonkey Chrome Web Store](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
2. Click "Add to Chrome" (or your browser name)
3. Confirm the installation

### For Firefox
1. Go to [Violentmonkey Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
2. Click "Add to Firefox"
3. Confirm the installation

### For Safari
1. Download and install [Userscripts Safari Extension](https://apps.apple.com/us/app/userscripts/id1463298887)

## Step 2: Install the Microsoft Rewards Auto Search Script

### Method 1: Direct Installation (Recommended)
1. Visit the raw file URL on GitHub
2. Your userscript manager will automatically detect the script
3. Click "Confirm installation" or "Install"

### Method 2: Manual Installation
1. Copy the entire contents of `microsoft-rewards-auto-search.user.js` from this repository
2. Open your userscript manager dashboard (click the extension icon)
3. Click the "+" button or "Create new script"
4. Delete any default content
5. Paste the copied script
6. Click "Save"

## Step 3: Verify Installation

1. Navigate to [Bing.com](https://www.bing.com)
2. You should see a control panel appear in the top-right corner
3. If you don't see it, check that:
   - The userscript manager is enabled
   - The script is enabled in the manager
   - You're on bing.com or www.bing.com

## Step 4: Start Using

1. Make sure you're logged into your Microsoft account
2. Visit [Bing.com](https://www.bing.com)
3. Click "Start" on the control panel
4. The script will automatically perform searches
5. Monitor progress via the progress bar
6. Wait for completion notification

## Configuration

### Accessing Settings
1. Click on the Violentmonkey/Tampermonkey icon in your browser toolbar
2. Find "Microsoft Rewards Auto Search" in the list
3. Click the script name to see the menu options

### Available Settings
- **Desktop Searches**: Number of searches for desktop mode (default: 30)
- **Mobile Searches**: Number of searches for mobile mode (default: 20)
- **Min Delay**: Minimum wait time between searches in ms (default: 3000)
- **Max Delay**: Maximum wait time between searches in ms (default: 8000)
- **Mobile Mode**: Toggle between desktop and mobile search quotas
- **Auto Start**: Automatically start when visiting Bing

### Recommended Settings
- Keep delays between 3-10 seconds to avoid detection
- Don't set desktop searches above 35 or mobile above 25
- Don't enable Auto Start unless you understand the implications

## Tips for Best Results

### Daily Usage
1. Run desktop searches once per day (usually 30 searches)
2. Switch to mobile mode and run again (usually 20 searches)
3. Space out your usage throughout the day if possible

### Avoiding Detection
- Use reasonable delays (3-8 seconds recommended)
- Don't run the script multiple times in quick succession
- Vary your usage times
- Don't exceed Microsoft's daily limits

### Troubleshooting Common Issues

**Script not working:**
- Clear browser cache and cookies
- Disable other userscripts temporarily
- Make sure you're logged into Microsoft account
- Check that Microsoft Rewards is available in your region

**Progress resets:**
- This is normal - each search loads a new page
- The script maintains state in localStorage
- Progress is tracked internally

**Searches count not updating on Microsoft:**
- Wait a few minutes for Microsoft to update
- Some searches may not count if done too quickly
- Check your Rewards dashboard after completion

## Uninstallation

1. Open your userscript manager dashboard
2. Find "Microsoft Rewards Auto Search"
3. Click the trash/delete icon
4. Confirm deletion

## Support

If you encounter issues:
1. Check the browser console for error messages (F12 → Console)
2. Verify the script is enabled and up to date
3. Try reinstalling the script
4. Report issues on the GitHub repository

## Important Notes

⚠️ **This script is for educational purposes only**
- Using automation may violate Microsoft Rewards Terms of Service
- Your account could be suspended or banned
- Use at your own risk
- The author is not responsible for any consequences

✓ **Best Practices**
- Don't use automation tools excessively
- Maintain normal browsing patterns alongside automation
- Be aware of and follow Microsoft's terms of service
- Consider the ethical implications of automation

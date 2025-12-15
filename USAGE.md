# Usage Guide

## Getting Started

After installing the script, you're ready to start earning Microsoft Rewards points automatically!

## Before You Start

### Prerequisites
1. ✅ Have a Microsoft account
2. ✅ Be logged into [Microsoft Rewards](https://rewards.microsoft.com/)
3. ✅ Have the script installed and enabled
4. ✅ Be on [Bing.com](https://www.bing.com)

### Check Your Daily Limits
- Desktop searches: Usually 30 searches = 150 points (5 points per search)
- Mobile searches: Usually 20 searches = 100 points (5 points per search)
- Limits may vary by region

## Running Desktop Searches

### Step 1: Prepare Desktop Mode
1. Open your desktop browser (Chrome, Firefox, Edge, etc.)
2. Make sure you're **not** in mobile device emulation mode
3. Navigate to [https://www.bing.com](https://www.bing.com)
4. Ensure you're logged into your Microsoft account

### Step 2: Start Desktop Searches
1. Look for the purple panel in the top-right corner
2. Verify it shows "Mode: Desktop"
3. Click the **"🖥️ Start Desktop (30)"** button
4. The script will begin performing searches

### Step 3: Monitor Progress
- Watch the progress bar fill up
- Current search count will increment
- Status will show the current search query
- Do NOT close the tab while searches are running

### Step 4: Completion
- When complete, status will show "✅ Completed!"
- You can close the tab or continue browsing
- Check your Microsoft Rewards dashboard to see points

## Running Mobile Searches

You have several options for running mobile searches:

### Option 1: Mobile Device Emulation (Desktop Browser)

**Chrome/Edge:**
1. Go to Bing.com
2. Press `F12` to open Developer Tools
3. Press `Ctrl+Shift+M` (Windows) or `Cmd+Shift+M` (Mac)
4. Select a mobile device from the dropdown (e.g., iPhone 12, Galaxy S20)
5. Refresh the page (`F5`)
6. The panel should now show "Mode: Mobile"
7. Click **"📱 Start Mobile (20)"**

**Firefox:**
1. Go to Bing.com
2. Press `F12` to open Developer Tools
3. Click the Responsive Design Mode icon (or `Ctrl+Shift+M`)
4. Select a mobile device preset
5. Refresh the page
6. Click **"📱 Start Mobile (20)"**

### Option 2: User Agent Switcher Extension

1. Install a User Agent Switcher extension:
   - [User-Agent Switcher for Chrome](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg)
   - [User-Agent Switcher for Firefox](https://addons.mozilla.org/en-US/firefox/addon/user-agent-string-switcher/)

2. Switch to a mobile user agent:
   - Chrome: Select "iPhone" or "Android"
   - Firefox: Select mobile preset

3. Refresh Bing.com
4. Panel should show "Mode: Mobile"
5. Click **"📱 Start Mobile (20)"**

### Option 3: Actual Mobile Device

**For Android (Firefox):**
1. Install Firefox for Android
2. Install Violentmonkey in Firefox
3. Install the script
4. Go to Bing.com
5. Click **"📱 Start Mobile (20)"**

**For iOS (Safari):**
1. Install Userscripts app from App Store
2. Install the script
3. Enable in Safari settings
4. Go to Bing.com
5. Click **"📱 Start Mobile (20)"**

## Running Both Desktop and Mobile

To maximize your daily points, run both desktop and mobile searches:

### Option 1: Sequential Execution
1. On Bing.com, click **"🚀 Start Both (50)"**
2. The script will perform all 50 searches sequentially
3. Wait for completion (approximately 5-10 minutes)

### Option 2: Separate Runs
1. First, run desktop searches in normal mode
2. Then, switch to mobile mode (device emulation or user agent)
3. Refresh the page
4. Run mobile searches

## Understanding the Control Panel

### Panel Information

```
🎁 MS Rewards Auto Search
━━━━━━━━━━━━━━━━━━━━━
Mode: Desktop/Mobile
Progress: 15 / 30
Status: Searching: weather today 1234...
[████████████░░░░░░░░] 50%

[🖥️ Start Desktop (30)]
[📱 Start Mobile (20)]
[🚀 Start Both (50)]
[⏸️ Stop]
```

- **Mode**: Shows if you're in Desktop or Mobile user agent
- **Progress**: Current search number / Total searches
- **Status**: What the script is doing right now
- **Progress Bar**: Visual completion indicator
- **Buttons**: Control the search automation

### Button States

- **Green (Enabled)**: Ready to click
- **Gray (Disabled)**: Currently running or unavailable
- **Hover Effect**: Buttons fade when you hover over them

## Advanced Usage

### Customizing Search Count

Edit the script to change default search counts:

```javascript
const CONFIG = {
    desktopSearches: 30,  // Change this number
    mobileSearches: 20,   // Change this number
    delayBetweenSearches: 3000,
    randomDelayVariation: 2000,
};
```

### Adjusting Delays

Make searches faster or slower:

```javascript
const CONFIG = {
    desktopSearches: 30,
    mobileSearches: 20,
    delayBetweenSearches: 5000,  // 5 seconds (slower, safer)
    randomDelayVariation: 3000,  // More random variation
};
```

### Pausing and Resuming

- Click **"⏸️ Stop"** to pause searches
- The script saves progress automatically
- If you close the browser, it will resume within 5 minutes when you return
- After 5 minutes, you'll need to restart manually

## Best Practices

### Daily Routine

**Morning (Desktop):**
1. Open Bing.com before starting work
2. Run desktop searches
3. Let it complete while you do other things

**Evening (Mobile):**
1. Switch to mobile mode
2. Run mobile searches
3. Check your rewards balance

### Maximizing Points

1. **Run Both Modes**: Desktop + Mobile = 250 points/day
2. **Daily Consistency**: Run searches every day
3. **Check Rewards Dashboard**: Complete other activities too
4. **Regional Bonuses**: Some regions have bonus point opportunities

### Safety Tips

1. **Don't Spam**: Stick to daily limits (30 desktop + 20 mobile)
2. **Natural Delays**: Use default delay settings
3. **Stay Logged In**: Ensure you're logged into Microsoft account
4. **Active Tab**: Keep the Bing tab active during searches
5. **One Session**: Don't run multiple sessions simultaneously

## Monitoring Your Points

### Check Microsoft Rewards Dashboard

1. Go to [Microsoft Rewards](https://rewards.microsoft.com/)
2. Click "Point history" or "Activity"
3. Look for "PC search" and "Mobile search" entries
4. Points usually appear within a few minutes

### Expected Points

- **Desktop**: 30 searches × 5 points = 150 points
- **Mobile**: 20 searches × 5 points = 100 points
- **Total Daily**: 250 points from searches
- **Monthly**: ~7,500 points from searches alone

## Troubleshooting

### Searches Not Counting?

**Check:**
- ✅ Are you logged into Microsoft account?
- ✅ Have you reached daily limits?
- ✅ Is your account region supported?
- ✅ Are you on Bing.com (not another search engine)?

**Solutions:**
1. Log out and log back into Microsoft Rewards
2. Clear browser cookies and cache
3. Wait 24 hours for limits to reset
4. Try a different browser

### Script Stopped Mid-Search?

**Reasons:**
- Tab was closed
- Browser crashed
- Internet connection lost
- Page was refreshed

**Solution:**
- Go back to Bing.com within 5 minutes
- Script will auto-resume
- Or click start button again

### Points Not Appearing?

**Wait:**
- Points can take 5-15 minutes to appear
- Refresh the rewards dashboard

**Verify:**
- Check if searches completed successfully
- Look at your search history on Bing
- Ensure searches were unique queries

### UI Panel Not Visible?

**Solutions:**
1. Scroll to top-right of page
2. Check if script is enabled in script manager
3. Refresh page (F5)
4. Check browser console for errors (F12)

## Daily Checklist

- [ ] Log into Microsoft account
- [ ] Go to Bing.com
- [ ] Run desktop searches (30)
- [ ] Switch to mobile mode
- [ ] Run mobile searches (20)
- [ ] Check rewards dashboard
- [ ] Verify points credited

## Tips for Success

1. **Consistency is Key**: Run daily for best results
2. **Morning Routine**: Make it part of your morning routine
3. **Browser Tabs**: Keep Bing tab open but in background
4. **Multiple Accounts**: Use different browsers for multiple accounts
5. **Combine Activities**: Run searches while doing other tasks

## What to Do With Points

Once you've accumulated points, visit [Microsoft Rewards](https://rewards.microsoft.com/redeem) to:
- Redeem for gift cards (Amazon, Starbucks, etc.)
- Enter sweepstakes
- Donate to charity
- Get Xbox Game Pass
- Purchase Microsoft products

## Questions?

- Check [README.md](README.md) for general information
- See [INSTALLATION.md](INSTALLATION.md) for installation help
- Review script settings for customization options

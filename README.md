# Microsoft Rewards Auto Search Script

🎁 Automated Bing search script for Microsoft Rewards points - Works on both Desktop and Mobile!

## Features

- ✅ **Automatic Search Execution**: Performs 30 desktop searches and 20 mobile searches
- 🖥️ **Desktop Mode**: Optimized for desktop user agents
- 📱 **Mobile Mode**: Optimized for mobile user agents
- 🎯 **Smart Detection**: Automatically detects your current user agent
- ⏱️ **Random Delays**: Adds random delays between searches to avoid detection
- 🎲 **Random Queries**: Uses a large pool of diverse search queries
- 💾 **Progress Tracking**: Saves and resumes progress if interrupted
- 🎨 **Beautiful UI**: Clean, modern interface with progress indicators
- 🚀 **One-Click Operation**: Start desktop, mobile, or both with a single click

## Installation

### Prerequisites

You need a userscript manager extension installed in your browser:
- [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
- [Tampermonkey](https://www.tampermonkey.net/)
- [Greasemonkey](https://www.greasespot.net/)

### Steps

1. **Install a userscript manager** (if you haven't already):
   - For Chrome/Edge: Install [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojp/overview)
   - For Firefox: Install [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. **Install the script**:
   - Click on the raw link: [microsoft-rewards-auto-search.user.js](microsoft-rewards-auto-search.user.js)
   - Your userscript manager should automatically detect it and prompt you to install
   - Click "Install" or "Confirm Installation"

3. **Navigate to Bing**:
   - Go to [https://www.bing.com](https://www.bing.com)
   - Make sure you're logged into your Microsoft account

## Usage

### Running Desktop Searches

1. Go to [Bing.com](https://www.bing.com) in your **desktop browser**
2. You'll see a purple panel in the top-right corner
3. Click **"🖥️ Start Desktop (30)"** to run 30 desktop searches
4. The script will automatically perform searches with random queries
5. Watch the progress bar fill up as searches complete

### Running Mobile Searches

**Option 1: Use Browser Developer Tools**
1. Open Bing.com in your desktop browser
2. Press F12 to open Developer Tools
3. Click the device toolbar icon (or Ctrl+Shift+M)
4. Select a mobile device (e.g., iPhone, iPad, Android)
5. Refresh the page
6. Click **"📱 Start Mobile (20)"**

**Option 2: Use a Mobile Browser**
1. Install Violentmonkey/Tampermonkey on your mobile browser (Firefox Mobile supports extensions)
2. Install the script
3. Go to Bing.com
4. Click **"📱 Start Mobile (20)"**

**Option 3: Change User Agent Extension**
1. Install a User Agent Switcher extension
2. Switch to a mobile user agent
3. Refresh Bing.com
4. Click **"📱 Start Mobile (20)"**

### Running Both Desktop and Mobile

1. Click **"🚀 Start Both (50)"** to run both desktop and mobile searches sequentially
2. The script will automatically perform all 50 searches
3. Perfect for maximizing your daily Microsoft Rewards points!

## Script Features Explained

### Configuration

The script has built-in configuration that you can modify if needed:

```javascript
const CONFIG = {
    desktopSearches: 30,      // Number of desktop searches
    mobileSearches: 20,       // Number of mobile searches
    delayBetweenSearches: 3000, // 3 seconds between searches
    randomDelayVariation: 2000, // Add up to 2 seconds random variation
};
```

### Search Query Pool

The script uses 100+ diverse search queries covering various topics:
- News, weather, sports
- Technology, science, health
- Entertainment, movies, music
- Travel, food, lifestyle
- And many more!

Each query is also appended with a random number to ensure uniqueness.

### Progress Tracking

- The script saves your progress in localStorage
- If you close the browser or tab, it will resume from where you left off (within 5 minutes)
- Progress is shown in real-time with a progress bar and counter

### Safety Features

- **Random delays**: 3-5 seconds between searches to mimic human behavior
- **Random queries**: Large pool of diverse queries to avoid patterns
- **Unique searches**: Each query gets a random number appended
- **Resume capability**: Won't lose progress if interrupted

## UI Controls

The floating panel shows:
- **Mode**: Current user agent (Desktop or Mobile)
- **Progress**: Current search / Total searches
- **Status**: What the script is currently doing
- **Progress Bar**: Visual representation of completion
- **Buttons**:
  - 🖥️ Start Desktop: Run 30 desktop searches
  - 📱 Start Mobile: Run 20 mobile searches
  - 🚀 Start Both: Run all 50 searches
  - ⏸️ Stop: Stop the current search session

## Tips & Best Practices

1. **Login First**: Make sure you're logged into your Microsoft account before running searches
2. **Daily Limit**: Microsoft Rewards has daily limits, so don't run the script multiple times in one day
3. **Stay Active**: Keep the browser tab active while searches are running
4. **Check Rewards**: Visit [Microsoft Rewards](https://rewards.microsoft.com/) to verify your points
5. **Desktop + Mobile**: Run both modes each day to maximize points
6. **Be Patient**: Let the script complete all searches without interruption

## Troubleshooting

### Script not appearing?
- Refresh the Bing.com page
- Check that your userscript manager is enabled
- Verify the script is installed and active in your userscript manager

### Searches not working?
- Make sure you're on Bing.com
- Check if you're logged into your Microsoft account
- Try disabling other extensions that might interfere
- Clear your browser cache and cookies

### Not getting points?
- Verify you're logged into Microsoft Rewards
- Check daily limits haven't been reached
- Some regions have different point systems
- Wait a few minutes for points to update

### Script stopped mid-search?
- The script will automatically resume within 5 minutes
- If it doesn't resume, just click the start button again

## Disclaimer

This script is for educational purposes only. Use at your own risk. Microsoft may have terms of service regarding automated searches. Always review and comply with Microsoft Rewards terms and conditions.

## License

MIT License - Feel free to modify and distribute

## Contributing

Feel free to fork, modify, and submit pull requests for improvements!

## Version History

- **v1.0** (2025-12-15): Initial release
  - Desktop and mobile search automation
  - Progress tracking and resume capability
  - Beautiful UI with real-time progress
  - 100+ diverse search queries
  - Random delays and query variation

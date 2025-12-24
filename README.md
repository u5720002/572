# Microsoft Rewards Auto Search - 500 Tabs Userscript

A Violentmonkey/Tampermonkey userscript that automates Microsoft Rewards searches by opening 500 tabs with unique search queries with just one click.

## Features

- 🚀 **One-Click Automation**: Start 500 searches with a single button click
- 🎲 **Random Search Queries**: Generates unique, randomized search queries to simulate natural browsing
- ⚡ **Fast Execution**: Opens tabs with minimal delay (100ms between each)
- 💎 **Beautiful UI**: Floating button with gradient design and smooth animations
- 🔒 **Safe**: Includes confirmation dialog before starting
- 📊 **Progress Tracking**: Shows real-time progress while opening tabs

## Installation

### Step 1: Install a Userscript Manager

You need a userscript manager extension installed in your browser:

- **Chrome/Edge/Opera**: [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/)
- **Firefox**: [Violentmonkey](https://violentmonkey.github.io/) or [Greasemonkey](https://www.greasespot.net/)
- **Safari**: [Userscripts](https://github.com/quoid/userscripts)

### Step 2: Install the Userscript

1. Click on the userscript file: [`microsoft-rewards-auto-search.user.js`](microsoft-rewards-auto-search.user.js)
2. Click the "Raw" button on GitHub
3. Your userscript manager should automatically detect it and prompt you to install
4. Click "Install" or "Confirm installation"

Alternatively, you can:
- Copy the entire content of the userscript file
- Open your userscript manager
- Click "Create a new script" or the "+" button
- Paste the content and save

## Usage

1. Navigate to any of these websites:
   - https://www.bing.com
   - https://rewards.microsoft.com
   - https://www.microsoft.com

2. You'll see a floating button in the bottom-right corner: **"🚀 Start 500 Searches"**

3. Click the button

4. Confirm the action in the popup dialog

5. The script will automatically:
   - Generate 500 unique search queries
   - Open them in background tabs
   - Show progress on the button
   - Alert you when complete

## Configuration

You can customize the behavior by editing these variables at the top of the script:

```javascript
const NUM_SEARCHES = 500;           // Number of searches to perform
const DELAY_BETWEEN_TABS = 100;     // Milliseconds between opening each tab
```

## How It Works

1. **Random Query Generation**: The script combines topics (weather, news, sports, etc.) with modifiers (best, latest, how to, etc.) to create diverse search queries
2. **Unique Queries**: Uses a Set to ensure all 500 queries are unique
3. **Background Tabs**: Opens tabs in the background using `GM_openInTab` to minimize disruption
4. **Rate Limiting**: Includes a small delay between tabs to prevent browser overload

## Important Notes

⚠️ **Browser Performance**: Opening 500 tabs will temporarily consume significant memory and CPU. Make sure you have:
- Sufficient RAM (8GB+ recommended)
- A modern browser
- No critical work in other tabs

⚠️ **Microsoft Rewards Terms**: Using automation tools may violate Microsoft Rewards Terms of Service. Use at your own risk.

⚠️ **Pop-up Blocker**: Ensure your browser's pop-up blocker allows pop-ups from Bing/Microsoft domains.

## Troubleshooting

**Button doesn't appear:**
- Make sure the userscript manager is enabled
- Check that the script is enabled in your userscript manager
- Refresh the page

**Tabs don't open:**
- Check your browser's pop-up blocker settings
- Grant necessary permissions to the userscript manager
- Try reducing `NUM_SEARCHES` to a smaller number

**Browser becomes slow:**
- This is normal with 500 tabs
- Wait for all tabs to finish loading
- Consider reducing `NUM_SEARCHES`
- Close unused tabs before running

## License

This project is open source and available for personal use.

## Disclaimer

This tool is for educational purposes. Automated searches may violate Microsoft Rewards Terms of Service. The author is not responsible for any account suspension or other consequences resulting from the use of this script.

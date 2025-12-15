# Microsoft Rewards Auto Search

A userscript for Violentmonkey that automates Bing searches to help earn Microsoft Rewards points.

## Features

- 🔄 Automated Bing searches with randomized queries
- ⚙️ Configurable search count and delay intervals
- 📊 Visual progress tracking
- 🎨 Modern, user-friendly interface
- 💾 Resume capability if interrupted
- 🎲 Randomized search terms to appear more natural

## Installation

1. Install a userscript manager:
   - [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/)

2. Click on the userscript file: [`microsoft-rewards-auto-search.user.js`](microsoft-rewards-auto-search.user.js)

3. Click the "Raw" button to view the raw file

4. Your userscript manager should automatically detect the script and prompt you to install it

## Usage

1. Navigate to [Bing.com](https://www.bing.com)
2. You'll see a purple panel in the top-right corner labeled "🎁 Rewards Auto Search"
3. Configure your settings:
   - **Number of searches**: How many searches to perform (default: 30)
   - **Min delay**: Minimum wait time between searches in milliseconds (default: 3000ms)
   - **Max delay**: Maximum wait time between searches in milliseconds (default: 8000ms)
4. Click "Start Searching" to begin
5. The script will automatically perform searches and navigate between pages
6. Click "Stop" at any time to pause the automation
7. The script will resume automatically if the page is refreshed during a session

## Settings

- **Number of searches**: Recommended 30-50 searches per session
- **Min/Max delay**: Keep between 3-10 seconds to avoid being flagged as automated

## Notes

- This script is for educational purposes
- Use responsibly and in accordance with Microsoft's Terms of Service
- The script uses random search queries to simulate natural browsing behavior
- Progress is saved automatically, so you can close and reopen your browser

## License

MIT License - Feel free to modify and distribute

## Disclaimer

This tool is provided as-is. The author is not responsible for any account actions taken by Microsoft. Use at your own risk.

# Microsoft Rewards Auto Search

A userscript for Violentmonkey that automatically performs Bing searches to earn Microsoft Rewards points.

## Features

- 🔄 Automatic search execution with random terms
- 📱 Support for both desktop and mobile searches
- ⏱️ Random delays between searches to appear natural
- 💾 Tracks daily search progress with localStorage
- 🎨 Beautiful control panel UI
- ⚡ Easy start/stop controls

## Installation

1. Install [Violentmonkey](https://violentmonkey.github.io/) browser extension
2. Click on the `microsoft-rewards-auto-search.user.js` file in this repository
3. Click the "Raw" button
4. Violentmonkey should prompt you to install the script
5. Click "Install" to add the script

## Usage

1. Navigate to [Bing.com](https://www.bing.com)
2. You'll see a purple control panel in the top-right corner
3. Click "Start" to begin automatic searches
4. The script will:
   - Perform 30 desktop searches or 20 mobile searches per day
   - Use random search terms with timestamps
   - Add random delays (3-8 seconds) between searches
   - Track your progress throughout the day
5. Click "Stop" to pause the automatic searches
6. Click "Restart" to reset the counter and start over

## Configuration

You can modify these settings in the script:

- `DESKTOP_SEARCHES`: Number of desktop searches (default: 30)
- `MOBILE_SEARCHES`: Number of mobile searches (default: 20)
- `MIN_DELAY`: Minimum delay between searches in ms (default: 3000)
- `MAX_DELAY`: Maximum delay between searches in ms (default: 8000)

## How It Works

The script:
1. Detects whether you're using a desktop or mobile user agent
2. Displays a control panel showing your progress
3. When started, performs searches with random terms from a curated list
4. Adds a timestamp to each search to ensure uniqueness
5. Waits a random interval between searches
6. Saves progress to localStorage (resets daily)
7. Stops automatically when the daily quota is reached

## Notes

- Progress resets daily (based on date)
- The script only runs on bing.com
- Search terms are randomly selected from a pool of 52 different topics
- Each search includes a timestamp to ensure uniqueness
- The script respects the daily limits: 30 desktop or 20 mobile searches

## Disclaimer

This script is for educational purposes. Use at your own risk. Microsoft may have terms of service regarding automated searches. Please review Microsoft Rewards terms before using this script.

## License

MIT License - feel free to modify and share!

# Microsoft Rewards Auto Search Script

An automated search script for Microsoft Rewards using Violentmonkey/Tampermonkey.

## Description

This userscript automates Bing searches to help you earn Microsoft Rewards points. It performs random searches with configurable delays to simulate natural browsing behavior.

## Features

- ✨ Automatic random searches on Bing
- 📊 Visual progress tracker
- 🔄 Daily search counter with automatic reset
- ⏱️ Random delays between searches (3-6 seconds)
- 💾 Persistent state storage
- 🎨 Beautiful control panel UI
- 🛡️ Safe and configurable

## Installation

### Prerequisites

You need a userscript manager browser extension. Choose one:
- [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
- [Tampermonkey](https://www.tampermonkey.net/)
- [Greasemonkey](https://www.greasespot.net/)

### Steps

1. Install Violentmonkey or Tampermonkey from your browser's extension store
2. Click on the extension icon and select "Create a new script" or "+"
3. Copy the contents of `microsoft-rewards-auto-search.user.js`
4. Paste it into the editor
5. Save the script (Ctrl+S or Cmd+S)

Alternatively, you can install directly:
- Navigate to the raw file URL and your userscript manager should prompt you to install it

## Usage

1. Go to [Bing.com](https://www.bing.com)
2. You'll see a control panel in the top-right corner
3. Click "Start Auto Search" to begin automated searches
4. The script will perform 30 searches with random delays
5. Progress is tracked and saved automatically
6. Counter resets automatically each day

## Configuration

You can modify these settings in the script:

```javascript
const CONFIG = {
    SEARCH_COUNT: 30,  // Number of searches to perform
    MIN_DELAY: 3000,   // Minimum delay between searches (ms)
    MAX_DELAY: 6000,   // Maximum delay between searches (ms)
};
```

## How It Works

1. The script adds a control panel to Bing.com
2. When you click "Start Auto Search", it performs a search with a random term
3. After each search, it waits 3-6 seconds (random) before the next search
4. Progress is saved to localStorage
5. The counter resets automatically at midnight
6. Once the daily limit is reached, searches stop automatically

## Safety Features

- Random delays between searches (3-6 seconds)
- Unique search terms with random IDs
- Daily limits to prevent abuse
- Manual control over when searches start
- Persistent state to prevent duplicate runs

## Disclaimer

This script is for educational purposes. Use at your own risk. Microsoft's terms of service should be reviewed before using automation tools. The author is not responsible for any account issues that may arise from using this script.

## License

MIT License - Feel free to modify and distribute

## Contributing

Feel free to open issues or submit pull requests with improvements!

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

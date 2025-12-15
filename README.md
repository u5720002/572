# Microsoft Rewards Auto Search Script

An automated Bing search script for earning Microsoft Rewards points using Violentmonkey.

## Features

- 🔄 Automatic Bing searches with randomized queries
- 🖥️ Desktop mode support (default: 30 searches)
- 📱 Mobile mode support (default: 20 searches)
- ⏱️ Random delays between searches (3-8 seconds)
- 🎛️ Configurable settings via menu
- 📊 Real-time progress tracking
- 🎨 Clean UI control panel
- 🔒 Safe and non-intrusive

## Installation

### Prerequisites

1. Install a userscript manager in your browser:
   - [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox only)

### Install the Script

1. Click on the userscript file: [`microsoft-rewards-auto-search.user.js`](microsoft-rewards-auto-search.user.js)
2. Click the "Raw" button to view the raw file
3. Your userscript manager should automatically detect the script and prompt you to install it
4. Click "Install" or "Confirm installation"

Alternatively, you can manually install:
1. Copy the contents of `microsoft-rewards-auto-search.user.js`
2. Open your userscript manager dashboard
3. Create a new script
4. Paste the copied contents
5. Save the script

## Usage

### Basic Usage

1. Navigate to [Bing.com](https://www.bing.com)
2. The control panel will appear in the top-right corner of the page
3. Click the "Start" button to begin automatic searches
4. Watch the progress bar as searches are performed
5. The script will stop automatically when all searches are complete

### Configuration

Click on the Violentmonkey icon in your browser, then select the script menu to access configuration options:

- **Configure Desktop Searches**: Set the number of desktop searches (default: 30)
- **Configure Mobile Searches**: Set the number of mobile searches (default: 20)
- **Configure Min Delay**: Set minimum delay between searches in milliseconds (default: 3000)
- **Configure Max Delay**: Set maximum delay between searches in milliseconds (default: 8000)
- **Toggle Mobile Mode**: Switch between desktop and mobile search modes
- **Toggle Auto Start**: Enable/disable automatic start when visiting Bing

### Tips

- 🕐 Run the script during off-peak hours for better results
- 📅 Use desktop mode for the daily desktop search quota
- 📱 Switch to mobile mode for the mobile search quota
- ⏸️ You can stop the script at any time by clicking the "Stop" button
- 🔄 Reload the page after changing configuration settings
- 🎯 The script uses random search terms to appear more natural

## How It Works

The script:
1. Generates random search queries from a diverse word list
2. Performs searches on Bing with randomized delays
3. Tracks progress and displays it in a control panel
4. Stops automatically when the target number of searches is reached

## Safety & Ethics

⚠️ **Important Notes**:
- This script is for educational purposes
- Use responsibly and in accordance with Microsoft Rewards Terms of Service
- The author is not responsible for any account actions taken by Microsoft
- Using automation tools may violate Microsoft Rewards terms and could result in account suspension

## Troubleshooting

**Script not appearing:**
- Ensure Violentmonkey/Tampermonkey is installed and enabled
- Check that the script is enabled in your userscript manager
- Refresh the Bing page

**Searches not working:**
- Check your internet connection
- Ensure you're logged into your Microsoft account
- Verify that Bing is accessible in your region

**Progress not updating:**
- The script navigates between pages, so progress will reset visually but the script maintains state
- Each search navigates to a new page, which is normal behavior

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to modify and distribute as needed.

## Disclaimer

This project is not affiliated with, endorsed by, or connected to Microsoft Corporation. Microsoft and Microsoft Rewards are trademarks of Microsoft Corporation.

# 🎯 Bing Rewards Auto Searcher

An automated Bing search script for earning Microsoft Rewards points using Violentmonkey/Tampermonkey.

## ✨ Features

- 🔄 **Automatic Bing searches** with randomized queries
- 🖥️ **Desktop mode support** (default: 30 searches)
- 📱 **Mobile mode support** (default: 20 searches)
- ⏱️ **Random delays** between searches (3-8 seconds)
- 🎛️ **Configurable settings** via menu
- 📊 **Real-time progress tracking**
- 🎨 **Clean UI control panel**
- 🔒 **Safe and non-intrusive**

## 📦 Installation

### Prerequisites

You need a userscript manager browser extension:
- **[Violentmonkey](https://violentmonkey.github.io/)** (Recommended)
- **[Tampermonkey](https://www.tampermonkey.net/)**
- **[Greasemonkey](https://www.greasespot.net/)** (Firefox)

### Install Steps

1. Install one of the userscript managers listed above
2. Click on the userscript file: [`bing-rewards-searcher.user.js`](./bing-rewards-searcher.user.js)
3. Click "Raw" button on GitHub
4. Your userscript manager should prompt you to install it
5. Click "Install" or "Confirm"

## 🚀 Usage

### Starting the Script

1. Navigate to [Bing.com](https://www.bing.com)
2. The control panel will appear in the top-right corner of the page
3. Click the **"Start Searches"** button to begin automated searching

### Control Panel

The control panel displays:
- **Mode**: Shows whether you're in Desktop (🖥️) or Mobile (📱) mode
- **Status**: Current state (Idle, Running, or Completed)
- **Progress**: Shows completed searches out of total (e.g., "15 / 30")
- **Progress Bar**: Visual indicator of completion
- **Countdown**: Shows time until next search

### Buttons

- **Start Searches**: Begin the automated search process
- **Stop**: Halt the search process at any time
- **⚙️ Settings**: Configure search parameters

### Settings

Click the **Settings** button to customize:

- **Desktop Searches**: Number of searches to perform in desktop mode (default: 30)
- **Mobile Searches**: Number of searches to perform in mobile mode (default: 20)
- **Min Delay**: Minimum wait time between searches in milliseconds (default: 3000ms / 3s)
- **Max Delay**: Maximum wait time between searches in milliseconds (default: 8000ms / 8s)

Settings are automatically saved and persist across browser sessions.

## 🎛️ Menu Commands

Right-click on the userscript icon in your browser toolbar to access quick commands:
- **Start Searches**: Begin searching
- **Stop Searches**: Stop the current session
- **Settings**: Open settings dialog

## 📱 Mobile Mode Detection

The script automatically detects mobile mode based on:
- Screen width (≤768px)
- User agent string (Mobile/Android/iPhone)

Mobile mode runs fewer searches (default: 20) as Microsoft Rewards typically requires fewer mobile searches.

## 🔒 Safety Features

- **Randomized Queries**: Uses a pool of 50+ varied search terms with random numbers
- **Random Delays**: Delays between 3-8 seconds (configurable) to mimic human behavior
- **Non-intrusive**: Minimal impact on browsing, can be stopped at any time
- **No Data Collection**: Script runs entirely locally, no external connections

## 🎨 UI Features

- **Draggable Panel**: Click and drag the header to reposition
- **Minimizable**: Click the "−" button to minimize the panel
- **Real-time Updates**: Progress bar and counters update live
- **Smooth Animations**: Professional gradient design with smooth transitions
- **Responsive**: Works on all screen sizes

## ⚠️ Disclaimer

This script is for educational purposes. Use at your own risk. The author is not responsible for any account actions taken by Microsoft. Always follow Microsoft Rewards Terms of Service.

## 🛠️ Troubleshooting

### Script not appearing
- Ensure your userscript manager is enabled
- Check that you're on bing.com
- Try refreshing the page

### Searches not working
- Check your internet connection
- Verify you're logged into your Microsoft account
- Ensure the script hasn't been paused

### Settings not saving
- Check that your userscript manager has storage permissions
- Try reinstalling the script

## 📄 License

MIT License - Feel free to modify and distribute

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 Version History

### v1.0.0
- Initial release
- Desktop and mobile mode support
- Configurable search counts and delays
- Real-time progress tracking
- Clean UI control panel
- Settings persistence

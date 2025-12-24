# Bing Search Automation Tool 🔍

An intelligent automation tool for performing Bing searches with randomized queries, supporting both Desktop and Mobile modes.

## ✨ Features

- 🔄 **Automatic Bing searches** with randomized queries
- 🖥️ **Desktop mode support** (default: 30 searches)
- 📱 **Mobile mode support** (default: 20 searches)
- ⏱️ **Random delays** between searches (3-8 seconds)
- 🎛️ **Configurable settings** via interactive menu
- 📊 **Real-time progress tracking** with visual progress bar
- 🎨 **Clean UI control panel** with color-coded output
- 🔒 **Safe and non-intrusive** with browser automation best practices

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- Google Chrome browser installed
- ChromeDriver (automatically managed by selenium)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/u5720002/572.git
cd 572
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Usage

Run the automation tool:
```bash
python bing_search_automation.py
```

The tool will present an interactive menu where you can configure:
- **Mode**: Desktop or Mobile
- **Number of searches**: Custom or default (30 for desktop, 20 for mobile)
- **Delay between searches**: Default (3-8s), Fast (1-3s), Slow (5-12s), or Custom

## 📖 Configuration Options

### Mode Selection
- **Desktop Mode** 🖥️: Simulates desktop browser (default: 30 searches)
- **Mobile Mode** 📱: Emulates mobile device (default: 20 searches)

### Delay Options
- **Default**: 3-8 seconds between searches
- **Fast**: 1-3 seconds between searches
- **Slow**: 5-12 seconds between searches
- **Custom**: Set your own min/max delay range

## 🎯 How It Works

1. The tool initializes a Chrome WebDriver with appropriate configurations
2. For each search:
   - Navigates to Bing.com
   - Selects a random query from the predefined list
   - Enters the query and submits the search
   - Waits for results to load
   - Applies a random delay before the next search
3. Displays real-time progress with a visual progress bar
4. Shows completion statistics at the end

## 📊 Sample Output

```
╔══════════════════════════════════════════════════╗
║   BING SEARCH AUTOMATION - CONTROL PANEL         ║
╚══════════════════════════════════════════════════╝

📋 Configuration:
   🖥️  Mode: DESKTOP
   🔢 Target Searches: 30
   ⏱️  Delay Range: 3-8 seconds

🚀 Starting search automation...

[1/30] ███░░░░░░░░░░░░░░░░░░░░░░░░░░░ 3.3%
   🔍 Searching: artificial intelligence trends
   ✓ Search completed
   ⏳ Waiting 5.2 seconds...
```

## 🔒 Safety Features

- Uses realistic delays between searches
- Implements browser automation best practices
- Avoids detection as automated traffic
- Graceful error handling
- Clean browser session management

## 🛠️ Technical Details

- **Language**: Python 3
- **Browser Automation**: Selenium WebDriver
- **Browser**: Google Chrome
- **Mobile Emulation**: iPhone user agent and viewport

## 📝 License

This project is provided as-is for educational purposes.

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Use responsibly and in accordance with Bing's Terms of Service. The authors are not responsible for any misuse of this tool.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

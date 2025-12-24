# Usage Examples

## Basic Usage

### Interactive Mode (Recommended)
Simply run the script and follow the interactive menu:
```bash
python bing_search_automation.py
```

## Configuration Examples

### Desktop Mode (Default)
The tool will prompt you to:
1. Select Desktop mode
2. Use default 30 searches
3. Use default 3-8 second delays

### Mobile Mode
1. Select Mobile mode (option 2)
2. Use default 20 searches
3. Use default 3-8 second delays

### Custom Configuration
You can customize:
- Number of searches (any positive number)
- Delay between searches:
  - Default: 3-8 seconds
  - Fast: 1-3 seconds
  - Slow: 5-12 seconds
  - Custom: Set your own range

## Feature Demonstration

### Run Demo Without Browser
To see a demonstration without launching a browser:
```bash
python demo.py
```

This will:
- Display all features
- Show a simulated progress bar
- Demonstrate the UI without requiring Chrome

## Requirements

### System Requirements
- Python 3.7+
- Google Chrome browser
- Internet connection

### Python Dependencies
Install with:
```bash
pip install -r requirements.txt
```

Dependencies:
- selenium >= 4.15.0
- webdriver-manager >= 4.0.0

## Features Overview

✅ **Automatic Searches**: Performs searches automatically with no manual intervention
✅ **Randomized Queries**: 50+ predefined queries covering various topics
✅ **Desktop Mode**: Full desktop browser experience (30 searches default)
✅ **Mobile Mode**: Mobile device emulation (20 searches default)
✅ **Smart Delays**: Random delays (3-8s) to appear natural
✅ **Interactive Menu**: Easy-to-use configuration interface
✅ **Progress Tracking**: Real-time progress bar with percentage
✅ **Statistics**: Completion summary with timing information
✅ **Safe Operation**: Non-intrusive, follows best practices

## Query Categories

The tool includes queries from various categories:
- 💻 Technology (AI, ML, Cloud, Cybersecurity, etc.)
- 🔬 Science (Space, Climate, Renewable Energy, etc.)
- 📚 General Knowledge (History, Geography, Culture, etc.)
- 📰 Current Topics (Tech News, Research, Innovations, etc.)
- 📖 Resources (Tutorials, Guides, Reviews, etc.)

## Tips

1. **First Time Users**: Start with the demo script to see the UI
2. **Customization**: Use the interactive menu to configure all settings
3. **Mobile Testing**: Select mobile mode to test mobile-specific features
4. **Interruption**: Press Ctrl+C to stop the automation at any time
5. **Safety**: The tool uses realistic delays and browser configurations

## Troubleshooting

### Chrome Driver Issues
The tool uses Selenium's built-in WebDriver manager. If you encounter issues:
1. Ensure Google Chrome is installed
2. Check your internet connection
3. Try updating: `pip install --upgrade selenium`

### Import Errors
If you get module not found errors:
```bash
pip install -r requirements.txt
```

### Permission Issues
On Linux/Mac, you may need to make the script executable:
```bash
chmod +x bing_search_automation.py
```

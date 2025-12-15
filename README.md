# Auto Search Userscript

A powerful userscript for Violentmonkey that enables quick searching of selected text across multiple search engines.

## Features

- 🔍 **Quick Search**: Select any text on a webpage and instantly search it
- 🎯 **Multiple Search Engines**: Supports Google, Bing, DuckDuckGo, Wikipedia, and GitHub
- ⌨️ **Keyboard Shortcut**: Press `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac) to search selected text with your default engine
- 🎨 **Visual Popup**: Beautiful popup menu appears when you select text
- ⚙️ **Customizable**: Configure default search engine, toggle features via menu commands
- 🚀 **Fast & Lightweight**: Minimal performance impact

## Installation

### Prerequisites
- A browser extension that supports userscripts:
  - [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
  - [Tampermonkey](https://www.tampermonkey.net/)
  - [Greasemonkey](https://www.greasespot.net/)

### Steps

1. **Install Violentmonkey** (or another userscript manager) for your browser:
   - [Chrome/Edge](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
   - [Firefox](https://addons.mozilla.org/firefox/addon/violentmonkey/)
   - [Safari](https://apps.apple.com/app/userscripts/id1463298887)

2. **Install the Auto Search userscript**:
   - Click on the `auto-search.user.js` file in this repository
   - Click the "Raw" button
   - Violentmonkey should automatically detect the userscript and prompt you to install it
   - Click "Confirm installation"

Alternatively, you can manually install by:
1. Opening Violentmonkey dashboard
2. Clicking the "+" button to create a new script
3. Copying and pasting the contents of `auto-search.user.js`
4. Saving the script

## Usage

### Basic Usage

1. **Select text** on any webpage by highlighting it with your mouse
2. A **popup menu** will appear with search engine options
3. **Click** on any search engine to open the search results in a new tab

### Keyboard Shortcut

1. **Select text** on any webpage
2. Press **`Ctrl+Shift+S`** (Windows/Linux) or **`Cmd+Shift+S`** (Mac)
3. The selected text will be searched using your default search engine

### Configuration

Access the configuration menu by clicking the Violentmonkey icon in your browser toolbar, then select the Auto Search script. You'll see several menu commands:

- **Set Default Search Engine**: Choose which search engine to use with the keyboard shortcut
- **Toggle Search Popup**: Enable or disable the popup menu
- **Toggle Keyboard Shortcut**: Enable or disable the `Ctrl+Shift+S` shortcut

## Supported Search Engines

- **Google**: General web search
- **Bing**: Microsoft's search engine
- **DuckDuckGo**: Privacy-focused search
- **Wikipedia**: Encyclopedia lookup
- **GitHub**: Code and repository search

## Customization

You can customize the userscript by editing the `CONFIG` object in the code:

```javascript
const CONFIG = {
    searchEngines: {
        // Add or modify search engines here
        google: {
            name: 'Google',
            url: 'https://www.google.com/search?q=',
            enabled: true
        },
        // Add your own custom search engine
        customEngine: {
            name: 'Custom Search',
            url: 'https://example.com/search?q=',
            enabled: true
        }
    },
    defaultEngine: 'google',  // Change default engine
    showPopup: true,          // Show/hide popup
    useCtrlShift: true,       // Enable/disable keyboard shortcut
    openInNewTab: true        // Open results in new tab
};
```

## Privacy

This userscript:
- ✅ Runs entirely locally in your browser
- ✅ Does NOT collect or transmit any personal data
- ✅ Does NOT track your searches
- ✅ Only opens search URLs when you explicitly trigger a search

## Troubleshooting

**Popup doesn't appear:**
- Check if the popup is enabled in the script menu
- Try refreshing the page
- Ensure Violentmonkey is enabled and the script is active

**Keyboard shortcut doesn't work:**
- Check if the shortcut is enabled in the script menu
- Some websites may override keyboard shortcuts
- Try a different page

**Script doesn't work on certain sites:**
- Some sites with strict Content Security Policies may block userscripts
- The script should work on most regular websites

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Add more search engines

## License

MIT License - Feel free to modify and distribute as needed.

## Credits

Created by u5720002

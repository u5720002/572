# Anti-Detect Browser PC Software

A comprehensive browser automation toolkit with advanced anti-detection features for PC. This software helps bypass bot detection systems, fingerprinting, and tracking mechanisms used by websites.

## 🚀 Features

- **Browser Fingerprint Spoofing**: Randomizes browser fingerprints to avoid detection
- **Canvas Fingerprinting Protection**: Adds noise to canvas elements to prevent tracking
- **WebGL Fingerprinting Protection**: Spoofs WebGL parameters
- **WebRTC Leak Protection**: Prevents IP address leaks through WebRTC
- **Audio Fingerprinting Protection**: Adds noise to audio context
- **User-Agent Rotation**: Automatically rotates user agents
- **Timezone & Geolocation Spoofing**: Allows setting custom timezone and location
- **HTTP Header Manipulation**: Removes automation indicators
- **Screen Resolution Spoofing**: Spoofs screen resolution
- **Hardware Information Spoofing**: Spoofs CPU cores and memory information
- **Battery API Blocking**: Blocks battery status tracking

## 💻 Use as Standalone Software

**Want to use this as a ready-to-run desktop application?** See our [Software Build Guide](docs/SOFTWARE_BUILD.md) to convert the code into standalone software for Windows, macOS, or Linux!

We provide two options:
- **Electron Desktop App**: Modern GUI application with installer
- **Python Executable**: Lightweight standalone executable

Quick build:
```bash
cd build-scripts
./build.sh        # On macOS/Linux
build.bat         # On Windows
```

Output: `desktop-app/dist/` - Ready to distribute!

---

## 📋 Requirements (For Developers)

### For JavaScript/Node.js Implementation:
- Node.js 14 or higher
- npm or yarn

### For Python Implementation:
- Python 3.7 or higher
- pip

## 📦 Installation (For Developers)

### JavaScript/Node.js Version:

```bash
# Install dependencies
npm install
```

### Python Version:

```bash
# Install dependencies
pip install -r requirements.txt
```

## 🔧 Usage

### JavaScript/Node.js

#### Basic Usage:

```javascript
const AntiDetectBrowser = require('./src/index');

async function main() {
  const browser = new AntiDetectBrowser({
    headless: false,
    protectWebRTC: true,
    canvasNoise: true
  });

  await browser.launch();
  await browser.goto('https://example.com');
  
  // Your automation code here
  
  await browser.close();
}

main();
```

#### Advanced Configuration:

```javascript
const browser = new AntiDetectBrowser({
  headless: false,
  proxy: 'http://proxy-server:port',
  timezone: 'America/New_York',
  geolocation: {
    latitude: 40.7128,
    longitude: -74.0060,
    accuracy: 100
  },
  windowSize: {
    width: 1366,
    height: 768
  },
  protectWebRTC: true,
  canvasNoise: true,
  webGLNoise: true,
  audioNoise: true
});
```

### Python

#### Basic Usage:

```python
from src.anti_detect_browser import AntiDetectBrowser, create_browser_profile

# Create browser instance
config = create_browser_profile('default')
browser = AntiDetectBrowser(config)

# Launch browser
driver = browser.launch(headless=False)

# Navigate to a URL
browser.goto('https://example.com')

# Your automation code here

# Close browser
browser.close()
```

#### Advanced Configuration:

```python
config = {
    'headless': False,
    'proxy': 'http://proxy-server:port',
    'window_size': {'width': 1366, 'height': 768},
}

browser = AntiDetectBrowser(config)
```

## 📚 Examples

### Running Examples

#### JavaScript:

```bash
# Basic example
npm run example

# Or run directly
node examples/basic-example.js
node examples/advanced-example.js
```

#### Python:

```bash
# Basic example
python examples/basic-example.py

# Advanced example
python examples/advanced-example.py
```

## 🎯 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headless` | boolean | `false` | Run browser in headless mode |
| `proxy` | string | `null` | Proxy server address (e.g., 'http://host:port') |
| `userAgent` | string | `null` | Custom user agent (random if not provided) |
| `windowSize` | object | `{width: 1920, height: 1080}` | Browser window size |
| `timezone` | string | `null` | Timezone (e.g., 'America/New_York') |
| `geolocation` | object | `null` | Geolocation coordinates |
| `protectWebRTC` | boolean | `true` | Enable WebRTC leak protection |
| `canvasNoise` | boolean | `true` | Enable canvas fingerprinting protection |
| `webGLNoise` | boolean | `true` | Enable WebGL fingerprinting protection |
| `audioNoise` | boolean | `true` | Enable audio fingerprinting protection |

## 🔍 Testing Detection

You can test the anti-detection features on these websites:

- **Bot Detection**: https://bot.sannysoft.com/
- **Canvas Fingerprinting**: https://browserleaks.com/canvas
- **WebRTC Leaks**: https://browserleaks.com/webrtc
- **Browser Fingerprint**: https://browserleaks.com/
- **User Agent**: https://www.whatismybrowser.com/

## 🏗️ Project Structure

```
.
├── src/
│   ├── index.js                    # Main JavaScript implementation
│   ├── config.js                   # Configuration management
│   ├── fingerprint-spoofer.js      # Fingerprint spoofing logic
│   └── anti_detect_browser.py      # Python implementation
├── examples/
│   ├── basic-example.js            # Basic JavaScript example
│   ├── advanced-example.js         # Advanced JavaScript example
│   ├── basic-example.py            # Basic Python example
│   └── advanced-example.py         # Advanced Python example
├── package.json                    # Node.js dependencies
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## 🛡️ Anti-Detection Techniques

This software implements multiple anti-detection techniques:

1. **Navigator Properties**: Removes `webdriver` flag and spoofs plugins
2. **Canvas Fingerprinting**: Adds imperceptible noise to canvas data
3. **WebGL Fingerprinting**: Spoofs GPU vendor and renderer information
4. **Audio Context**: Adds subtle variations to audio output
5. **Font Fingerprinting**: Randomizes font rendering metrics
6. **Screen Properties**: Spoofs screen resolution and color depth
7. **Hardware Fingerprinting**: Spoofs CPU cores and memory
8. **WebRTC Protection**: Masks real IP addresses
9. **Battery API**: Blocks battery status tracking
10. **Permissions**: Handles permission queries naturally

## ⚠️ Disclaimer

This software is provided for educational and testing purposes only. Users are responsible for ensuring their use of this software complies with all applicable laws and website terms of service. The developers assume no liability for misuse of this software.

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

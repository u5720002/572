# Installation Guide

## Prerequisites

Before installing the Anti-Detect Browser software, ensure you have the following prerequisites installed on your system.

### For JavaScript/Node.js Implementation

- **Node.js**: Version 14.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm**: Usually comes with Node.js
  - Verify installation: `npm --version`

### For Python Implementation

- **Python**: Version 3.7 or higher
  - Download from: https://www.python.org/
  - Verify installation: `python --version` or `python3 --version`

- **pip**: Usually comes with Python
  - Verify installation: `pip --version` or `pip3 --version`

## Installation Steps

### JavaScript/Node.js Version

#### 1. Clone or Download the Repository

```bash
git clone https://github.com/yourusername/anti-detect-browser.git
cd anti-detect-browser
```

Or download and extract the ZIP file to your desired location.

#### 2. Install Dependencies

```bash
npm install
```

This will install the following packages:
- `puppeteer` - Headless Chrome automation
- `puppeteer-extra` - Enhanced Puppeteer with plugin support
- `puppeteer-extra-plugin-stealth` - Stealth plugin for anti-detection
- `user-agents` - User agent rotation

#### 3. Verify Installation

```bash
npm run example
```

This should launch a browser and navigate to a test page.

### Python Version

#### 1. Clone or Download the Repository

```bash
git clone https://github.com/yourusername/anti-detect-browser.git
cd anti-detect-browser
```

#### 2. Create a Virtual Environment (Recommended)

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This will install the following packages:
- `selenium` - Web browser automation
- `undetected-chromedriver` - Patched ChromeDriver for anti-detection
- `fake-useragent` - User agent rotation
- `selenium-stealth` - Additional stealth features

#### 4. Verify Installation

```bash
python examples/basic-example.py
```

This should launch a browser and navigate to a test page.

## Platform-Specific Notes

### Windows

- **Chrome/Chromium**: The software will automatically download a compatible Chrome version
- **Firewall**: You may need to allow Node.js/Python through Windows Firewall
- **Antivirus**: Some antivirus software may flag browser automation tools. Add an exception if needed

### macOS

- **Permissions**: You may need to grant permissions for Chrome to be controlled
- **Gatekeeper**: If you get a security warning, go to System Preferences > Security & Privacy and allow the application

### Linux

#### Required System Packages

For the browser to work properly on Linux, you may need to install additional system packages:

```bash
# Debian/Ubuntu
sudo apt-get update
sudo apt-get install -y \
    chromium-browser \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils

# Fedora/CentOS/RHEL
sudo dnf install -y \
    chromium \
    nss \
    libXScrnSaver \
    alsa-lib \
    liberation-fonts \
    libappindicator-gtk3 \
    xdg-utils

# Arch Linux
sudo pacman -S chromium nss libxss alsa-lib ttf-liberation
```

#### Display Server

If running headless on a server without a display, you may need Xvfb:

```bash
sudo apt-get install -y xvfb

# Run with Xvfb
xvfb-run -a node examples/basic-example.js
```

## Troubleshooting

### JavaScript/Node.js Issues

#### "Chromium revision is not downloaded"

```bash
# Manually install Chromium
node node_modules/puppeteer/install.js
```

#### "Cannot find module"

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Port conflicts

If you encounter port conflicts, check for running Chrome instances:

```bash
# Kill all Chrome processes
pkill chrome
pkill chromium
```

### Python Issues

#### "chromedriver not found"

The `undetected-chromedriver` package should automatically download the correct ChromeDriver. If it fails:

```bash
# Reinstall the package
pip uninstall undetected-chromedriver
pip install undetected-chromedriver
```

#### "selenium.common.exceptions.WebDriverException"

This usually means Chrome/Chromium is not installed or not in PATH:

```bash
# Install Chrome on Ubuntu/Debian
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get install -f
```

#### Import errors

```bash
# Ensure all dependencies are installed
pip install -r requirements.txt --upgrade
```

### General Issues

#### Permission Denied

```bash
# On Unix-like systems, ensure scripts are executable
chmod +x examples/*.py
chmod +x examples/*.js
```

#### Out of Memory

If you encounter memory issues:
- Reduce the number of concurrent browser instances
- Use headless mode: `headless: true`
- Increase system swap space

#### SSL/Certificate Errors

Add the following to disable SSL verification (not recommended for production):

```javascript
// JavaScript
args: ['--ignore-certificate-errors']
```

```python
# Python
options.add_argument('--ignore-certificate-errors')
```

## Updating

### JavaScript/Node.js

```bash
npm update
```

### Python

```bash
pip install -r requirements.txt --upgrade
```

## Uninstallation

### JavaScript/Node.js

```bash
# Remove dependencies
rm -rf node_modules package-lock.json
```

### Python

```bash
# Deactivate virtual environment
deactivate

# Remove virtual environment
rm -rf venv

# Or uninstall packages
pip uninstall -r requirements.txt -y
```

## Next Steps

After successful installation:

1. Read the [API Documentation](API.md) to understand available features
2. Try the example scripts in the `examples/` directory
3. Test anti-detection on websites like https://bot.sannysoft.com/
4. Configure profiles in `config/profiles.json` for your use case
5. Review the main [README](../README.md) for usage examples

## Getting Help

If you encounter issues not covered here:

1. Check the [README](../README.md) for common usage patterns
2. Review the [API Documentation](API.md)
3. Search for similar issues on GitHub
4. Open a new issue with details about your problem

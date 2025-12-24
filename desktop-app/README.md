# Desktop Application

This directory contains files to build standalone desktop applications for the Anti-Detect Browser.

## 📱 Two Application Types

### 1. Electron Desktop App (GUI)
Modern cross-platform desktop application with a user-friendly graphical interface.

**Files:**
- `main.js` - Main Electron process
- `preload.js` - Preload script for security
- `renderer.js` - UI logic
- `index.html` - Application UI
- `styles.css` - Application styling
- `package.json` - Electron configuration

**Build:**
```bash
npm install
npm run build          # All platforms
npm run build:win      # Windows only
npm run build:mac      # macOS only
npm run build:linux    # Linux only
```

### 2. Python GUI Application
Standalone Python executable with tkinter-based GUI.

**Files:**
- `main_gui.py` - Python GUI application
- `anti_detect_browser.spec` - PyInstaller configuration

**Build:**
```bash
pip install pyinstaller
pip install -r ../requirements.txt
pyinstaller anti_detect_browser.spec
```

## 🚀 Quick Start

**Option 1: Use build scripts (Recommended)**
```bash
cd ../build-scripts
./build.sh        # macOS/Linux
build.bat         # Windows
```

**Option 2: Manual build**
```bash
# For Electron
npm install
npm run build

# For Python
pyinstaller anti_detect_browser.spec
```

## 📦 Output

Built applications will be in the `dist/` directory:

**Electron:**
- Windows: `.exe` installer and portable
- macOS: `.dmg` and `.app`
- Linux: `.AppImage`, `.deb`, `.rpm`

**Python:**
- Windows: `AntiDetectBrowser.exe`
- macOS: `AntiDetectBrowser.app`
- Linux: `AntiDetectBrowser`

## 🎯 Features

Both applications provide:
- ✅ Configuration options (profiles, proxy, timezone, geolocation)
- ✅ Browser launch and control
- ✅ URL navigation
- ✅ Quick test links for bot detection sites
- ✅ Real-time status updates
- ✅ User-friendly interface

## 📖 Documentation

For detailed build instructions, see [SOFTWARE_BUILD.md](../docs/SOFTWARE_BUILD.md)

## 🐛 Troubleshooting

**Electron build fails:**
- Ensure Node.js and npm are installed
- Run `npm install` in this directory
- Check `node_modules` exists

**PyInstaller build fails:**
- Ensure Python 3.7+ is installed
- Install PyInstaller: `pip install pyinstaller`
- Install dependencies: `pip install -r ../requirements.txt`

**Application won't start:**
- Check if Chrome/Chromium is installed
- Verify all dependencies are bundled
- Check console/terminal for error messages

## ⚙️ Requirements

**For Electron build:**
- Node.js 14+
- npm

**For Python build:**
- Python 3.7+
- PyInstaller
- All project dependencies from requirements.txt

## 📝 Notes

- First build may take several minutes
- Built applications are self-contained
- No additional installation required for end users
- Applications include bundled Chromium (Electron) or require Chrome installation (Python)

# Converting Code to Standalone Software

This guide explains how to convert the Anti-Detect Browser code into standalone executable software for Windows, macOS, and Linux.

## 📦 Two Software Options

We provide **two ways** to create standalone software:

### 1. **Electron Desktop Application** (Recommended)
- Cross-platform GUI application
- Modern, user-friendly interface
- Supports Windows, macOS, and Linux
- Self-contained with all dependencies

### 2. **Python Executable** (PyInstaller)
- Standalone Python-based application
- GUI interface using tkinter
- Single executable file
- Lighter weight option

---

## 🚀 Quick Start

### Option 1: Build Electron Desktop App

#### Prerequisites:
- Node.js 14+ installed
- npm (comes with Node.js)

#### Steps:

**On Windows:**
```bash
cd build-scripts
build.bat
# Choose option 1
```

**On macOS/Linux:**
```bash
cd build-scripts
chmod +x build.sh
./build.sh
# Choose option 1
```

#### Output:
- Windows: `desktop-app/dist/Anti-Detect Browser Setup.exe` (installer) or `.exe` (portable)
- macOS: `desktop-app/dist/Anti-Detect Browser.dmg`
- Linux: `desktop-app/dist/Anti-Detect Browser.AppImage`, `.deb`, `.rpm`

---

### Option 2: Build Python Executable

#### Prerequisites:
- Python 3.7+ installed
- pip (Python package manager)

#### Steps:

**On Windows:**
```bash
pip install pyinstaller
cd desktop-app
pyinstaller anti_detect_browser.spec
```

**On macOS/Linux:**
```bash
pip3 install pyinstaller
cd desktop-app
pyinstaller anti_detect_browser.spec
```

#### Output:
- Windows: `desktop-app/dist/AntiDetectBrowser.exe`
- macOS: `desktop-app/dist/AntiDetectBrowser.app`
- Linux: `desktop-app/dist/AntiDetectBrowser`

---

## 🔧 Manual Build Instructions

### Electron Desktop App

1. **Navigate to desktop-app directory:**
   ```bash
   cd desktop-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build for specific platform:**

   **Windows:**
   ```bash
   npm run build:win
   ```

   **macOS:**
   ```bash
   npm run build:mac
   ```

   **Linux:**
   ```bash
   npm run build:linux
   ```

   **All platforms:**
   ```bash
   npm run build
   ```

4. **Find the built application:**
   - Check `desktop-app/dist/` directory
   - Look for installers and portable executables

### Python Executable with PyInstaller

1. **Install PyInstaller:**
   ```bash
   pip install pyinstaller
   ```

2. **Install project dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Navigate to desktop-app directory:**
   ```bash
   cd desktop-app
   ```

4. **Build the executable:**
   ```bash
   pyinstaller anti_detect_browser.spec --clean
   ```

5. **Find the executable:**
   - Windows: `dist/AntiDetectBrowser.exe`
   - macOS: `dist/AntiDetectBrowser.app`
   - Linux: `dist/AntiDetectBrowser`

---

## 📱 Using the Desktop Application

### Electron App Features:

1. **Configuration Tab:**
   - Select profile (Default, Stealth, Performance, Mobile)
   - Toggle headless mode
   - Enable/disable WebRTC protection
   - Enable/disable canvas noise
   - Configure proxy server
   - Set timezone
   - Set geolocation coordinates

2. **Navigation Tab:**
   - Enter URL to visit
   - Quick test links for bot detection sites
   - One-click navigation to common test pages

3. **Status Display:**
   - Real-time status updates
   - Success/error messages
   - Operation feedback

### Python GUI App Features:

Similar to Electron app with:
- Profile selection
- Configuration options
- URL navigation
- Quick test links
- Status logging

---

## 🎯 Distribution

### Electron App Distribution

**Windows:**
- **Installer (.exe):** Full installation experience with start menu shortcuts
- **Portable (.exe):** Run without installation

**macOS:**
- **DMG:** Drag-and-drop installation
- **ZIP:** Extract and run

**Linux:**
- **AppImage:** Run anywhere without installation
- **DEB:** For Debian/Ubuntu-based systems
- **RPM:** For Fedora/RHEL-based systems

### Python Executable Distribution

- Single executable file
- No Python installation required
- Includes all dependencies
- Larger file size (~100-200 MB due to bundled Python runtime)

---

## 📋 File Sizes (Approximate)

| Platform | Electron App | Python Executable |
|----------|--------------|-------------------|
| Windows  | 150-200 MB   | 100-150 MB        |
| macOS    | 200-250 MB   | 120-180 MB        |
| Linux    | 180-220 MB   | 100-150 MB        |

---

## 🔐 Code Signing (Optional)

For production distribution, consider code signing:

### Windows:
```bash
# Using electron-builder with certificate
npm run build:win -- --config.win.certificateFile=cert.pfx --config.win.certificatePassword=password
```

### macOS:
```bash
# Using electron-builder with Apple Developer ID
npm run build:mac -- --config.mac.identity="Developer ID Application: Your Name"
```

---

## 🐛 Troubleshooting

### Electron Build Issues

**Problem:** "Command not found: electron-builder"
**Solution:**
```bash
cd desktop-app
npm install
```

**Problem:** Build fails on macOS
**Solution:** Install Xcode Command Line Tools:
```bash
xcode-select --install
```

### PyInstaller Issues

**Problem:** "ModuleNotFoundError" when running executable
**Solution:** Add missing modules to `hiddenimports` in `.spec` file:
```python
hiddenimports=['missing_module_name']
```

**Problem:** Executable is too large
**Solution:** Use one-file mode and enable UPX compression:
```bash
pyinstaller --onefile --upx-dir=/path/to/upx anti_detect_browser.spec
```

**Problem:** Antivirus flags the executable
**Solution:**
- Code sign your executable
- Add exclusion in antivirus settings
- Build with `--noupx` flag if UPX causes issues

---

## 📝 Customization

### Changing App Icon

**Electron:**
1. Replace `desktop-app/icon.ico` (Windows)
2. Replace `desktop-app/icon.icns` (macOS)
3. Replace `desktop-app/icon.png` (Linux)
4. Rebuild the app

**PyInstaller:**
1. Replace icon path in `.spec` file
2. Rebuild the executable

### Changing App Name

**Electron:**
Edit `desktop-app/package.json`:
```json
{
  "name": "your-app-name",
  "productName": "Your App Name",
  "build": {
    "appId": "com.yourcompany.appname"
  }
}
```

**PyInstaller:**
Edit `anti_detect_browser.spec`:
```python
exe = EXE(
    name='YourAppName',
    ...
)
```

---

## 🎓 Best Practices

1. **Test Before Distribution:**
   - Test on clean machines without development tools
   - Verify all features work correctly
   - Check file associations and shortcuts

2. **Update Regularly:**
   - Keep dependencies up to date
   - Rebuild when updating code
   - Test compatibility with OS updates

3. **Provide Documentation:**
   - Include user guide with distribution
   - Document system requirements
   - Provide troubleshooting steps

4. **Consider Updates:**
   - Implement auto-update mechanism (electron-updater)
   - Version your releases
   - Maintain changelog

---

## 📦 Complete Build Process

Here's the complete workflow from code to distributable software:

```bash
# 1. Clone/download the repository
git clone <repository-url>
cd anti-detect-browser

# 2. Choose your build method

# For Electron (recommended):
cd desktop-app
npm install
npm run build        # Builds for all platforms

# For Python executable:
pip install -r requirements.txt
pip install pyinstaller
cd desktop-app
pyinstaller anti_detect_browser.spec

# 3. Find your software
cd dist/
# Your standalone software is ready to distribute!
```

---

## 💡 Tips

- **Electron apps** provide better user experience with modern UI
- **Python executables** are lighter but may trigger antivirus warnings
- Always test the built software on the target platform
- Consider creating both installer and portable versions
- Document system requirements for end users

---

## 🆘 Getting Help

If you encounter issues during the build process:

1. Check the error messages carefully
2. Ensure all prerequisites are installed
3. Try cleaning and rebuilding:
   ```bash
   # Electron
   rm -rf node_modules dist
   npm install
   npm run build
   
   # PyInstaller
   rm -rf build dist
   pyinstaller anti_detect_browser.spec --clean
   ```

4. Check the official documentation:
   - [Electron Builder](https://www.electron.build/)
   - [PyInstaller](https://pyinstaller.org/)

---

## ✅ Verification

After building, verify your software:

- [ ] Application launches without errors
- [ ] All UI elements are visible and functional
- [ ] Browser can be launched successfully
- [ ] Navigation works correctly
- [ ] Configuration options are applied
- [ ] No console errors appear
- [ ] File size is reasonable
- [ ] Works on clean test machine

---

Your code is now converted into standalone, distributable software! 🎉

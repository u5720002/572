# Wallet Hunter - Windows Software Guide

## 🪟 Windows Desktop Application

A user-friendly **Windows GUI application** for educational cryptocurrency wallet generation and analysis.

![Windows Application](https://img.shields.io/badge/Platform-Windows-blue?logo=windows)
![GUI](https://img.shields.io/badge/Interface-GUI-green?logo=python)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📥 Installation Options

### Option 1: Download Pre-built Executable (Easiest)

1. Download `WalletHunter.exe` from the [GitHub releases page](https://github.com/u5720002/572/releases)
2. Double-click to run - **No Python installation required!**
3. Windows may show a security warning - click "More info" → "Run anyway"

**Note**: Pre-built executables will be available in future releases. For now, use Option 2 or 3.

### Option 2: Run from Source (Requires Python)

1. Install Python 3.7+ from [python.org](https://www.python.org/)
2. Install dependencies:
   ```cmd
   pip install -r requirements.txt
   ```
3. Run the GUI:
   ```cmd
   python wallet_hunter_gui.py
   ```

### Option 3: Build Your Own Executable

1. Install Python 3.7+ and dependencies:
   ```cmd
   pip install -r requirements-build.txt
   ```
2. Run the build script:
   ```cmd
   build_windows.bat
   ```
3. Find your executable in `dist\WalletHunter.exe`

---

## 🎨 User Interface Features

### Main Window Components

1. **Configuration Panel**
   - Wallet Type: Choose between Bitcoin or Ethereum
   - Balance Checking: Enable/disable API balance checks
   - API Delay: Set delay between API calls (seconds)
   - Output File: Specify where to save found wallets

2. **Control Buttons**
   - ▶ **Start Hunting**: Begin generating wallets
   - ⏹ **Stop**: Stop the generation process
   - 🗑 **Clear Log**: Clear the activity log

3. **Statistics Display**
   - Wallets Checked: Total number of wallets generated
   - Wallets Found: Number of wallets with balance (extremely rare!)
   - Generation Rate: Wallets generated per second
   - Time Elapsed: Running time

4. **Activity Log**
   - Real-time updates of wallet generation
   - Notification when wallets with balance are found
   - Error messages and status updates

---

## 🚀 Quick Start Guide

### For Beginners

1. **Launch the Application**
   - Double-click `WalletHunter.exe`
   - The application window will open

2. **Basic Configuration**
   - Select wallet type: Bitcoin or Ethereum
   - Keep "Balance Checking" **disabled** for faster generation
   - Leave other settings at defaults

3. **Start Generating**
   - Click "▶ Start Hunting"
   - Watch the statistics update in real-time
   - See wallets being generated at ~1,800/second

4. **Stop When Done**
   - Click "⏹ Stop" to stop generation
   - View final statistics in the log

### Advanced Usage

1. **Enable Balance Checking**
   - ✅ Check "Enable (slower)"
   - Set API Delay to 2.0 seconds (to respect API limits)
   - Note: This significantly slows down generation

2. **Customize Output**
   - Change "Output File" to your preferred location
   - Example: `C:\Users\YourName\Desktop\wallets.txt`

3. **Monitor Results**
   - Found wallets are displayed in the log
   - Automatically saved to the output file
   - A popup notification appears if a wallet is found

---

## 📊 Performance

### Speed Benchmarks

| Mode | Speed | Notes |
|------|-------|-------|
| Without Balance Check | ~1,800 wallets/sec | Maximum speed |
| With Balance Check | ~0.5-1 wallets/sec | Limited by API |

### System Requirements

- **OS**: Windows 7, 8, 10, 11
- **RAM**: 100 MB minimum
- **CPU**: Any modern processor
- **Disk**: 50 MB for executable + space for logs
- **Internet**: Required only for balance checking

---

## 🎯 Understanding the Results

### What to Expect

**Finding a wallet with balance is astronomically unlikely:**

- Total possible addresses: **2^256** ≈ 1.16 × 10^77
- Probability of finding one: **~8.6 × 10^-78**
- Comparison: More likely to be struck by lightning 1000 times in a row

### Educational Value

This application demonstrates:
- ✅ How cryptocurrency wallets are generated
- ✅ Why brute-force attacks are impossible
- ✅ The security of large cryptographic key spaces
- ✅ Elliptic curve cryptography in practice

---

## ⚙️ Configuration Details

### Wallet Types

**Bitcoin**
- Generates: Private key → Public key → Bitcoin address
- Format: Starts with "1" (P2PKH addresses)
- Encoding: Base58 with checksum
- API: blockchain.info for balance checks

**Ethereum**
- Generates: Private key → Ethereum address
- Format: Starts with "0x" (42 characters)
- Hashing: Keccak-256
- API: Etherscan for balance checks

### Balance Checking

**Disabled (Default)**
- Generates wallets at maximum speed
- No internet connection required
- No API calls made
- Best for understanding generation process

**Enabled**
- Checks each wallet's balance via public APIs
- Requires internet connection
- Much slower due to API rate limits
- Use API Delay ≥ 1.0 to avoid rate limiting

---

## 🛡️ Security & Privacy

### Your Safety

✅ **No data is uploaded** - Everything runs locally on your PC
✅ **No tracking** - No analytics or telemetry
✅ **Open source** - Code is publicly available for review
✅ **Secure randomness** - Uses Python's `secrets` module

### Important Notes

⚠️ **Educational Use Only**
- This tool is for learning about cryptocurrency security
- Do not use for malicious purposes
- Finding wallets with balance is not a viable attack

⚠️ **Legal Considerations**
- Using this tool is legal for educational purposes
- Accessing wallets that don't belong to you is illegal
- Respect API terms of service

---

## 📝 Output File Format

When a wallet with balance is found (extremely rare), it's saved in this format:

```
============================================================
Found at: 2025-12-13 17:30:45
Type: Bitcoin
Address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
Private Key: 5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF
Balance: 0.0012
============================================================
```

---

## 🐛 Troubleshooting

### Application Won't Start

**Problem**: Double-clicking does nothing
- **Solution**: Right-click → "Run as administrator"

**Problem**: Windows Defender blocks the app
- **Solution**: Click "More info" → "Run anyway"
- Or add exception in Windows Security settings

### Performance Issues

**Problem**: Slow generation speed
- **Solution**: Disable balance checking
- Close other applications
- Check CPU usage in Task Manager

**Problem**: Application freezes
- **Solution**: Click "Stop" and restart
- Try reducing API delay if balance checking is enabled

### Balance Checking Errors

**Problem**: "Failed to check balance" errors
- **Solution**: Check internet connection
- Increase API delay to 2.0+ seconds
- API may be temporarily unavailable

### Missing Dependencies (Source Installation)

**Problem**: Import errors when running from source
- **Solution**: 
  ```cmd
  pip install -r requirements.txt
  ```

---

## 🏗️ Building from Source

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Build Steps

1. **Install build dependencies**:
   ```cmd
   pip install -r requirements-build.txt
   ```

2. **Run build script**:
   ```cmd
   build_windows.bat
   ```

3. **Find your executable**:
   - Location: `dist\WalletHunter.exe`
   - Size: ~15-20 MB (includes Python runtime)

### Build Options

**Single File Executable** (Default):
- Everything in one .exe file
- Slower startup time
- Easier distribution

**Directory Build**:
- Modify `build_windows.bat`, remove `--onefile`
- Faster startup
- Multiple files to distribute

---

## 📚 Learning Resources

### Understanding Cryptocurrency Wallets

- [How Bitcoin Addresses Work](https://en.bitcoin.it/wiki/Address)
- [Ethereum Address Generation](https://ethereum.org/en/developers/docs/accounts/)
- [Elliptic Curve Cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)

### Mathematics Behind Security

**Address Space**:
- 2^256 = 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936

**Comparison**:
- Atoms in observable universe: ~10^80
- This tool at 1,800/sec would take 2 × 10^66 years to check all addresses
- Age of universe: 1.4 × 10^10 years

---

## 💡 Tips & Best Practices

### Maximizing Learning

1. **Start without balance checking** to see generation speed
2. **Try both Bitcoin and Ethereum** to compare
3. **Watch the statistics** to understand the scale
4. **Read the log messages** for educational insights

### Responsible Use

- ✅ Use for educational purposes
- ✅ Share knowledge about cryptographic security
- ✅ Respect API rate limits
- ❌ Don't abuse API services
- ❌ Don't attempt malicious activities

---

## 🆘 Support

### Getting Help

- **Documentation**: Read this guide thoroughly
- **Issues**: Check existing GitHub issues
- **Community**: Ask questions in discussions

### Reporting Bugs

1. Check if the issue already exists
2. Include error messages from the log
3. Specify Windows version
4. Describe steps to reproduce

---

## 📄 License

MIT License - See LICENSE file for details

**Educational Use Disclaimer**: This software is provided for educational purposes only. The authors are not responsible for any misuse.

---

## 🎓 Educational Outcomes

After using this software, you will understand:

✅ Cryptocurrency wallet generation process
✅ Public/private key cryptography
✅ Why brute-force attacks are infeasible
✅ The importance of secure random number generation
✅ How blockchain APIs work
✅ The mathematics of large numbers

---

## 🚀 What's Next?

### Command-Line Version

For advanced users, the command-line version offers more control:

```cmd
python wallet_hunter.py --type bitcoin --no-balance-check
```

See `README.md` for full CLI documentation.

### Demo Script

Run the demo to see probability calculations:

```cmd
python demo.py
```

---

**Enjoy learning about cryptocurrency security! 🔐**

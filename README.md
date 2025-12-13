# Wallet Hunter

An educational cryptocurrency wallet generator and balance checker for Bitcoin and Ethereum.

**Available in two versions:**
- 🪟 **Windows GUI Application** - User-friendly desktop software (see [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md))
- 💻 **Command-Line Tool** - Advanced terminal interface (documentation below)

## ⚠️ Educational Purpose Only

This tool is designed for **educational purposes only** to demonstrate:
- How cryptocurrency wallets are generated
- The relationship between private keys, public keys, and addresses
- The vast address space of cryptocurrencies
- Basic blockchain API interactions

**Important Notes:**
- Finding a wallet with balance is astronomically unlikely due to the massive address space (2^256 possibilities)
- This demonstrates why random guessing is not a viable attack vector for cryptocurrencies
- Always use this tool responsibly and ethically

## Features

### Windows GUI Application 🪟
- ✅ **User-friendly graphical interface** - No command-line experience needed
- ✅ **One-click executable** - No Python installation required
- ✅ **Real-time statistics dashboard** - Visual feedback on generation rate and progress
- ✅ **Activity log** - See what's happening in real-time
- ✅ **Easy configuration** - Simple dropdowns and checkboxes
- 📖 **See [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md) for detailed instructions**

### Command-Line Tool 💻
- ✅ Bitcoin wallet generation and checking
- ✅ Ethereum wallet generation and checking
- ✅ Real-time balance checking via public APIs
- ✅ Automatic logging of any found wallets with balance
- ✅ Statistics tracking (wallets checked, rate, etc.)
- ✅ Configurable delay to respect API rate limits

## Installation

### Option 1: Windows GUI Application (Easiest) 🪟

**For Windows users who want a simple desktop application:**

1. Download `WalletHunter.exe` from releases (or build it yourself)
2. Double-click to run - **No installation needed!**
3. See [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md) for complete instructions

**To build the Windows executable yourself:**
```cmd
pip install -r requirements-build.txt
build_windows.bat
```
The executable will be in `dist\WalletHunter.exe`

### Option 2: Command-Line Tool 💻

**For developers and advanced users:**

#### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

#### Setup

1. Clone the repository:
```bash
git clone https://github.com/u5720002/572.git
cd 572
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Windows GUI Application 🪟

Simply run `WalletHunter.exe` or:
```cmd
python wallet_hunter_gui.py
```

**Features:**
- Select wallet type (Bitcoin/Ethereum)
- Enable/disable balance checking
- Configure API delay
- Real-time statistics and activity log
- One-click start/stop

📖 **See [WINDOWS_GUIDE.md](WINDOWS_GUIDE.md) for screenshots and detailed usage**

### Command-Line Tool 💻

#### Basic Usage

Run the wallet hunter with default settings (Bitcoin):
```bash
python wallet_hunter.py
```

### Command Line Options

```bash
python wallet_hunter.py [OPTIONS]
```

**Options:**

- `--type {bitcoin,ethereum,btc,eth}` - Type of cryptocurrency wallet to hunt (default: bitcoin)
- `--no-balance-check` - Disable balance checking (just generate wallets)
- `--delay SECONDS` - Delay between API calls in seconds (default: 1.0)
- `--output FILE` - Output file for found wallets (default: found_wallets.txt)

### Examples

Hunt for Bitcoin wallets:
```bash
python wallet_hunter.py --type bitcoin
```

Hunt for Ethereum wallets with 2-second delay:
```bash
python wallet_hunter.py --type ethereum --delay 2.0
```

Generate wallets without balance checking:
```bash
python wallet_hunter.py --no-balance-check
```

Custom output file:
```bash
python wallet_hunter.py --output my_wallets.txt
```

### Stopping the Program

Press `Ctrl+C` to stop the wallet hunter. It will display final statistics before exiting.

## How It Works

### Bitcoin Wallet Generation

1. Generate a random 256-bit private key
2. Derive the public key using secp256k1 elliptic curve cryptography
3. Hash the public key with SHA-256 and RIPEMD-160
4. Add network byte and checksum
5. Encode to Base58 to create the Bitcoin address

### Ethereum Wallet Generation

1. Generate a random 256-bit private key
2. Derive the public key using secp256k1 elliptic curve cryptography
3. Hash the public key with Keccak-256
4. Take the last 20 bytes and prefix with '0x' to create the address

### Balance Checking

- **Bitcoin**: Uses blockchain.info public API
- **Ethereum**: Uses Etherscan public API

Note: Public APIs have rate limits, hence the configurable delay between checks.

## Output Format

When a wallet with balance is found (extremely rare), it's logged to the output file:

```
============================================================
Found at: 2025-12-13 15:30:45
Type: Bitcoin
Address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
Private Key: 5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF
Balance: 0.0012
============================================================
```

## Statistics Display

While running, the program displays real-time statistics:
- Number of wallets checked
- Number of wallets found with balance
- Check rate (wallets per second)

## Dependencies

- `requests` - HTTP library for API calls
- `ecdsa` - Elliptic curve cryptography
- `pycryptodome` - Cryptographic library including Keccak-256 hashing for Ethereum

## Security Considerations

- Never share your private keys
- This tool generates truly random private keys using Python's `secrets` module
- The probability of generating a used address is negligible (approximately 1 in 2^256)
- Always be cautious when dealing with real cryptocurrencies

## Mathematical Background

The security of cryptocurrencies relies on the vast number of possible addresses:

- **Bitcoin/Ethereum**: 2^256 ≈ 1.16 × 10^77 possible private keys
- For comparison, estimated atoms in the observable universe: ~10^80
- Probability of randomly generating a specific address: 1 in 2^256

This makes brute-force wallet hunting computationally infeasible, which is precisely what makes cryptocurrencies secure.

## Limitations

- Public APIs have rate limits (hence the delay parameter)
- Balance checking requires internet connection
- API availability depends on third-party services
- Finding a wallet with balance is astronomically unlikely

## Legal and Ethical Considerations

- This tool is for educational purposes only
- Do not use this tool with malicious intent
- Respect API rate limits and terms of service
- Unauthorized access to others' wallets is illegal

## Troubleshooting

### Import Errors

If you get import errors, ensure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### API Rate Limits

If you're hitting API rate limits, increase the delay:
```bash
python wallet_hunter.py --delay 2.0
```

### No Output

This is expected! Finding a wallet with balance is extremely unlikely. The program is working correctly if you see the statistics updating.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is for educational purposes. Use at your own risk.

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. The authors are not responsible for any misuse of this software. This tool is intended solely for educational purposes to demonstrate cryptocurrency concepts.

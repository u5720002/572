# Bitcoin Wallet Generator - ViolentMonkey Script

A powerful ViolentMonkey/TamperMonkey userscript that generates real Bitcoin wallet addresses with backup codes (mnemonic seed phrases) and checks balance using TrustWallet-compatible format.

## Features

- 🔑 **Generate Real Bitcoin Wallets**: Creates genuine Bitcoin wallet addresses using industry-standard cryptographic libraries
- 📝 **Backup Code Generation**: Generates 24-word mnemonic seed phrases (BIP39 standard) for wallet recovery
- 💰 **Balance Checking**: Check wallet balance in real-time using blockchain APIs
- 🔐 **Multiple Address Formats**: Supports both Legacy (P2PKH) and SegWit (P2WPKH) addresses
- 📱 **TrustWallet Compatible**: All generated wallets can be imported into TrustWallet using the mnemonic phrase
- 🎨 **Beautiful UI**: Clean, modern interface with gradient styling
- 📋 **Easy Copy**: One-click copy buttons for all wallet details

## Installation

### Prerequisites
1. Install a userscript manager in your browser:
   - **Chrome/Edge**: [ViolentMonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) or [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - **Firefox**: [ViolentMonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) or [TamperMonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - **Safari**: [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887)

### Install the Script
1. Click on the userscript manager icon in your browser
2. Select "Create a new script" or "Add new script"
3. Copy the entire contents of `bitcoin-wallet-generator.user.js` from this repository
4. Paste it into the editor
5. Save the script (usually Ctrl+S or Cmd+S)

Alternatively, if you have a direct link to the raw script file:
1. Click on the raw link
2. Your userscript manager should automatically detect it and prompt you to install

## Usage

### Generating a Wallet

1. Navigate to any webpage (the script runs on all pages)
2. Look for the purple "Bitcoin Wallet Generator" panel in the top-right corner
3. Click the **"Generate New Wallet"** button
4. The script will generate:
   - **24-word Backup Code (Mnemonic)**: Your recovery phrase - SAVE THIS SAFELY!
   - **Legacy Address (P2PKH)**: Traditional Bitcoin address starting with "1"
   - **SegWit Address (P2WPKH)**: Modern Bitcoin address starting with "bc1"
   - **Private Key**: Your wallet's private key in WIF format - KEEP THIS SECRET!
   - **Public Key**: Your wallet's public key
   - **Derivation Path**: The BIP44 path used (m/44'/0'/0'/0/0)

### Checking Balance

1. After generating a wallet, click the **"Check Balance"** button
2. The script will query blockchain APIs to fetch the current balance
3. Balance is displayed in:
   - BTC (Bitcoin)
   - Satoshis (smallest Bitcoin unit)
   - USD equivalent (approximate)

### Importing to TrustWallet

To use the generated wallet in TrustWallet:

1. Open TrustWallet app on your mobile device
2. Tap on **"Create a new wallet"** or **"I already have a wallet"**
3. Select **"Import using recovery phrase"**
4. Enter the 24-word backup code (mnemonic) from the generated wallet
5. Set up your password/PIN
6. Your wallet is now imported and ready to use!

You can also import using the private key:
1. In TrustWallet, go to Settings → Wallets
2. Tap the **"+"** icon
3. Select **"Import via Private Key"**
4. Paste the private key from the generated wallet

## Security Warnings

⚠️ **CRITICAL SECURITY INFORMATION**

- **NEVER share your mnemonic (backup code) or private key with anyone**
- **Save your backup code in a secure location** (preferably offline, written on paper)
- **This script generates real wallets** - any Bitcoin sent to these addresses is REAL
- **The developers are NOT responsible** for any loss of funds
- **Use at your own risk** - always verify addresses before sending funds
- **Test with small amounts first** before using for significant transactions
- **Keep your backup code safe** - losing it means losing access to your Bitcoin forever

## Technical Details

### Libraries Used
- **bitcoinjs-lib** (v5.2.0): Bitcoin address generation and transaction handling
- **bip39** (v3.0.4): Mnemonic seed phrase generation and validation
- **bip32** (v2.0.6): Hierarchical Deterministic (HD) wallet key derivation
- **crypto-js** (v4.1.1): Cryptographic functions

### Standards Implemented
- **BIP39**: Mnemonic code for generating deterministic keys
- **BIP32**: Hierarchical Deterministic Wallets
- **BIP44**: Multi-Account Hierarchy for Deterministic Wallets
- **P2PKH**: Pay to Public Key Hash (Legacy addresses)
- **P2WPKH**: Pay to Witness Public Key Hash (SegWit addresses)

### APIs Used
- **Blockchain.info API**: Primary balance checking service
- **BlockCypher API**: Fallback balance checking service

## Features in Detail

### Wallet Generation
- Uses cryptographically secure random number generation
- Generates 24-word mnemonic phrases (256-bit entropy)
- Derives keys using the standard BIP44 path
- Creates both legacy and SegWit addresses for maximum compatibility

### Balance Checking
- Queries multiple blockchain explorers for reliability
- Checks both address types automatically
- Displays balance in multiple formats
- Includes USD conversion based on current exchange rates

### User Interface
- Minimizable panel for non-intrusive use
- Responsive design that works on all screen sizes
- Copy buttons for easy clipboard access
- Color-coded warnings for sensitive information
- Loading indicators for async operations

## Troubleshooting

### Script Not Appearing
- Ensure your userscript manager is installed and enabled
- Refresh the page after installing the script
- Check browser console for errors (F12)

### Balance Check Fails
- Verify internet connection
- API rate limits may apply for frequent checks
- Try again after a few moments
- Check browser console for specific error messages

### Copy Buttons Not Working
- Ensure your browser allows clipboard access
- Some browsers require HTTPS for clipboard API
- Try manually selecting and copying the text

## Development

### Local Development
```bash
# Clone the repository
git clone https://github.com/u5720002/572.git
cd 572

# The userscript is in bitcoin-wallet-generator.user.js
# Edit and save - your userscript manager will auto-update
```

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is provided as-is for educational purposes. Use at your own risk.

## Disclaimer

This software is for educational purposes only. The authors and contributors:
- Are NOT responsible for any financial losses
- Do NOT guarantee the security of generated wallets
- Do NOT provide financial advice
- Recommend using hardware wallets for significant amounts of cryptocurrency

Always practice proper security measures when dealing with cryptocurrency.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation thoroughly before asking

## Changelog

### Version 1.0.0 (Initial Release)
- Bitcoin wallet address generation
- Mnemonic seed phrase (backup code) generation
- Legacy and SegWit address support
- Balance checking functionality
- TrustWallet compatibility
- Modern UI with copy functionality
- Multiple blockchain API support

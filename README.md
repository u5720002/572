# Bitcoin Wallet Generator

A web-based Bitcoin wallet address and backup code generator with balance checking functionality. This tool generates secure Bitcoin wallets compatible with TrustWallet and other standard Bitcoin wallets.

## Features

- 🔐 **Secure Wallet Generation**: Creates Bitcoin wallets using BIP39 mnemonic phrases (12 words)
- 🔑 **Backup Codes**: Generates standard 12-word recovery phrases compatible with TrustWallet
- 📍 **Bitcoin Addresses**: Creates Legacy Bitcoin addresses (P2PKH, starting with '1')
- 🔐 **Private Keys**: Exports WIF format private keys
- 💰 **Balance Checking**: Real-time balance lookup using blockchain.info API
- 📱 **TrustWallet Compatible**: Generated wallets can be imported into TrustWallet
- 📋 **Easy Copy**: One-click copying of addresses, keys, and mnemonic phrases

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or setup required

2. **Generate a Wallet**
   - Click the "Generate New Wallet" button
   - Your wallet will be created with:
     - 12-word backup phrase (mnemonic)
     - Bitcoin address
     - Private key (WIF format)

3. **Check Balance**
   - Click "Check Balance" to view the current BTC balance
   - Shows balance in BTC, satoshis, and approximate USD value

4. **Import to TrustWallet**
   - Open TrustWallet app
   - Select "I already have a wallet"
   - Choose "Import using Recovery Phrase"
   - Enter your 12-word backup phrase
   - Your wallet will be restored with the same address

## Security Warning

⚠️ **IMPORTANT SECURITY NOTES:**

- This tool generates **REAL** Bitcoin wallet addresses
- Keep your backup phrase (seed words) **absolutely secret and secure**
- Anyone with your backup phrase can access your funds
- **Never share** your backup phrase or private key with anyone
- Store your backup phrase offline in a secure location
- This is a client-side tool - all generation happens in your browser
- For production use with significant funds, use a hardware wallet

## Technical Details

### Standards Used
- **BIP39**: Mnemonic phrase generation (12 words, 128-bit entropy)
- **BIP32**: Hierarchical Deterministic wallet structure
- **BIP44**: Standard derivation path for Bitcoin (`m/44'/0'/0'/0/0`)
- **P2PKH**: Legacy Bitcoin addresses (most compatible)

### Libraries
- **bitcoinjs-lib**: Bitcoin cryptographic functions
- **bip39**: Mnemonic phrase generation and validation
- **blockchain.info API**: Balance checking

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any modern browser with JavaScript enabled

## API Usage

The application uses the following public APIs:
- `https://blockchain.info/q/addressbalance/` - For balance checking
- `https://blockchain.info/ticker` - For BTC to USD conversion

## Development

This is a standalone HTML application with no build process required. All dependencies are loaded from CDN:
- crypto-js (4.1.1)
- bip39 (3.0.4)
- bitcoinjs-lib (6.1.0)

## License

This project is provided as-is for educational purposes. Use at your own risk.

## Disclaimer

This tool is for educational and demonstration purposes. The developers are not responsible for any loss of funds or security breaches. Always verify addresses and test with small amounts first.

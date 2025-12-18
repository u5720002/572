# Bitcoin Wallet Generator with Balance Checker

A secure Bitcoin wallet address and backup code (mnemonic) generator with balance checking functionality, compatible with TrustWallet and other BIP39-compatible wallets.

## Features

- ✅ Generate real Bitcoin wallet addresses (Legacy, SegWit, Nested SegWit)
- ✅ Create 12-word mnemonic backup phrases (BIP39)
- ✅ Restore wallets from mnemonic seed phrases
- ✅ Check Bitcoin address balances in real-time
- ✅ Full TrustWallet compatibility
- ✅ Support for both mainnet and testnet
- ✅ Secure cryptographic key generation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/u5720002/572.git
cd 572
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Generate a New Wallet

Generate a new Bitcoin wallet with addresses and mnemonic backup:

```bash
node index.js generate
```

Or for testnet:
```bash
node index.js generate testnet
```

This will display:
- 12-word mnemonic backup phrase
- Private key (WIF format)
- Three types of Bitcoin addresses:
  - Legacy address (starts with '1')
  - SegWit address (starts with 'bc1')
  - Nested SegWit address (starts with '3')
- Current balance for all addresses

### Restore Wallet from Mnemonic

Restore an existing wallet using your 12-word backup phrase:

```bash
node index.js restore word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12
```

For testnet:
```bash
node index.js restore word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12 testnet
```

### Check Balance

Check the balance of any Bitcoin address:

```bash
node index.js balance <bitcoin_address>
```

Example:
```bash
node index.js balance 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

### Help

Display all available commands:

```bash
node index.js help
```

## How to Use with TrustWallet

1. **Generate or Restore Wallet**: Use this tool to generate a new wallet or restore an existing one
2. **Save Your Mnemonic**: Write down the 12-word mnemonic phrase securely
3. **Open TrustWallet App**: Download and open TrustWallet on your mobile device
4. **Import Wallet**: 
   - Tap "Import Wallet"
   - Select "Bitcoin (BTC)"
   - Enter your 12-word mnemonic phrase
   - Your wallet will be restored with the same addresses

## Security Warnings

⚠️ **IMPORTANT SECURITY NOTES:**

- **Never share your mnemonic phrase** with anyone
- **Never share your private key** with anyone
- **Store your backup phrase offline** in a secure location
- The mnemonic phrase gives **complete access** to your Bitcoin
- If someone gets your mnemonic, they can **steal all your funds**
- This tool is for educational purposes - use at your own risk
- Always verify addresses before sending Bitcoin
- Test with small amounts first

## Technical Details

### Standards Compliance

- **BIP39**: Mnemonic code for generating deterministic keys
- **BIP32**: Hierarchical Deterministic Wallets
- **BIP44**: Multi-Account Hierarchy for Deterministic Wallets
- **Derivation Path**: m/44'/0'/0'/0/0 (Bitcoin standard)

### Address Types

1. **Legacy (P2PKH)**: Traditional Bitcoin addresses starting with '1'
2. **SegWit (P2WPKH)**: Native SegWit addresses starting with 'bc1' (lower fees)
3. **Nested SegWit (P2SH-P2WPKH)**: Wrapped SegWit addresses starting with '3'

### Dependencies

- `bitcoinjs-lib`: Bitcoin protocol implementation
- `bip39`: Mnemonic generation and validation
- `bip32`: HD wallet key derivation
- `ecpair`: Elliptic curve key pairs
- `tiny-secp256k1`: Elliptic curve cryptography
- `axios`: HTTP client for balance checking

## API Documentation

### Wallet Generator Module

```javascript
const { generateWallet, restoreWallet } = require('./wallet-generator');

// Generate new wallet
const wallet = generateWallet('mainnet'); // or 'testnet'

// Restore from mnemonic
const restored = restoreWallet('your twelve word mnemonic phrase here', 'mainnet');
```

### Balance Checker Module

```javascript
const { getBalance, getAddressInfo } = require('./balance-checker');

// Get simple balance
const balance = await getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get detailed address information
const info = await getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
```

## Examples

### Example Output - Generate Wallet

```
╔════════════════════════════════════════════════════════════════╗
║          BITCOIN WALLET - COMPATIBLE WITH TRUSTWALLET          ║
╚════════════════════════════════════════════════════════════════╝

⚠️  SECURITY WARNING: Keep your mnemonic and private key safe!
⚠️  Never share them with anyone!

📝 BACKUP CODE (Mnemonic Seed Phrase):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 IMPORTANT: Write down these 12 words in order and store them safely.
   You can restore your wallet in TrustWallet or any BIP39 compatible wallet.

📍 Bitcoin Addresses:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Legacy (P2PKH):       1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA
   SegWit (bech32):      bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4
   Nested SegWit (P2SH): 3JvL6Ymt8MVWiCNHC7oWU6nLeHNJKLZGLN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## License

MIT License - See LICENSE file for details

## Disclaimer

This software is provided as-is for educational purposes. The authors are not responsible for any loss of funds. Always verify the code and use at your own risk. Never store large amounts of Bitcoin in wallets generated by untrusted software.

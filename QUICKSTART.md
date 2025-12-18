# Quick Start Guide

## Installation

```bash
npm install
```

## Usage Examples

### 1. Generate a New Bitcoin Wallet

```bash
node index.js generate
```

This will create:
- A new 12-word mnemonic backup phrase
- Three Bitcoin addresses (Legacy, SegWit, Nested SegWit)
- Private key in WIF format
- Check current balance for all addresses

### 2. Generate a Testnet Wallet

```bash
node index.js generate testnet
```

### 3. Restore Wallet from Mnemonic

```bash
node index.js restore word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12
```

### 4. Check Balance of Any Address

```bash
node index.js balance 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

### 5. View Help

```bash
node index.js help
```

## Using in TrustWallet

1. Generate or restore a wallet using this tool
2. Copy the 12-word mnemonic phrase
3. Open TrustWallet app on your phone
4. Tap "Import Wallet"
5. Select "Bitcoin (BTC)"
6. Enter your 12-word mnemonic phrase
7. Your wallet will be restored with the same addresses

## Security Reminders

⚠️ **NEVER** share your mnemonic phrase with anyone
⚠️ **NEVER** share your private key with anyone
⚠️ **ALWAYS** keep your backup phrase offline and secure
⚠️ Test with small amounts first before using with real funds

## Using as a Library

```javascript
const { generateWallet, restoreWallet } = require('./wallet-generator');
const { getBalance } = require('./balance-checker');

// Generate new wallet
const wallet = generateWallet('mainnet');
console.log('Mnemonic:', wallet.mnemonic);
console.log('Legacy Address:', wallet.addresses.legacy);
console.log('SegWit Address:', wallet.addresses.segwit);

// Restore from mnemonic
const restored = restoreWallet('your twelve word phrase here', 'mainnet');
console.log('Restored Address:', restored.addresses.segwit);

// Check balance
async function checkMyBalance() {
  const balance = await getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
  console.log('Balance:', balance.balanceBTC, 'BTC');
}

checkMyBalance();
```

## Features

✅ BIP39 standard mnemonic generation
✅ BIP32 hierarchical deterministic wallet
✅ BIP44 derivation path (m/44'/0'/0'/0/0)
✅ Multiple address types (Legacy, SegWit, Nested SegWit)
✅ TrustWallet compatible
✅ Real-time balance checking
✅ Mainnet and Testnet support

## Troubleshooting

**Q: Balance checking is not working**
A: Balance checking requires internet connection. The tool uses blockchain.info API which may be rate-limited or unavailable.

**Q: Can I use this with other wallets?**
A: Yes! Any BIP39-compatible wallet (Ledger, Trezor, Exodus, Electrum, etc.) can restore wallets using the mnemonic phrase.

**Q: Which address type should I use?**
A: SegWit (bech32) addresses are recommended as they have lower transaction fees. However, all three types work with the same mnemonic.

**Q: Is this safe to use?**
A: This tool generates real Bitcoin addresses using industry-standard cryptographic libraries. However, always verify the code yourself and use at your own risk. Never use untrusted wallet generators for large amounts.

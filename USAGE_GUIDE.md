# Bitcoin Wallet Generator - Usage Guide

## Quick Start

1. **Choose Your Version:**
   - `index.html` - Full version (requires internet for CDN libraries)
   - `index-standalone.html` - Standalone version with loading indicator
   - `demo.html` - Demo version (works offline but NOT SECURE)

2. **Open the File:**
   - Simply open the HTML file in any modern web browser
   - No installation or setup required

## How to Generate a Wallet

### Step 1: Generate
1. Open the application in your browser
2. Click the **"Generate New Wallet"** button
3. Your wallet will be created instantly with:
   - 12-word backup phrase (mnemonic)
   - Bitcoin address
   - Private key (WIF format)

### Step 2: Save Your Backup Phrase
⚠️ **CRITICAL:** Write down your 12-word backup phrase on paper and store it in a secure location.

**Important Notes:**
- Anyone with your backup phrase can access your funds
- Never share it with anyone
- Never store it digitally (screenshots, cloud storage, etc.)
- Write it down in order (1-12)

### Step 3: Copy Your Bitcoin Address
1. Click **"Copy Address"** to copy your Bitcoin address
2. This is the address you give to others to receive Bitcoin
3. You can share this publicly - it's safe to do so

### Step 4: Check Balance
1. Click **"Check Balance"** to view your wallet's balance
2. The application will fetch the current balance from the blockchain
3. You'll see:
   - Balance in BTC
   - Balance in satoshis
   - Approximate USD value

## How to Import into TrustWallet

### Mobile App Import
1. Download and open **TrustWallet** app on your mobile device
2. Tap **"I already have a wallet"**
3. Select **"Import using Recovery Phrase"**
4. Enter your 12-word backup phrase (in exact order)
5. Your Bitcoin wallet will be restored with the same address

### Verification
After importing, verify that:
- The Bitcoin address matches what was generated
- You can see the correct balance
- All transactions are visible

## Security Best Practices

### ✅ DO:
- Write down your backup phrase on paper
- Store it in a secure, offline location
- Verify your address before receiving large amounts
- Test with small amounts first
- Keep multiple secure copies of your backup phrase
- Use the full version (index.html) for real wallets

### ❌ DON'T:
- Share your backup phrase with anyone
- Store your backup phrase digitally
- Take screenshots of your private key
- Use the demo version for real wallets
- Generate wallets on public/shared computers
- Trust anyone claiming they need your backup phrase

## Understanding Your Wallet

### 12-Word Backup Phrase (Mnemonic)
- **What:** A human-readable representation of your wallet seed
- **Purpose:** Complete recovery of your wallet
- **Security:** Keep this absolutely secret
- **Standard:** BIP39 (Bitcoin Improvement Proposal 39)

### Bitcoin Address
- **What:** Your public receiving address
- **Format:** Starts with '1' (Legacy P2PKH format)
- **Purpose:** Give this to others to receive Bitcoin
- **Security:** Safe to share publicly

### Private Key (WIF)
- **What:** Wallet Import Format private key
- **Purpose:** Alternative way to import your wallet
- **Security:** Keep this secret (like your backup phrase)
- **Format:** Starts with '5' for uncompressed keys

## Technical Details

### BIP Standards Used
- **BIP39:** Mnemonic code for generating deterministic keys
- **BIP32:** Hierarchical Deterministic wallets
- **BIP44:** Multi-account hierarchy for deterministic wallets
- **Derivation Path:** m/44'/0'/0'/0/0 (standard Bitcoin path)

### Address Format
- **Type:** P2PKH (Pay-to-PubKey-Hash)
- **Prefix:** 1 (mainnet)
- **Compatibility:** Works with all Bitcoin wallets
- **TrustWallet:** Fully compatible

## Troubleshooting

### Libraries Not Loading (index.html)
**Problem:** Error message about libraries failing to load  
**Solution:** 
- Check your internet connection
- Disable ad blockers or privacy extensions
- Try the demo.html version (offline)

### Balance Shows 0.00000000 BTC
**Possible Reasons:**
- This is a newly generated wallet with no funds
- The balance API is temporarily unavailable
- Network connectivity issues

### Can't Import into TrustWallet
**Checklist:**
- Ensure you're entering all 12 words in exact order
- Check spelling of each word
- Make sure you're using the Recovery Phrase option
- Try importing on a different device

### Copy Button Not Working
**Solution:**
- Grant clipboard permissions to your browser
- Try manually selecting and copying the text
- Use a different browser

## Receiving Bitcoin

1. Copy your Bitcoin address
2. Share it with the sender
3. Wait for the transaction to be confirmed (usually 10-60 minutes)
4. Check your balance

## Version Differences

| Feature | index.html | index-standalone.html | demo.html |
|---------|------------|----------------------|-----------|
| Real wallet generation | ✅ | ✅ | ❌ |
| Requires internet | ✅ | ✅ | ❌ |
| Loading indicator | ❌ | ✅ | ❌ |
| Production ready | ✅ | ✅ | ❌ |
| Security level | High | High | Low (demo only) |

## FAQ

**Q: Is this safe to use?**  
A: The full versions (index.html, index-standalone.html) use industry-standard cryptographic libraries and are as safe as any web-based wallet generator. However, for large amounts, consider hardware wallets.

**Q: Do I need to be online?**  
A: You need internet to load the cryptographic libraries (except demo.html), but wallet generation happens locally in your browser.

**Q: Can you recover my wallet if I lose my backup phrase?**  
A: No. Bitcoin wallets are designed to be unrecoverable without the backup phrase. This is a feature, not a bug.

**Q: Why 12 words?**  
A: 12 words provide 128 bits of entropy, which is considered secure. Some wallets use 24 words (256 bits) for even higher security.

**Q: Can I use this wallet with other apps besides TrustWallet?**  
A: Yes! The backup phrase is compatible with any wallet that supports BIP39/BIP44, including Exodus, Electrum, Mycelium, and many others.

**Q: What's the difference between the backup phrase and private key?**  
A: Both can recover your wallet, but the backup phrase is easier to write down and supports multiple addresses. The private key is for a single address.

## Support

For issues or questions:
- Check the README.md file
- Review Bitcoin BIP39/BIP44 documentation
- Consult TrustWallet's official documentation

## Disclaimer

This tool is provided as-is for educational purposes. The developers are not responsible for any loss of funds or security breaches. Always:
- Verify addresses before receiving funds
- Test with small amounts first
- Keep your backup phrase secure
- Use at your own risk

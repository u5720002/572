# Web Version Guide

## Overview

The Bitcoin Wallet Generator now includes a beautiful, user-friendly web interface that runs in your browser. This provides an easy-to-use alternative to the command-line interface.

## Features

- 🌐 **Modern Web Interface**: Beautiful, responsive design that works on desktop and mobile
- 🔐 **Secure Wallet Generation**: Generate Bitcoin wallets with BIP39 mnemonic phrases
- 🔄 **Wallet Restoration**: Restore wallets from existing 12-word mnemonic phrases
- 💰 **Balance Checker**: Check Bitcoin address balances in real-time
- 📋 **One-Click Copy**: Copy addresses, mnemonics, and keys with a single click
- 📱 **Responsive Design**: Works perfectly on phones, tablets, and desktops
- 🎨 **Clean UI**: Professional gradient design with clear visual hierarchy

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including Express for the web server.

### 2. Start the Web Server

```bash
npm run web
```

The server will start on `http://localhost:3000`

### 3. Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

## Using the Web Interface

### Generate a New Wallet

1. Click on the **"Generate Wallet"** tab (default)
2. Select your network (Bitcoin Mainnet or Testnet)
3. Click **"Generate New Wallet"**
4. Your wallet will be created with:
   - 12-word mnemonic phrase displayed as numbered boxes
   - Private key (WIF format)
   - Three Bitcoin addresses (Legacy, SegWit, Nested SegWit)
   - Instructions for importing to TrustWallet

### Restore an Existing Wallet

1. Click on the **"Restore Wallet"** tab
2. Enter your 12-word mnemonic phrase (space-separated)
3. Select your network (Bitcoin Mainnet or Testnet)
4. Click **"Restore Wallet"**
5. Your wallet addresses and keys will be displayed

### Check Address Balance

1. Click on the **"Check Balance"** tab
2. Enter any Bitcoin address
3. Click **"Check Balance"**
4. View the current balance and transaction history

## Security Features

- ⚠️ **Security Warnings**: Clear warnings about keeping mnemonics safe
- 🔒 **No Data Storage**: No wallet data is stored on the server
- 🔐 **Client-Side Processing**: All cryptographic operations happen in the backend
- 📋 **Copy Protection**: Encourages users to write down mnemonics instead of just copying

## API Endpoints

The web server provides three API endpoints:

### POST /api/generate
Generate a new wallet
```json
Request:
{
  "network": "mainnet" // or "testnet"
}

Response:
{
  "mnemonic": "word1 word2 ... word12",
  "wif": "private_key_wif",
  "addresses": {
    "legacy": "1...",
    "segwit": "bc1...",
    "nestedSegwit": "3..."
  },
  ...
}
```

### POST /api/restore
Restore wallet from mnemonic
```json
Request:
{
  "mnemonic": "word1 word2 ... word12",
  "network": "mainnet" // or "testnet"
}

Response: Same as /api/generate
```

### POST /api/balance
Check address balance
```json
Request:
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}

Response:
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "balanceBTC": 0.5,
  "balanceSatoshi": 50000000,
  "totalReceived": 1.0,
  "totalSent": 0.5,
  "transactionCount": 5
}
```

## Technical Details

### Server
- **Framework**: Express.js 4.18.2
- **Port**: 3000 (configurable via PORT environment variable)
- **Static Files**: Served from `/public` directory

### Frontend
- **Pure HTML/CSS/JavaScript**: No framework dependencies
- **Responsive Design**: Mobile-first approach with CSS Grid
- **Modern UI**: Gradient backgrounds, smooth animations, professional styling

### Integration
- Uses the same `wallet-generator.js` and `balance-checker.js` modules as the CLI
- Maintains full compatibility with TrustWallet and other BIP39 wallets

## Screenshots

### Main Interface
The clean, modern interface with tabs for different functions:

![Web Interface](https://github.com/user-attachments/assets/78ee8566-523c-473d-9b10-c1f1ecde57b3)

### Generated Wallet
Wallet displayed with mnemonic, keys, and addresses:

![Generated Wallet](https://github.com/user-attachments/assets/af254c72-6b2a-4cb6-b394-0cb08395d22a)

## Deployment Options

### Local Development
```bash
npm run web
```

### Production Deployment

#### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name bitcoin-wallet-web
pm2 save
pm2 startup
```

#### Using Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "web"]
```

Build and run:
```bash
docker build -t bitcoin-wallet-web .
docker run -p 3000:3000 bitcoin-wallet-web
```

#### Using a Cloud Platform
Deploy to Heroku, Railway, Render, or any Node.js hosting platform.

## Environment Variables

- `PORT`: Server port (default: 3000)

Example:
```bash
PORT=8080 npm run web
```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Private Network**: Consider running on a private network for sensitive operations
3. **No Logging**: The server doesn't log wallet data
4. **Client Responsibility**: Users must secure their own mnemonic phrases

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
PORT=3001 npm run web
```

### Cannot Access from Other Devices
The server binds to `localhost` by default. To allow access from other devices on your network, modify `server.js`:
```javascript
app.listen(PORT, '0.0.0.0', () => { ... });
```

### Balance Check Not Working
Balance checking requires internet access to blockchain.info API. If the API is down or rate-limited, balance checks may fail.

## Contributing

Feel free to submit issues or pull requests to improve the web interface!

## License

MIT License - Same as the main project

const express = require('express');
const path = require('path');
const { generateWallet, restoreWallet } = require('./wallet-generator');
const { getBalance, getAddressInfo } = require('./balance-checker');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Generate new wallet
app.post('/api/generate', (req, res) => {
  try {
    const { network = 'mainnet' } = req.body;
    const wallet = generateWallet(network);
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate wallet' });
  }
});

// Restore wallet from mnemonic
app.post('/api/restore', (req, res) => {
  try {
    const { mnemonic, network = 'mainnet' } = req.body;
    
    if (!mnemonic) {
      return res.status(400).json({ error: 'Mnemonic is required' });
    }
    
    const wallet = restoreWallet(mnemonic, network);
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check balance
app.post('/api/balance', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    
    const balance = await getAddressInfo(address);
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║      BITCOIN WALLET GENERATOR - WEB VERSION RUNNING            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🌐 Server is running at: http://localhost:${PORT}`);
  console.log('');
  console.log('📝 Features:');
  console.log('   - Generate new Bitcoin wallets');
  console.log('   - Restore wallets from mnemonic');
  console.log('   - Check address balances');
  console.log('   - TrustWallet compatible');
  console.log('');
  console.log('⚠️  Security: Keep your mnemonic phrase safe!');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('━'.repeat(64));
});

module.exports = app;

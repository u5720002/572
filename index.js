#!/usr/bin/env node

const { generateWallet, restoreWallet } = require('./wallet-generator');
const { getBalance, getAddressInfo, checkMultipleBalances } = require('./balance-checker');

/**
 * Display wallet information in a formatted way
 */
function displayWallet(wallet) {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║          BITCOIN WALLET - COMPATIBLE WITH TRUSTWALLET          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  console.log('⚠️  SECURITY WARNING: Keep your mnemonic and private key safe!');
  console.log('⚠️  Never share them with anyone!\n');
  
  console.log('📝 BACKUP CODE (Mnemonic Seed Phrase):');
  console.log('━'.repeat(64));
  console.log(`   ${wallet.mnemonic}`);
  console.log('━'.repeat(64));
  console.log('\n💡 IMPORTANT: Write down these 12 words in order and store them safely.');
  console.log('   You can restore your wallet in TrustWallet or any BIP39 compatible wallet.\n');
  
  console.log('🔑 Private Key (WIF):');
  console.log(`   ${wallet.wif}\n`);
  
  console.log('📍 Bitcoin Addresses:');
  console.log('━'.repeat(64));
  console.log(`   Legacy (P2PKH):       ${wallet.addresses.legacy}`);
  console.log(`   SegWit (bech32):      ${wallet.addresses.segwit}`);
  console.log(`   Nested SegWit (P2SH): ${wallet.addresses.nestedSegwit}`);
  console.log('━'.repeat(64));
  
  console.log('\n📊 Technical Details:');
  console.log(`   Derivation Path: ${wallet.derivationPath}`);
  console.log(`   Network: ${wallet.network}`);
  console.log(`   Public Key: ${wallet.publicKey}\n`);
  
  console.log('🔄 HOW TO USE IN TRUSTWALLET:');
  console.log('   1. Open TrustWallet app');
  console.log('   2. Tap "Import Wallet"');
  console.log('   3. Select "Bitcoin (BTC)"');
  console.log('   4. Enter your 12-word mnemonic phrase');
  console.log('   5. Your wallet will be restored with the same addresses\n');
}

/**
 * Display balance information
 */
function displayBalance(balanceInfo) {
  console.log('\n💰 Balance Information:');
  console.log('━'.repeat(64));
  
  if (balanceInfo.transactionCount !== undefined) {
    // Detailed info
    console.log(`   Address: ${balanceInfo.address}`);
    console.log(`   Current Balance: ${balanceInfo.balanceBTC} BTC`);
    console.log(`   Total Received: ${balanceInfo.totalReceived} BTC`);
    console.log(`   Total Sent: ${balanceInfo.totalSent} BTC`);
    console.log(`   Transactions: ${balanceInfo.transactionCount}`);
    
    if (balanceInfo.transactions && balanceInfo.transactions.length > 0) {
      console.log('\n   Recent Transactions:');
      balanceInfo.transactions.forEach((tx, idx) => {
        console.log(`   ${idx + 1}. ${tx.hash.substring(0, 16)}... (${tx.result >= 0 ? '+' : ''}${tx.result} BTC)`);
      });
    }
  } else {
    // Simple balance
    console.log(`   Address: ${balanceInfo.address}`);
    console.log(`   Balance: ${balanceInfo.balanceBTC} BTC`);
    console.log(`   Balance: ${balanceInfo.balanceSatoshi} satoshis`);
  }
  
  console.log('━'.repeat(64) + '\n');
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'generate' || !command) {
    // Generate new wallet
    const network = args[1] === 'testnet' ? 'testnet' : 'mainnet';
    console.log(`\n🔐 Generating new Bitcoin wallet (${network})...\n`);
    
    const wallet = generateWallet(network);
    displayWallet(wallet);
    
    // Check balances for all addresses
    console.log('🔍 Checking balances...\n');
    const addresses = [
      wallet.addresses.legacy,
      wallet.addresses.segwit,
      wallet.addresses.nestedSegwit
    ];
    
    const balances = await checkMultipleBalances(addresses);
    balances.forEach(balance => {
      console.log(`   ${balance.address}: ${balance.balanceBTC} BTC`);
    });
    console.log();
    
  } else if (command === 'restore') {
    // Restore wallet from mnemonic
    const mnemonic = args.slice(1, 13).join(' ');
    const network = args[13] === 'testnet' ? 'testnet' : 'mainnet';
    
    if (!mnemonic || mnemonic.split(' ').length < 12) {
      console.log('\n❌ Error: Please provide a 12-word mnemonic phrase.');
      console.log('Usage: node index.js restore word1 word2 ... word12 [network]\n');
      return;
    }
    
    try {
      console.log(`\n🔄 Restoring wallet from mnemonic (${network})...\n`);
      const wallet = restoreWallet(mnemonic, network);
      displayWallet(wallet);
      
      // Check balances
      console.log('🔍 Checking balances...\n');
      const addresses = [
        wallet.addresses.legacy,
        wallet.addresses.segwit,
        wallet.addresses.nestedSegwit
      ];
      
      const balances = await checkMultipleBalances(addresses);
      balances.forEach(balance => {
        console.log(`   ${balance.address}: ${balance.balanceBTC} BTC`);
      });
      console.log();
      
    } catch (error) {
      console.log(`\n❌ Error: ${error.message}\n`);
    }
    
  } else if (command === 'balance') {
    // Check balance for a specific address
    const address = args[1];
    
    if (!address) {
      console.log('\n❌ Error: Please provide a Bitcoin address.');
      console.log('Usage: node index.js balance <address>\n');
      return;
    }
    
    try {
      console.log('\n🔍 Fetching balance information...\n');
      const info = await getAddressInfo(address);
      displayBalance(info);
    } catch (error) {
      console.log(`\n❌ Error: Unable to fetch balance information.\n`);
    }
    
  } else if (command === 'help') {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║      BITCOIN WALLET GENERATOR - TRUSTWALLET COMPATIBLE         ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    console.log('Usage:');
    console.log('  node index.js [command] [options]\n');
    console.log('Commands:');
    console.log('  generate [network]              Generate new wallet (default: mainnet)');
    console.log('  restore <mnemonic> [network]    Restore wallet from 12-word phrase');
    console.log('  balance <address>               Check balance for address');
    console.log('  help                            Show this help message\n');
    console.log('Examples:');
    console.log('  node index.js generate');
    console.log('  node index.js generate testnet');
    console.log('  node index.js restore word1 word2 ... word12');
    console.log('  node index.js balance 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\n');
    
  } else {
    console.log('\n❌ Unknown command. Use "node index.js help" for usage information.\n');
  }
}

// Run main function
main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});

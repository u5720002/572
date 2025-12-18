#!/usr/bin/env node

/**
 * Example usage of the Bitcoin Wallet Generator
 * This script demonstrates how to use the wallet generator and balance checker modules
 */

const { generateWallet, restoreWallet } = require('./wallet-generator');
const { getBalance, getAddressInfo } = require('./balance-checker');

// Example 1: Generate a new wallet
console.log('=== Example 1: Generate New Wallet ===\n');
const newWallet = generateWallet('mainnet');

console.log('Mnemonic:', newWallet.mnemonic);
console.log('Legacy Address:', newWallet.addresses.legacy);
console.log('SegWit Address:', newWallet.addresses.segwit);
console.log('Nested SegWit:', newWallet.addresses.nestedSegwit);
console.log('\n');

// Example 2: Restore wallet from mnemonic
console.log('=== Example 2: Restore Wallet from Mnemonic ===\n');
const mnemonic = newWallet.mnemonic;
const restoredWallet = restoreWallet(mnemonic, 'mainnet');

console.log('Restored wallet matches original:');
console.log('Legacy Address Match:', restoredWallet.addresses.legacy === newWallet.addresses.legacy);
console.log('SegWit Address Match:', restoredWallet.addresses.segwit === newWallet.addresses.segwit);
console.log('\n');

// Example 3: Check balance (async function)
async function checkBalanceExample() {
  console.log('=== Example 3: Check Balance ===\n');
  
  try {
    // Check balance of a known address (Satoshi's Genesis block address)
    const address = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    console.log(`Checking balance for: ${address}`);
    
    const balance = await getBalance(address);
    console.log(`Balance: ${balance.balanceBTC} BTC (${balance.balanceSatoshi} satoshis)`);
    
    // Get detailed info
    const info = await getAddressInfo(address);
    console.log(`Total Received: ${info.totalReceived} BTC`);
    console.log(`Transaction Count: ${info.transactionCount}`);
  } catch (error) {
    console.log('Note: Balance check requires internet connection');
    console.log('Error:', error.message);
  }
}

// Run async example
checkBalanceExample();

// Example 4: Generate testnet wallet
console.log('\n=== Example 4: Generate Testnet Wallet ===\n');
const testnetWallet = generateWallet('testnet');
console.log('Testnet Legacy Address:', testnetWallet.addresses.legacy);
console.log('Testnet SegWit Address:', testnetWallet.addresses.segwit);
console.log('Note: Testnet addresses start with "m", "tb1", or "2"\n');

console.log('=== Examples Complete ===');
console.log('\nTo use in your own code:');
console.log('  const { generateWallet } = require("./wallet-generator");');
console.log('  const wallet = generateWallet("mainnet");');
console.log('  console.log(wallet.mnemonic);');

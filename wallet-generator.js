const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const ECPair = require('ecpair').ECPairFactory(ecc);

// Initialize BIP32 with tiny-secp256k1
const bip32 = BIP32Factory(ecc);

/**
 * Derive wallet from seed
 * @param {Buffer} seed - Wallet seed
 * @param {string} network - 'mainnet' or 'testnet'
 * @returns {Object} Wallet object containing addresses and keys
 */
function deriveWalletFromSeed(seed, network) {
  // Determine network type
  const btcNetwork = network === 'testnet' 
    ? bitcoin.networks.testnet 
    : bitcoin.networks.bitcoin;
  
  // Create root key from seed
  const root = bip32.fromSeed(seed, btcNetwork);
  
  // Derive path for Bitcoin (BIP44: m/44'/0'/0'/0/0)
  // This is the standard derivation path used by most wallets including TrustWallet
  const path = "m/44'/0'/0'/0/0";
  const child = root.derivePath(path);
  
  // Generate key pair
  const keyPair = ECPair.fromPrivateKey(child.privateKey, { network: btcNetwork });
  
  // Generate P2PKH (Pay to Public Key Hash) address - Legacy format
  const { address: legacyAddress } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: btcNetwork
  });
  
  // Generate P2WPKH (Pay to Witness Public Key Hash) address - Native SegWit (bech32)
  const { address: segwitAddress } = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: btcNetwork
  });
  
  // Generate P2SH-P2WPKH address - Nested SegWit
  const { address: nestedSegwitAddress } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network: btcNetwork
    }),
    network: btcNetwork
  });
  
  return {
    seed: seed.toString('hex'),
    privateKey: child.privateKey.toString('hex'),
    wif: keyPair.toWIF(),
    publicKey: keyPair.publicKey.toString('hex'),
    addresses: {
      legacy: legacyAddress,      // Starts with '1' on mainnet
      segwit: segwitAddress,       // Starts with 'bc1' on mainnet
      nestedSegwit: nestedSegwitAddress  // Starts with '3' on mainnet
    },
    derivationPath: path,
    network: network
  };
}

/**
 * Generate a new Bitcoin wallet with mnemonic seed phrase
 * @param {string} network - 'mainnet' or 'testnet'
 * @returns {Object} Wallet object containing address, private key, and mnemonic
 */
function generateWallet(network = 'mainnet') {
  // Generate a random mnemonic (12 words)
  const mnemonic = bip39.generateMnemonic();
  
  // Generate seed from mnemonic
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // Derive wallet from seed
  const wallet = deriveWalletFromSeed(seed, network);
  
  return {
    mnemonic: mnemonic,
    ...wallet
  };
}

/**
 * Restore wallet from mnemonic seed phrase
 * @param {string} mnemonic - 12 or 24 word mnemonic phrase
 * @param {string} network - 'mainnet' or 'testnet'
 * @returns {Object} Wallet object
 */
function restoreWallet(mnemonic, network = 'mainnet') {
  // Validate mnemonic
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }
  
  // Generate seed from mnemonic
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // Derive wallet from seed
  const wallet = deriveWalletFromSeed(seed, network);
  
  return {
    mnemonic: mnemonic,
    ...wallet
  };
}

module.exports = {
  generateWallet,
  restoreWallet
};

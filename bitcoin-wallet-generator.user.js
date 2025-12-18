// ==UserScript==
// @name         Bitcoin Real Wallet Address Generator with TrustWallet Balance
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Generate real Bitcoin wallet addresses with backup codes and check balance on TrustWallet
// @author       u5720002
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require      https://cdn.jsdelivr.net/npm/bip39@3.0.4/dist/bip39.min.js
// @require      https://bundle.run/bitcoinjs-lib@5.2.0
// @require      https://bundle.run/bip32@2.0.6
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Add CSS styles for the UI
    GM_addStyle(`
        #btc-wallet-generator {
            position: fixed;
            top: 50px;
            right: 20px;
            width: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: 2px solid #4a5568;
            border-radius: 12px;
            padding: 20px;
            z-index: 999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            color: white;
        }
        
        #btc-wallet-generator h2 {
            margin: 0 0 15px 0;
            color: white;
            font-size: 20px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        #btc-wallet-generator .btn {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            background: #48bb78;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s;
        }
        
        #btc-wallet-generator .btn:hover {
            background: #38a169;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        #btc-wallet-generator .btn:active {
            transform: translateY(0);
        }
        
        #btc-wallet-generator .output {
            background: rgba(255,255,255,0.95);
            color: #2d3748;
            padding: 12px;
            margin: 10px 0;
            border-radius: 6px;
            font-size: 12px;
            word-break: break-all;
            max-height: 300px;
            overflow-y: auto;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        
        #btc-wallet-generator .output strong {
            color: #2c5282;
            display: block;
            margin-top: 8px;
            margin-bottom: 4px;
        }
        
        #btc-wallet-generator .output:first-of-type strong:first-child {
            margin-top: 0;
        }
        
        #btc-wallet-generator .balance {
            background: rgba(72, 187, 120, 0.2);
            border: 2px solid #48bb78;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        #btc-wallet-generator .copy-btn {
            background: #4299e1;
            padding: 6px 12px;
            margin-left: 8px;
            border-radius: 4px;
            cursor: pointer;
            display: inline-block;
            font-size: 11px;
        }
        
        #btc-wallet-generator .copy-btn:hover {
            background: #3182ce;
        }
        
        #btc-wallet-generator .toggle-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
        }
        
        #btc-wallet-generator.minimized {
            height: 50px;
            overflow: hidden;
        }
        
        #btc-wallet-generator.minimized .content {
            display: none;
        }
        
        #btc-wallet-generator .loading {
            text-align: center;
            padding: 10px;
            color: #ffd700;
        }
        
        #btc-wallet-generator .error {
            background: #fc8181;
            color: white;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
        }
    `);

    // Create the UI
    const container = document.createElement('div');
    container.id = 'btc-wallet-generator';
    container.innerHTML = `
        <button class="toggle-btn" id="toggle-panel">−</button>
        <h2>🪙 Bitcoin Wallet Generator</h2>
        <div class="content">
            <button class="btn" id="generate-wallet">Generate New Wallet</button>
            <button class="btn" id="check-balance" style="background: #ed8936;">Check Balance</button>
            <div id="output"></div>
        </div>
    `;
    
    // Wait for body to be available
    const addToPage = () => {
        if (document.body) {
            document.body.appendChild(container);
            initializeEventListeners();
        } else {
            setTimeout(addToPage, 100);
        }
    };
    addToPage();

    // Store current wallet data
    let currentWallet = null;

    function initializeEventListeners() {
        // Toggle panel
        document.getElementById('toggle-panel').addEventListener('click', function() {
            const panel = document.getElementById('btc-wallet-generator');
            panel.classList.toggle('minimized');
            this.textContent = panel.classList.contains('minimized') ? '+' : '−';
        });

        // Generate wallet
        document.getElementById('generate-wallet').addEventListener('click', generateWallet);

        // Check balance
        document.getElementById('check-balance').addEventListener('click', checkBalance);
    }

    function generateWallet() {
        try {
            const output = document.getElementById('output');
            output.innerHTML = '<div class="loading">⏳ Generating wallet...</div>';

            // Generate mnemonic (backup code/seed phrase)
            const mnemonic = bip39.generateMnemonic(256); // 24 words for maximum security
            
            // Generate seed from mnemonic
            const seed = bip39.mnemonicToSeedSync(mnemonic);
            
            // Create root key
            const root = bip32.fromSeed(seed);
            
            // Derive Bitcoin address using BIP44 path: m/44'/0'/0'/0/0
            const path = "m/44'/0'/0'/0/0";
            const child = root.derivePath(path);
            
            // Generate P2PKH address (Legacy Bitcoin address starting with 1)
            const { address } = bitcoin.payments.p2pkh({
                pubkey: child.publicKey,
                network: bitcoin.networks.bitcoin
            });

            // Generate P2WPKH address (Native SegWit address starting with bc1)
            const { address: segwitAddress } = bitcoin.payments.p2wpkh({
                pubkey: child.publicKey,
                network: bitcoin.networks.bitcoin
            });

            // Store wallet data
            currentWallet = {
                mnemonic: mnemonic,
                address: address,
                segwitAddress: segwitAddress,
                privateKey: child.toWIF(),
                publicKey: child.publicKey.toString('hex'),
                path: path
            };

            // Display wallet information
            output.innerHTML = `
                <div class="output">
                    <strong>🔑 Backup Code (Mnemonic Seed Phrase):</strong>
                    <div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; margin: 5px 0; border: 1px solid #ffeeba;">
                        ⚠️ SAVE THIS SAFELY! This is your backup code to recover your wallet.
                    </div>
                    <div style="font-family: monospace; line-height: 1.6;">${mnemonic}</div>
                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${mnemonic}')">📋 Copy</button>
                    
                    <strong>📍 Legacy Address (P2PKH):</strong>
                    <div style="font-family: monospace;">${address}</div>
                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${address}')">📋 Copy</button>
                    
                    <strong>📍 SegWit Address (P2WPKH):</strong>
                    <div style="font-family: monospace;">${segwitAddress}</div>
                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${segwitAddress}')">📋 Copy</button>
                    
                    <strong>🔐 Private Key (WIF):</strong>
                    <div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; margin: 5px 0; border: 1px solid #ffeeba;">
                        ⚠️ NEVER SHARE THIS! Keep it absolutely secret!
                    </div>
                    <div style="font-family: monospace; font-size: 10px;">${child.toWIF()}</div>
                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${child.toWIF()}')">📋 Copy</button>
                    
                    <strong>🔓 Public Key:</strong>
                    <div style="font-family: monospace; font-size: 10px;">${child.publicKey.toString('hex')}</div>
                    
                    <strong>🛤️ Derivation Path:</strong>
                    <div style="font-family: monospace;">${path}</div>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 11px;">
                    💡 <strong>TrustWallet Import:</strong> Use the backup code (mnemonic) or private key to import this wallet into TrustWallet.
                </div>
            `;

            console.log('✅ Bitcoin wallet generated successfully');
            console.log('Address:', address);
            console.log('SegWit Address:', segwitAddress);

        } catch (error) {
            console.error('❌ Error generating wallet:', error);
            document.getElementById('output').innerHTML = `
                <div class="error">
                    ❌ Error generating wallet: ${error.message}
                </div>
            `;
        }
    }

    function checkBalance() {
        if (!currentWallet) {
            document.getElementById('output').innerHTML = `
                <div class="error">
                    ⚠️ Please generate a wallet first!
                </div>
            `;
            return;
        }

        const output = document.getElementById('output');
        const currentOutput = output.innerHTML;
        
        output.innerHTML = currentOutput + '<div class="loading">⏳ Checking balance...</div>';

        // Check balance using blockchain API
        // Using multiple addresses (both legacy and segwit)
        const addresses = [currentWallet.address, currentWallet.segwitAddress];
        
        checkBalanceAPI(addresses)
            .then(balance => {
                // Remove loading message
                const loadingDiv = output.querySelector('.loading');
                if (loadingDiv) loadingDiv.remove();
                
                // Add balance display
                const balanceDiv = document.createElement('div');
                balanceDiv.className = 'balance';
                balanceDiv.innerHTML = `
                    💰 Balance: ${balance.btc} BTC<br>
                    <small>(${balance.satoshis} satoshis)</small><br>
                    <small style="opacity: 0.8;">≈ $${balance.usd} USD</small>
                `;
                output.appendChild(balanceDiv);
            })
            .catch(error => {
                const loadingDiv = output.querySelector('.loading');
                if (loadingDiv) loadingDiv.remove();
                
                output.innerHTML = currentOutput + `
                    <div class="error">
                        ❌ Error checking balance: ${error.message}
                    </div>
                `;
            });
    }

    async function checkBalanceAPI(addresses) {
        // Use blockchain.info API as primary source
        try {
            const addressList = addresses.join('|');
            const response = await fetch(`https://blockchain.info/balance?active=${addressList}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch balance from blockchain.info');
            }
            
            const data = await response.json();
            
            // Sum up balances from all addresses
            let totalSatoshis = 0;
            for (const addr of addresses) {
                if (data[addr]) {
                    totalSatoshis += data[addr].final_balance;
                }
            }
            
            const btc = (totalSatoshis / 100000000).toFixed(8);
            
            // Get current BTC price
            let usd = 0;
            try {
                const priceResponse = await fetch('https://blockchain.info/ticker');
                const priceData = await priceResponse.json();
                usd = (btc * priceData.USD.last).toFixed(2);
            } catch (e) {
                console.warn('Could not fetch BTC price:', e);
            }
            
            return {
                satoshis: totalSatoshis,
                btc: btc,
                usd: usd
            };
            
        } catch (error) {
            console.error('Blockchain.info API error:', error);
            
            // Fallback to blockcypher API
            try {
                let totalSatoshis = 0;
                
                for (const address of addresses) {
                    const response = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
                    if (response.ok) {
                        const data = await response.json();
                        totalSatoshis += data.balance || 0;
                    }
                }
                
                const btc = (totalSatoshis / 100000000).toFixed(8);
                
                return {
                    satoshis: totalSatoshis,
                    btc: btc,
                    usd: '0.00'
                };
                
            } catch (fallbackError) {
                throw new Error('Could not connect to balance APIs. Please check your internet connection.');
            }
        }
    }

    console.log('🪙 Bitcoin Wallet Generator loaded successfully!');
    console.log('📍 Look for the purple panel in the top-right corner of the page.');
    
})();

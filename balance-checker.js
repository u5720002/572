const axios = require('axios');

/**
 * Get Bitcoin address balance using blockchain.info API
 * @param {string} address - Bitcoin address
 * @returns {Promise<Object>} Balance information
 */
async function getBalance(address) {
  try {
    // Using blockchain.info API (free, no API key required)
    const response = await axios.get(`https://blockchain.info/q/addressbalance/${address}`);
    
    // Balance is returned in satoshis, convert to BTC
    const balanceSatoshi = parseInt(response.data);
    const balanceBTC = balanceSatoshi / 100000000;
    
    return {
      address: address,
      balanceSatoshi: balanceSatoshi,
      balanceBTC: balanceBTC
    };
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Address not found or has no transactions
      return {
        address: address,
        balanceSatoshi: 0,
        balanceBTC: 0
      };
    }
    throw new Error(`Failed to fetch balance: ${error.message}`);
  }
}

/**
 * Get detailed address information using blockchain.info API
 * @param {string} address - Bitcoin address
 * @returns {Promise<Object>} Detailed address information
 */
async function getAddressInfo(address) {
  try {
    const response = await axios.get(`https://blockchain.info/rawaddr/${address}`);
    
    const data = response.data;
    const balanceSatoshi = data.final_balance;
    const balanceBTC = balanceSatoshi / 100000000;
    
    return {
      address: address,
      balanceSatoshi: balanceSatoshi,
      balanceBTC: balanceBTC,
      totalReceived: data.total_received / 100000000,
      totalSent: data.total_sent / 100000000,
      transactionCount: data.n_tx,
      transactions: data.txs.slice(0, 10).map(tx => ({
        hash: tx.hash,
        time: new Date(tx.time * 1000).toISOString(),
        result: tx.result / 100000000
      }))
    };
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Address not found
      return {
        address: address,
        balanceSatoshi: 0,
        balanceBTC: 0,
        totalReceived: 0,
        totalSent: 0,
        transactionCount: 0,
        transactions: []
      };
    }
    throw new Error(`Failed to fetch address info: ${error.message}`);
  }
}

/**
 * Check balances for multiple addresses
 * @param {Array<string>} addresses - Array of Bitcoin addresses
 * @returns {Promise<Array<Object>>} Array of balance information
 */
async function checkMultipleBalances(addresses) {
  const results = [];
  
  for (const address of addresses) {
    try {
      const balance = await getBalance(address);
      results.push(balance);
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      results.push({
        address: address,
        error: error.message,
        balanceSatoshi: 0,
        balanceBTC: 0
      });
    }
  }
  
  return results;
}

module.exports = {
  getBalance,
  getAddressInfo,
  checkMultipleBalances
};

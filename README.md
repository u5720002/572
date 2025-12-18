# BCGame - Blockchain Dice Game

A decentralized dice game built on Ethereum blockchain using Solidity smart contracts. Players can bet cryptocurrency and win 2x their bet if they correctly predict the dice roll (1-6).

## 🎲 Features

- **Smart Contract-based Gaming**: Fully decentralized game logic on the Ethereum blockchain
- **Provably Fair**: All game results are verifiable on-chain
- **Web3 Integration**: Connect with MetaMask or other Web3 wallets
- **Real-time Updates**: Live game statistics and history
- **Responsive UI**: Modern, user-friendly interface
- **House Management**: Owner can fund, withdraw, and configure the house

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- MetaMask browser extension
- Some test ETH (for testnet deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/u5720002/572.git
cd 572
```

2. Install dependencies:
```bash
npm install
```

### Compile Smart Contract

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy to Local Network

1. Start a local Hardhat node:
```bash
npm run node
```

2. In a new terminal, deploy the contract:
```bash
npm run deploy:localhost
```

3. Copy the deployed contract address from the console output

4. Update the contract address in `public/app.js`:
```javascript
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
```

5. Open `public/index.html` in your browser

### Deploy to Testnet

1. Configure your network in `hardhat.config.js`

2. Deploy:
```bash
npm run deploy
```

## 📁 Project Structure

```
bcgame-project/
├── contracts/          # Solidity smart contracts
│   └── BCGame.sol     # Main game contract
├── scripts/           # Deployment scripts
│   └── deploy.js
├── test/              # Contract tests
│   └── BCGame.test.js
├── public/            # Frontend files
│   ├── index.html     # Main HTML file
│   ├── style.css      # Styles
│   └── app.js         # Web3 integration
├── hardhat.config.js  # Hardhat configuration
└── package.json
```

## 🎮 How to Play

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Enter Bet**: Choose your bet amount (between min and max bet limits)
3. **Select Number**: Pick a number from 1 to 6
4. **Roll Dice**: Click "Roll the Dice!" button
5. **Win or Lose**: If your prediction matches the result, you win 2x your bet!

## 🔧 Smart Contract Functions

### Player Functions
- `play(uint256 prediction)`: Play the game with a prediction (1-6)

### Owner Functions
- `fundHouse()`: Add funds to the house balance
- `withdrawHouseFunds(uint256 amount)`: Withdraw from house balance
- `updateBetLimits(uint256 newMinBet, uint256 newMaxBet)`: Update betting limits

### View Functions
- `houseBalance()`: Get current house balance
- `gameCount()`: Get total number of games played
- `getGame(uint256 gameId)`: Get details of a specific game
- `getContractBalance()`: Get total contract balance

## 🔐 Security Notes

⚠️ **IMPORTANT**: This is a demonstration project. The random number generation uses block-based pseudo-randomness which is **NOT SECURE** for production use.

For production deployment, use:
- Chainlink VRF (Verifiable Random Function)
- Commit-reveal schemes
- Off-chain randomness oracles

## 🧪 Testing

The project includes comprehensive tests covering:
- Contract deployment
- House funding
- Game playing logic
- Bet validation
- House management
- View functions

Run tests with:
```bash
npm test
```

## 📝 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

This project is for educational purposes only. Gambling carries risks. Use testnet only for testing. The developers are not responsible for any financial losses.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

// Contract ABI (Application Binary Interface)
const CONTRACT_ABI = [
    "function owner() view returns (address)",
    "function minBet() view returns (uint256)",
    "function maxBet() view returns (uint256)",
    "function houseBalance() view returns (uint256)",
    "function gameCount() view returns (uint256)",
    "function fundHouse() payable",
    "function play(uint256 prediction) payable",
    "function getGame(uint256 gameId) view returns (address player, uint256 betAmount, uint256 prediction, uint256 result, bool won, uint256 timestamp)",
    "function getContractBalance() view returns (uint256)",
    "event GamePlayed(uint256 indexed gameId, address indexed player, uint256 betAmount, uint256 prediction, uint256 result, bool won, uint256 payout)"
];

// Contract address - Update this after deployment
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

let provider;
let signer;
let contract;
let selectedNumber = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkWalletConnection();
});

function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('playGame').addEventListener('click', playGame);
    
    // Dice selection
    document.querySelectorAll('.dice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.dice-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedNumber = parseInt(this.dataset.value);
            document.getElementById('selectedNumber').textContent = selectedNumber;
            updatePlayButton();
        });
    });
    
    document.getElementById('betAmount').addEventListener('input', updatePlayButton);
}

async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
}

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this app!');
        return;
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        document.getElementById('walletAddress').textContent = 
            address.substring(0, 6) + '...' + address.substring(38);
        document.getElementById('walletBalance').textContent = 
            ethers.utils.formatEther(balance).substring(0, 8);
        
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletInfo').style.display = 'block';
        
        // Initialize contract
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        await loadGameStats();
        await loadGameHistory();
        updatePlayButton();
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', function(accounts) {
            window.location.reload();
        });
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

async function loadGameStats() {
    try {
        const houseBalance = await contract.houseBalance();
        const gameCount = await contract.gameCount();
        const minBet = await contract.minBet();
        const maxBet = await contract.maxBet();
        
        document.getElementById('houseBalance').textContent = 
            ethers.utils.formatEther(houseBalance) + ' ETH';
        document.getElementById('totalGames').textContent = gameCount.toString();
        document.getElementById('minBet').textContent = 
            ethers.utils.formatEther(minBet) + ' ETH';
        document.getElementById('maxBet').textContent = 
            ethers.utils.formatEther(maxBet) + ' ETH';
    } catch (error) {
        console.error('Error loading game stats:', error);
    }
}

async function loadGameHistory() {
    try {
        const gameCount = await contract.gameCount();
        const historyContainer = document.getElementById('gameHistory');
        
        if (gameCount.toString() === '0') {
            historyContainer.innerHTML = '<p class="no-games">No games played yet.</p>';
            return;
        }
        
        historyContainer.innerHTML = '';
        
        // Load last 10 games
        const start = Math.max(0, gameCount - 10);
        for (let i = gameCount - 1; i >= start; i--) {
            const game = await contract.getGame(i);
            const gameItem = createGameHistoryItem(i, game);
            historyContainer.appendChild(gameItem);
        }
    } catch (error) {
        console.error('Error loading game history:', error);
    }
}

function createGameHistoryItem(gameId, game) {
    const div = document.createElement('div');
    div.className = `game-item ${game.won ? 'win' : 'lose'}`;
    
    const date = new Date(game.timestamp * 1000);
    const result = game.won ? '✅ WIN' : '❌ LOSE';
    
    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>Game #${gameId}</strong><br>
                Bet: ${ethers.utils.formatEther(game.betAmount)} ETH<br>
                Prediction: ${game.prediction} | Result: ${game.result}
            </div>
            <div style="text-align: right;">
                <strong class="${game.won ? 'win' : 'lose'}">${result}</strong><br>
                <small>${date.toLocaleString()}</small>
            </div>
        </div>
    `;
    
    return div;
}

function updatePlayButton() {
    const playBtn = document.getElementById('playGame');
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    
    if (contract && selectedNumber && betAmount > 0) {
        playBtn.disabled = false;
    } else {
        playBtn.disabled = true;
    }
}

async function playGame() {
    if (!contract || !selectedNumber) {
        alert('Please select a number and connect your wallet.');
        return;
    }
    
    const betAmount = document.getElementById('betAmount').value;
    
    if (!betAmount || parseFloat(betAmount) <= 0) {
        alert('Please enter a valid bet amount.');
        return;
    }
    
    try {
        const playBtn = document.getElementById('playGame');
        playBtn.disabled = true;
        playBtn.textContent = '🎲 Rolling...';
        
        const tx = await contract.play(selectedNumber, {
            value: ethers.utils.parseEther(betAmount)
        });
        
        playBtn.textContent = '⏳ Confirming...';
        
        const receipt = await tx.wait();
        
        // Parse the event
        const event = receipt.events.find(e => e.event === 'GamePlayed');
        if (event) {
            const { gameId, result, won, payout } = event.args;
            displayResult(result, won, payout, selectedNumber);
        }
        
        // Reload stats and history
        await loadGameStats();
        await loadGameHistory();
        
        playBtn.disabled = false;
        playBtn.textContent = '🎲 Roll the Dice!';
        
    } catch (error) {
        console.error('Error playing game:', error);
        alert('Transaction failed. Please check your wallet and try again.');
        
        const playBtn = document.getElementById('playGame');
        playBtn.disabled = false;
        playBtn.textContent = '🎲 Roll the Dice!';
    }
}

function displayResult(result, won, payout, prediction) {
    const resultPanel = document.getElementById('resultPanel');
    const resultContent = document.getElementById('resultContent');
    
    const resultClass = won ? 'win' : 'lose';
    const resultText = won ? '🎉 YOU WON!' : '😢 YOU LOST';
    const payoutText = won ? `You won ${ethers.utils.formatEther(payout)} ETH!` : 'Better luck next time!';
    
    resultContent.innerHTML = `
        <h2 class="${resultClass}">${resultText}</h2>
        <p style="font-size: 1.5em; margin: 20px 0;">
            Your prediction: ${prediction} | Dice rolled: ${result}
        </p>
        <p>${payoutText}</p>
    `;
    
    resultPanel.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        resultPanel.style.display = 'none';
    }, 5000);
}

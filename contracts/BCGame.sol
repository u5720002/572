// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title BCGame - Blockchain Dice Game
 * @dev A simple dice game where players can bet and win based on dice rolls
 */
contract BCGame {
    address public owner;
    uint256 public minBet;
    uint256 public maxBet;
    uint256 public houseBalance;
    
    struct Game {
        address player;
        uint256 betAmount;
        uint256 prediction;
        uint256 result;
        bool won;
        uint256 timestamp;
    }
    
    mapping(uint256 => Game) public games;
    uint256 public gameCount;
    
    event GamePlayed(
        uint256 indexed gameId,
        address indexed player,
        uint256 betAmount,
        uint256 prediction,
        uint256 result,
        bool won,
        uint256 payout
    );
    
    event HouseBalanceUpdated(uint256 newBalance);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        minBet = 0.001 ether;
        maxBet = 1 ether;
    }
    
    /**
     * @dev Allows the owner to fund the contract
     */
    function fundHouse() external payable onlyOwner {
        houseBalance += msg.value;
        emit HouseBalanceUpdated(houseBalance);
    }
    
    /**
     * @dev Play the dice game
     * @param prediction The player's prediction (1-6)
     */
    function play(uint256 prediction) external payable {
        require(msg.value >= minBet, "Bet is below minimum");
        require(msg.value <= maxBet, "Bet exceeds maximum");
        require(prediction >= 1 && prediction <= 6, "Prediction must be between 1 and 6");
        require(houseBalance >= msg.value * 2, "Insufficient house balance");
        
        // Generate pseudo-random number (1-6)
        // Note: This is NOT secure for production - use Chainlink VRF or similar for real randomness
        uint256 result = (uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            gameCount
        ))) % 6) + 1;
        
        bool won = result == prediction;
        uint256 payout = 0;
        
        if (won) {
            // Player wins 2x their bet
            payout = msg.value * 2;
            houseBalance -= msg.value;
            payable(msg.sender).transfer(payout);
        } else {
            // House keeps the bet
            houseBalance += msg.value;
        }
        
        // Record the game
        games[gameCount] = Game({
            player: msg.sender,
            betAmount: msg.value,
            prediction: prediction,
            result: result,
            won: won,
            timestamp: block.timestamp
        });
        
        emit GamePlayed(gameCount, msg.sender, msg.value, prediction, result, won, payout);
        emit HouseBalanceUpdated(houseBalance);
        
        gameCount++;
    }
    
    /**
     * @dev Withdraw house funds (owner only)
     * @param amount Amount to withdraw
     */
    function withdrawHouseFunds(uint256 amount) external onlyOwner {
        require(amount <= houseBalance, "Insufficient house balance");
        houseBalance -= amount;
        payable(owner).transfer(amount);
        emit HouseBalanceUpdated(houseBalance);
    }
    
    /**
     * @dev Update betting limits (owner only)
     */
    function updateBetLimits(uint256 newMinBet, uint256 newMaxBet) external onlyOwner {
        require(newMinBet < newMaxBet, "Min bet must be less than max bet");
        minBet = newMinBet;
        maxBet = newMaxBet;
    }
    
    /**
     * @dev Get game details
     */
    function getGame(uint256 gameId) external view returns (
        address player,
        uint256 betAmount,
        uint256 prediction,
        uint256 result,
        bool won,
        uint256 timestamp
    ) {
        Game memory game = games[gameId];
        return (
            game.player,
            game.betAmount,
            game.prediction,
            game.result,
            game.won,
            game.timestamp
        );
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

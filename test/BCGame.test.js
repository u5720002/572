const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BCGame", function () {
  let bcGame;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    
    const BCGame = await ethers.getContractFactory("BCGame");
    bcGame = await BCGame.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await bcGame.owner()).to.equal(owner.address);
    });

    it("Should set correct initial bet limits", async function () {
      expect(await bcGame.minBet()).to.equal(ethers.parseEther("0.001"));
      expect(await bcGame.maxBet()).to.equal(ethers.parseEther("1"));
    });
  });

  describe("House Funding", function () {
    it("Should allow owner to fund the house", async function () {
      const fundAmount = ethers.parseEther("10");
      await bcGame.fundHouse({ value: fundAmount });
      expect(await bcGame.houseBalance()).to.equal(fundAmount);
    });

    it("Should not allow non-owner to fund the house", async function () {
      const fundAmount = ethers.parseEther("10");
      await expect(
        bcGame.connect(player1).fundHouse({ value: fundAmount })
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Playing the Game", function () {
    beforeEach(async function () {
      // Fund the house
      await bcGame.fundHouse({ value: ethers.parseEther("10") });
    });

    it("Should allow a player to place a valid bet", async function () {
      const betAmount = ethers.parseEther("0.1");
      await expect(
        bcGame.connect(player1).play(3, { value: betAmount })
      ).to.emit(bcGame, "GamePlayed");
    });

    it("Should reject bets below minimum", async function () {
      const betAmount = ethers.parseEther("0.0001");
      await expect(
        bcGame.connect(player1).play(3, { value: betAmount })
      ).to.be.revertedWith("Bet is below minimum");
    });

    it("Should reject bets above maximum", async function () {
      const betAmount = ethers.parseEther("1.5");
      await expect(
        bcGame.connect(player1).play(3, { value: betAmount })
      ).to.be.revertedWith("Bet exceeds maximum");
    });

    it("Should reject invalid predictions", async function () {
      const betAmount = ethers.parseEther("0.1");
      await expect(
        bcGame.connect(player1).play(0, { value: betAmount })
      ).to.be.revertedWith("Prediction must be between 1 and 6");
      
      await expect(
        bcGame.connect(player1).play(7, { value: betAmount })
      ).to.be.revertedWith("Prediction must be between 1 and 6");
    });

    it("Should record game details correctly", async function () {
      const betAmount = ethers.parseEther("0.1");
      const prediction = 3;
      
      await bcGame.connect(player1).play(prediction, { value: betAmount });
      
      const game = await bcGame.getGame(0);
      expect(game.player).to.equal(player1.address);
      expect(game.betAmount).to.equal(betAmount);
      expect(game.prediction).to.equal(prediction);
      expect(game.result).to.be.within(1, 6);
    });

    it("Should update house balance correctly on loss", async function () {
      const betAmount = ethers.parseEther("0.1");
      const initialBalance = await bcGame.houseBalance();
      
      // Play multiple times to ensure at least one loss
      for (let i = 0; i < 10; i++) {
        await bcGame.connect(player1).play(1, { value: betAmount });
      }
      
      const finalBalance = await bcGame.houseBalance();
      // Balance should change (either increase or decrease based on wins/losses)
      expect(finalBalance).to.not.equal(initialBalance);
    });
  });

  describe("House Management", function () {
    beforeEach(async function () {
      await bcGame.fundHouse({ value: ethers.parseEther("10") });
    });

    it("Should allow owner to withdraw house funds", async function () {
      const withdrawAmount = ethers.parseEther("5");
      await bcGame.withdrawHouseFunds(withdrawAmount);
      expect(await bcGame.houseBalance()).to.equal(ethers.parseEther("5"));
    });

    it("Should not allow non-owner to withdraw", async function () {
      const withdrawAmount = ethers.parseEther("5");
      await expect(
        bcGame.connect(player1).withdrawHouseFunds(withdrawAmount)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow owner to update bet limits", async function () {
      const newMinBet = ethers.parseEther("0.01");
      const newMaxBet = ethers.parseEther("2");
      
      await bcGame.updateBetLimits(newMinBet, newMaxBet);
      
      expect(await bcGame.minBet()).to.equal(newMinBet);
      expect(await bcGame.maxBet()).to.equal(newMaxBet);
    });
  });

  describe("View Functions", function () {
    it("Should return correct contract balance", async function () {
      const fundAmount = ethers.parseEther("10");
      await bcGame.fundHouse({ value: fundAmount });
      expect(await bcGame.getContractBalance()).to.equal(fundAmount);
    });
  });
});

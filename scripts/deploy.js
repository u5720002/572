const hre = require("hardhat");

async function main() {
  console.log("Deploying BCGame contract...");

  const BCGame = await hre.ethers.getContractFactory("BCGame");
  const bcGame = await BCGame.deploy();

  await bcGame.waitForDeployment();

  const address = await bcGame.getAddress();
  console.log(`BCGame deployed to: ${address}`);

  // Fund the house with initial balance
  console.log("\nFunding the house with 10 ETH...");
  const fundTx = await bcGame.fundHouse({ value: hre.ethers.parseEther("10") });
  await fundTx.wait();
  
  const houseBalance = await bcGame.houseBalance();
  console.log(`House balance: ${hre.ethers.formatEther(houseBalance)} ETH`);

  console.log("\nDeployment complete!");
  console.log("Contract owner:", await bcGame.owner());
  console.log("Min bet:", hre.ethers.formatEther(await bcGame.minBet()), "ETH");
  console.log("Max bet:", hre.ethers.formatEther(await bcGame.maxBet()), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

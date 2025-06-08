const hre = require("hardhat");

async function main() {
  const InsuranceContract = await hre.ethers.getContractFactory("InsuranceContract");
  const insurance = await InsuranceContract.deploy();

  // In ethers v6, deployment completes automatically, no .deployed() needed
  console.log(`InsuranceContract deployed to: ${insurance.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

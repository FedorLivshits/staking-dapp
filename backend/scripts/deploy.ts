import { ethers } from 'hardhat';

async function main() {
  const Staking = await ethers.getContractFactory('Staking');
  const staking = await Staking.deploy();

  await staking.waitForDeployment();

  console.log('Staking contract deployed to:', await staking.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

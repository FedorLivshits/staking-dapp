import { ethers } from 'ethers';
import stakingABI from '../../../backend/artifacts/contracts/Stake.sol/Staking.json';

const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
);

const contractAddress = '0xd33B56db2124ea0A1F06EE4a454aF92CE56068C1';

export const stakingContract = new ethers.Contract(
  contractAddress,
  stakingABI.abi,
  provider
);

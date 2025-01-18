// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    // Balance of each user
    mapping(address => uint256) public balances;

    // Staking start time for each user
    mapping(address => uint256) public stakingStart;

    // Interest rate (10% annual)
    uint256 public rewardRate = 10;

    // Minimum deposit for staking
    uint256 public minStakeAmount = 0.01 ether;

    // Function for staking ETH
    function stake() public payable {
        require(msg.value >= minStakeAmount, "Minimum stake is 0.01 ETH");

        if (balances[msg.sender] > 0) {
            uint256 reward = calculateReward(msg.sender);
            balances[msg.sender] += reward;
        }

        balances[msg.sender] += msg.value;
        stakingStart[msg.sender] = block.timestamp;
    }

    // Function for withdrawing funds
    function unstake(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = amount + reward;

        balances[msg.sender] -= amount;
        stakingStart[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(totalAmount);
    }

    // Reward calculation for staking
    function calculateReward(address user) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakingStart[user];
        uint256 reward = (balances[user] * rewardRate * stakingDuration) /
            (365 days * 100);
        return reward;
    }

    // Get the current balance of the user
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}

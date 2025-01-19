'use client';

import { stakingContract } from '@/utils/web3';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [stakedBalance, setStakedBalance] = useState<string>('0');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isStakeMode, setIsStakeMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWalletBalance = useCallback(async () => {
    if (!window.ethereum || !account) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error(error);
      showToast('Failed to fetch wallet balance.', 'error');
    }
  }, [account]);

  const getStakedBalance = useCallback(async () => {
    if (!window.ethereum || !account) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractWithSigner = stakingContract.connect(signer);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const staked = await contractWithSigner.getBalance();
      setStakedBalance(ethers.formatEther(staked));
    } catch (error) {
      console.error(error);
      showToast('Failed to fetch staked balance.', 'error');
    }
  }, [account]);

  const updateBalances = useCallback(async () => {
    try {
      await getWalletBalance();
      await getStakedBalance();
    } catch (error) {
      console.error(error);
      showToast('Failed to update balances.', 'error');
    }
  }, [getWalletBalance, getStakedBalance]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0]);
        updateBalances();
      });
    }
  }, [updateBalances]);

  useEffect(() => {
    if (account) {
      updateBalances();
    }
  }, [account, updateBalances]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      showToast('Please install MetaMask!', 'error');
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      updateBalances();
    } catch (error) {
      console.error(error);
      showToast('Failed to connect wallet.', 'error');
    }
  };

  const handleStake = useCallback(async () => {
    if (!window.ethereum || !account) {
      return showToast('Connect your wallet first!', 'error');
    }
    if (!stakeAmount) {
      return showToast('Please enter an amount to stake.', 'error');
    }
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractWithSigner = stakingContract.connect(signer);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const tx = await contractWithSigner.stake({
        value: ethers.parseEther(stakeAmount),
      });

      await tx.wait();

      showToast(`Successfully staked ${stakeAmount} ETH`, 'success');
      setStakeAmount('');
      updateBalances();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showToast('Failed to stake tokens.', 'error');
      setIsLoading(false);
    }
  }, [account, stakeAmount, updateBalances]);

  const handleUnstake = useCallback(async () => {
    if (!window.ethereum || !account) {
      return showToast('Connect your wallet first!', 'error');
    }
    if (!stakeAmount) {
      return showToast('Please enter an amount to unstake.', 'error');
    }

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractWithSigner = stakingContract.connect(signer);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const tx = await contractWithSigner.unstake(
        ethers.parseEther(stakeAmount)
      );
      await tx.wait();

      showToast(`Successfully unstaked ${stakeAmount} ETH`, 'success');
      setStakeAmount('');
      updateBalances();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showToast('Failed to unstake tokens.', 'error');
      setIsLoading(false);
    }
  }, [account, stakeAmount, updateBalances]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    toast.className = `alert ${
      type === 'success' ? 'alert-success' : 'alert-error'
    } shadow-lg fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-96`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return {
    account,
    balance,
    stakedBalance,
    stakeAmount,
    isStakeMode,
    connectWallet,
    setStakeAmount,
    setIsStakeMode,
    handleStake,
    handleUnstake,
    isLoading,
  };
};

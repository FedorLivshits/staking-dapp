'use client';

import { ActionForm } from './components/ActionForm';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StakingInfo } from './components/StakingInfo';
import { Tabs } from './components/Tabs';
import { useWallet } from './hooks/useWallet';

export default function Home() {
  const {
    isStakeMode,
    setIsStakeMode,
    balance,
    stakedBalance,
    stakeAmount,
    setStakeAmount,
    account,
    handleStake,
    handleUnstake,
    connectWallet,
    isLoading,
  } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
          <Header />
          <Tabs isStakeMode={isStakeMode} setIsStakeMode={setIsStakeMode} />
          {!account ? (
            <ConnectWalletButton connectWallet={connectWallet} />
          ) : (
            <>
              <ActionForm
                balance={balance}
                stakeAmount={stakeAmount}
                setStakeAmount={setStakeAmount}
                isStakeMode={isStakeMode}
                handleStake={handleStake}
                handleUnstake={handleUnstake}
                isLoading={isLoading}
              />
              <StakingInfo stakedBalance={stakedBalance} />
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

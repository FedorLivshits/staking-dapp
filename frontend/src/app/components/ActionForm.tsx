export const ActionForm = ({
  balance,
  stakeAmount,
  setStakeAmount,
  isStakeMode,
  handleStake,
  handleUnstake,
  isLoading,
}: {
  balance: string;
  stakeAmount: string;
  setStakeAmount: (value: string) => void;
  isStakeMode: boolean;
  handleStake: () => void;
  handleUnstake: () => void;
  isLoading: boolean;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || parseFloat(value) >= 0) {
      setStakeAmount(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  const handleMaxClick = () => {
    setStakeAmount(balance);
  };

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-400">Your token balance:</p>
        <div className="text-lg font-semibold bg-gray-700 p-3 rounded-md">
          {balance} ETH
        </div>
      </div>
      <div className="mb-6 relative">
        <input
          type="number"
          placeholder="Enter amount in ETH"
          value={stakeAmount}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-3 rounded-md bg-gray-700 text-white pr-16"
        />
        <button
          onClick={handleMaxClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:underline"
        >
          Max
        </button>
      </div>
      <button
        onClick={isStakeMode ? handleStake : handleUnstake}
        className={`w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 ${
          isLoading
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isLoading}
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        {isStakeMode ? 'Stake' : 'Unstake'}
      </button>
    </>
  );
};

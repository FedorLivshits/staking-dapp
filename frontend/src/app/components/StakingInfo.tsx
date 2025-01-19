const BASE_TOTAL_STAKED = 200_000;

export const StakingInfo = ({ stakedBalance }: { stakedBalance: string }) => {
  const formattedStakedBalance = parseFloat(stakedBalance).toFixed(4);
  const formattedTotalStaked = (
    BASE_TOTAL_STAKED + parseFloat(stakedBalance)
  ).toFixed(4);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Staking Info:</h3>
      <div className="flex justify-between bg-gray-700 p-4 rounded-md">
        <div>
          <p>Your tokens staked:</p>
          <p className="font-bold text-blue-400">
            {formattedStakedBalance} ETH
          </p>
        </div>
        <div>
          <p>Total staked:</p>
          <p className="font-bold text-green-400">{formattedTotalStaked} ETH</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2 text-gray-400 text-sm">
        This project uses test Sepolia tokens.
      </div>
    </div>
  );
};

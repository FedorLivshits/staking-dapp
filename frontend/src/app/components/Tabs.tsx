import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export const Tabs = ({
  isStakeMode,
  setIsStakeMode,
}: {
  isStakeMode: boolean;
  setIsStakeMode: (mode: boolean) => void;
}) => (
  <div className="flex mb-6">
    <button
      onClick={() => setIsStakeMode(true)}
      className={`w-1/2 py-2 rounded-l-lg ${
        isStakeMode ? 'bg-blue-600' : 'bg-gray-700'
      }`}
    >
      <ArrowUpCircle className="inline mr-2" /> Stake
    </button>
    <button
      onClick={() => setIsStakeMode(false)}
      className={`w-1/2 py-2 rounded-r-lg ${
        !isStakeMode ? 'bg-blue-600' : 'bg-gray-700'
      }`}
    >
      <ArrowDownCircle className="inline mr-2" /> Unstake
    </button>
  </div>
);

import { Wallet } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              <Image
                className="dark"
                src="/ethereum.svg"
                alt="Ethereum logo"
                width={50}
                height={50}
                priority
              />
              ETH Staking DApp
            </h1>
            <p className="text-gray-400 mb-8">
              Stake your ETH and earn rewards
            </p>
          </div>
          <div className="text-center">
            <button className="btn btn-primary w-64">
              <Wallet className="mr-2 h-5 w-5" /> Connect wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

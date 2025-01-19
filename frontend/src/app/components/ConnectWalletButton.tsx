import Image from 'next/image';

export const ConnectWalletButton = ({
  connectWallet,
}: {
  connectWallet: () => void;
}) => (
  <button
    onClick={connectWallet}
    className="w-full btn bg-blue-600 hover:bg-blue-700 text-white"
  >
    <Image
      className="dark"
      src="/MetaMask_Fox.svg"
      alt="logo"
      width={28}
      height={28}
      priority
    />
    Connect with MetaMask
  </button>
);

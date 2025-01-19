import Image from 'next/image';

export const Header = () => (
  <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
    <Image
      className="dark:invert"
      src="/ethereum.svg"
      alt="Ethereum logo"
      width={34}
      height={34}
      priority
    />
    ETH Staking DApp
  </h1>
);

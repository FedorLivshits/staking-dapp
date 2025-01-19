import Image from 'next/image';

export const Footer = () => (
  <a
    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-400 hover:text-white hover:underline"
    href="https://github.com/FedorLivshits"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src="/globe.svg"
      alt="Globe icon"
      width={16}
      height={16}
    />
    Go to Github
  </a>
);

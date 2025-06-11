import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-blue-700 px-4 py-3 shadow-md flex items-center space-x-3 sticky top-0 z-50">
      <Image src="/logo.png" alt="Logo" width={36} height={36} />
      <span className="text-xl font-semibold text-gray-100 tracking-wide">
        OrthoScrewSearch
      </span>
    </header>
  );
};

export default Header;
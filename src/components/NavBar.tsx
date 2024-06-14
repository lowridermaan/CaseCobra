import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

function NavBar() {
  return (
    <nav className=" sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex font-semibold">
            case<span className=" text-green-600">cobra</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default NavBar;

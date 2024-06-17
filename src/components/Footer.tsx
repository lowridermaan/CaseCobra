import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Facebook, Twitter, X, YoutubeIcon } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-300" />
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <p className="text-sm text-muted-foreground">
            &copy;{new Date().getFullYear()} All rights reserved
          </p>
          <div className="text-center md:text-left pb-2 md:pb-0">
            <div className="space-x-3">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Temrs
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
          <div className="flex space-x-8">
            <Link
              href="https://youtube.com"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              <YoutubeIcon />
            </Link>
            <Link
              href="https://facebook.com"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              <Facebook />
            </Link>
            <Link
              href="https://x.com"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              <X />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;

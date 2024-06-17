import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      {children}
    </MaxWidthWrapper>
  );
}

export default Layout;

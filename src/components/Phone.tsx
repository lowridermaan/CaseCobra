import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import darkEdges from '../../public/phone-template-dark-edges.png';
import lightEdges from '../../public/phone-template-white-edges.png';

// HTMLAttributes<HTMLDivElement> элементу будут доступны все props div
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

function Phone({ imgSrc, className, dark = false, ...props }: PhoneProps) {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden ',
        className
      )}
      // HTMLAttributes<HTMLDivElement> нужен чтобы можно было манипулировать компонентом так как будто он div
      {...props}
    >
      <Image
        src={dark ? darkEdges : lightEdges}
        className="pointer-events-none z-50 select-none"
        // width={1000}
        // height={1000}
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <Image
          src={imgSrc}
          priority={true}
          className="h-full object-cover"
          alt="overlaying phone image"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}

export default Phone;

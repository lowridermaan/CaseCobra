'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload',
  },
  {
    name: 'Step 2: Custom design',
    description: 'Make the case yours',
    url: '/design',
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
  },
];

function Steps() {
  const pathname = usePathname();

  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
      {STEPS.map((step, i) => {
        // проверяем текущий шаг (допустим мы на /design)
        const isCurrent = pathname.endsWith(step.url);
        // проверям выполнен ли он (смотрим все шаги после текущего есть там есть совпаденрия значит текущий шаг выполнен)
        const isComplited = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        const imagePath = `/snake-${i + 1}.png`;

        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  'absolute left-0 top -0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  { ' bg-zinc-700': isCurrent, 'bg-primary': isComplited }
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium bg-gray-100 lg:bg-transparent border-b-2 border-zinc-200',
                  {
                    'sm: bg-green-100': isCurrent,
                    'sm:bg-gray-200': isComplited,
                  }
                )}
              >
                <span className="flex-shrink-0">
                  <Image
                    src={imagePath}
                    alt="snake"
                    width={1000}
                    height={1000}
                    className="hidden lg:flex h-20 w-20 object-contain items-center justify-center"
                  />
                </span>
                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn('text-sm font-semibold text-zinc-700', {
                      'text-primary': isCurrent,
                      'text-zinc-700': isComplited,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>
            </div>
            {/* separator */}
            {i !== 0 ? (
              <div className="absolute inset-0 hidden w-3 lg:block">
                <svg
                  className="h-full w-full text-gray-300"
                  viewBox="0 0 12 82"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V31L10.5 41L0.5 51V82"
                    stroke="currentcolor"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default Steps;

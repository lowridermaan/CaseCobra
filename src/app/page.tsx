import { Decor } from '@/components/Decor';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Phone from '@/components/Phone';
import Reviews from '@/components/Reviews';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-slate-40">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className=" absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src="/snake-1.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full"
                />
              </div>
              <h1 className=" w-fit relative tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{' '}
                <span className=" bg-green-500 px-2 text-white">Custom</span>{' '}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorute memories whith your own,
                <span className="font-semibold"> one-of-one</span> phone case.
                Case cobra allows you to protect your memories, not just you
                phone case.
              </p>

              <ul className=" mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className=" flex gap-5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />
                    Hight quality, durable material
                  </li>
                  <li className=" flex gap-5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className=" flex gap-5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />
                    Modern iPhone model supported
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4 items-center">
                  <Image
                    className=" inline-block h-10 w-10 rounded-full ring-2  ring-slate-100"
                    src="/users/user-1.png"
                    width={1000}
                    height={1000}
                    alt="user image"
                  />
                  <Image
                    className=" inline-block h-10 w-10 rounded-full ring-2  ring-slate-100"
                    src="/users/user-2.png"
                    width={1000}
                    height={1000}
                    alt="user image"
                  />
                  <Image
                    className=" inline-block h-10 w-10 rounded-full ring-2  ring-slate-100"
                    src="/users/user-3.png"
                    width={1000}
                    height={1000}
                    alt="user image"
                  />
                  <Image
                    className=" inline-block  h-10 w-10 rounded-full ring-2  ring-slate-100"
                    src="/users/user-4.jpg"
                    width={1000}
                    height={1000}
                    alt="user image"
                  />
                  <Image
                    className=" inline-block object-cover h-10 w-10 rounded-full ring-2  ring-slate-100"
                    src="/users/user-5.jpg"
                    width={1000}
                    height={1000}
                    alt="user image"
                  />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4  text-green-600 fill-green-600" />
                    <Star className="h-4 w-4  text-green-600 fill-green-600" />
                    <Star className="h-4 w-4  text-green-600 fill-green-600" />
                    <Star className="h-4 w-4  text-green-600 fill-green-600" />
                    <Star className="h-4 w-4  text-green-600 fill-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.500</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className=" relative md:max-w-xl">
              <Image
                src="/your-image.png"
                className=" absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
                width={1000}
                height={1000}
                alt="your image"
              />
              <Image
                src="/line.png"
                className=" absolute w-20 -left-6 -bottom-6 select-none"
                width={1000}
                height={1000}
                alt="line"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center justify-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{' '}
              <span className="relative px-2">
                customers{' '}
                <Decor.underline className="hidden sm:block pointer-event-none absolute inset-x-0 -bottom-7 text-green-600" />
              </span>{' '}
              say
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &ldquo; The case feel durable and I even got a compliment on
                  the design. Had the case for two a half months now and{' '}
                  <em className="font-semibold underline">
                    the image supper clear
                  </em>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it &ldquo;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Image
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-4.jpg"
                  width={1000}
                  height={1000}
                  alt="user-photo"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Bob</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className=" text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* second user review */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &ldquo; I usually keep my phone together with my keys in my
                  pocket and that led to some pretty heavy scratchmarks on all
                  of my last phone case. This one besides a barely noticeable
                  scratch on the corner{' '}
                  <em className="font-semibold underline">
                    looks brand new after about half a year
                  </em>
                  , I dig it. &ldquo;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Image
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-5.jpg"
                  width={1000}
                  height={1000}
                  alt="user-photo"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Eric</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className=" text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
    </div>
  );
}

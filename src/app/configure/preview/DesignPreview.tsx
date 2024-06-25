"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, FINISHES, MODELS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";

const config = {
  angle: 272,
  spread: 314,
  startVelocity: 40,
  elementCount: 170,
  duration: 3000,
  perspective: "749px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

function DesignPreview({ configuration }: { configuration: Configuration }) {
  const [showConffeti, setShowConffeti] = useState<boolean>(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);

  const router = useRouter();
  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const { color, model, croppedImageUrl, finish, material } = configuration;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model,
  )!;

  let totalPrice = BASE_PRICE;

  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
  useEffect(function () {
    setShowConffeti(true);
  }, []);

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrive payment URL");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again",
        variant: "destructive",
      });
    },
  });

  function handleCheckout() {
    if (user) {
      // создаем сессию оплаты
      createPaymentSession({ configId: id });
    } else {
      //нужно зарегатся
      localStorage.setItem("configurationId", id);
      setIsModalLoginOpen(true);
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
      >
        <Confetti active={showConffeti} config={config} />
      </div>

      <LoginModal isOpen={isModalLoginOpen} setIsOpen={setIsModalLoginOpen} />

      <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md: row-end-2 sm:col-span-4 md:col-span-3 md:row-span-2">
          <Phone imgSrc={croppedImageUrl!} className={cn(`bg-${tw}`)} />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
          <div className="text-base sm:col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
              <div>
                <p className="font-medium text-zinc-950">Highlights</p>
                <ol className="mt-3 list-inside list-disc text-zinc-700">
                  <li>Wireless charging compatible</li>
                  <li>The Perfect Match</li>
                  <li>Case made from recycled material</li>
                  <li>5 year print warranty</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-zinc-950">Materials</p>
                <ol className="mt-3 list-inside list-disc text-zinc-700">
                  <li>High-quality, durable material</li>
                  <li>Scratch an fingerprint resistant coating</li>
                </ol>
              </div>
            </div>
            <div className="mt-8">
              <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                <div className="flow-root text-sm">
                  <div className="mt-2 flex items-center justify-between border-b-2 border-dotted py-1 text-sm">
                    <p className="text-gray-600">Base Price</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(BASE_PRICE / 100)}
                    </p>
                  </div>
                  {finish === "textured" ? (
                    <div className="mt-2 flex items-center justify-between border-b-2 border-dotted py-1 text-sm">
                      <p className="text-gray-600">Textured finish</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                      </p>
                    </div>
                  ) : null}
                  {material === "polycarbonate" ? (
                    <div className="mt-2 flex items-center justify-between border-b-2 border-dotted py-1 text-sm">
                      <p className="text-gray-600">
                        Soft polycarbonate material
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(
                          PRODUCT_PRICES.material.polycarbonate / 100,
                        )}
                      </p>
                    </div>
                  ) : null}
                  <div className="mt-4 flex items-center justify-between border-b-2 border-dotted py-1 text-sm">
                    <p className="font-semibold text-gray-900">Order total</p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(totalPrice / 100)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                isloading={isPending}
                loadingText="Loading"
                disabled={isPending}
                onClick={handleCheckout}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRight className="ml-1.5 inline h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignPreview;

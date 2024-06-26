"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useReducer, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) {
  const [renderedDimention, setRenderedDimention] = useState({
    height: 0,
    width: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  function handleResize() {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();

    setRenderedDimention({ width, height });
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return window.removeEventListener("resize", handleResize);
  }, []);

  let caseBackgroundColor = "bg-zinc-950";
  if (color === "blue") caseBackgroundColor = "bg-blue-950";
  if (color === "rose") caseBackgroundColor = "bg-rose-950";
  if (color === "fuchsia") caseBackgroundColor = "bg-fuchsia-900";

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimention.width / 2 -
            renderedDimention.width / (1216 / 123),
          top: renderedDimention.height / 6.22,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={croppedImageUrl}
          width={renderedDimention.width / (3000 / 640)}
          alt="phone in hand"
          className={cn(
            "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20] md:rounded-t-[30px]",
            caseBackgroundColor,
          )}
        ></img>
      </div>
      <div className="relative z-40 h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/clearphone.png"
          alt="phone"
          className="pointer-events-none h-full w-full rounded-md antialiased"
        />
      </div>
    </AspectRatio>
  );
}

export default PhonePreview;

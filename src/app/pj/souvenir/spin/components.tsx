"use client";
import { WheelData } from "@boriska420/react-custom-roulette/dist/components/Wheel/types";
import dynamic from "next/dynamic";
import { useState } from "react";

const Wheel = dynamic(
  () => import("@boriska420/react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export function SpinningWheel({ data }: { data: WheelData[] }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="h-full aspect-square relative flex">
      <div className="h-[70%] aspect-square mx-auto my-auto relative z-10 [&>div]:!w-full">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#ffffff", "#ff0000"]}
          textColors={["#ff0000", "#ffffff"]}
          outerBorderColor={"#eeeeee"}
          outerBorderWidth={1}
          radiusLineColor={"#eeeeee"}
          radiusLineWidth={0.1}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          pointerProps={{ src: "/spin/pin.png", style: { rotate: "45deg" } }}
        />
      </div>
      <img
        src="/spin/stand.png"
        alt="Stand Spin wheel"
        className="absolute bottom-0 left-0 right-0 mx-auto h-[17%]"
      />
    </div>
  );
}

export function Decoration01({ className }: { className?: string }) {
  return (
    <img
      src="/spin/decoration-01.png"
      alt="decoration-01"
      className={className}
    />
  );
}

export function Decoration02({ className }: { className?: string }) {
  return (
    <img
      src="/spin/spin-n-win-logo.png"
      alt="decoration-spin-n-win-logo"
      className={className}
    />
  );
}

export function DecorationLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img src="/spin/kym.png" alt="logo kym" className="z-20 relative" />
      <div className="w-[89%] h-[50%] bg-white absolute bottom-0"></div>
    </div>
  );
}

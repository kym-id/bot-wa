"use client";
import { WheelData } from "@boriska420/react-custom-roulette/dist/components/Wheel/types";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { RawWheelData, useSpinningWheelStore } from "~/store/spinning-wheel";

const Wheel = dynamic(
  () => import("@boriska420/react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export function SpinningWheel() {
  const spin = useSpinningWheelStore((s) => s.spin);
  const prizeNumber = useSpinningWheelStore((s) => s.prizeNumber);
  const setSpin = useSpinningWheelStore((s) => s.setSpin);
  const data = useSpinningWheelStore((s) => s.data);
  const showingPrize = useSpinningWheelStore((s) => s.showingPrize);

  if (data.length === 0) {
    return <></>;
  }

  return (
    <div className="h-full aspect-square relative flex">
      {/* Background Light */}
      <DecorationBgLight className="absolute h-[60%] aspect-square bulb left-0 right-0 mx-auto my-auto bottom-0 top-0" />
      <div className="h-[70%] aspect-square mx-auto my-auto relative z-10 [&>div]:!w-full">
        <Wheel
          mustStartSpinning={spin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#ffffff", "#ff0000"]}
          textColors={["#ff0000", "#ffffff"]}
          outerBorderColor={"#eeeeee"}
          outerBorderWidth={1}
          radiusLineColor={"#eeeeee"}
          radiusLineWidth={0.1}
          spinDuration={0.5}
          onStopSpinning={() => {
            // setMustSpin(false);
            setSpin(false);
            showingPrize();
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

export function DecorationBgLight({ className }: { className?: string }) {
  return <div className={className}></div>;
}

export function DecorationLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img src="/spin/kym.png" alt="logo kym" className="z-20 relative" />
      <div className="w-[89%] h-[50%] bg-white absolute bottom-0"></div>
    </div>
  );
}

const rawDataDummy: RawWheelData[] = [
  { option: "Gantungan Kunci", total: 15 },
  { option: "Pin", total: 15 },
  { option: "Pouch", total: 2 },
  { option: "Totebag", total: 2 },
];

export function Hotkeys() {
  const startSpin = useSpinningWheelStore((s) => s.startSpin);
  const reset = useSpinningWheelStore((s) => s.reset);
  const setRawData = useSpinningWheelStore((s) => s.setRawData);

  useHotkeys("space", () => startSpin());
  useHotkeys("r", () => reset());
  useHotkeys("s", () => setRawData(rawDataDummy));
  return <></>;
}

export function SelectedPrize({ className }: { className?: string }) {
  const spin = useSpinningWheelStore((s) => s.spin);
  const prizeNumber = useSpinningWheelStore((s) => s.prizeNumber);
  const showPrize = useSpinningWheelStore((s) => s.showPrize);
  const data = useSpinningWheelStore((s) => s.data);
  if (data.length === 0) {
    return <></>;
  }
  return (
    <div className={className}>
      {showPrize && (
        <>
          <span className="text-white text-2xl font-semibold">
            Selamat, anda mendapatkan
          </span>
          <h3 className="text-white text-6xl font-bold animate-pulse">
            {data[prizeNumber].option}
          </h3>
        </>
      )}
      {!showPrize && !spin && (
        <h3 className="text-white text-3xl font-bold">
          Tekan SPASI untuk mengundi hadiah
        </h3>
      )}
    </div>
  );
}

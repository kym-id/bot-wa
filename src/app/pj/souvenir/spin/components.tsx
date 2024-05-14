"use client";
import dynamic from "next/dynamic";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "~/components/ui/input";
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
  { option: "Gantungan Kunci", total: 15, key: "a" },
  { option: "Pin", total: 15, key: "b" },
  { option: "Pouch", total: 2, key: "c" },
  { option: "Totebag", total: 2, key: "d" },
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

export function InputPrize({ className }: { className?: string }) {
  const rawData = useSpinningWheelStore((s) => s.rawData);
  return (
    <div className={className}>
      <div className="w-[40%] bg-white rounded-md">
        <div className="py-1 px-4 border-b border-black">
          <span className="text-black font-semibold text-lg">Data Hadiah</span>
        </div>
        <div className="py-2 px-4 text-black flex flex-col space-y-2">
          {rawData.map((data) => (
            <div className="flex space-x-2" key={data.key}>
              <Input
                type="text"
                placeholder="Nama Hadiah"
                className="border-black"
                value={data.option}
              />
              <Input
                type="number"
                placeholder="Jumlah Hadiah"
                className="w-[40%] border-black"
                value={data.total}
              />
            </div>
          ))}
          <div className="mt-2 flex justify-between">
            <button
              className="h-10 px-4 py-2 rounded-md border  text-white bg-black font-semibold disabled:bg-black/50"
              // disabled
            >
              Tambah Hadiah
            </button>
            <button className="h-10 px-4 py-2 rounded-md border  text-white bg-black font-semibold">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const data = [
  { option: "Gantungan Kunci" },
  { option: "Pin" },
  { option: "Pouch" },
  { option: "Totebag" },
  { option: "Gantungan Kunci" },
  { option: "Pin" },
  { option: "Pouch" },
  { option: "Totebag" },
];

const backgroundColors = ["#ffffff", "#ff0000"];
const textColors = ["#0b3351"];
const outerBorderColor = "#3e254b";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 8;
const fontFamily = "Nunito";
const fontWeight = "bold";
const fontSize = 20;
const fontStyle = "normal";
const textDistance = 60;
const spinDuration = 1.0;

const Wheel = dynamic(
  () => import("@boriska420/react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

function SpinSouvenirPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

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
    <div
      className="flex w-dvw h-dvh overflow-hidden bg-[url('/spin/back.jpg')]"
      style={{ backgroundSize: "5%" }}
    >
      <div className="h-full w-[50%] flex flex-col justify-center py-0 relative">
        <div className="w-full relative z-10">
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
          />
        </div>
        <img
          src="/spin/stand.png"
          alt="Stand Spin wheel"
          className="absolute z-0 w-[20%] bottom-0 right-[50%] translate-x-[50%]"
        />
      </div>
      <button className={"spin-button"} onClick={handleSpinClick}>
        SPIN
      </button>
    </div>
  );
}

export default SpinSouvenirPage;

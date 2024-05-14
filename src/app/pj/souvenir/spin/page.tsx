import { Metadata } from "next";
import {
  Decoration01,
  Decoration02,
  DecorationLogo,
  Hotkeys,
  InputPrize,
  SelectedPrize,
  SpinningWheel,
} from "./components";

import "./flash.css";

export const metadata: Metadata = {
  title: "Pengundian souvenir",
};

function SpinSouvenirPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div
      className="flex w-dvw h-dvh overflow-hidden bg-[url('/spin/back.jpg')] select-none relative"
      style={{ backgroundSize: "5%" }}
    >
      {/* Left Top Decoration */}
      <Decoration01 className="absolute left-[-5%] top-0 w-[40%] rotate-[-20deg]" />
      {/* Logo Decoration */}
      <DecorationLogo className="absolute w-[17%] top-5 mx-auto left-0 right-0 z-20" />
      {/* Spin n Win */}
      <Decoration02 className="absolute w-[30%] top-[10rem] right-44 animate-bounce" />
      {/* Right Top Decoration */}
      <Decoration01 className="absolute right-[-5%] top-0 w-[35%] rotate-[30deg]" />
      <SpinningWheel />
      <SelectedPrize className="absolute bottom-40 right-[24rem] text-center translate-x-[50%]" />
      <Hotkeys />
      <InputPrize className="absolute z-50 w-full h-full bg-black/60 flex justify-center items-center" />
    </div>
  );
}

export default SpinSouvenirPage;

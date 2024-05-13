import { Metadata } from "next";
import { SpinningWheel } from "./components";

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
      className="flex w-dvw h-dvh overflow-hidden bg-[url('/spin/back.jpg')] select-none"
      style={{ backgroundSize: "5%" }}
    >
      <SpinningWheel data={data} />
    </div>
  );
}

export default SpinSouvenirPage;

import { Metadata } from "next";
import { prisma } from "~/lib/prisma";
import {
  EventDetails,
  EventSouvenirStateSetter,
  QRScanComponent,
} from "./components";

export const metadata: Metadata = {
  title: "Scan QR penukaran souvenir",
};

async function QRSouvenirScanPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const _key = searchParams["key"];
  if (!_key) {
    return <div>Please provide key to url</div>;
  }
  const key = _key as string;
  const event = await prisma.event.findUnique({
    where: { key },
    include: { vouchers: true },
  });
  if (!event) {
    return <div>Event with key: {key} is not found</div>;
  }
  if (!event.open) {
    return <div>Event already closed</div>;
  }

  const totalVoucher = event.vouchers.length;
  const totalRedeemed = event.vouchers.reduce((p, v) => {
    if (v.redeemAt) {
      return p + 1;
    }
    return p;
  }, 0);

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-6/12 mx-auto select-none text-white h-dvh">
      <EventSouvenirStateSetter
        initialState={{ totalVoucher, totalRedeemed, key }}
      />
      <div className="flex h-[50%] relative">
        <QRScanComponent />
      </div>
      <div className="mt-2 w-full flex flex-col items-center">
        <EventDetails name={event.name} />
      </div>
    </div>
  );
}

export default QRSouvenirScanPage;

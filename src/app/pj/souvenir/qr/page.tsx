import { Metadata } from "next";
import { EventDetails, QRScanComponent } from "./components";
import { prisma } from "~/lib/prisma";

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
  const key = searchParams["key"];
  if (!key) {
    return <div>Please provide key to url</div>;
  }
  const event = await prisma.event.findUnique({
    where: { key: key as string },
    include: { vouchers: true },
  });
  if (!event) {
    return <div>Event with key: {key} is not found</div>;
  }
  if (!event.open) {
    return <div>Event already closed</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-6/12 mx-auto">
      <div className="flex h-[50%]">
        <QRScanComponent />
      </div>
      <div className="mt-2 w-full flex flex-col items-center">
        <EventDetails
          name={event.name}
          totalVoucher={event.vouchers.length}
          totalRedeemed={event.vouchers.reduce((p, v) => {
            if (v.redeemAt) {
              return p + 1;
            }
            return p;
          }, 0)}
        />
      </div>
    </div>
  );
}

export default QRSouvenirScanPage;

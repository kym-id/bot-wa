"use client";
import { QrReader } from "~/components/qr-scanner";

function QRScanComponent() {
  return <QrReader />;
}

function EventDetails({
  name,
  totalVoucher: _totalVoucher,
  totalRedeemed: _totalRedeemed,
}: {
  name: string;
  totalVoucher: number;
  totalRedeemed: number;
}) {
  return (
    <>
      <h1 className="text-xl font-semibold my-2">{name}</h1>
      <div className="flex justify-evenly w-full">
        <div className="rounded border border-white flex flex-col justify-center items-center p-2">
          <span>Total Hadir</span>
          <div className="text-4xl font-bold">{_totalVoucher}</div>
        </div>
        <div className="rounded border border-white flex flex-col justify-center items-center p-2">
          <span>Penukaran</span>
          <div className="text-4xl font-bold">{_totalRedeemed}</div>
        </div>
      </div>
    </>
  );
}

export { QRScanComponent, EventDetails };

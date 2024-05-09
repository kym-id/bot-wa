"use client";
import { QrReader } from "~/components/qr-scanner";

function QRScanComponent() {
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-6/12 mx-auto">
      <div className="flex h-[50%]">
        <QrReader />
      </div>
      <div className="mt-2 w-full flex flex-col items-center">
        <h1 className="text-xl font-semibold my-2">Solo Mei</h1>
        <div className="flex justify-evenly w-full">
          <div className="rounded border border-white flex flex-col justify-center items-center p-2">
            <span>Total Hadir</span>
            <div className="text-4xl font-bold">90</div>
          </div>
          <div className="rounded border border-white flex flex-col justify-center items-center p-2">
            <span>Penukaran</span>
            <div className="text-4xl font-bold">10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { QRScanComponent };

import { Metadata } from "next";
import React from "react";
import { QrReader } from "~/components/qr-scanner";

export const metadata: Metadata = {
  title: "Scan QR penukaran souvenir",
};

function QRSouvenirScan() {
  return (
    <div>
      <QrReader />
    </div>
  );
}

export default QRSouvenirScan;

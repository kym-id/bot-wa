import { Metadata } from "next";
import { QRScanComponent } from "./components";

export const metadata: Metadata = {
  title: "Scan QR penukaran souvenir",
};

function QRSouvenirScanPage() {
  return <QRScanComponent />;
}

export default QRSouvenirScanPage;

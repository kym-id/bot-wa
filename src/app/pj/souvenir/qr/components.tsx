"use client";
import { QrReader } from "~/components/qr-scanner";
import { useSyncStore } from "~/hooks/useSyncStore";
import {
  EventSouvenirStore,
  useEventSouvenirStore,
} from "~/store/event-souvenir";

function QRScanComponent() {
  return <QrReader />;
}

function EventDetails({ name }: { name: string }) {
  const totalVoucher = useEventSouvenirStore((s) => s.totalVoucher);
  const totalRedeemed = useEventSouvenirStore((s) => s.totalRedeemed);
  return (
    <>
      <h1 className="text-xl font-semibold my-2">{name}</h1>
      <div className="flex justify-evenly w-full">
        <div className="rounded border border-white flex flex-col justify-center items-center p-2">
          <span>Total Hadir</span>
          <div className="text-4xl font-bold">{totalVoucher}</div>
        </div>
        <div className="rounded border border-white flex flex-col justify-center items-center p-2">
          <span>Penukaran</span>
          <div className="text-4xl font-bold">{totalRedeemed}</div>
        </div>
      </div>
    </>
  );
}

function EventSouvenirStateSetter(props: { initialState: EventSouvenirStore }) {
  useSyncStore(useEventSouvenirStore, props.initialState);
  return <></>;
}

export { QRScanComponent, EventDetails, EventSouvenirStateSetter };

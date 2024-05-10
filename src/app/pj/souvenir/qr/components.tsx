"use client";
import { useEffect, useState, useTransition } from "react";
import { QrReader } from "~/components/qr-scanner";
import { useSyncStore } from "~/hooks/useSyncStore";
import {
  EventSouvenirStore,
  useEventSouvenirStore,
} from "~/store/event-souvenir";
import { getTotalVoucher } from "./action";
import { toast } from "sonner";

function QRScanComponent() {
  const [scanResult, setScanResult] = useState<string>("");
  useEffect(() => {
    toast.success(scanResult);
  }, [scanResult]);

  return (
    <QrReader
      onScan={(text) => {
        setScanResult(text);
      }}
    />
  );
}

function EventDetails({ name }: { name: string }) {
  const key = useEventSouvenirStore((s) => s.key);
  const totalVoucher = useEventSouvenirStore((s) => s.totalVoucher);
  const totalRedeemed = useEventSouvenirStore((s) => s.totalRedeemed);

  const setTotalVoucher = useEventSouvenirStore((s) => s.setTotalVoucher);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let interval = setInterval(() => {
      if (isPending) return;
      startTransition(async () => {
        const n = await getTotalVoucher({ key });
        setTotalVoucher(n);
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [key]);

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

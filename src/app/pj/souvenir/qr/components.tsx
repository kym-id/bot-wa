"use client";
import { useEffect, useState, useTransition } from "react";
import { QrReader } from "~/components/qr-scanner";
import { useSyncStore } from "~/hooks/useSyncStore";
import {
  EventSouvenirStore,
  useEventSouvenirStore,
} from "~/store/event-souvenir";
import { checkVoucher, getTotalVoucher } from "./action";
import { toast } from "sonner";
import { validateQRSouvenir } from "~/lib/other";
import { Loading } from "~/components/icon";

function QRScanComponent() {
  const key = useEventSouvenirStore((s) => s.key);
  const totalRedeemed = useEventSouvenirStore((s) => s.totalRedeemed);
  const setTotalRedeemed = useEventSouvenirStore((s) => s.setTotalRedeemed);

  const [scanResult, setScanResult] = useState<string>("");
  const [loadingCheckVoucher, startCheckVoucher] = useTransition();

  function increaseRedeemed() {
    setTotalRedeemed(totalRedeemed + 1);
  }

  useEffect(() => {
    const v = validateQRSouvenir(scanResult);
    if (!v) {
      toast.warning(`QR Code bukan voucher souvenir`);
      return;
    }
    startCheckVoucher(async () => {
      const r = await checkVoucher({
        key,
        code: scanResult.replace("@kym-voucher", ""),
      });
      if (r === "not-found") {
        toast.warning(`Kode voucher tidak dapat ditemukan`);
        return;
      } else if (r === "redeemed") {
        toast.error(`Kode voucher telah ditukarkan`);
        return;
      } else if (r === "valid") {
        toast.success(`Kode voucher valid`);
        increaseRedeemed();
        return;
      }
    });
  }, [scanResult]);

  return (
    <QrReader
      onScan={(text) => {
        setScanResult(text);
      }}
      frameIcon={loadingCheckVoucher ? <Loading /> : undefined}
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

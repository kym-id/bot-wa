"use server";
import { prisma } from "~/lib/prisma";

export async function getTotalVoucher({ key }: { key: string }) {
  return await prisma.voucher.count({ where: { event: { key } } });
}

export async function checkVoucher({
  code,
  key,
}: {
  code: string;
  key: string;
}) {
  const voucher = await prisma.voucher.findUnique({
    where: { event: { key }, code },
  });
  if (!voucher) {
    return "not-found";
  }
  if (voucher.redeemAt) {
    return "redeemed";
  }
  await prisma.voucher.update({
    where: { event: { key }, code },
    data: { redeemAt: new Date() },
  });
  return "valid";
}

"use server";
import { prisma } from "~/lib/prisma";

export async function getTotalVoucher({ key }: { key: string }) {
  return await prisma.voucher.count({ where: { event: { key } } });
}

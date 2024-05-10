"use server";
import { prisma } from "~/lib/prisma";
import { sendMessage } from "~/lib/whatsapp";

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
  const v = await prisma.voucher.update({
    where: { event: { key }, code },
    data: { redeemAt: new Date() },
  });
  await sendMessage({
    jid: v.userId,
    message: `Terima kasih telah menukarkan voucher anda dengan souvenir di booth kami 🙏️`,
  });
  sendMessage({
    jid: v.userId,
    message: `_Apabila anda tidak merasa menukarkan voucher ini, mohon laporkan ke petugas kami_`,
  });
  return "valid";
}

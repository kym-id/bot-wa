import { Voucher } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { makeId } from "~/lib/other";
import { prisma } from "~/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let slug = searchParams.get("slug");
  let jid = searchParams.get("jid");

  if (!slug) {
    return NextResponse.json({
      success: false,
      error: `Please provide slug on search params`,
    });
  }

  if (!jid) {
    return NextResponse.json({
      success: false,
      error: `Please provide jid on search params`,
    });
  }

  slug = slug.replaceAll(/\#/g, "");
  slug = slug.replaceAll(new RegExp("KYM-Event-", "ig"), "");

  let voucher: Voucher | null = null;

  const eventData = await prisma.event.findUnique({
    where: { slug, open: true },
  });

  const userData = await prisma.user.findUnique({
    where: { jid },
  });

  if (eventData && userData) {
    voucher = await prisma.voucher.upsert({
      where: {
        eventId_userId: {
          eventId: eventData.id,
          userId: userData.id,
        },
      },
      create: {
        eventId: eventData.id,
        userId: userData.id,
        code: makeId(20),
      },
      update: {},
    });
  }

  return NextResponse.json({
    success: true,
    data: voucher,
    redeemed: voucher ? !!voucher.redeemAt : false,
    slug,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({
      success: false,
      error: `Please provide slug on search params`,
    });
  }

  slug = slug.replaceAll(/\#/g, "");
  slug = slug.replaceAll(new RegExp("KYM-Event-", "ig"), "");

  const eventData = await prisma.event.findUnique({
    where: { slug, open: true },
  });
  const eventOpen = await prisma.event.count({ where: { open: true } });

  return NextResponse.json({
    success: true,
    data: eventData,
    exists: !!eventData,
    allClose: eventOpen === 0,
    slug,
  });
}

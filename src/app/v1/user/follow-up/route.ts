import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jid = searchParams.get("jid");
  const key = searchParams.get("key");

  if (!jid) {
    return NextResponse.json({
      success: false,
      error: `Please provide jid on search params`,
    });
  }

  if (!key) {
    return NextResponse.json({
      success: false,
      error: `Please provide key on search params`,
    });
  }

  const followUp = await prisma.botFollowUp.findUnique({
    where: {
      key_userId: {
        key,
        userId: jid,
      },
    },
  });

  return NextResponse.json({ success: true, data: followUp?.answer });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jid = searchParams.get("jid");
  const key = searchParams.get("key");

  if (!jid) {
    return NextResponse.json({
      success: false,
      error: `Please provide jid on search params`,
    });
  }

  if (!key) {
    return NextResponse.json({
      success: false,
      error: `Please provide key on search params`,
    });
  }

  const res = (await request.json()) as {
    followUp: string;
  };

  const followUp = await prisma.botFollowUp.upsert({
    where: {
      key_userId: {
        key,
        userId: jid,
      },
    },
    create: {
      key,
      userId: jid,
      answer: res.followUp,
    },
    update: {
      answer: res.followUp,
    },
  });

  return NextResponse.json({ success: true, data: followUp });
}

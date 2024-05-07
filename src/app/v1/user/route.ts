import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jid = searchParams.get("jid");

  if (!jid) {
    return NextResponse.json({
      success: false,
      error: `Please provide jid on search params`,
    });
  }

  const user = await prisma.user.findUnique({ where: { jid } });

  return NextResponse.json({ success: true, data: user, exists: !!user });
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as {
    jid: string;
    name: string;
    pronouns: string;
    institution: string;
  };
  const user = await prisma.user.upsert({
    where: {
      jid: res.jid,
    },
    create: {
      jid: res.jid,
      name: res.name,
      pronouns: res.pronouns,
      institution: res.institution,
    },
    update: {
      name: res.name,
      pronouns: res.pronouns,
      institution: res.institution,
    },
  });
  return NextResponse.json({ user });
}

export async function PUT(request: NextRequest) {
  const res = (await request.json()) as Partial<{
    jid: string;
    name: string;
    pronouns: string;
    institution: string;
  }>;
  const user = await prisma.user.update({
    where: {
      jid: res.jid,
    },
    data: {
      institution: res.institution,
    },
  });
  return NextResponse.json({ user });
}

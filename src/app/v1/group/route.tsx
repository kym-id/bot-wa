import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = (await request.json()) as Partial<{
    jid: string;
  }>;
  console.log(`Want to join group`, res);
  return NextResponse.json({});
}

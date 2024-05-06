import { NextRequest, NextResponse } from "next/server";
import { addToGroup } from "~/lib/whatsapp";

export async function POST(request: NextRequest) {
  const res = (await request.json()) as {
    jid: string;
  };
  const r = await addToGroup({
    jid: res.jid,
    gid: process.env.WA_BOT_DEFAULT_GROUP || "120363294424509408@g.us",
  });
  console.log(await r.json());
  return NextResponse.json({});
}

import { headers as nextHeaders } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { NewRelic } from "~/lib/newrelic";

const nr = new NewRelic({ serviceName: "bot" });

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
  });
}

export async function POST(request: NextRequest) {
  const headersList: { key: string; value: any }[] = [];
  nextHeaders().forEach((v, k, p) => {
    headersList.push({ key: k, value: v });
  });
  const headers = Object.fromEntries(headersList.map((v) => [v.key, v.value]));
  nr.log({
    message: `WhatsApp Callback`,
    data: {
      headers,
      body: await request.json(),
    },
  });
  return NextResponse.json({
    success: true,
  });
}

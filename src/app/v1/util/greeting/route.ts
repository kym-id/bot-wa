import { NextResponse } from "next/server";
import { getCurrentWIB } from "~/lib/time";

export async function GET(request: Request) {
  const now = getCurrentWIB();

  const h = now.hour();
  let noun = "";
  if (h < 11) {
    noun = "pagi";
  } else if (h < 15) {
    noun = "siang";
  } else if (h < 18) {
    noun = "sore";
  } else if (h < 23) {
    noun = "malam";
  }
  return NextResponse.json({
    noun,
  });
}

export const dynamic = "force-dynamic";

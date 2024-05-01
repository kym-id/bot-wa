import { NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(request: Request) {
  const now = dayjs.tz(new Date(), "Asia/Jakarta");

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

import { ImageResponse } from "next/og";
import logo from "./kym.png";
import { getCurrentWIB } from "~/lib/time";
import { NextRequest } from "next/server";
require("dayjs/locale/id");

export async function GET(request: NextRequest) {
  const siteUrl = process.env.VERCEL
    ? process.env.VERCEL_URL
    : "https://3000-kymid-botwa-s464qnzasr9.ws-us110.gitpod.io";
  const now = getCurrentWIB();

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || "-";

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full bg-white items-center justify-center"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000000' fill-opacity='0.042' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        }}
      >
        <img src={siteUrl + logo.src} width="161" height="80" tw="mt-4" />
        <h2 tw="text-md">Voucher Souvenir</h2>
        <div tw="flex flex-col items-center">
          <img
            src={`https://kym-shipping.vercel.app/qr?data=${encodeURIComponent(
              code
            )}`}
            tw="p-2"
            style={{
              backgroundColor: "#ffffff",
            }}
            width="200"
            height="200"
          />
          {/* <h5 tw="font-normal">05 Mei 2024 10:48 WIB</h5> */}
          <h5 tw="font-normal">
            {now.locale("id").format("DD MMMM YYYY HH:mm")} WIB
          </h5>
        </div>
        <h6 tw="text-xs max-w-[80%] font-normal text-center">
          Tunjukan QR Code berikut kepada petugas kami untuk mendapatkan
          souvenir menarik
        </h6>
      </div>
    ),
    {
      width: 400,
      height: 500,
    }
  );
}

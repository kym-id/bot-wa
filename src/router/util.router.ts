import { RequestHandler, Router } from "express";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function UtilRouter(...guards: RequestHandler[]): Router {
  const router = Router().get("/greeting", ...guards, async (req, res) => {
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
    res.json({
      noun,
    });
  });
  return router;
}

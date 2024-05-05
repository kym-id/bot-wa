import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getCurrentWIB() {
  return dayjs.tz(new Date(), "Asia/Jakarta");
}

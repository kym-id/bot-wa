import { hostname } from "os";

const NR_ENDPOINT = "https://log-api.newrelic.com/log/v1";

export class NewRelic {
  private serviceName: string;
  private hostname: string;
  constructor(opts: { serviceName: string }) {
    this.serviceName = opts.serviceName;
    this.hostname = hostname();
  }

  log(info: { message: string; data: Object }) {
    const key = process.env.NEWRELIC_LICENSE_KEY;

    if (key) {
      try {
        const { message, data } = info;
        const now = new Date();
        fetch(NR_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": key,
          },
          body: JSON.stringify([
            {
              common: {
                attributes: {
                  logtype: "INFO",
                  service: this.serviceName,
                  hostname: this.hostname,
                },
              },
              logs: [
                {
                  timestamp: now.getTime(),
                  message,
                  data,
                },
              ],
            },
          ]),
        });
      } catch (error) {}
    }
  }
}

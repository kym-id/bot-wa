import express, { RequestHandler, Router, json, urlencoded } from "express";
import { UtilRouter } from "./router/util.router";

export function describeRoutes(
  rootPath: string,
  router: Router,
  options: {
    version: string;
  } = { version: "v1" }
): RequestHandler[] {
  for (const r of router.stack) {
    if (r.route) {
      const { path } = r.route;
      const authType = r.route.stack[0].method.toUpperCase();
      // logger.subContext('ROUTE');
      // logger.info(`[${authType}] ${rootPath}${path}`);
      // logger.subContext();
    }
  }

  return [rootPath, router] as RequestHandler[];
}

export async function AppModule(context: Map<string, any>) {
  const app = express();

  const utilRouter = UtilRouter();

  const router = Router();
  router.use(...describeRoutes("/util", utilRouter));

  app.use(
    urlencoded({ extended: true, limit: "100mb" }),
    json({ limit: "100mb" })
  );

  app.use("/v1/", router);

  app["close"] = async () => {
    console.log(`Close Gracefully`);
    // await repository.onModuleDestroy();
    // await redisCache.onModuleDestroy();
  };

  context.set("app", app);
}

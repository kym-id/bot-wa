import { AppModule } from "./app.module";

const context = new Map<string, any>();

export async function bootstrap() {
  await AppModule(context);

  const PORT = 8080;

  context.get("app").listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();

process.on("SIGINT", async () => {
  await context.get("app").close();
  //   context.get('module:logger').warn('APP MODULE - OFF');
  //   context.get('server:logger').warn('HTTP - OFF');
  process.exit(0);
});

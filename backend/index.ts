import "reflect-metadata";
import "es6-shim";
import config from "./config";
import app from "./server/app";
import client from "./db";

async function main() {
  await client.$connect();
  app.listen(Number(config.PORT), config.HOST, () => {
    console.log(
      `[INFO]: Application started successfully on port ${config.PORT}`,
    );
  });
}

main()
  .catch((error) => {
    console.error(
      "[ERROR]: An exception occurred while running application",
      error,
    );
  })
  .finally(() => client.$disconnect());

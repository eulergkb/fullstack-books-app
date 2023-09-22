import { config } from "dotenv";
const { parsed } = config({});
const env = process.env.NODE_ENV || "development";

export default {
  ENV: env,
  JWT_SECRET: parsed?.JWT_SECRET || "",
  HOST: parsed?.HOST || "0.0.0.0",
  PORT: parsed?.PORT || "8080",
};

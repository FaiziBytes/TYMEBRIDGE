import type { CorsOptions } from "cors";
import { appConfig } from "./app.config";

const isDev = appConfig.nodeEnv === "development";

const allowedOrigins = appConfig.frontendUrl
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions: CorsOptions = {
  // TODO: allow-all for now — reflect any origin. Restore allowedOrigins check before production.
  origin(origin, callback) {
    void isDev;
    void allowedOrigins;
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  exposedHeaders: ["X-Request-ID"],
};

import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { requestId } from "./middlewares/requestId";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";
import { apiLimiter } from "./middlewares/rateLimiter";
import { sanitizeInput } from "./middlewares/inputSanitizer";
import { corsOptions } from "./config/cors";
import { buildCspDirectives } from "./config/csp";
import router from "./routes";
import { appConfig } from "./config/app.config";
import { prisma } from "./db/prisma";
import path from "path";

const app: Express = express();

if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? { directives: buildCspDirectives() }
        : false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

if (appConfig.zoom.callIsolation) {
  app.use("/call", (_req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    next();
  });
}

app.use(requestId);
app.use(compression());

if (process.env.NODE_ENV !== "development") {
  app.use(apiLimiter);
}

app.use(cors(corsOptions));
app.use(cookieParser());

const isServerless = process.env.VERCEL === "1";
if (!isServerless) {
  const uploadDir = path.join(process.cwd(), "uploads");
  app.use("/uploads", express.static(uploadDir));
}

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
    }
  }
}

const jsonParser = express.json({
  limit: "100kb",
  verify: (req, _res, buf) => {
    (req as express.Request).rawBody = buf;
  },
});

const urlencodedParser = express.urlencoded({ extended: true, limit: "100kb" });

app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return next();
  }
  jsonParser(req, res, next);
});

app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return next();
  }
  urlencodedParser(req, res, next);
});

app.use(sanitizeInput);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    })
  );
}

let initializedApp: Express | null = null;

export async function initializeApp(): Promise<Express> {
  if (initializedApp) return initializedApp;

  prisma.$connect().catch((err) => logger.error("Prisma prewarm failed:", err));

  app.use(appConfig.apiPrefix, router);
  app.use(errorHandler);

  initializedApp = app;
  return app;
}

export default app;

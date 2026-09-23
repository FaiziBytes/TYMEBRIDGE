import "dotenv/config";
import { createServer } from "http";
import { initializeApp } from "./app";
import { logger } from "./utils/logger";
import { serveStatic } from "./static";
import { appConfig } from "./config/app.config";
import { prisma } from "./db/prisma";
import { closeRateLimitStore } from "./middlewares/rateLimiter";
const startServer = async () => {
  try {
    const app = await initializeApp();
    const httpServer = createServer(app);

    const isProduction = process.env.NODE_ENV === "production";
    const isVercel = process.env.VERCEL === "1";

    if (isProduction && !isVercel) {
      serveStatic(app);
      const { notFoundHandler } = await import("./middlewares/errorHandler");
      app.use(notFoundHandler);
      logger.info("✅ Static file serving enabled");
    } else if (!isProduction) {
      logger.info("🚀 Setting up Vite dev server...");
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      logger.info("✅ Vite dev server initialized");
    } else {
      logger.info("✅ Running on Vercel - static files served by CDN");
    }

    if (!isVercel) {
      const port = appConfig.port;
      httpServer.listen(
        {
          port,
          host: "0.0.0.0",
        },
        () => {
          logger.info(
            `🚀 Server running in ${appConfig.nodeEnv} mode on port ${port}`
          );
          logger.info(`📍 API available at http://localhost:${port}/api`);
        }
      );
    } else {
      logger.info("✅ Serverless function initialized on Vercel");
    }
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Closing server gracefully...`);

      httpServer.close(async () => {
        logger.info("HTTP server closed");

        try {
          await prisma.$disconnect();
          await closeRateLimitStore();
          logger.info("Database and rate-limit store disconnected");
          process.exit(0);
        } catch (err) {
          logger.error("Error during shutdown:", err);
          process.exit(1);
        }
      });

      setTimeout(() => {
        logger.error("Forcing shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (err) => {
      logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
      logger.error(err);
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(`${err.name} ${err.message}`);
  process.exit(1);
});

startServer();

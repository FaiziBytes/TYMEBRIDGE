import rateLimit, { ipKeyGenerator, type Store } from "express-rate-limit";
import { RedisStore, type RedisReply } from "rate-limit-redis";
import { Redis } from "ioredis";
import type { Request } from "express";
import { appConfig } from "../config/app.config";
import { logger } from "../utils/logger";

const getClientIp = (req: Request): string => {
  const raw = req.ip || req.socket.remoteAddress || "unknown";
  return ipKeyGenerator(raw);
};

let redisClient: Redis | null = null;
if (appConfig.redisUrl) {
  redisClient = new Redis(appConfig.redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: false,
  });
  redisClient.on("error", (err: Error) =>
    logger.error("Redis client error (rate limiter):", err)
  );
} else if (appConfig.isProduction) {
  logger.warn(
    "REDIS_URL is not set — rate limiter is using the in-memory store. " +
      "Counters will not be shared across instances or serverless invocations."
  );
}

const makeStore = (prefix: string): Store | undefined => {
  const client = redisClient;
  if (!client) return undefined;
  return new RedisStore({
    prefix,
    sendCommand: (command: string, ...args: string[]) =>
      client.call(command, ...args) as Promise<RedisReply>,
  });
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  store: makeStore("rl:api:"),
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  store: makeStore("rl:strict:"),
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: getClientIp,
  store: makeStore("rl:login:"),
});

export const otpLimiter = rateLimit({
  windowMs: appConfig.otp.rateWindowMs,
  max: appConfig.otp.rateLimit,
  message: "Too many OTP requests. Please wait before requesting again.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
  store: makeStore("rl:otp:"),
});

export async function closeRateLimitStore(): Promise<void> {
  const client = redisClient;
  if (client) {
    await client.quit().catch(() => client.disconnect());
    redisClient = null;
  }
}

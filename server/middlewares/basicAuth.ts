import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";
import { appConfig } from "../config/app.config";

/** Constant-time string comparison (avoids leaking length/match via timing). */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * HTTP Basic Auth gate for the Bull Board dashboard (browser-friendly, since
 * the SPA's bearer token can't be attached to a plain page load). When no
 * credentials are configured the board is open in development and hidden
 * (404) in production.
 */
export function basicAuth() {
  const { user, password } = appConfig.bullBoard;

  return (req: Request, res: Response, next: NextFunction): void => {
    if (!user && !password) {
      if (!appConfig.isProduction) return next();
      res.status(404).end();
      return;
    }

    const header = req.headers.authorization ?? "";
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (safeEqual(u, user ?? "") && safeEqual(p, password ?? "")) {
        return next();
      }
    }

    res.set("WWW-Authenticate", 'Basic realm="Bull Board"').status(401).end();
  };
}

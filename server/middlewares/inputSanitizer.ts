import { Request, Response, NextFunction } from "express";
import xss from "xss";

/**
 * Secret-bearing fields are never HTML-escaped: they are hashed or compared,
 * not rendered, and escaping would silently corrupt values containing
 * characters like `<`, `&` or quotes.
 */
const SKIP_KEYS = new Set([
  "password",
  "confirmPassword",
  "currentPassword",
  "newPassword",
]);

export function sanitizeInput(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return next();
  }

  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body as Record<string, unknown>);
  }
  next();
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === "string") {
        sanitized[key] = SKIP_KEYS.has(key) ? value : xss(value);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map((item: unknown) =>
          typeof item === "string" ? xss(item) : item
        );
      } else if (value && typeof value === "object") {
        sanitized[key] = sanitizeObject(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }
  }

  return sanitized;
}

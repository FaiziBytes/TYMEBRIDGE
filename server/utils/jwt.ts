import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";
import { parseDurationSeconds } from "./duration";

export interface JWTPayload {
  id: string;
  email?: string;
  role?: string;
  type?: "access" | "refresh";
}

const accessTtlSeconds = parseDurationSeconds(appConfig.jwt.expiresIn);

// iss/aud are pinned on sign AND verify so tokens minted for another
// service (or by another signer sharing the secret) are rejected.
const issuer = appConfig.jwt.issuer;
const audience = appConfig.jwt.audience;

export function generateToken(payload: JWTPayload): string {
  return jwt.sign({ ...payload, type: "access" }, appConfig.jwt.secret, {
    expiresIn: accessTtlSeconds,
    issuer,
    audience,
  });
}

export function verifyToken(token: string): JWTPayload {
  try {
    const payload = jwt.verify(token, appConfig.jwt.secret, {
      issuer,
      audience,
    }) as JWTPayload;
    if (payload.type !== "access") {
      throw new Error("Invalid token type");
    }
    return payload;
  } catch {
    throw new Error("Invalid or expired token");
  }
}

const PASSWORD_RESET_KIND = "password-reset";
const PASSWORD_RESET_TTL_SECONDS = 10 * 60;

/** Short-lived signed proof that the user verified the reset OTP for this email. */
export function generatePasswordResetToken(email: string): string {
  return jwt.sign(
    { sub: email, kind: PASSWORD_RESET_KIND },
    appConfig.jwt.secret,
    { expiresIn: PASSWORD_RESET_TTL_SECONDS, issuer, audience }
  );
}

export function verifyPasswordResetToken(token: string): string {
  const payload = jwt.verify(token, appConfig.jwt.secret, {
    issuer,
    audience,
  }) as {
    sub?: string;
    kind?: string;
  };
  if (payload.kind !== PASSWORD_RESET_KIND || !payload.sub) {
    throw new Error("Invalid password reset token");
  }
  return payload.sub;
}

import "dotenv/config";
import crypto from "crypto";
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),

  DATABASE_URL: z
    .string({ required_error: "DATABASE_URL is required" })
    .min(1, "DATABASE_URL is required"),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_POOL_IDLE_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  DB_CONNECTION_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  DB_STATEMENT_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),

  FRONTEND_URL: z.string().min(1).default("http://localhost:5000"),

  JWT_SECRET: z
    .string({ required_error: "JWT_SECRET is required" })
    .min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters")
    .optional(),
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+\s*[smhdwy]$/i, "Use a duration like 15m, 12h, 7d, 4w or 1y")
    .default("15m"),
  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .regex(/^\d+\s*[smhdwy]$/i, "Use a duration like 15m, 12h, 7d, 4w or 1y")
    .default("30d"),

  GOOGLE_CLIENT_ID: z.string().default(""),
  GOOGLE_CLIENT_SECRET: z.string().default(""),
  GOOGLE_CALLBACK_URL: z.string().default("/api/auth/google/callback"),

  OTP_RATE_LIMIT: z.coerce.number().int().positive().default(3),
  OTP_RATE_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  OTP_EXPIRY_MS: z.coerce.number().int().positive().default(300000),
  OTP_MAX_VERIFY_ATTEMPTS: z.coerce.number().int().positive().default(5),
  OTP_LOCKOUT_MS: z.coerce.number().int().positive().default(900000),

  SMTP_HOST: z.string().default("smtp-relay.brevo.com"),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => (v ? v === "true" : undefined)),
  SMTP_USER: z.string().default(""),
  SMTP_PASSWORD: z.string().default(""),
  SMTP_FROM: z.string().default(""),

  WHATSAPP_PHONE_NUMBER_ID: z.string().default(""),
  WHATSAPP_ACCESS_TOKEN: z.string().default(""),
  WHATSAPP_API_VERSION: z.string().default("v21.0"),
  WHATSAPP_OTP_TEMPLATE: z.string().default(""),
  WHATSAPP_OTP_TEMPLATE_LANG: z.string().default("en_US"),
  WHATSAPP_OTP_COPY_BUTTON: z
    .string()
    .optional()
    .transform((v) => (v ? v === "true" : true)),

  ZOOM_ACCOUNT_ID: z.string().default(""),
  ZOOM_CLIENT_ID: z.string().default(""),
  ZOOM_CLIENT_SECRET: z.string().default(""),
  ZOOM_HOST_USER_ID: z.string().default("me"),
  ZOOM_MEETING_TYPES: z.string().default("video,audio"),
  ZOOM_SDK_CLIENT_ID: z.string().default(""),
  ZOOM_SDK_CLIENT_SECRET: z.string().default(""),
  ZOOM_WEBHOOK_SECRET_TOKEN: z.string().default(""),
  ZOOM_WEBINAR_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  ZOOM_CALL_ISOLATION: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),

  REDIS_URL: z.string().optional(),

  FIELD_ENCRYPTION_KEY: z.string().default(""),
  RETENTION_SWEEP_ENABLED: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  RETENTION_OTP_HOURS: z.coerce.number().int().positive().default(24),
  RETENTION_REFRESH_TOKEN_DAYS: z.coerce.number().int().positive().default(30),
  RETENTION_OUTBOX_DAYS: z.coerce.number().int().positive().default(7),
  RETENTION_ZOOM_EVENT_DAYS: z.coerce.number().int().positive().default(90),
  RETENTION_NOTIFICATION_DAYS: z.coerce.number().int().positive().default(180),

  Location_Api_Key: z.string().default(""),

  AWS_REGION: z.string().default("eu-central-1"),
  AWS_S3_BUCKET: z.string().default(""),
  AWS_ACCESS_KEY_ID: z.string().default(""),
  AWS_SECRET_ACCESS_KEY: z.string().default(""),
  AWS_S3_PUBLIC_URL: z.string().default(""),

  MYFATOORAH_API_KEY: z.string().default(""),
  MYFATOORAH_BASE_URL: z.string().default("https://apitest.myfatoorah.com"),
  MYFATOORAH_WEBHOOK_SECRET: z.string().default(""),
  PAYMENT_CURRENCY: z.string().default("SAR"),
  PUBLIC_BASE_URL: z.string().default("http://localhost:5000"),

  BULLBOARD_USER: z.string().default(""),
  BULLBOARD_PASSWORD: z.string().default(""),

  VERCEL: z.string().optional(),
});

const rawEnv: Record<string, string | undefined> = {};
for (const [key, value] of Object.entries(process.env)) {
  rawEnv[key] = value === "" ? undefined : value;
}

const ephemeralSecrets: string[] = [];
if (!isProduction && !rawEnv.JWT_SECRET) {
  rawEnv.JWT_SECRET = crypto.randomBytes(48).toString("hex");
  ephemeralSecrets.push("JWT_SECRET");
}

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  console.error(
    `\n❌ Invalid environment configuration:\n${issues}\n\n` +
      `Copy .example.env to .env and fill in the required values, then restart.\n`
  );
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;

if (ephemeralSecrets.length > 0) {
  console.warn(
    `⚠️  ${ephemeralSecrets.join(", ")} not set — generated an ephemeral secret ` +
      `for this dev session. Existing tokens are invalidated on every restart; ` +
      `set a stable value in .env to avoid that.`
  );
}

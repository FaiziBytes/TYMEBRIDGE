import { env } from "./env";

const isServerless = process.env.VERCEL === "1";

export const appConfig = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
  isServerless,
  databaseUrl: env.DATABASE_URL,
  db: {
    poolMax: isServerless ? 1 : env.DB_POOL_MAX,
    idleTimeoutMs: env.DB_POOL_IDLE_TIMEOUT_MS,
    connectionTimeoutMs: env.DB_CONNECTION_TIMEOUT_MS,
    statementTimeoutMs: env.DB_STATEMENT_TIMEOUT_MS,
  },
  apiPrefix: "/api",
  frontendUrl: env.FRONTEND_URL,
  redisUrl: env.REDIS_URL,
  security: {
    fieldEncryptionKey: env.FIELD_ENCRYPTION_KEY,
  },
  retention: {
    enabled: env.RETENTION_SWEEP_ENABLED,
    otpHours: env.RETENTION_OTP_HOURS,
    refreshTokenDays: env.RETENTION_REFRESH_TOKEN_DAYS,
    outboxDays: env.RETENTION_OUTBOX_DAYS,
    zoomEventDays: env.RETENTION_ZOOM_EVENT_DAYS,
    notificationDays: env.RETENTION_NOTIFICATION_DAYS,
  },
  jwt: {
    secret: env.JWT_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET || env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
    issuer: "thymebridge-api",
    audience: "thymebridge-client",
  },
  googleOAuth: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
  },
  otp: {
    rateLimit: env.OTP_RATE_LIMIT,
    rateWindowMs: env.OTP_RATE_WINDOW_MS,
    expiryMs: env.OTP_EXPIRY_MS,
    maxVerifyAttempts: env.OTP_MAX_VERIFY_ATTEMPTS,
    lockoutMs: env.OTP_LOCKOUT_MS,
  },
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    from: env.SMTP_FROM || env.SMTP_USER || "noreply@example.com",
  },
  whatsapp: {
    phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: env.WHATSAPP_ACCESS_TOKEN,
    apiVersion: env.WHATSAPP_API_VERSION,
    otpTemplate: env.WHATSAPP_OTP_TEMPLATE,
    otpTemplateLang: env.WHATSAPP_OTP_TEMPLATE_LANG,
    otpCopyButton: env.WHATSAPP_OTP_COPY_BUTTON,
  },
  publicBaseUrl: env.PUBLIC_BASE_URL,
  location: {
    apiKey: env.Location_Api_Key,
    get enabled() {
      return Boolean(env.Location_Api_Key);
    },
  },
  payments: {
    currency: env.PAYMENT_CURRENCY,
  },
  myfatoorah: {
    apiKey: env.MYFATOORAH_API_KEY,
    baseUrl: env.MYFATOORAH_BASE_URL,
    webhookSecret: env.MYFATOORAH_WEBHOOK_SECRET,
  },
  zoom: {
    accountId: env.ZOOM_ACCOUNT_ID,
    clientId: env.ZOOM_CLIENT_ID,
    clientSecret: env.ZOOM_CLIENT_SECRET,
    hostUserId: env.ZOOM_HOST_USER_ID,
    sdkClientId: env.ZOOM_SDK_CLIENT_ID,
    sdkClientSecret: env.ZOOM_SDK_CLIENT_SECRET,
    webhookSecret: env.ZOOM_WEBHOOK_SECRET_TOKEN,
    webinarEnabled: env.ZOOM_WEBINAR_ENABLED,
    callIsolation: env.ZOOM_CALL_ISOLATION,
    meetingTypes: env.ZOOM_MEETING_TYPES.split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    get enabled() {
      return Boolean(
        env.ZOOM_ACCOUNT_ID && env.ZOOM_CLIENT_ID && env.ZOOM_CLIENT_SECRET
      );
    },
    get sdkEnabled() {
      return Boolean(env.ZOOM_SDK_CLIENT_ID && env.ZOOM_SDK_CLIENT_SECRET);
    },
  },
  bullBoard: {
    user: env.BULLBOARD_USER,
    password: env.BULLBOARD_PASSWORD,
  },
  s3: {
    region: env.AWS_REGION,
    bucket: env.AWS_S3_BUCKET,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    publicUrl: env.AWS_S3_PUBLIC_URL,
    get enabled() {
      return Boolean(env.AWS_S3_BUCKET);
    },
  },
} as const;

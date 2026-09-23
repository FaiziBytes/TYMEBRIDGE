import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import { appConfig } from "../config/app.config";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

/** Multer aborts are ordinary client mistakes — surface them as 4xx. */
function normalizeError(err: unknown): unknown {
  if (err instanceof MulterError) {
    return err.code === "LIMIT_FILE_SIZE"
      ? new ApiError(413, "File is too large")
      : new ApiError(400, err.message);
  }
  return err;
}

export function errorHandler(
  rawErr: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const err = normalizeError(rawErr);
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  const errors = isApiError ? err.errors : [];
  const stack = err instanceof Error ? err.stack : undefined;

  logger.error("Error occurred", {
    error: message,
    stack,
    statusCode,
    requestId: req.id,
    path: req.path,
    method: req.method,
  });

  // unexpected errors (Prisma, programming bugs) can carry internal details —
  // only ApiError messages are written for the public
  const publicMessage =
    isApiError || !appConfig.isProduction ? message : "Internal Server Error";

  res.status(statusCode).json({
    statusCode,
    data: null,
    message: publicMessage,
    success: false,
    errors,
    ...(appConfig.isDevelopment && stack ? { stack } : {}),
  });
}

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
}

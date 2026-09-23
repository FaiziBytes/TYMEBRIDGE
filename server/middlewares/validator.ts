import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, type ZodTypeAny } from "zod";
import { ApiError } from "../utils/ApiError";

function toApiError(error: ZodError, message: string): ApiError {
  const errors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return new ApiError(400, message, errors);
}

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(toApiError(error, "Validation failed"));
      }
      next(error);
    }
  };
};

// ZodTypeAny so refined/transformed schemas (ZodEffects) validate too
export const validateBody = (schema: ZodTypeAny) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(toApiError(error, "Validation failed"));
      }
      next(error);
    }
  };
};

// In Express 5 `req.query` (and `req.params`) are getter-only — the getter
// re-parses on every access, so reassigning or mutating them does not stick.
// Shadow the prototype getter with an own data property holding the validated
// (and coerced) value so downstream handlers read the parsed result.
function setParsed(
  req: Request,
  key: "query" | "params",
  value: unknown
): void {
  Object.defineProperty(req, key, {
    value,
    writable: true,
    configurable: true,
    enumerable: true,
  });
}

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      setParsed(req, "query", await schema.parseAsync(req.query));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(toApiError(error, "Invalid query parameters"));
      }
      next(error);
    }
  };
};

export const validateParams = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      setParsed(req, "params", await schema.parseAsync(req.params));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(toApiError(error, "Invalid route parameters"));
      }
      next(error);
    }
  };
};

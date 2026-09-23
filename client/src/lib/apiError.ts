import { AxiosError } from "axios";

interface ApiErrorBody {
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
}

export interface ApiFieldErrorItem {
  field?: string;
  message: string;
}

/** Field-level validation errors from the server's ApiError envelope. */
export function getApiFieldErrors(error: unknown): ApiFieldErrorItem[] {
  if (!(error instanceof AxiosError)) return [];
  const body = error.response?.data as ApiErrorBody | undefined;
  return (body?.errors ?? []).filter((e): e is ApiFieldErrorItem =>
    Boolean(e?.message)
  );
}

/** HTTP status of an API error, when the response carried one. */
export function getApiErrorStatus(error: unknown): number | undefined {
  return error instanceof AxiosError ? error.response?.status : undefined;
}

/**
 * True for a refusal the server states in plain language for the user — a rule
 * was applied ("your account is still under review", "that slot is taken"),
 * nothing broke. These read as the message itself, not as a failure.
 */
export function isExpectedRefusal(error: unknown): boolean {
  const status = getApiErrorStatus(error);
  if (status !== 403 && status !== 409) return false;
  const body = (error as AxiosError).response?.data as ApiErrorBody | undefined;
  return Boolean(body?.message);
}

/** Pulls the most useful human-readable message out of an API/Axios error. */
export function getApiErrorMessage(error: unknown, fallback?: string): string {
  const fb = fallback ?? "Something went wrong. Please try again.";
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.errors?.length) {
      const first = body.errors.find((e) => e.message)?.message;
      if (first) return first;
    }
    if (body?.message) return body.message;
    if (error.code === "ERR_NETWORK") {
      return "Can't reach the server. Check your connection and try again.";
    }
    return error.message || fb;
  }
  if (error instanceof Error && error.message) return error.message;
  return fb;
}

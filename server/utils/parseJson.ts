import type { z } from "zod";

/**
 * Validate a Prisma JSON column expected to hold an array of `schema` items.
 *
 * Parse, don't cast: a non-array value yields `fallback`, and individual
 * malformed elements are dropped rather than trusted. For data written through
 * the same schema this is a no-op (valid items round-trip unchanged); it only
 * changes behaviour for legacy/corrupt rows, turning a latent downstream crash
 * into a safe, typed fallback.
 */
export function parseJsonArray<S extends z.ZodTypeAny>(
  value: unknown,
  schema: S,
  fallback: z.infer<S>[] = []
): z.infer<S>[] {
  if (!Array.isArray(value)) return fallback;
  const out: z.infer<S>[] = [];
  for (const item of value) {
    const result = schema.safeParse(item);
    if (result.success) out.push(result.data);
  }
  return out;
}

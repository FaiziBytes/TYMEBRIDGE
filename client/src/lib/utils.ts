import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Turn a display name into a URL-safe slug (e.g. "Dr. Mahmoud ElSaey" →
 * "dr-mahmoud-elsaey"). Returns "" for non-Latin input so callers can fall
 * back to a stable id.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Index-zips two parallel arrays (static meta + localized text) into merged
 * records. If the arrays drift out of sync the shorter length wins, so a
 * missing locale entry drops the row instead of rendering half a record.
 */
export function zipMerge<A extends object, B extends object>(
  a: readonly A[],
  b: readonly B[]
): Array<A & B> {
  const length = Math.min(a.length, b.length);
  const result: Array<A & B> = [];
  for (let index = 0; index < length; index++) {
    // index < length guarantees both lookups exist
    result.push({ ...(a[index] as A), ...(b[index] as B) });
  }
  return result;
}

/**
 * Today as `YYYY-MM-DD` in the viewer's own timezone — the `min` for date
 * inputs that must not accept a day already past.
 */
export function todayYmd(): string {
  const d = new Date();
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

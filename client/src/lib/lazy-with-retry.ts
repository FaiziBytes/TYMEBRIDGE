import { lazy, type ComponentType } from "react";

/**
 * Drop-in replacement for React.lazy that survives a stale-chunk failure.
 *
 * After a deploy, a long-lived SPA session still references the previous
 * build's hashed chunks. The first dynamic import() of a not-yet-loaded route
 * then 404s and, under a single Suspense boundary, white-screens the whole app.
 * Here we force exactly one hard reload (guarded by sessionStorage so we never
 * loop) to pull the fresh index.html + manifest; a genuine import error on the
 * second attempt is re-thrown so the route's error boundary can handle it.
 */
const RELOAD_FLAG_PREFIX = "chunk-reload:";

export function lazyWithRetry<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mirror React.lazy, which uses ComponentType<any> so components with required props still infer correctly
  T extends ComponentType<any>,
>(
  factory: () => Promise<{ default: T }>,
  key?: string
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const flag = `${RELOAD_FLAG_PREFIX}${key ?? factory.toString().slice(0, 64)}`;
    try {
      const mod = await factory();
      sessionStorage.removeItem(flag); // success → clear the one-shot guard
      return mod;
    } catch (err) {
      if (typeof window !== "undefined" && !sessionStorage.getItem(flag)) {
        sessionStorage.setItem(flag, "1");
        window.location.reload();
        // halt this render path until the reload swaps the document
        return new Promise<never>(() => {});
      }
      throw err; // already retried (or no window) → let the error boundary catch it
    }
  });
}

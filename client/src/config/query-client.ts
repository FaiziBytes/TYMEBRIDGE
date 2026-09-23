import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

/** Pull an HTTP status off an axios-style error without importing axios here. */
function statusOf(error: unknown): number | undefined {
  return (error as { response?: { status?: number } })?.response?.status;
}

/**
 * Production QueryClient.
 *
 * - retry: never retry 4xx (a 401/403/404 won't fix itself); back off twice on
 *   5xx / network errors with exponential delay.
 * - refetchOnReconnect: refresh server state when the tab regains connectivity.
 * - QueryCache.onError: one place to surface read failures (and the hook where
 *   Sentry/observability is wired). Background refetches that still have cached
 *   data stay silent; opt a query out entirely with meta.errorToast === false.
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // TODO(observability): captureException(error, { queryKey: query.queryKey })
      if (query.state.data !== undefined) return; // had cached data → stay quiet
      if (query.meta?.errorToast === false) return;
      // Only surface genuine server/network failures globally. 4xx (401/403/
      // 404) are expected, handled conditions the owning component reacts to
      // (redirects, empty states) — a global toast there would double-signal.
      const status = statusOf(error);
      if (status !== undefined && status < 500) return;
      toast({ title: "Something went wrong", variant: "destructive" });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        const status = statusOf(error);
        if (status !== undefined && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 15_000),
    },
    mutations: {
      retry: 0,
    },
  },
});

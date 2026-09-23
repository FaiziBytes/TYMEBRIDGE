/** Full-screen spinner used for route suspense and the session bootstrap. */
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    </div>
  );
}

/**
 * Spinner scoped to a dashboard content pane (not the viewport). Used as the
 * Suspense fallback *inside* each shell's <Outlet> so navigating between
 * sections keeps the persistent sidebar/topbar mounted instead of flashing the
 * full-screen PageLoader.
 */
export function ContentLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

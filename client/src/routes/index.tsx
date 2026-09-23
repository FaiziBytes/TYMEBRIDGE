import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { PageLoader } from "@/components/page-loader";
import { appRoutes } from "./routes";
import { ScrollToTop } from "./scroll-to-top";

export { appRoutes } from "./routes";
export { paths } from "./paths";

function RoutedApp() {
  return useRoutes(appRoutes);
}

/** Router shell: history provider, scroll reset, and the lazy-chunk boundary. */
export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <RoutedApp />
      </Suspense>
    </BrowserRouter>
  );
}

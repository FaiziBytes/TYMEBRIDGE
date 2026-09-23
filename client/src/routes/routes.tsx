import type { RouteObject } from "react-router-dom";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { paths } from "./paths";

/**
 * Route table. Every page is code-split, so a visitor downloads the home page
 * chunk and nothing else until they navigate.
 *
 * `lazyWithRetry` re-attempts a failed chunk import once — without it, a deploy
 * that lands mid-session leaves anyone with the old build unable to navigate.
 */
const HomePage = lazyWithRetry(() => import("@/pages/home"));
const DesignSystemPage = lazyWithRetry(() => import("@/pages/design-system"));
const NotFoundPage = lazyWithRetry(() => import("@/pages/not-found"));

export const appRoutes: RouteObject[] = [
  { path: paths.home, element: <HomePage /> },

  // internal reference, not linked from the site nav
  { path: paths.designSystem, element: <DesignSystemPage /> },

  { path: "*", element: <NotFoundPage /> },
];

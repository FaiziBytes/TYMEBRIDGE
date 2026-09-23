import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A client-side route change does not reset the scroll position, so navigating
 * from halfway down one page lands halfway down the next.
 *
 * Scroll to the top on every push and take scroll restoration off the browser,
 * which would otherwise fight this on back/forward.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll. Attach the returned ref to a container; every descendant
 * carrying `.reveal` gets `.is-in` once the container scrolls into view, with a
 * small stagger so a row of cards lands one after another rather than at once.
 *
 * Observing the container rather than each element keeps this to one observer
 * per section, and elements already on screen at mount reveal immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  stagger = 90
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (items.length === 0) return;

    // Respect the OS setting: land everything and skip the observer entirely.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    items.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * stagger}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          items.forEach((el) => el.classList.add("is-in"));
          observer.disconnect();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}

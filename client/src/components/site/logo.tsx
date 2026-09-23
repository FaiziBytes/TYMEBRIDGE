import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/**
 * The ThymeBridge suspension-bridge mark, redrawn as vector from
 * client/src/assets/THYMEBRIDGE_LOGO.jpeg — the same geometry the favicon uses.
 *
 * It inherits `currentColor` so the same component works white-on-sage in the
 * logo tile, white on the dark footer, and sage on a light header.
 */
export function BridgeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <g>
        {/* deck — a tapered wedge peaking under the tower */}
        <polygon points="3.4,49 32,38.4 60.6,49 32,42" />
        {/* tower legs, flaring where they meet the deck */}
        <polygon points="26.6,16 29.6,16 29.6,41.6 24.1,41.6" />
        <polygon points="37.4,16 34.4,16 34.4,41.6 39.9,41.6" />
        {/* crossbeams */}
        <polygon points="25.2,19 38.8,19 38.8,21.4 25.2,21.4" />
        <polygon points="25.6,27.5 38.4,27.5 38.4,29.9 25.6,29.9" />
        {/* hangers, cable down to deck, tapering as in the original */}
        <polygon points="23.45,26.91 24.95,26.91 24.2,41.89" />
        <polygon points="19.9,32.44 21.4,32.44 20.65,43.21" />
        <polygon points="16.31,36.94 17.81,36.94 17.06,44.54" />
        <polygon points="13.01,40.31 14.51,40.31 13.76,45.76" />
        <polygon points="10.19,42.62 11.69,42.62 10.94,46.81" />
        <polygon points="39.05,26.91 40.55,26.91 39.8,41.89" />
        <polygon points="42.6,32.44 44.1,32.44 43.35,43.21" />
        <polygon points="46.19,36.94 47.69,36.94 46.94,44.54" />
        <polygon points="49.49,40.31 50.99,40.31 50.24,45.76" />
        <polygon points="52.31,42.62 53.81,42.62 53.06,46.81" />
      </g>
      {/* main cables */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M28.4 16C26 26 15 41.5 5.9 44.4" />
        <path d="M35.6 16C38 26 49 41.5 58.1 44.4" />
      </g>
    </svg>
  );
}

/**
 * Header/footer lockup: the mark in a sage tile beside the wordmark.
 * `invert` switches the wordmark to white for dark backgrounds.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="bg-brand grid size-10 shrink-0 place-items-center rounded-xl">
        <BridgeMark className="size-7 text-white" />
      </span>
      <span
        className={cn(
          "text-[17px] leading-none font-extrabold tracking-[0.02em] uppercase",
          invert ? "text-white" : "text-ink"
        )}
      >
        {site.name}
      </span>
    </span>
  );
}

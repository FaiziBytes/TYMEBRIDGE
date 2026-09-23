import { cn } from "@/lib/utils";

/**
 * Responsive image. WebP with a JPEG fallback, one file per breakpoint, and an
 * explicit aspect ratio so nothing jumps while it loads.
 *
 * Variants are pre-built into client/public/img as `<name>-<width>.{webp,jpg}`
 * — see IMAGE-CREDITS.md for where each source came from.
 */

type ImageKey = keyof typeof images;

export const images = {
  "hero-roof-array": { widths: [640, 960, 1280, 1920], w: 1920, h: 1280 },
  "case-flat-roof": { widths: [640, 960, 1024], w: 1024, h: 768 },
  "home-solar": { widths: [640, 960, 1024], w: 1024, h: 683 },
  installers: { widths: [640, 960, 1125], w: 1125, h: 1500 },
  "finance-review": { widths: [640, 960], w: 960, h: 640 },
} as const;

export function Picture({
  name,
  alt,
  ratio,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
}: {
  name: ImageKey;
  alt: string;
  /** CSS aspect-ratio for the frame, e.g. "4 / 3". Defaults to the file's own. */
  ratio?: string;
  sizes?: string;
  /** Set on the LCP image only — skips lazy-loading and raises its priority. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const meta = images[name];
  const srcSet = (ext: string) =>
    meta.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

  return (
    <div
      style={{ aspectRatio: ratio ?? `${meta.w} / ${meta.h}` }}
      className={cn("relative w-full overflow-hidden rounded-2xl", className)}
    >
      <picture>
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src={`/img/${name}-${meta.widths[meta.widths.length - 1]}.jpg`}
          srcSet={srcSet("jpg")}
          sizes={sizes}
          alt={alt}
          width={meta.w}
          height={meta.h}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className={cn("size-full object-cover", imgClassName)}
        />
      </picture>
    </div>
  );
}

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Page section shell. Holds the max-width container and the page gutters in one
 * place, and wires the reveal-on-scroll observer so individual sections never
 * have to think about either.
 *
 * Anything inside carrying the `reveal` class animates in when the section
 * scrolls into view, staggered in DOM order.
 */
export function Section({
  children,
  className,
  innerClassName,
  stagger,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  stagger?: number;
}) {
  const ref = useReveal<HTMLElement>(stagger);
  return (
    <section ref={ref} className={className}>
      <div
        className={cn("mx-auto max-w-7xl px-4 sm:px-5 lg:px-8", innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-brand-800 text-xs font-bold tracking-[0.16em] uppercase">
      {children}
    </p>
  );
}

/** Section heading, so the type scale stays identical across pages. */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

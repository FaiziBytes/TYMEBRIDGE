import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/config/site";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

/**
 * Fixed call/book bar for phones and tablets.
 *
 * Solar and electrical work is phone-driven: on a small screen the header's
 * number is behind the hamburger, so without this the fastest route to a call
 * is three taps. It stays out of the way over the hero and slides up once the
 * visitor has scrolled — by which point they are reading, not just landing.
 *
 * `body` carries matching bottom padding in index.css so the bar never covers
 * the end of the footer.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "border-border bg-paper/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-lg transition-transform duration-300 lg:hidden",
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-stretch gap-2.5 px-4 py-2.5">
        <a
          href={site.phoneHref}
          className="border-border text-ink active:bg-line flex h-12 flex-1 items-center justify-center gap-2 rounded-full border text-sm font-bold transition-colors"
        >
          <Phone className="text-brand-800 size-4" />
          Call us
        </a>
        <Link
          to={paths.contact}
          className="bg-brand-600 active:bg-brand-700 flex h-12 flex-[1.3] items-center justify-center gap-2 rounded-full text-sm font-bold text-white transition-colors"
        >
          <CalendarCheck className="size-4" />
          Book a free survey
        </Link>
      </div>
    </div>
  );
}

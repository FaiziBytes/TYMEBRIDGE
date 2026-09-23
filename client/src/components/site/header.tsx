import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { mainNav, services, site } from "@/config/site";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

/**
 * Sticky header. It sits transparent over the dark hero and turns into a solid
 * white bar once the page scrolls, so the hero keeps its full-bleed look
 * without costing us a visible nav.
 *
 * The phone number is deliberately in the bar on every breakpoint — solar is a
 * call-driven business and burying it on the contact page loses enquiries.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  // The transparent state only works over a dark hero, which today is Home.
  // Anywhere else the bar must be solid from the top, or the nav is white text
  // on a light page.
  const overDarkHero = pathname === "/";
  const solid = scrolled || mobileOpen || !overDarkHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "bg-paper/90 shadow-[0_1px_0_rgba(17,46,36,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5 lg:h-18 lg:px-8">
        <Link
          to={paths.home}
          aria-label={`${site.name} home`}
          className="shrink-0"
        >
          <Logo invert={!solid} />
        </Link>

        {/* ---------- desktop nav ---------- */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    solid
                      ? "text-ink hover:bg-line"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "absolute top-full left-1/2 w-[min(38rem,90vw)] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200",
                    servicesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  )}
                >
                  <div className="border-border bg-paper grid grid-cols-2 gap-1 rounded-2xl border p-2 shadow-[0_24px_60px_rgba(17,46,36,0.16)]">
                    {services.map((s) => (
                      <Link
                        key={s.key}
                        to={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="hover:bg-tint group flex gap-3 rounded-xl p-3 transition-colors"
                      >
                        <span className="bg-fill group-hover:bg-brand-600 mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg transition-colors">
                          <s.icon className="text-brand-800 size-4 transition-colors group-hover:text-white" />
                        </span>
                        <span className="min-w-0">
                          <span className="text-ink block text-sm font-semibold">
                            {s.title}
                          </span>
                          <span className="text-faint mt-0.5 block text-xs leading-snug">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  solid
                    ? "text-ink hover:bg-line"
                    : "text-white/90 hover:bg-white/10 hover:text-white",
                  pathname === item.href && (solid ? "bg-line" : "bg-white/10")
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* ---------- right side ---------- */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition-colors sm:flex",
              solid ? "text-ink hover:bg-line" : "text-white hover:bg-white/10"
            )}
          >
            <Phone className="size-4" />
            {site.phone}
          </a>

          {/* phones get the number as an icon button — the sticky bar below
              the fold repeats it with a label */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className={cn(
              "grid size-10 place-items-center rounded-full transition-colors sm:hidden",
              solid ? "text-ink hover:bg-line" : "text-white hover:bg-white/10"
            )}
          >
            <Phone className="size-5" />
          </a>

          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link to={paths.contact}>Book a free survey</Link>
          </Button>

          {/* ---------- mobile ---------- */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "grid size-10 place-items-center rounded-full transition-colors lg:hidden",
                  solid
                    ? "text-ink hover:bg-line"
                    : "text-white hover:bg-white/10"
                )}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              hideClose
              className="bg-navy w-[min(22rem,88vw)] border-0 p-0"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-5 py-4">
                  <Logo invert />
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="size-5" />
                    </button>
                  </SheetClose>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-2">
                  <p className="text-slatey px-3 pt-3 pb-2 text-[11px] font-bold tracking-[0.16em] uppercase">
                    Services
                  </p>
                  {services.map((s) => (
                    <SheetClose asChild key={s.key}>
                      <Link
                        to={s.href}
                        className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-white/90 transition-colors hover:bg-white/10"
                      >
                        <s.icon className="text-brand-300 size-4 shrink-0" />
                        <span className="text-sm font-semibold">{s.title}</span>
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="my-3 h-px bg-white/10" />

                  {mainNav
                    .filter((i) => !i.children)
                    .map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          to={item.href}
                          className="flex min-h-11 items-center rounded-xl px-3 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                </nav>

                <div className="space-y-3 border-t border-white/10 p-5">
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-2 text-sm font-bold text-white"
                  >
                    <Phone className="text-brand-300 size-4" />
                    {site.phone}
                  </a>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      <Link to={paths.contact}>Book a free survey</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

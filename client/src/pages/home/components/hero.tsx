import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Picture } from "@/components/site/picture";
import { site } from "@/config/site";
import { paths } from "@/routes/paths";

const trustPoints = ["MCS certified", "25-year warranty", "In-house engineers"];

export function Hero() {
  return (
    <section className="bg-navy relative overflow-hidden">
      {/* drifting glow — the only large-scale motion on the page */}
      <div
        aria-hidden
        className="drift pointer-events-none absolute -top-40 -right-32 size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(169,192,152,0.20),transparent_62%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(36,56,44,0.95),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-26 pb-16 sm:px-5 sm:pt-32 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
              <span className="bg-brand-300 size-1.5 rounded-full" />
              No-obligation surveys · Nationwide
            </span>

            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Commercial solar
              <br />
              without the
              <span className="text-brand-300"> sales pitch</span>
            </h1>

            <p className="text-slatey mt-6 max-w-lg text-base leading-relaxed lg:text-lg">
              If you are looking at solar for your business, you have probably
              already been given three wildly different payback figures. We
              survey properly, show our working, and let the numbers decide.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="md">
                <Link to={paths.contact}>
                  Book a free survey
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="md"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <a href={site.phoneHref}>
                  <Phone className="size-4" />
                  {site.phone}
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {trustPoints.map((t) => (
                <span
                  key={t}
                  className="text-slatey flex items-center gap-2 text-sm"
                >
                  <BadgeCheck className="text-brand-300 size-4" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* hero visual + floating metric card */}
          <div className="relative">
            <Picture
              name="hero-roof-array"
              alt="Solar panels covering the roof of a commercial building, with wooded hills behind"
              ratio="4 / 3"
              sizes="(min-width: 1024px) 46vw, 100vw"
              priority
              className="ring-1 ring-white/10"
            />
            <div className="bg-paper mt-4 w-full rounded-2xl p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:absolute sm:-bottom-6 sm:-left-8 sm:mt-0 sm:w-56">
              <p className="text-faint text-xs font-semibold">
                RAM Extrusion, Notts
              </p>
              <p className="text-ink mt-1 text-3xl font-extrabold tracking-tight">
                294 kW
              </p>
              <div className="bg-line mt-3 h-1.5 overflow-hidden rounded-full">
                <div className="bg-brand h-full w-[78%] rounded-full" />
              </div>
              <p className="text-body mt-2 text-xs">
                78% of site demand covered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

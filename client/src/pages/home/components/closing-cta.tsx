import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { site } from "@/config/site";
import { paths } from "@/routes/paths";

export function ClosingCta() {
  return (
    <Section className="pb-16 sm:pb-24 lg:pb-32">
      <div className="bg-navy relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-7 sm:py-16 lg:px-14 lg:py-20">
        <div
          aria-hidden
          className="drift pointer-events-none absolute -bottom-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,192,152,0.16),transparent_60%)] blur-2xl"
        />
        <div className="reveal relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find out what your roof is actually worth
          </h2>
          <p className="text-slatey mx-auto mt-5 max-w-lg leading-relaxed">
            A free survey, a forecast you can check line by line, and nobody
            chasing you afterwards.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
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
        </div>
      </div>
    </Section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Kicker, Section, SectionTitle } from "@/components/site/section";
import { services } from "@/config/site";

export function Services() {
  return (
    <Section className="py-14 sm:py-20 lg:py-28">
      <div className="reveal max-w-2xl">
        <Kicker>What we do</Kicker>
        <SectionTitle>
          One team for generation, storage and the wiring behind it
        </SectionTitle>
        <p className="text-body mt-4 text-base leading-relaxed">
          Most sites need more than panels. Doing the whole job in-house means
          nothing gets blamed on the last contractor.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.key}
            to={s.href}
            className="reveal lift border-border bg-paper group flex flex-col rounded-2xl border p-6 sm:p-7"
          >
            <span className="bg-fill group-hover:bg-brand-600 grid size-12 place-items-center rounded-xl transition-colors">
              <s.icon className="text-brand-800 size-5 transition-colors group-hover:text-white" />
            </span>
            <h3 className="text-ink mt-5 text-lg font-bold">{s.title}</h3>
            <p className="text-body mt-2.5 flex-1 text-sm leading-relaxed">
              {s.blurb}
            </p>
            <span className="text-brand-800 mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
              Learn more
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

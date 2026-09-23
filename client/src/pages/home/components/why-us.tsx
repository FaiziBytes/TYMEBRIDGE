import { Check } from "lucide-react";
import { Kicker, Section, SectionTitle } from "@/components/site/section";
import { Picture } from "@/components/site/picture";

const differentiators = [
  {
    title: "Engineers, not a sales floor",
    body: "The person who surveys your site is the person who designs it. Nobody here works on commission.",
  },
  {
    title: "Forecasts that survive scrutiny",
    body: "We would rather lose the job than win it on a payback figure that falls apart in year three.",
  },
  {
    title: "Support that does not end at handover",
    body: "Monitoring, maintenance and honest advice on upgrades, for as long as the system runs.",
  },
];

export function WhyUs() {
  return (
    <Section className="py-14 sm:py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal">
          <Kicker>Why us</Kicker>
          <SectionTitle>
            The problem with how solar is usually sold
          </SectionTitle>
          <p className="text-body mt-4 leading-relaxed">
            Inflated generation figures, batteries nobody needed, and an
            installer who disappears the day the scaffolding comes down. We
            built the company around not doing those three things.
          </p>

          <ul className="mt-9 space-y-6">
            {differentiators.map((d) => (
              <li key={d.title} className="flex gap-4">
                <span className="bg-fill mt-0.5 grid size-7 shrink-0 place-items-center rounded-full">
                  <Check className="text-brand-800 size-4" />
                </span>
                <div>
                  <h3 className="text-ink text-base font-bold">{d.title}</h3>
                  <p className="text-body mt-1.5 text-sm leading-relaxed">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal grid grid-cols-2 gap-4">
          <Picture
            name="home-solar"
            alt="Solar panels fitted to the pitched roof of a modern brick house"
            ratio="3 / 4"
            sizes="(min-width: 1024px) 26vw, 45vw"
            className="mt-8"
          />
          <Picture
            name="installers"
            alt="Three installers fitting solar panels to a tiled roof from scaffolding"
            ratio="3 / 4"
            sizes="(min-width: 1024px) 26vw, 45vw"
          />
        </div>
      </div>
    </Section>
  );
}

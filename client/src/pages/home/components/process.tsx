import { ClipboardList, LineChart, PencilRuler, Wrench } from "lucide-react";
import { Kicker, Section, SectionTitle } from "@/components/site/section";

const steps = [
  {
    icon: ClipboardList,
    title: "Free site survey",
    body: "We walk the roof, read the meter and pull your half-hourly data. No estimate from a satellite photo.",
  },
  {
    icon: LineChart,
    title: "A forecast you can check",
    body: "Generation, self-consumption and payback, with the assumptions written down beside them.",
  },
  {
    icon: PencilRuler,
    title: "Bespoke design",
    body: "Panel layout, inverter sizing and battery capacity built around your actual load profile.",
  },
  {
    icon: Wrench,
    title: "Our own engineers install",
    body: "Never subcontracted. Certified, tested and handed over with the paperwork complete.",
  },
];

export function Process() {
  return (
    <Section className="bg-paper border-border border-y py-14 sm:py-20 lg:py-28">
      <div className="reveal max-w-2xl">
        <Kicker>How it works</Kicker>
        <SectionTitle>
          Four steps, and you can stop after any of them
        </SectionTitle>
      </div>

      <div className="relative mt-14">
        {/* connecting rule behind the step markers */}
        <div
          aria-hidden
          className="bg-border absolute top-6 right-0 left-0 hidden h-px lg:block"
        />
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="reveal relative">
              <div className="bg-brand-600 relative grid size-12 place-items-center rounded-full text-sm font-extrabold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-ink mt-5 flex items-center gap-2 text-base font-bold">
                <step.icon className="text-brand-800 size-4" />
                {step.title}
              </h3>
              <p className="text-body mt-2.5 text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

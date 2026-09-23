import { Section } from "@/components/site/section";

const stats = [
  { value: "294 kW", label: "Largest commercial array installed" },
  { value: "4.5 yrs", label: "Average commercial payback" },
  { value: "£1.2m", label: "Projected lifetime saving, one client" },
  { value: "25 yrs", label: "Performance warranty on panels" },
];

export function Stats() {
  return (
    <Section className="pb-14 sm:pb-20 lg:pb-28">
      <div className="bg-navy relative overflow-hidden rounded-3xl px-6 py-10 sm:px-7 sm:py-14 lg:px-14">
        <div
          aria-hidden
          className="drift pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-[radial-gradient(circle,rgba(169,192,152,0.14),transparent_65%)] blur-2xl"
        />
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal">
              <p className="text-brand-300 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {s.value}
              </p>
              <p className="text-slatey mt-3 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

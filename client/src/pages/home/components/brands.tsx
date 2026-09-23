import { Kicker, Section, SectionTitle } from "@/components/site/section";

/**
 * Brands we install. Rendered as wordmarks rather than logo files on purpose:
 * manufacturer logos are trademarks with their own usage rules, and naming the
 * kit you fit is both accurate and safe. Swap in real logos only once the
 * client confirms they hold the brand assets.
 */
const groups = [
  {
    label: "Panels",
    items: ["Longi", "Jinko", "Aiko", "DMEGC"],
  },
  {
    label: "Inverters",
    items: ["SolarEdge", "Solis", "Fox ESS", "Sigenergy"],
  },
  {
    label: "Batteries",
    items: ["GivEnergy", "Tesla Powerwall", "Fox ESS", "AlphaESS"],
  },
  {
    label: "EV chargers",
    items: ["Zappi", "Easee", "Hypervolt", "Sync EV"],
  },
];

export function Brands() {
  return (
    <Section className="pb-14 sm:pb-20 lg:pb-28">
      <div className="reveal max-w-2xl">
        <Kicker>The kit</Kicker>
        <SectionTitle>
          We fit what suits the site, not what we have in the van
        </SectionTitle>
        <p className="text-body mt-4 leading-relaxed">
          No exclusive supplier deal, so no pressure to specify a particular
          brand. GivEnergy is designed and built in Stoke-on-Trent if you would
          rather keep it British.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div
            key={g.label}
            className="reveal border-border bg-paper rounded-2xl border p-6"
          >
            <h3 className="text-brand-800 text-xs font-bold tracking-[0.14em] uppercase">
              {g.label}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="text-ink flex items-center gap-2.5 text-sm font-semibold"
                >
                  <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-faint reveal mt-6 text-xs">
        All MCS-approved and covered by the manufacturer warranty, which we
        register on your behalf.
      </p>
    </Section>
  );
}

/**
 * Indicative solar savings model.
 *
 * Deliberately a plain function with no React in it: the numbers are the part
 * that has to be right, and they should be checkable without rendering
 * anything.
 *
 * Every assumption is named and exported rather than buried in the maths — the
 * whole pitch on this site is "a forecast you can check", so the page shows
 * these figures to the visitor instead of hiding them.
 */

export const ASSUMPTIONS = {
  /** kWh generated per kWp per year, UK average across orientations. */
  yieldPerKwp: 900,
  /** Pence per kWh paid for imported electricity. */
  importPrice: { home: 0.26, business: 0.24 },
  /** Smart Export Guarantee rate for anything sent back to the grid. */
  exportPrice: 0.15,
  /**
   * Share of generation used on site rather than exported. A home is empty
   * through the middle of the day, which is exactly when the roof is working —
   * hence the low figure without storage.
   */
  selfUse: {
    home: { without: 0.4, with: 0.7 },
    business: { without: 0.7, with: 0.85 },
  },
  /** Installed cost per kWp. Commercial is cheaper per unit at scale. */
  costPerKwp: { home: 1400, business: 900 },
  /** Battery: typical usable capacity and its installed cost. */
  battery: { home: 5500, business: 22000 },
  /** Largest system each property type can realistically take, in kWp. */
  maxSystem: { home: 6, business: 300 },
  /** Panels lose output slowly; this is the average of 25 years of decline. */
  degradationFactor: 0.92,
  years: 25,
} as const;

export type PropertyType = "home" | "business";

export type EstimateInput = {
  /** Current electricity spend per month, in pounds. */
  monthlyBill: number;
  property: PropertyType;
  battery: boolean;
};

export type Estimate = {
  systemKwp: number;
  annualUse: number;
  annualGeneration: number;
  selfUsed: number;
  exported: number;
  annualSaving: number;
  installCost: number;
  /** Years to break even. `null` when the system never pays for itself. */
  paybackYears: number | null;
  /** Net position after 25 years, i.e. savings minus what it cost. */
  lifetimeNet: number;
  /** Share of current consumption the system covers, 0–1. */
  coverage: number;
  /** Cumulative net position per year, for the chart. Index 0 is year 0. */
  cumulative: number[];
};

const round = (n: number, dp = 0) => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

export function estimateSavings({
  monthlyBill,
  property,
  battery,
}: EstimateInput): Estimate {
  const a = ASSUMPTIONS;
  const price = a.importPrice[property];
  const selfRate = a.selfUse[property][battery ? "with" : "without"];

  const annualSpend = monthlyBill * 12;
  const annualUse = annualSpend / price;

  // Size the array to roughly match annual consumption, then cap it at what
  // the roof can take. Oversizing past that just exports at a worse rate.
  const systemKwp = Math.min(annualUse / a.yieldPerKwp, a.maxSystem[property]);

  const annualGeneration = systemKwp * a.yieldPerKwp;

  // You cannot self-consume more than you actually use.
  const selfUsed = Math.min(annualGeneration * selfRate, annualUse);
  const exported = Math.max(annualGeneration - selfUsed, 0);

  const annualSaving = selfUsed * price + exported * a.exportPrice;

  const installCost =
    systemKwp * a.costPerKwp[property] + (battery ? a.battery[property] : 0);

  const effectiveAnnual = annualSaving * a.degradationFactor;
  const paybackYears =
    effectiveAnnual > 0 ? installCost / effectiveAnnual : null;

  const cumulative = Array.from({ length: a.years + 1 }, (_, year) =>
    round(effectiveAnnual * year - installCost)
  );

  return {
    systemKwp: round(systemKwp, 1),
    annualUse: round(annualUse),
    annualGeneration: round(annualGeneration),
    selfUsed: round(selfUsed),
    exported: round(exported),
    annualSaving: round(annualSaving),
    installCost: round(installCost),
    paybackYears: paybackYears === null ? null : round(paybackYears, 1),
    lifetimeNet: round(effectiveAnnual * a.years - installCost),
    coverage: annualUse > 0 ? Math.min(annualGeneration / annualUse, 1) : 0,
    cumulative,
  };
}

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);

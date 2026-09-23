import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Kicker, Section, SectionTitle } from "@/components/site/section";
import {
  ASSUMPTIONS,
  estimateSavings,
  gbp,
  type PropertyType,
} from "@/lib/solar-estimate";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

const billRange = {
  home: { min: 40, max: 400, step: 10, start: 150 },
  business: { min: 500, max: 20000, step: 500, start: 3000 },
};

/**
 * Cumulative net position over 25 years, drawn as inline SVG.
 *
 * A charting library would cost ~100 KB on the home route for one small graph,
 * which is the opposite of the point we are making about page weight — so this
 * is hand-drawn. The area below zero is the money still owed; where the line
 * crosses is the payback year.
 */
function PaybackChart({
  cumulative,
  paybackYears,
}: {
  cumulative: number[];
  paybackYears: number | null;
}) {
  const W = 560;
  const H = 180;
  const pad = { top: 12, right: 8, bottom: 22, left: 8 };

  const min = Math.min(...cumulative);
  const max = Math.max(...cumulative);
  const span = max - min || 1;

  const x = (i: number) =>
    pad.left + (i / (cumulative.length - 1)) * (W - pad.left - pad.right);
  const y = (v: number) =>
    pad.top + (1 - (v - min) / span) * (H - pad.top - pad.bottom);

  const zeroY = y(0);
  const line = cumulative.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = `${x(0)},${zeroY} ${line} ${x(cumulative.length - 1)},${zeroY}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={
        paybackYears
          ? `Cumulative saving crosses break-even at about year ${Math.ceil(paybackYears)} and keeps rising to year 25.`
          : "Cumulative saving over 25 years."
      }
    >
      <defs>
        <linearGradient id="payback-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={area} fill="url(#payback-fill)" />

      {/* break-even line */}
      <line
        x1={pad.left}
        x2={W - pad.right}
        y1={zeroY}
        y2={zeroY}
        stroke="var(--color-line2)"
        strokeWidth="1"
      />

      <polyline
        points={line}
        fill="none"
        stroke="var(--color-brand-600)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {paybackYears !== null && paybackYears <= ASSUMPTIONS.years && (
        <g>
          <line
            x1={x(paybackYears)}
            x2={x(paybackYears)}
            y1={pad.top}
            y2={H - pad.bottom}
            stroke="var(--color-brand-800)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx={x(paybackYears)}
            cy={zeroY}
            r="4"
            fill="var(--color-brand-600)"
          />
        </g>
      )}

      <text
        x={pad.left}
        y={H - 6}
        fontSize="11"
        fill="var(--color-faint)"
        fontWeight="600"
      >
        Today
      </text>
      <text
        x={W - pad.right}
        y={H - 6}
        fontSize="11"
        fill="var(--color-faint)"
        fontWeight="600"
        textAnchor="end"
      >
        Year 25
      </text>
    </svg>
  );
}

function Figure({
  value,
  label,
  emphasis = false,
}: {
  value: string;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          "text-2xl font-extrabold tracking-tight sm:text-3xl",
          emphasis ? "text-brand-800" : "text-ink"
        )}
      >
        {value}
      </p>
      <p className="text-faint mt-1 text-xs leading-snug">{label}</p>
    </div>
  );
}

export function SavingsCalculator() {
  const [property, setProperty] = useState<PropertyType>("home");
  const [battery, setBattery] = useState(false);
  const [bill, setBill] = useState(billRange.home.start);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const range = billRange[property];
  const estimate = useMemo(
    () => estimateSavings({ monthlyBill: bill, property, battery }),
    [bill, property, battery]
  );

  const switchProperty = (next: PropertyType) => {
    setProperty(next);
    setBill(billRange[next].start);
  };

  return (
    <Section className="pb-14 sm:pb-20 lg:pb-28">
      <div className="reveal border-border bg-paper overflow-hidden rounded-3xl border">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* ---------------- controls ---------------- */}
          <div className="border-border border-b p-6 sm:p-9 lg:border-r lg:border-b-0 lg:p-10">
            <Kicker>Work it out</Kicker>
            <SectionTitle className="text-2xl sm:text-3xl">
              What would your roof actually save?
            </SectionTitle>
            <p className="text-body mt-3 text-sm leading-relaxed">
              A rough figure in ten seconds, using the same assumptions we would
              put in a written proposal.
            </p>

            {/* property type */}
            <div
              role="radiogroup"
              aria-label="Property type"
              className="bg-line mt-7 grid grid-cols-2 gap-1 rounded-full p-1"
            >
              {(["home", "business"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={property === p}
                  onClick={() => switchProperty(p)}
                  className={cn(
                    "h-10 rounded-full text-sm font-bold transition-colors",
                    property === p
                      ? "bg-paper text-ink shadow-sm"
                      : "text-faint hover:text-ink"
                  )}
                >
                  {p === "home" ? "My home" : "My business"}
                </button>
              ))}
            </div>

            {/* bill */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <Label
                  htmlFor="bill"
                  className="text-ink text-sm font-semibold"
                >
                  Electricity bill
                </Label>
                <span className="text-ink text-lg font-extrabold tracking-tight">
                  {gbp(bill)}
                  <span className="text-faint text-xs font-semibold">
                    {" "}
                    / month
                  </span>
                </span>
              </div>
              <Slider
                id="bill"
                className="mt-4"
                value={[bill]}
                min={range.min}
                max={range.max}
                step={range.step}
                onValueChange={([v]) => setBill(v ?? bill)}
                aria-label="Monthly electricity bill"
              />
              <div className="text-faint mt-2 flex justify-between text-xs">
                <span>{gbp(range.min)}</span>
                <span>{gbp(range.max)}+</span>
              </div>
            </div>

            {/* battery */}
            <div className="border-border mt-8 flex items-start justify-between gap-4 rounded-2xl border p-4">
              <div>
                <Label
                  htmlFor="battery"
                  className="text-ink text-sm font-semibold"
                >
                  Add battery storage
                </Label>
                <p className="text-faint mt-1 text-xs leading-snug">
                  Stores the daytime surplus. Usually raises the yearly saving
                  and lengthens the payback — watch both numbers move.
                </p>
              </div>
              <Switch
                id="battery"
                checked={battery}
                onCheckedChange={setBattery}
              />
            </div>
          </div>

          {/* ---------------- results ---------------- */}
          <div className="bg-tint p-6 sm:p-9 lg:p-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Figure
                value={`${estimate.systemKwp} kWp`}
                label="Suggested system size"
              />
              <Figure
                value={`${gbp(estimate.annualSaving)}`}
                label="Saved per year"
                emphasis
              />
              <Figure
                value={
                  estimate.paybackYears === null
                    ? "—"
                    : `${estimate.paybackYears} yrs`
                }
                label="Break-even"
              />
              <Figure
                value={gbp(estimate.lifetimeNet)}
                label="Net after 25 years"
                emphasis
              />
            </div>

            <div className="mt-7">
              <div className="text-faint mb-2 flex items-center justify-between text-xs font-semibold">
                <span>Cumulative position</span>
                <span>
                  Install cost {gbp(estimate.installCost)} · covers{" "}
                  {Math.round(estimate.coverage * 100)}% of your usage
                </span>
              </div>
              <PaybackChart
                cumulative={estimate.cumulative}
                paybackYears={estimate.paybackYears}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="md">
                <Link to={paths.contact}>
                  Get this checked properly
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => setShowAssumptions((v) => !v)}
                aria-expanded={showAssumptions}
                className="text-brand-800 inline-flex items-center gap-1.5 text-sm font-bold"
              >
                <Info className="size-4" />
                {showAssumptions ? "Hide" : "Show"} the assumptions
              </button>
            </div>

            {showAssumptions && (
              <dl className="text-body border-border mt-5 grid gap-x-8 gap-y-2 border-t pt-5 text-xs sm:grid-cols-2">
                {[
                  ["Annual yield", `${ASSUMPTIONS.yieldPerKwp} kWh per kWp`],
                  [
                    "Import price",
                    `${(ASSUMPTIONS.importPrice[property] * 100).toFixed(0)}p per kWh`,
                  ],
                  [
                    "Export rate",
                    `${(ASSUMPTIONS.exportPrice * 100).toFixed(0)}p per kWh`,
                  ],
                  [
                    "Used on site",
                    `${Math.round(ASSUMPTIONS.selfUse[property][battery ? "with" : "without"] * 100)}% of generation`,
                  ],
                  [
                    "Install cost",
                    `${gbp(ASSUMPTIONS.costPerKwp[property])} per kWp`,
                  ],
                  ["Panel degradation", "8% averaged over 25 years"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-faint">{k}</dt>
                    <dd className="text-ink text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            <p className="text-faint mt-5 text-xs leading-relaxed">
              An estimate, not a quote. It knows nothing about your roof pitch,
              shading or half-hourly usage — which is exactly what the free
              survey is for.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

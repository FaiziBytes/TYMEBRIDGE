import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BatteryCharging,
  Building2,
  CarFront,
  Star,
  Sun,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Swatch data — hex + the measured contrast ratio it was chosen for.  */
/* Keeping the numbers next to the colour is the point of this page:   */
/* if someone nudges a token, the claim beside it should be re-checked.*/
/* ------------------------------------------------------------------ */

type Swatch = {
  name: string;
  token: string;
  hex: string;
  note: string;
  dark?: boolean;
};

const brand: Swatch[] = [
  {
    name: "Brand",
    token: "brand",
    hex: "#718B64",
    note: "The logo sage · tiles & accents",
    dark: true,
  },
  {
    name: "Brand 600",
    token: "brand-600",
    hex: "#547046",
    note: "Button fill · white on it 5.55:1",
  },
  {
    name: "Brand 700",
    token: "brand-700",
    hex: "#44603A",
    note: "Fill hover · 7.05:1",
  },
  {
    name: "Brand 800",
    token: "brand-800",
    hex: "#4C6840",
    note: "Sage as text · 6.25:1",
  },
  {
    name: "Brand 300",
    token: "brand-300",
    hex: "#A9C098",
    note: "Accent on dark · 7.57:1",
    dark: true,
  },
];

const darks: Swatch[] = [
  {
    name: "Navy",
    token: "navy",
    hex: "#1A2B20",
    note: "Dark surface · 14.89:1",
  },
  {
    name: "Forest 800",
    token: "forest-800",
    hex: "#24382C",
    note: "Raised / hover",
  },
  { name: "Forest 950", token: "forest-950", hex: "#101C14", note: "Deepest" },
  { name: "Payne", token: "payne", hex: "#3F5A4E", note: "Muted forest" },
];

const text: Swatch[] = [
  { name: "Ink", token: "ink", hex: "#16211A", note: "Headings · 15.64:1" },
  { name: "Body", token: "body", hex: "#4A5350", note: "Body copy · 7.49:1" },
  { name: "Faint", token: "faint", hex: "#66716C", note: "Muted · 4.78:1" },
  {
    name: "Slatey",
    token: "slatey",
    hex: "#A7B4AE",
    note: "Muted on dark · 6.94:1",
    dark: true,
  },
];

const surfaces: Swatch[] = [
  { name: "Paper", token: "paper", hex: "#FFFFFF", note: "Cards", dark: true },
  { name: "Page", token: "page", hex: "#F7F9F4", note: "Page bg", dark: true },
  {
    name: "Line",
    token: "line",
    hex: "#EDF1E8",
    note: "Section fill",
    dark: true,
  },
  {
    name: "Border",
    token: "border",
    hex: "#DFE6D8",
    note: "Card border",
    dark: true,
  },
  {
    name: "Fill",
    token: "fill",
    hex: "#E8EFE1",
    note: "Secondary button",
    dark: true,
  },
  {
    name: "Tint",
    token: "tint",
    hex: "#F4F8F0",
    note: "Sage wash",
    dark: true,
  },
];

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((s) => (
        <div
          key={s.token}
          className="border-border overflow-hidden rounded-2xl border bg-paper"
        >
          <div
            className="h-20 w-full"
            style={{ backgroundColor: s.hex }}
            aria-hidden
          />
          <div className="space-y-0.5 p-3">
            <p className="text-ink text-sm font-semibold">{s.name}</p>
            <p className="text-faint font-mono text-[11px] uppercase">
              {s.hex}
            </p>
            <p className="text-faint font-mono text-[11px]">
              --color-{s.token}
            </p>
            <p className="text-body pt-1 text-xs">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        {kicker && (
          <p className="text-brand-800 text-xs font-bold tracking-[0.14em] uppercase">
            {kicker}
          </p>
        )}
        <h2 className="text-ink text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const services = [
  {
    icon: Building2,
    title: "Commercial Solar",
    body: "Roof and ground-mount arrays sized to your actual half-hourly usage, not a sales estimate.",
  },
  {
    icon: Sun,
    title: "Domestic Solar",
    body: "Panels matched to your roof pitch, shading and tariff — with a forecast you can check.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Storage",
    body: "Store the daytime surplus and use it through the evening peak instead of exporting it.",
  },
  {
    icon: CarFront,
    title: "EV Charging",
    body: "Home, workplace and fleet chargers that draw from your own generation first.",
  },
];

export default function DesignSystem() {
  return (
    <main className="bg-page min-h-screen">
      {/* ---------- page header ---------- */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-brand-300 text-xs font-bold tracking-[0.18em] uppercase">
            Design System v1
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sage green, drawn from the logo
          </h1>
          <p className="text-slatey mt-4 max-w-xl text-base">
            Every colour pair on this page has been contrast-checked and the
            ratio is printed next to it. Approve the look here and the whole
            component set follows automatically.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-14">
        {/* ---------- the one rule ---------- */}
        <Section kicker="Read this first" title="The one rule">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#c3362a]/30 bg-[#c3362a]/5 p-5">
              <p className="text-xs font-bold tracking-wider text-[#c3362a] uppercase">
                Never
              </p>
              <p
                className="mt-3 text-2xl font-bold"
                style={{ color: "#718B64" }}
              >
                White text on the logo sage
              </p>
              <p className="text-body mt-3 text-sm">
                3.76:1 — the logo green is a mid-tone, so it cannot carry white
                type. It is for the logo tile, tints and accents.
              </p>
            </div>
            <div className="bg-brand-600 rounded-2xl p-5">
              <p className="text-xs font-bold tracking-wider text-white/70 uppercase">
                Instead
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                Brand-600 for filled buttons
              </p>
              <p className="mt-3 text-sm text-white/85">
                5.55:1 with white text. On dark surfaces the accent is brand-300
                (7.57:1), never the base sage.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------- palette ---------- */}
        <Section kicker="Colour" title="Brand">
          <SwatchGrid items={brand} />
        </Section>
        <Section title="Dark surfaces">
          <SwatchGrid items={darks} />
        </Section>
        <Section title="Text">
          <SwatchGrid items={text} />
        </Section>
        <Section title="Surfaces & lines">
          <SwatchGrid items={surfaces} />
        </Section>

        <Separator className="bg-border" />

        {/* ---------- typography ---------- */}
        <Section kicker="Type" title="Plus Jakarta Sans">
          <div className="bg-paper border-border space-y-6 rounded-2xl border p-8">
            <div>
              <p className="text-faint font-mono text-[11px]">
                text-5xl / font-extrabold / tracking-tight
              </p>
              <p className="text-ink mt-1 text-5xl font-extrabold tracking-tight">
                Cut overheads
              </p>
            </div>
            <div>
              <p className="text-faint font-mono text-[11px]">
                text-3xl / font-bold
              </p>
              <p className="text-ink mt-1 text-3xl font-bold tracking-tight">
                Why commercial solar
              </p>
            </div>
            <div>
              <p className="text-faint font-mono text-[11px]">
                text-xl / font-semibold
              </p>
              <p className="text-ink mt-1 text-xl font-semibold">
                Honest surveys, no pressure
              </p>
            </div>
            <div>
              <p className="text-faint font-mono text-[11px]">
                text-base / text-body
              </p>
              <p className="text-body mt-1 max-w-2xl text-base">
                A survey should tell you what your roof will actually produce.
                We model shading, pitch and your half-hourly consumption, then
                show you the working — so the payback figure is one you can
                check rather than one you have to trust.
              </p>
            </div>
            <div>
              <p className="text-faint font-mono text-[11px]">
                text-sm / text-faint
              </p>
              <p className="text-faint mt-1 text-sm">
                Finance subject to status. Representative 12.99% APR.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------- buttons ---------- */}
        <Section kicker="Components" title="Buttons">
          <div className="bg-paper border-border space-y-6 rounded-2xl border p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="md">
                Book a free survey
              </Button>
              <Button variant="navy" size="md">
                See our projects
              </Button>
              <Button variant="outlineBrand" size="md">
                Get a quote
              </Button>
              <Button variant="outlineNavy" size="md">
                Contact us
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Finance calculator</Button>
              <Button variant="destructive">Remove</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="icon" aria-label="Charge">
                <Zap className="size-4" />
              </Button>
            </div>
            <p className="text-faint text-xs">
              Filled buttons use brand-600 with white text (5.55:1), not the
              base sage (3.76:1).
            </p>
          </div>
        </Section>

        {/* ---------- service cards ---------- */}
        <Section title="Service cards">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Card
                key={s.title}
                className="border-border bg-paper rounded-2xl"
              >
                <CardHeader>
                  <div className="bg-fill mb-2 grid size-11 place-items-center rounded-xl">
                    <s.icon className="text-brand-800 size-5" />
                  </div>
                  <CardTitle className="text-ink text-lg">{s.title}</CardTitle>
                  <CardDescription className="text-body text-sm">
                    {s.body}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="h-auto p-0">
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---------- stats band ---------- */}
        <Section title="Stat band">
          <div className="bg-navy grid gap-8 rounded-3xl px-8 py-10 sm:grid-cols-3">
            {[
              { v: "294 kW", l: "Largest commercial install" },
              { v: "4.5 yrs", l: "Average payback" },
              { v: "£1.2m", l: "Projected lifetime saving" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-brand-300 text-4xl font-extrabold tracking-tight">
                  {s.v}
                </p>
                <p className="text-slatey mt-2 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="text-faint text-xs">
            Brand-300 on navy is 7.57:1 — this is where the brand colour is
            allowed to be type.
          </p>
        </Section>

        {/* ---------- form ---------- */}
        <Section title="Form controls">
          <div className="bg-paper border-border grid gap-6 rounded-2xl border p-8 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ds-name">Full name</Label>
              <Input id="ds-name" placeholder="Jane Whitfield" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-post">Postcode</Label>
              <Input id="ds-post" placeholder="NG16 1AA" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ds-msg">What are you looking at?</Label>
              <Textarea
                id="ds-msg"
                rows={4}
                placeholder="Roughly 400 sqm of warehouse roof, bills around £3k a month."
              />
            </div>
            <div className="flex items-start gap-3 md:col-span-2">
              <Checkbox id="ds-consent" className="mt-0.5" />
              <Label
                htmlFor="ds-consent"
                className="text-body text-sm leading-snug font-normal"
              >
                I agree to the privacy policy and to being contacted about this
                enquiry.
              </Label>
            </div>
            <div className="md:col-span-2">
              <Button variant="primary" size="md">
                Send enquiry
              </Button>
            </div>
          </div>
        </Section>

        {/* ---------- badges + rating ---------- */}
        <Section title="Badges & rating">
          <div className="bg-paper border-border flex flex-wrap items-center gap-4 rounded-2xl border p-8">
            <Badge>MCS certified</Badge>
            <Badge variant="secondary">NICEIC</Badge>
            <Badge variant="outline">TrustMark</Badge>
            <div className="flex items-center gap-2">
              <div className="flex" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="text-star size-4 fill-current" />
                ))}
              </div>
              <span className="text-ink text-sm font-semibold">5.0</span>
              <span className="text-faint text-sm">
                from 30+ Google reviews
              </span>
            </div>
          </div>
          <p className="text-faint text-xs">
            Gold on white is under 3:1, so the star row always carries the
            numeric rating beside it rather than standing alone.
          </p>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section title="Accordion / FAQ">
          <div className="bg-paper border-border rounded-2xl border px-8 py-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger className="text-ink">
                  Do I need a battery as well as panels?
                </AccordionTrigger>
                <AccordionContent className="text-body">
                  No. Panels alone cut your daytime import. A battery pays for
                  itself only if you have meaningful evening usage or a tariff
                  with a cheap overnight rate — we will tell you which case you
                  are in before you buy one.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger className="text-ink">
                  How long does a commercial install take?
                </AccordionTrigger>
                <AccordionContent className="text-body">
                  A 200 kW roof array is typically three to four weeks on site
                  once the DNO application is approved. The approval itself is
                  the long pole and is out of our hands.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <p className="text-faint text-xs">
            Real answers, not repeated filler — the reference site ships the
            same placeholder sentence under all seven of its questions.
          </p>
        </Section>

        {/* ---------- CTA band ---------- */}
        <Section title="CTA band">
          <div className="bg-navy overflow-hidden rounded-3xl px-8 py-12 text-center">
            <h3 className="text-3xl font-extrabold tracking-tight text-white">
              Find out what your roof is worth
            </h3>
            <p className="text-slatey mx-auto mt-3 max-w-lg text-sm">
              A free survey, a forecast you can check, and no one chasing you
              afterwards.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="md">
                Book a free survey
              </Button>
              <Button
                variant="ghost"
                size="md"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                Call 0115 783 6409
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

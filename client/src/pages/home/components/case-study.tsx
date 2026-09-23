import { Quote } from "lucide-react";
import { Kicker, Section, SectionTitle } from "@/components/site/section";
import { Picture } from "@/components/site/picture";

const metrics = [
  { value: "560", label: "panels installed" },
  { value: "4.5 yrs", label: "payback" },
  { value: "78%", label: "of demand covered" },
  { value: "£1.2m", label: "projected saving" },
];

export function CaseStudy() {
  return (
    <Section className="pb-14 sm:pb-20 lg:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <Picture
            name="case-flat-roof"
            alt="A flat commercial roof covered in rows of mounted solar panels"
            ratio="5 / 4"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
        </div>

        <div className="reveal">
          <Kicker>Case study</Kicker>
          <SectionTitle>294 kW across a working factory roof</SectionTitle>
          <p className="text-body mt-4 leading-relaxed">
            The brief was to cut a six-figure electricity bill without stopping
            production for a single shift. We phased the install across two roof
            planes and commissioned it over a weekend.
          </p>

          <dl className="border-border mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-[color:var(--color-border)]">
            {metrics.map((m) => (
              <div key={m.label} className="bg-paper p-5">
                <dt className="text-ink text-2xl font-extrabold tracking-tight">
                  {m.value}
                </dt>
                <dd className="text-faint mt-1 text-xs">{m.label}</dd>
              </div>
            ))}
          </dl>

          <figure className="bg-tint border-brand-200 mt-7 rounded-2xl border p-6">
            <Quote className="text-brand-800 size-6" />
            <blockquote className="text-body mt-3 text-sm leading-relaxed italic">
              “They were the only firm that asked for our half-hourly data
              before quoting. Everyone else guessed.”
            </blockquote>
            <figcaption className="text-ink mt-3 text-sm font-bold">
              Managing Director
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}

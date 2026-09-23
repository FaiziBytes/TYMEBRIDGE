import { Star } from "lucide-react";
import { Kicker, Section, SectionTitle } from "@/components/site/section";

const reviews = [
  {
    quote:
      "They turned down the bigger system we asked for and explained why it would not pay back. That is the moment we trusted them.",
    name: "Operations Director",
    org: "Midlands manufacturer",
  },
  {
    quote:
      "Survey on the Tuesday, a properly costed proposal on the Friday, and the numbers matched what we actually generated.",
    name: "Facilities Manager",
    org: "Logistics group",
  },
  {
    quote:
      "Clean install, tidy site, everything certified. The team answered questions months after they had been paid.",
    name: "Homeowner",
    org: "Nottingham",
  },
];

/**
 * Gold on white is under 3:1, so the star row never stands alone — the numeric
 * rating always sits beside it.
 */
function StarRow({ className = "size-3.5" }: { className?: string }) {
  return (
    <div className="flex" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`text-star fill-current ${className}`} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <Section className="bg-paper border-border border-y py-14 sm:py-20 lg:py-28">
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Kicker>Reviews</Kicker>
          <SectionTitle>
            Rated 5.0 by the people who let us on their roof
          </SectionTitle>
        </div>
        <div className="flex items-center gap-2">
          <StarRow className="size-4" />
          <span className="text-ink text-sm font-bold">5.0</span>
          <span className="text-faint text-sm">from 30+ reviews</span>
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.quote}
            className="reveal lift border-border bg-page flex flex-col rounded-2xl border p-6 sm:p-7"
          >
            <StarRow />
            <blockquote className="text-body mt-4 flex-1 text-sm leading-relaxed">
              “{r.quote}”
            </blockquote>
            <figcaption className="border-border mt-6 border-t pt-4">
              <p className="text-ink text-sm font-bold">{r.name}</p>
              <p className="text-faint text-xs">{r.org}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

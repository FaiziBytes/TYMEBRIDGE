import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Kicker, Section } from "@/components/site/section";
import { Picture } from "@/components/site/picture";
import { paths } from "@/routes/paths";

export function Finance() {
  return (
    <Section className="py-14 sm:py-20 lg:py-28">
      <div className="border-border bg-paper reveal grid items-center gap-10 overflow-hidden rounded-3xl border lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-9 lg:p-14">
          <Kicker>Finance</Kicker>
          <h2 className="text-ink mt-3 text-3xl font-extrabold tracking-tight">
            Spread the cost, keep the savings
          </h2>
          <p className="text-body mt-4 leading-relaxed">
            Domestic systems from 0% APR over 12 or 24 months, or fixed-rate
            terms up to five years. Commercial sites can use asset finance,
            lease or a power purchase agreement with no capital outlay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="md">
              <Link to={paths.finance}>See finance options</Link>
            </Button>
            <Button asChild variant="outlineNavy" size="md">
              <Link to={paths.contact}>Talk it through</Link>
            </Button>
          </div>
          <p className="text-faint mt-6 text-xs leading-relaxed">
            Finance subject to status. Representative 12.99% APR. We act as a
            credit broker, not a lender.
          </p>
        </div>

        <Picture
          name="finance-review"
          alt="Two people at a desk going through a printed proposal beside a laptop"
          ratio="auto"
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="h-full min-h-56 rounded-none sm:min-h-72"
        />
      </div>
    </Section>
  );
}

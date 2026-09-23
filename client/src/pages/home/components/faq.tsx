import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Kicker, Section, SectionTitle } from "@/components/site/section";
import { JsonLd } from "@/components/site/json-ld";
import { paths } from "@/routes/paths";

/**
 * Answers are written to be genuinely useful and occasionally to talk someone
 * out of a purchase — that is the whole positioning, and it is also what makes
 * the FAQ schema worth having rather than filler.
 */
const faqs = [
  {
    q: "How long does an installation take?",
    a: "A domestic system is normally a single day, two if there is a battery and the consumer unit needs work. A 200 kW commercial roof is three to four weeks on site. The long pole on commercial jobs is the DNO application, not the install — that is the grid operator's timescale and it is out of our hands.",
  },
  {
    q: "Do I need a battery as well as panels?",
    a: "Often not. Panels alone cut your daytime import, and if the building is busy through the day that is where most of the saving already is. A battery earns its money when you have meaningful evening usage or a tariff with a cheap overnight rate. Our survey tells you which case you are in before you commit to one.",
  },
  {
    q: "What happens on a cloudy day, or in winter?",
    a: "Output drops but does not stop — panels run on daylight, not direct sun. A UK system produces roughly 900 kWh per kWp across a full year, with most of it between March and September. Every forecast we give you is an annual figure for that reason; a good day in June proves nothing on its own.",
  },
  {
    q: "Will solar panels damage my roof?",
    a: "Not when the mounting is done properly. We survey the structure first, and if the roof needs attention before panels go on it we will say so rather than fit over a problem. Any penetration is flashed and weather-tested, and the work is covered by our workmanship warranty.",
  },
  {
    q: "What maintenance does a system need?",
    a: "Very little. Panels have no moving parts; an annual performance check and an occasional clean is usually the whole job. Inverters are the component most likely to need replacing within 25 years, typically somewhere between year ten and fifteen. We factor that into the lifetime figures rather than quietly leaving it out.",
  },
  {
    q: "Do you subcontract the work?",
    a: "No. The engineers who install your system are employed by us, and the person who surveyed the site is the person who designed it. Nobody here is paid commission on the size of the system.",
  },
  {
    q: "What if I move house?",
    a: "The system stays with the property and generally adds to its value; an EPC improvement is part of that. Any outstanding finance either settles on completion or transfers, depending on the agreement — we will talk you through which applies before you sign anything.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <Section className="bg-paper border-border border-y py-14 sm:py-20 lg:py-28">
      <JsonLd id="faq-schema" data={faqSchema} />

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* The accordion runs long on desktop, so this column sticks rather
            than leaving a tall gap beside it. */}
        <div className="reveal lg:sticky lg:top-24 lg:self-start">
          <Kicker>Questions</Kicker>
          <SectionTitle>The ones people actually ask</SectionTitle>
          <p className="text-body mt-4 leading-relaxed">
            Most of what people want to know before committing comes down to the
            same handful of things: how long it takes, whether they really need
            a battery, and what happens when the weather is British.
          </p>
          <p className="text-body mt-4 leading-relaxed">
            Straight answers below — including the times the answer is that you
            probably should not buy the thing. If yours is not here,{" "}
            <Link
              to={paths.contact}
              className="text-brand-800 font-semibold underline underline-offset-4"
            >
              ask us directly
            </Link>
            .
          </p>
        </div>

        <div className="reveal">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-ink text-left text-base font-bold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-body text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

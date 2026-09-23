import { SiteLayout } from "@/components/site/layout";
import { Hero } from "./components/hero";
import { Accreditations } from "./components/accreditations";
import { Services } from "./components/services";
import { Stats } from "./components/stats";
import { CaseStudy } from "./components/case-study";
import { Process } from "./components/process";
import { WhyUs } from "./components/why-us";
import { Brands } from "./components/brands";
import { Reviews } from "./components/reviews";
import { Finance } from "./components/finance";
import { Faq } from "./components/faq";
import { ClosingCta } from "./components/closing-cta";

/**
 * The home page is only a running order. Each section owns its own copy, data
 * and layout in ./components, so changing one never risks another — and a
 * section can be lifted onto a service page unchanged.
 */
export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Accreditations />
      <Services />
      <Stats />
      <CaseStudy />
      <Process />
      <WhyUs />
      <Brands />
      <Reviews />
      <Finance />
      <Faq />
      <ClosingCta />
    </SiteLayout>
  );
}

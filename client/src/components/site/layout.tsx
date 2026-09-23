import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";

/** Marketing shell: fixed header over the page, footer at the end. */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-page flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}

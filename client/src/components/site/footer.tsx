import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { services, site } from "@/config/site";
import { paths } from "@/routes/paths";

const quickLinks = [
  { label: "About", href: paths.about },
  { label: "Finance", href: paths.finance },
  { label: "Blog", href: paths.blog },
  { label: "Contact", href: paths.contact },
];

const socials = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo invert />
            <p className="text-slatey mt-5 max-w-xs text-sm leading-relaxed">
              {site.tagline} — designed, installed and certified by our own
              engineers.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full bg-white/8 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.16em] text-white uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    to={s.href}
                    className="text-slatey hover:text-brand-300 text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.16em] text-white uppercase">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-slatey hover:text-brand-300 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.16em] text-white uppercase">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="group flex items-start gap-3 text-white transition-colors"
                >
                  <Phone className="text-brand-300 mt-0.5 size-4 shrink-0" />
                  <span className="font-bold group-hover:underline">
                    {site.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group text-slatey flex items-start gap-3"
                >
                  <Mail className="text-brand-300 mt-0.5 size-4 shrink-0" />
                  <span className="group-hover:text-white">{site.email}</span>
                </a>
              </li>
              <li className="text-slatey flex items-start gap-3">
                <MapPin className="text-brand-300 mt-0.5 size-4 shrink-0" />
                <span className="not-italic">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city} {site.address.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-slatey max-w-3xl text-xs leading-relaxed">
            {site.name} Ltd is registered in England and Wales, company no.{" "}
            {site.companyNo}. Finance is subject to status and available to UK
            residents aged 18 or over. {site.name} Ltd acts as a credit broker,
            not a lender.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slatey text-xs">
              © {new Date().getFullYear()} {site.name} Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to={paths.privacyPolicy}
                className="text-slatey hover:text-brand-300 text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to={paths.cookiePolicy}
                className="text-slatey hover:text-brand-300 text-xs transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

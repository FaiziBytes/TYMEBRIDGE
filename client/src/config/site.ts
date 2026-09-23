import type { LucideIcon } from "lucide-react";
import { paths } from "@/routes/paths";
import {
  BatteryCharging,
  Building2,
  CarFront,
  Gauge,
  PlugZap,
  Sun,
} from "lucide-react";

/**
 * Every client-specific string on the marketing site lives here.
 * Swapping the brand = editing this file, not hunting through components.
 */
export const site = {
  name: "ThymeBridge",
  tagline: "Solar, storage and EV charging",
  phone: "0115 783 6409",
  phoneHref: "tel:+441157836409",
  email: "hello@thymebridge.co.uk",
  address: {
    line1: "Unit 2 Headstocks Industrial Park",
    line2: "Merchant Way",
    city: "Nottingham",
    postcode: "NG16 1AA",
  },
  companyNo: "00000000",
  hours: "Mon–Fri, 8am–6pm",
} as const;

export type ServiceKey =
  | "commercial-solar"
  | "domestic-solar"
  | "battery-storage"
  | "ev-charging"
  | "electrical-services"
  | "maintenance";

export type Service = {
  key: ServiceKey;
  href: string;
  title: string;
  short: string;
  blurb: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    key: "commercial-solar",
    href: paths.commercialSolar,
    title: "Commercial Solar",
    short: "Cut overheads on a scale that shows up on the P&L",
    blurb:
      "Roof and ground-mount arrays sized against your actual half-hourly consumption, not a sales estimate.",
    icon: Building2,
  },
  {
    key: "domestic-solar",
    href: paths.domesticSolar,
    title: "Domestic Solar",
    short: "Lower bills, without the doorstep pitch",
    blurb:
      "Panels matched to your roof pitch, shading and tariff — with a forecast you can check line by line.",
    icon: Sun,
  },
  {
    key: "battery-storage",
    href: paths.batteryStorage,
    title: "Battery Storage",
    short: "Use what you generate, when you need it",
    blurb:
      "Store the daytime surplus and run on it through the evening peak instead of exporting it for pennies.",
    icon: BatteryCharging,
  },
  {
    key: "ev-charging",
    href: paths.evCharging,
    title: "EV Charging",
    short: "Home, workplace and fleet",
    blurb:
      "Chargers that draw from your own generation first, and scale as the fleet grows.",
    icon: CarFront,
  },
  {
    key: "electrical-services",
    href: paths.electricalServices,
    title: "Electrical Services",
    short: "Qualified engineers, never subcontracted",
    blurb:
      "Rewiring, distribution upgrades, inspection and certification — the groundwork the rest depends on.",
    icon: PlugZap,
  },
  {
    key: "maintenance",
    href: paths.maintenance,
    title: "Maintenance & Monitoring",
    short: "Keep the system producing what it promised",
    blurb:
      "Performance checks, inverter servicing and panel cleaning, plus someone watching the output so a fault shows up before your bill does.",
    icon: Gauge,
  },
];

export const mainNav = [
  { label: "About", href: paths.about },
  { label: "Services", href: paths.commercialSolar, children: services },
  { label: "Finance", href: paths.finance },
  { label: "Blog", href: paths.blog },
  { label: "Contact", href: paths.contact },
];

/**
 * Every route path in the app, in one place.
 *
 * Components and the nav config reference these instead of string literals, so
 * renaming a URL is a single edit and a typo is a type error rather than a dead
 * link nobody notices.
 */
export const paths = {
  home: "/",

  // services
  commercialSolar: "/commercial-solar",
  domesticSolar: "/domestic-solar",
  batteryStorage: "/battery-storage",
  evCharging: "/ev-charging",
  electricalServices: "/electrical-services",
  maintenance: "/maintenance",

  // company
  about: "/about",
  finance: "/finance",
  blog: "/blog",
  contact: "/contact",

  // legal
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",

  // internal
  designSystem: "/design-system",
} as const;

export type Path = (typeof paths)[keyof typeof paths];

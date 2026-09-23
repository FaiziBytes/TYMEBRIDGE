import { appConfig } from "./app.config";

const GOOGLE_FONTS_STYLESHEETS = "https://fonts.googleapis.com";
const GOOGLE_FONTS_FILES = "https://fonts.gstatic.com";
const MYFATOORAH = "https://*.myfatoorah.com";
const ZOOM_SDK_ASSETS = "https://source.zoom.us";
// a host wildcard matches subdomains only, so the apex is listed separately —
// the web SDK bootstraps against https://zoom.us/api/v1/wc/info
const ZOOM_APEX = "https://zoom.us";
const ZOOM_SERVICES = "https://*.zoom.us";
const ZOOM_SOCKETS = "wss://*.zoom.us";

function resolveS3Origin(): string | null {
  if (appConfig.s3.publicUrl) {
    try {
      return new URL(appConfig.s3.publicUrl).origin;
    } catch {
      return null;
    }
  }
  if (appConfig.s3.bucket && appConfig.s3.region) {
    return `https://${appConfig.s3.bucket}.s3.${appConfig.s3.region}.amazonaws.com`;
  }
  return null;
}

export function buildCspDirectives(): Record<string, string[]> {
  const s3Origin = resolveS3Origin();

  return {
    defaultSrc: ["'self'"],
    baseUri: ["'self'"],
    objectSrc: ["'none'"],
    frameAncestors: ["'self'"],
    formAction: ["'self'", MYFATOORAH],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'",
      "'wasm-unsafe-eval'",
      MYFATOORAH,
      ZOOM_SDK_ASSETS,
    ],
    scriptSrcAttr: ["'none'"],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      GOOGLE_FONTS_STYLESHEETS,
      ZOOM_SDK_ASSETS,
    ],
    fontSrc: ["'self'", "data:", GOOGLE_FONTS_FILES],
    imgSrc: ["'self'", "data:", "blob:", "https:"],
    mediaSrc: ["'self'", "blob:", ZOOM_SDK_ASSETS],
    workerSrc: ["'self'", "blob:"],
    frameSrc: ["'self'", MYFATOORAH, ZOOM_APEX, ZOOM_SERVICES],
    connectSrc: [
      "'self'",
      MYFATOORAH,
      ZOOM_APEX,
      ZOOM_SERVICES,
      ZOOM_SOCKETS,
      ...(s3Origin ? [s3Origin] : []),
    ],
    upgradeInsecureRequests: [],
  };
}

import type { IncomingMessage, ServerResponse } from "http";
import { initializeApp } from "./app";

let appPromise: ReturnType<typeof initializeApp> | null = null;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (!appPromise) appPromise = initializeApp();
  const app = await appPromise;
  return (
    app as unknown as (req: IncomingMessage, res: ServerResponse) => void
  )(req, res);
}

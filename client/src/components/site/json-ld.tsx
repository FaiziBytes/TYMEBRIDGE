import { useEffect } from "react";

/**
 * Injects a structured-data block into <head> for the life of the page.
 *
 * This is a client-rendered app, so the tag is not in the HTML that arrives
 * from the server. Google does execute JavaScript and will pick it up, but it
 * happens on a second pass — the moment these pages are pre-rendered at build
 * time, this markup lands in the initial HTML instead and is read immediately.
 */
export function JsonLd({ data, id }: { data: unknown; id: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data, id]);

  return null;
}

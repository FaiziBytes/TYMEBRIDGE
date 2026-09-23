const accreditations = [
  "MCS",
  "NICEIC",
  "RECC",
  "TrustMark",
  "OZEV",
  "CHAS",
  "SafeContractor",
  "IWA",
];

/**
 * Scrolling accreditation strip. The list is rendered twice so the track loops
 * seamlessly; the animation pauses on hover and is switched off entirely under
 * prefers-reduced-motion — see the motion block in index.css.
 */
export function Accreditations() {
  return (
    <div className="bg-paper border-border border-y py-7">
      <div className="marquee mx-auto max-w-7xl overflow-hidden px-5 lg:px-8">
        <div className="marquee-track flex w-max items-center gap-4">
          {[...accreditations, ...accreditations].map((a, i) => (
            <span
              key={`${a}-${i}`}
              className="border-border bg-tint text-brand-800 grid h-11 w-28 shrink-0 place-items-center rounded-xl border text-xs font-bold tracking-wide sm:h-12 sm:w-36"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

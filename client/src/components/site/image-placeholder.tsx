import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "forest" | "sage" | "mist" | "carbon";

/**
 * Stands in for photography until the client's shots arrive.
 *
 * It is deliberately a flat brand-toned block rather than a grey box with a
 * cross through it: the page should already read as finished when it is
 * reviewed, and swapping one of these for an <img> should not shift the
 * layout — hence the fixed aspect ratio.
 */
const tones: Record<Tone, string> = {
  forest:
    "bg-[linear-gradient(135deg,#24382C_0%,#1A2B20_55%,#101C14_100%)] text-white/70",
  sage: "bg-[linear-gradient(135deg,#C9DBBB_0%,#A9C098_55%,#718B64_100%)] text-forest-950/75",
  mist: "bg-[linear-gradient(135deg,#F4F8F0_0%,#E8EFE1_55%,#DFE6D8_100%)] text-brand-800/75",
  carbon:
    "bg-[linear-gradient(135deg,#2A332C_0%,#16211A_60%,#0C120E_100%)] text-white/60",
};

export function ImagePlaceholder({
  label,
  ratio = "16 / 9",
  tone = "forest",
  className,
}: {
  label: string;
  ratio?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${label}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        tones[tone],
        className
      )}
    >
      {/* soft light sweep so the block has some depth instead of reading flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,rgba(255,255,255,0.22),transparent_58%)]"
      />
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="flex items-center gap-2 text-center">
          <ImageIcon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="text-xs font-semibold tracking-wide">{label}</span>
        </div>
      </div>
    </div>
  );
}

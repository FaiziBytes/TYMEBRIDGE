const UNIT_SECONDS: Record<string, number> = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
};

/**
 * Parses a duration string like "15m", "7d" or "3600" into seconds.
 * Bare numbers are treated as seconds.
 */
export function parseDurationSeconds(value: string | number): number {
  if (typeof value === "number") return value;

  const match = /^(\d+)\s*([smhd])?$/i.exec(value.trim());
  if (!match) {
    throw new Error(`Invalid duration: ${value}`);
  }

  const amount = Number(match[1]);
  const unit = (match[2] ?? "s").toLowerCase();
  const seconds = UNIT_SECONDS[unit];
  if (seconds === undefined) {
    throw new Error(`Invalid duration unit: ${unit}`);
  }
  return amount * seconds;
}

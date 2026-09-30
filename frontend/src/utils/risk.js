/**
 * Shared risk-level metadata so tone, label and copy stay consistent across
 * every panel. Colours themselves live in CSS custom properties
 * (see src/index.css) and are applied through the `tone-*` classes.
 */
export const RISK_LEVELS = {
  low: { key: 'low', label: 'Low', short: 'LOW' },
  moderate: { key: 'moderate', label: 'Moderate', short: 'MODERATE' },
  high: { key: 'high', label: 'High', short: 'HIGH' },
  severe: { key: 'severe', label: 'Severe', short: 'SEVERE' },
  info: { key: 'info', label: 'Reference', short: 'INFO' },
};

/**
 * Resolve a risk level into metadata, falling back to `info` for unknown keys.
 */
export function riskOf(level) {
  return RISK_LEVELS[level] ?? RISK_LEVELS.info;
}

/** Class name used to tint bars, chips and markers. */
export function toneClass(level) {
  return `tone-${riskOf(level).key}`;
}

/** Clamp + round a value into a 0–100 percentage for progress bars. */
export function toPercent(value, max = 100) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}

const TREND_GLYPH = { up: '▲', down: '▼', flat: '◆' };

/** Accessible text + glyph pair for the trend markers on the summary cards. */
export function trendMeta(direction) {
  const map = {
    up: { glyph: TREND_GLYPH.up, label: 'increasing', className: 'trend-up' },
    down: { glyph: TREND_GLYPH.down, label: 'decreasing', className: 'trend-down' },
    flat: { glyph: TREND_GLYPH.flat, label: 'steady', className: 'trend-flat' },
  };
  return map[direction] ?? map.flat;
}

/**
 * Add minutes to an "HH:MM" string, wrapping over 24 h.
 * Used only to label the simulated forecast timeline.
 */
export function addMinutes(hhmm, minutes) {
  const [rawH, rawM] = String(hhmm).split(':');
  const start = (Number(rawH) * 60 + Number(rawM) + minutes) % (24 * 60);
  if (!Number.isFinite(start)) return hhmm;
  const h = Math.floor(start / 60);
  const m = ((start % 60) + 60) % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

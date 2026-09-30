/**
 * Small presentational primitives shared by every dashboard panel.
 * Their styles live in src/index.css so the whole console stays consistent.
 */
import { riskOf, toPercent } from '../utils/risk.js';

/** Orange "SIMULATED DATA" pill used across the dashboard. */
export function SimulatedTag({ label = 'Simulated data', solid = false }) {
  return (
    <span className={solid ? 'sim-tag sim-tag--solid' : 'sim-tag'}>{label}</span>
  );
}

/** Risk level pill, e.g. "SEVERE". */
export function RiskChip({ level, label }) {
  const risk = riskOf(level);
  return (
    <span className={`chip risk-chip tone-${risk.key}`}>
      <span className="dot" aria-hidden="true" />
      {label ?? risk.label}
    </span>
  );
}

/** Thin progress bar tinted by the surrounding risk tone. */
export function Meter({ value, max = 100, label }) {
  const pct = toPercent(value, max);
  return (
    <div
      className="meter"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="meter-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Heading row used above a group of panels/cards in a dashboard section. */
export function SectionHeading({ title, hint, actions }) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title">{title}</h2>
        {hint ? <p className="section-hint">{hint}</p> : null}
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}

/** Panel shell: titled card with optional actions and a simulated-data tag. */
export function Panel({
  id,
  title,
  icon: Icon,
  subtitle,
  actions,
  showSimTag = true,
  className = '',
  children,
}) {
  return (
    <section id={id} className={`panel ${className}`.trim()}>
      <header className="panel-head">
        <div>
          <h2 className="panel-title">
            {Icon ? <Icon size={17} strokeWidth={1.9} aria-hidden="true" /> : null}
            {title}
          </h2>
          {subtitle ? <p className="panel-sub">{subtitle}</p> : null}
        </div>
        <div className="panel-actions">
          {actions}
          {showSimTag ? <SimulatedTag /> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

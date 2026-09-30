import { DataIcon } from './icons.jsx';
import { Meter, RiskChip, SimulatedTag } from './ui.jsx';
import { riskOf, trendMeta } from '../../utils/risk.js';
import './SummaryCard.css';

/**
 * One KPI tile. Receives a card object from src/data/simulatedData.js —
 * every value inside is a fabricated demo number.
 */
function SummaryCard({ card }) {
  const risk = riskOf(card.level);
  const trend = trendMeta(card.trend?.direction);

  return (
    <article className={`panel summary-card tone-${risk.key}`}>
      <div className="summary-top">
        <span className="summary-icon" aria-hidden="true">
          <DataIcon name={card.icon} size={19} />
        </span>
        <RiskChip level={risk.key} />
      </div>

      <p className="summary-label">{card.label}</p>

      <p className="summary-value">
        {card.value}
        <span className="summary-unit">{card.unit}</span>
      </p>

      <p className="summary-headline">{card.headline}</p>

      <Meter value={card.progress} label={`${card.label} sample index`} />

      <p className={`summary-trend ${trend.className}`}>
        <span aria-hidden="true">{trend.glyph}</span>
        {card.trend?.text}
        <span className="sr-only">({trend.label})</span>
      </p>

      <div className="summary-foot">
        <p className="summary-detail">{card.detail}</p>
        <p className="summary-footer">{card.footer}</p>
      </div>

      <div className="summary-sim">
        <SimulatedTag label="Sample value" />
      </div>
    </article>
  );
}

/** Responsive 4-up grid of summary cards. */
export function SummaryCardGrid({ cards }) {
  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <SummaryCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default SummaryCard;

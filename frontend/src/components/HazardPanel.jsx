import { ShieldAlert } from 'lucide-react';
import { hazards } from '../data/simulatedData.js';
import { riskOf } from '../utils/risk.js';
import { DataIcon } from './icons.jsx';
import { Meter, Panel, RiskChip } from './ui.jsx';
import './HazardPanel.css';

/**
 * Hazard Analysis panel: one card per simulated hazard indicator with a risk
 * chip, an intensity bar, a confidence bar and a simulated lead time.
 */
function HazardPanel() {
  const highest = hazards.reduce(
    (worst, item) => (item.value > worst.value ? item : worst),
    hazards[0],
  );

  return (
    <Panel
      className="hazard-panel"
      title="Hazard Analysis"
      icon={ShieldAlert}
      subtitle="Simulated hazard indicators, confidence and onset windows for the demo sector"
      actions={
        <span className={`chip risk-chip tone-${riskOf(highest.level).key}`}>
          <span className="dot" aria-hidden="true" />
          Dominant: {highest.name}
        </span>
      }
    >
      <ul className="hazard-grid">
        {hazards.map((hazard) => {
          const risk = riskOf(hazard.level);
          return (
            <li key={hazard.id} className={`hazard-card tone-${risk.key}`}>
              <div className="hazard-top">
                <span className="hazard-icon">
                  <DataIcon name={hazard.icon} size={19} />
                </span>
                <div className="hazard-id">
                  <h3 className="hazard-name">{hazard.name}</h3>
                  <p className="hazard-indicator">{hazard.indicator}</p>
                </div>
                <RiskChip level={hazard.level} label={risk.short} />
              </div>

              <div className="hazard-score">
                <span className="hazard-value">{hazard.value}</span>
                <span className="hazard-max">/ {hazard.max} index</span>
              </div>

              <Meter value={hazard.value} max={hazard.max} label={`${hazard.name} simulated index`} />

              <div className="hazard-meta">
                <div className="hazard-meta-item">
                  <span className="eyebrow">Confidence</span>
                  <span className="hazard-meta-value">{hazard.confidence}%</span>
                  <Meter
                    value={hazard.confidence}
                    label={`${hazard.name} simulated model confidence`}
                  />
                </div>
                <div className="hazard-meta-item">
                  <span className="eyebrow">Lead time</span>
                  <span className="hazard-meta-value">{hazard.leadTime}</span>
                </div>
              </div>

              <p className="hazard-note">{hazard.note}</p>
            </li>
          );
        })}
      </ul>

      <p className="hazard-foot">
        Every indicator, confidence figure and onset window above is fabricated sample data — shown
        to demonstrate the layout only, never for decision making.
      </p>
    </Panel>
  );
}

export default HazardPanel;

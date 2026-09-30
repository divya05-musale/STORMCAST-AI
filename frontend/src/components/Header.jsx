import { useEffect, useState } from 'react';
import { Clock, Menu, ShieldCheck } from 'lucide-react';
import { systemStatus } from '../data/simulatedData.js';
import './Header.css';

/** Live local wall clock — a UI clock only, not a data timestamp. */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

/**
 * Top header: dashboard title, demo status badge and simulated system health.
 */
function Header({ onMenuClick }) {
  const clock = useClock();

  return (
    <header className="header">
      <div className="header-heading">
        <button type="button" className="header-menu" onClick={onMenuClick} aria-label="Open navigation">
          <Menu size={18} aria-hidden="true" />
        </button>
        <div>
          <h1 className="header-title">Weather Intelligence Dashboard</h1>
          <p className="header-subtitle">Convective Weather Monitoring &amp; Nowcasting · 0–6 h</p>
        </div>
      </div>

      <div className="header-status">
        <span className="chip sim-chip sim-tag--solid">
          <span className="dot" aria-hidden="true" />
          Simulated data
        </span>

        <span className="chip status-chip">
          <span className="dot status-dot" aria-hidden="true" />
          <span className="status-copy">
            <strong>{systemStatus.label}</strong>
            <em>
              {systemStatus.engine} · {systemStatus.latencyMs} ms
            </em>
          </span>
        </span>

        <span className="chip clock-chip">
          <Clock size={13} strokeWidth={2} aria-hidden="true" />
          <span className="mono">{clock}</span>
          <em>local</em>
        </span>

        <span className="chip sector-chip">
          <ShieldCheck size={13} strokeWidth={2} aria-hidden="true" />
          Demo sector 7
        </span>
      </div>
    </header>
  );
}

export default Header;

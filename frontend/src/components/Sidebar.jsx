import { CloudLightning, Radar, ShieldAlert, X } from 'lucide-react';
import './Sidebar.css';

/**
 * Left navigation rail. Collapses into an off-canvas drawer below 1025px.
 *
 * @param items      [{ id, label, icon, badge, hint }]
 * @param active     active section id
 * @param onSelect   (id) => void
 * @param open       drawer visibility on small screens
 * @param onClose    closes the drawer
 */
function Sidebar({ items, active, onSelect, open, onClose }) {
  const primary = items.filter((item) => item.group !== 'system');
  const system = items.filter((item) => item.group === 'system');

  const renderList = (list) =>
    list.map((item) => {
      const Icon = item.icon;
      const isActive = item.id === active;
      return (
        <li key={item.id}>
          <button
            type="button"
            className={`nav-item${isActive ? ' is-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
            <span className="nav-label">{item.label}</span>
            {item.badge ? (
              <span className={`nav-badge tone-${item.tone || 'info'}`}>{item.badge}</span>
            ) : null}
          </button>
          {item.hint ? <span className="nav-hint">{item.hint}</span> : null}
        </li>
      );
    });

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`}>
      <div className="sidebar-top">
        <div className="brand">
          <span className="brand-mark">
            <CloudLightning size={21} strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="brand-text">
            <span className="brand-name">
              STORMCAST <em>AI</em>
            </span>
            <span className="brand-sub">Severe weather nowcasting</span>
          </span>
        </div>
        <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close navigation">
          <X size={17} aria-hidden="true" />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard sections">
        <p className="eyebrow sidebar-caption">Monitoring</p>
        <ul>{renderList(primary)}</ul>
        <p className="eyebrow sidebar-caption">System</p>
        <ul>{renderList(system)}</ul>
      </nav>

      <div className="sidebar-foot">
        <div className="proto-card">
          <span className="proto-icon">
            <Radar size={16} strokeWidth={1.9} aria-hidden="true" />
          </span>
          <div>
            <p className="proto-title">Phase 1 prototype</p>
            <p className="proto-text">
              Grid placeholder in place — Leaflet radar layers arrive in Phase 2.
            </p>
          </div>
        </div>
        <p className="sidebar-meta">
          <ShieldAlert size={13} strokeWidth={2} aria-hidden="true" />
          v0.1.0 · demo dataset only
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;

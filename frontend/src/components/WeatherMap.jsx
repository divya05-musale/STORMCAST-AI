import { useState } from 'react';
import { Compass, Crosshair, Layers, Maximize2, Minus, Navigation, Plus, X } from 'lucide-react';
import { alerts, hazardZones, mapLegend, stormCells } from '../data/simulatedData.js';
import { riskOf } from '../utils/risk.js';
import { DataIcon } from './icons.jsx';
import { Panel } from './ui.jsx';
import './WeatherMap.css';

/** Converts the compass token inside a movement string to an arrow rotation. */
const BEARINGS = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5, W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
};

function headingOf(movement = '') {
  const token = movement.trim().split(/\s+/)[0];
  return BEARINGS[token] ?? 0;
}

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROWS = ['1', '2', '3', '4', '5'];

/**
 * Simulated nowcast grid.
 *
 * Deliberately NOT a real map: a decorative dark grid built from CSS plus inline
 * SVG, so Phase 1 needs no map library. Leaflet replaces this canvas in Phase 2.
 */
function WeatherMap() {
  const [zoom, setZoom] = useState(8);
  const [showZones, setShowZones] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedId, setSelectedId] = useState('SC-04');

  const selected = stormCells.find((cell) => cell.id === selectedId) ?? null;
  const selectedRisk = selected ? riskOf(selected.level) : null;
  const resolution = (2.4 * 2 ** (8 - zoom)).toFixed(1);

  return (
    <Panel
      className="map-panel"
      title="Nowcast Grid · Demo Sector 7"
      icon={Crosshair}
      subtitle="Simulated reflectivity composite · storm markers · hazard circles (decorative — no map library yet)"
      actions={
        <span className="chip mono-chip">
          Z{zoom} · {resolution} km/px
        </span>
      }
    >
      <div className={`map-canvas${showGrid ? '' : ' no-grid'}`}>
        <div className="map-grid" aria-hidden="true" />

        {/* Decorative coastline / ridge / drainage geometry (invented shapes) */}
        <svg className="map-geo" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="geo-land"
            vectorEffect="non-scaling-stroke"
            d="M0,44 L9,39 L16,42 L24,34 L32,37 L39,29 L47,32 L56,25 L64,28 L73,21 L81,25 L89,18 L100,22 L100,60 L0,60 Z"
          />
          <path
            className="geo-ridge"
            vectorEffect="non-scaling-stroke"
            d="M2,53 L13,47 L24,50 L34,44 L45,48 L57,42 L69,46 L80,40 L92,44"
          />
          <path className="geo-water" vectorEffect="non-scaling-stroke" d="M12,-2 C18,13 9,23 17,33 C23,41 19,52 25,62" />
          <path className="geo-water" vectorEffect="non-scaling-stroke" d="M68,-2 C62,11 74,19 70,31 C66,43 77,50 75,62" />
          <path className="geo-route" vectorEffect="non-scaling-stroke" d="M-2,21 C20,27 40,15 60,23 C76,29 88,21 102,27" />
          <path className="geo-route" vectorEffect="non-scaling-stroke" d="M41,-2 C45,15 34,30 45,44 C51,52 47,56 49,62" />
        </svg>

        <div className="map-sweep" aria-hidden="true" />

        {/* Grid references — demo labels, intentionally not real coordinates */}
        <div className="map-cols" aria-hidden="true">
          {COLS.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>
        <div className="map-rows" aria-hidden="true">
          {ROWS.map((row) => (
            <span key={row}>{row}</span>
          ))}
        </div>

        {/* Simulated hazard zones */}
        {showZones
          ? hazardZones.map((zone) => (
              <div
                key={zone.id}
                className={`hazard-zone tone-${riskOf(zone.level).key}`}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.size}px`,
                  height: `${zone.size}px`,
                }}
                title={`${zone.label} — ${zone.detail} (simulated)`}
              >
                <span className="hazard-label">{zone.id}</span>
              </div>
            ))
          : null}

        {/* Simulated storm markers with motion vectors */}
        {stormCells.map((cell) => (
          <div
            key={cell.id}
            className={`map-cell tone-${riskOf(cell.level).key}${selectedId === cell.id ? ' is-selected' : ''}`}
            style={{ left: `${cell.x}%`, top: `${cell.y}%` }}
          >
            <span
              className="cell-vector"
              style={{ transform: `translate(-50%, -50%) rotate(${headingOf(cell.movement)}deg)` }}
              aria-hidden="true"
            >
              <Navigation size={11} strokeWidth={2.4} fill="currentColor" />
            </span>
            {cell.level === 'severe' || cell.level === 'high' ? (
              <span className="cell-ping" aria-hidden="true" />
            ) : null}
            <button
              type="button"
              className="cell-marker"
              aria-pressed={selectedId === cell.id}
              aria-label={`${cell.name}, simulated ${cell.dbz} dBZ, moving ${cell.movement}`}
              onClick={() => setSelectedId(cell.id)}
            >
              <DataIcon name={cell.icon} size={16} />
            </button>
            <span className="cell-id">{cell.id}</span>
          </div>
        ))}

        <p className="map-watermark" aria-hidden="true">
          simulated data
        </p>

        <div className="map-tools" role="group" aria-label="Decorative map controls">
          <button
            type="button"
            className="map-tool"
            onClick={() => setZoom((z) => Math.min(12, z + 1))}
            aria-label="Zoom in (demo readout only)"
          >
            <Plus size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="map-tool"
            onClick={() => setZoom((z) => Math.max(5, z - 1))}
            aria-label="Zoom out (demo readout only)"
          >
            <Minus size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`map-tool${showZones ? ' is-on' : ''}`}
            onClick={() => setShowZones((v) => !v)}
            aria-pressed={showZones}
            aria-label="Toggle simulated hazard zones"
          >
            <Layers size={15} aria-hidden="true" />
          </button>
          <button type="button" className="map-tool" aria-label="North up (decorative)">
            <Compass size={15} aria-hidden="true" />
          </button>
          <button type="button" className="map-tool" aria-label="Full extent (decorative)">
            <Maximize2 size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="map-legend">
          <p className="eyebrow">Legend</p>
          <ul>
            {mapLegend.map((row) => (
              <li key={row.id} className={`tone-${riskOf(row.level).key}`}>
                <span className={`legend-swatch legend-${row.shape}`} aria-hidden="true" />
                {row.label}
              </li>
            ))}
          </ul>
          <button type="button" className="legend-toggle" onClick={() => setShowGrid((v) => !v)}>
            {showGrid ? 'Hide grid' : 'Show grid'}
          </button>
        </div>
      </div>

      <div className="map-foot">
        {selected && selectedRisk ? (
          <div className={`inspector-card tone-${selectedRisk.key}`}>
            <div className="inspector-head">
              <span className="inspector-icon">
                <DataIcon name={selected.icon} size={17} />
              </span>
              <div className="inspector-names">
                <p className="inspector-title">{selected.name}</p>
                <p className="inspector-sub">
                  {selectedRisk.label} cell · demo track · age {selected.age}
                </p>
              </div>
              <button
                type="button"
                className="inspector-close"
                onClick={() => setSelectedId(null)}
                aria-label="Clear selected cell"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
            <dl className="inspector-stats">
              <div>
                <dt>Peak dBZ</dt>
                <dd>{selected.dbz}</dd>
              </div>
              <div>
                <dt>Rain rate</dt>
                <dd>{selected.rainfall} mm/h</dd>
              </div>
              <div>
                <dt>Strikes</dt>
                <dd>{selected.strikes}/km²</dd>
              </div>
              <div>
                <dt>Hail</dt>
                <dd>{selected.hail}</dd>
              </div>
            </dl>
            <p className="inspector-note">
              Moving {selected.movement}. Any +90 min extrapolation for this cell is simulated.
            </p>
          </div>
        ) : (
          <p className="inspector-empty">Select a storm marker to inspect its simulated cell values.</p>
        )}

        <div className="map-side">
          <ul className="alert-list">
            {alerts.map((alert) => (
              <li key={alert.id} className={`chip risk-chip tone-${riskOf(alert.level).key}`}>
                <span className="dot" aria-hidden="true" />
                {alert.text}
              </li>
            ))}
          </ul>
          <p className="map-note">
            Zoom, compass and extent controls are decorative — no real radar, satellite or live feed
            is connected in this prototype.
          </p>
        </div>
      </div>
    </Panel>
  );
}

export default WeatherMap;

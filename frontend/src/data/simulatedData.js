/**
 * STORMCAST AI — simulated demo dataset (Phase 1 prototype).
 *
 * IMPORTANT: every value in this file is fabricated sample data used only to
 * demonstrate the dashboard UI. Nothing here is a real observation, a real
 * forecast, or an operational nowcast. Do not use for decisions.
 */

export const SIMULATED_LABEL = 'SIMULATED DATA';

export const DISCLAIMER =
  'Prototype demonstration only — every value on this dashboard is simulated sample data. STORMCAST AI is not an operational forecasting system and provides no real-time meteorological data or forecast accuracy.';

/** Header / system health strip (simulated). */
export const systemStatus = {
  state: 'online',
  label: 'Demo pipeline nominal',
  engine: 'Nowcast Engine v0.3 (simulated)',
  feed: 'Synthetic radar + lightning feed',
  latencyMs: 42,
  refreshSeconds: 60,
};

/** Base wall-clock for the simulated forecast timeline (hh:mm, 24h). */
export const forecastBaseTime = '18:40';

/**
 * Four summary cards. `level` maps to the tone classes in utils/risk.js.
 * All numbers are invented sample values.
 */
export const summaryCards = [
  {
    id: 'active-storms',
    label: 'Active Storms',
    icon: 'cloud-lightning',
    level: 'high',
    value: 7,
    unit: 'cells',
    headline: '3 intensifying',
    trend: { direction: 'up', text: '+2 cells in last 30 min' },
    detail: 'Demo cells tracked inside a 120 km radius',
    footer: 'Strongest cell 58 dBZ',
    progress: 62,
  },
  {
    id: 'lightning-risk',
    label: 'Lightning Risk',
    icon: 'zap',
    level: 'severe',
    value: 78,
    unit: '/100',
    headline: 'Frequent CG strikes',
    trend: { direction: 'up', text: '+12 index pts / 1 h' },
    detail: 'Cloud-to-ground density composite',
    footer: 'Peak 34 strikes / km² / h',
    progress: 78,
  },
  {
    id: 'hail-risk',
    label: 'Hail Risk',
    icon: 'cloud-hail',
    level: 'high',
    value: 54,
    unit: '/100',
    headline: 'Graupel likely',
    trend: { direction: 'flat', text: 'steady over 30 min' },
    detail: 'Simulated hail swath probability',
    footer: 'Max stone Ø 2.4 cm (sample)',
    progress: 54,
  },
  {
    id: 'rainfall-risk',
    label: 'Heavy Rainfall Risk',
    icon: 'cloud-rain-wind',
    level: 'severe',
    value: 81,
    unit: '/100',
    headline: 'Cloudburst potential',
    trend: { direction: 'up', text: '+9 index pts / 30 min' },
    detail: 'Very short-duration rainfall outlook',
    footer: 'Sample peak 96 mm/h',
    progress: 81,
  },
];

/**
 * Four hazard indicators for the Hazard Analysis panel.
 * `value`/`max` drive the progress bar, `indicator` is the human readable
 * simulated measurement shown next to the risk level.
 */
export const hazards = [
  {
    id: 'lightning',
    name: 'Lightning',
    icon: 'zap',
    level: 'severe',
    value: 78,
    max: 100,
    indicator: '34 strikes / km² / h',
    confidence: 82,
    leadTime: 'onset in 0–15 min',
    note: 'Sample CG strike density around cell SC-04.',
  },
  {
    id: 'hail',
    name: 'Hail',
    icon: 'cloud-hail',
    level: 'high',
    value: 54,
    max: 100,
    indicator: 'Ø 2.4 cm · 46% prob.',
    confidence: 64,
    leadTime: 'onset in 20–40 min',
    note: 'Simulated hail swath along the north-east flank.',
  },
  {
    id: 'downburst',
    name: 'Downburst',
    icon: 'wind',
    level: 'moderate',
    value: 41,
    max: 100,
    indicator: 'gust 74 km/h',
    confidence: 58,
    leadTime: 'onset in 25–55 min',
    note: 'Strong rear-downdraft signature on demo profile.',
  },
  {
    id: 'cloudburst',
    name: 'Cloudburst',
    icon: 'droplets',
    level: 'severe',
    value: 81,
    max: 100,
    indicator: 'peak 96 mm/h',
    confidence: 71,
    leadTime: 'possible in 0–30 min',
    note: 'Training echoes simulated over the western ridge.',
  },
];

/**
 * Simulated storm cells plotted on the map placeholder.
 * `x` / `y` are percentage positions inside the map canvas.
 */
export const stormCells = [
  {
    id: 'SC-01',
    name: 'Cell SC-01',
    x: 22,
    y: 34,
    level: 'high',
    icon: 'cloud-lightning',
    intensity: 46,
    dbz: 46,
    movement: 'NE at 18 km/h',
    rainfall: 22,
    strikes: 9,
    hail: 'possible',
    age: '48 min',
  },
  {
    id: 'SC-02',
    name: 'Cell SC-02',
    x: 41,
    y: 58,
    level: 'moderate',
    icon: 'cloud-rain',
    intensity: 38,
    dbz: 38,
    movement: 'ENE at 12 km/h',
    rainfall: 14,
    strikes: 3,
    hail: 'unlikely',
    age: '26 min',
  },
  {
    id: 'SC-03',
    name: 'Cell SC-03',
    x: 58,
    y: 27,
    level: 'high',
    icon: 'cloud-lightning',
    intensity: 51,
    dbz: 51,
    movement: 'E at 21 km/h',
    rainfall: 31,
    strikes: 17,
    hail: 'likely',
    age: '1 h 12 min',
  },
  {
    id: 'SC-04',
    name: 'Cell SC-04',
    x: 66,
    y: 62,
    level: 'severe',
    icon: 'cloud-lightning',
    intensity: 58,
    dbz: 58,
    movement: 'ESE at 25 km/h',
    rainfall: 63,
    strikes: 34,
    hail: 'likely',
    age: '1 h 55 min',
  },
  {
    id: 'SC-05',
    name: 'Cell SC-05',
    x: 84,
    y: 41,
    level: 'moderate',
    icon: 'cloud-drizzle',
    intensity: 31,
    dbz: 31,
    movement: 'SE at 15 km/h',
    rainfall: 9,
    strikes: 1,
    hail: 'unlikely',
    age: '17 min',
  },
  {
    id: 'SC-06',
    name: 'Cell SC-06',
    x: 33,
    y: 78,
    level: 'low',
    icon: 'cloud',
    intensity: 22,
    dbz: 22,
    movement: 'NNE at 9 km/h',
    rainfall: 4,
    strikes: 0,
    hail: 'no',
    age: '9 min',
  },
];

/** Simulated hazard impact zones drawn as circles over the map. */
export const hazardZones = [
  {
    id: 'HZ-A',
    label: 'HZ-A · Lightning core',
    x: 64,
    y: 60,
    size: 208,
    level: 'severe',
    detail: 'Sample strike core radius 6 km',
  },
  {
    id: 'HZ-B',
    label: 'HZ-B · Hail swath',
    x: 57,
    y: 26,
    size: 176,
    level: 'high',
    detail: 'Simulated hail path 11 km long',
  },
  {
    id: 'HZ-C',
    label: 'HZ-C · Rainfall core',
    x: 24,
    y: 36,
    size: 150,
    level: 'high',
    detail: 'Sample 96 mm/h cloudburst radius',
  },
  {
    id: 'HZ-D',
    label: 'HZ-D · Gust front',
    x: 84,
    y: 44,
    size: 124,
    level: 'moderate',
    detail: 'Simulated downburst footprint',
  },
];

/** Watch areas shown on the map for the current demo period. */
export const alerts = [
  { id: 'AL-1', text: 'Lightning watch · Sector 7', level: 'severe' },
  { id: 'AL-2', text: 'Hail advisory · North-East flank', level: 'high' },
  { id: 'AL-3', text: 'Gust advisory · Eastern plain', level: 'moderate' },
];

/**
 * Six-hour nowcast timeline (Now → +6 h). Simulated conditions only.
 */
export const forecastTimeline = [
  {
    id: 't0',
    offset: 'Now',
    condition: 'Storms + lightning',
    icon: 'cloud-lightning',
    level: 'severe',
    intensity: 78,
    rainfall: 46,
    strikes: 34,
    gust: 62,
    note: 'Cell SC-04 near peak organisation.',
  },
  {
    id: 't1',
    offset: '+1 h',
    condition: 'Heavy rain bursts',
    icon: 'cloud-rain-wind',
    level: 'severe',
    intensity: 82,
    rainfall: 72,
    strikes: 28,
    gust: 68,
    note: 'Training echoes → cloudburst potential.',
  },
  {
    id: 't2',
    offset: '+2 h',
    condition: 'Hail likely zone',
    icon: 'cloud-hail',
    level: 'high',
    intensity: 69,
    rainfall: 51,
    strikes: 21,
    gust: 74,
    note: 'Largest stones on the NE flank (sample).',
  },
  {
    id: 't3',
    offset: '+3 h',
    condition: 'Downburst risk',
    icon: 'wind',
    level: 'high',
    intensity: 58,
    rainfall: 33,
    strikes: 14,
    gust: 81,
    note: 'Downdraft gust front spreads east.',
  },
  {
    id: 't4',
    offset: '+4 h',
    condition: 'Weakening showers',
    icon: 'cloud-rain',
    level: 'moderate',
    intensity: 44,
    rainfall: 19,
    strikes: 7,
    gust: 45,
    note: 'Outflow decays over the demo sector.',
  },
  {
    id: 't5',
    offset: '+5 h',
    condition: 'Isolated convection',
    icon: 'cloud-drizzle',
    level: 'low',
    intensity: 29,
    rainfall: 8,
    strikes: 2,
    gust: 28,
    note: 'Residual shower cells only.',
  },
  {
    id: 't6',
    offset: '+6 h',
    condition: 'Mostly cleared',
    icon: 'cloud',
    level: 'low',
    intensity: 18,
    rainfall: 3,
    strikes: 0,
    gust: 19,
    note: 'Break-down phase in the simulation.',
  },
];

/**
 * Storm intensity series for the analytics chart.
 * `observed` holds the (simulated) past window, `nowcast` the 0–6 h outlook.
 * The nulls keep the two halves visually separate on the chart.
 */
export const intensitySeries = [
  { label: 'T-90m', observed: 21, nowcast: null, rainfall: 3, lightning: 2 },
  { label: 'T-75m', observed: 27, nowcast: null, rainfall: 6, lightning: 4 },
  { label: 'T-60m', observed: 38, nowcast: null, rainfall: 12, lightning: 9 },
  { label: 'T-45m', observed: 49, nowcast: null, rainfall: 19, lightning: 15 },
  { label: 'T-30m', observed: 61, nowcast: null, rainfall: 27, lightning: 22 },
  { label: 'T-15m', observed: 70, nowcast: null, rainfall: 36, lightning: 29 },
  { label: 'NOW', observed: 78, nowcast: 78, rainfall: 46, lightning: 34 },
  { label: 'T+30m', observed: null, nowcast: 84, rainfall: 61, lightning: 31 },
  { label: 'T+1h', observed: null, nowcast: 82, rainfall: 72, lightning: 28 },
  { label: 'T+90m', observed: null, nowcast: 74, rainfall: 63, lightning: 24 },
  { label: 'T+2h', observed: null, nowcast: 69, rainfall: 51, lightning: 21 },
  { label: 'T+150m', observed: null, nowcast: 61, rainfall: 42, lightning: 17 },
  { label: 'T+3h', observed: null, nowcast: 58, rainfall: 33, lightning: 14 },
  { label: 'T+210m', observed: null, nowcast: 51, rainfall: 26, lightning: 11 },
  { label: 'T+4h', observed: null, nowcast: 44, rainfall: 19, lightning: 7 },
  { label: 'T+270m', observed: null, nowcast: 36, rainfall: 13, lightning: 4 },
  { label: 'T+5h', observed: null, nowcast: 29, rainfall: 8, lightning: 2 },
  { label: 'T+330m', observed: null, nowcast: 23, rainfall: 5, lightning: 1 },
  { label: 'T+6h', observed: null, nowcast: 18, rainfall: 3, lightning: 0 },
];

/** Inert preference rows for the Settings screen (Phase 1 prototype). */
export const settingsPreferences = [
  {
    id: 'auto-refresh',
    label: 'Auto-refresh demo feed',
    description: 'Re-render the simulated values on a 60 second cadence.',
    icon: 'refresh-cw',
    enabled: true,
  },
  {
    id: 'hazard-overlay',
    label: 'Hazard zone overlay',
    description: 'Draw simulated impact circles on the nowcast grid.',
    icon: 'layers',
    enabled: true,
  },
  {
    id: 'strike-ping',
    label: 'Lightning strike pulses',
    description: 'Animate strike markers on the grid (motion effects).',
    icon: 'zap',
    enabled: true,
  },
  {
    id: 'alert-cues',
    label: 'Alert cues',
    description: 'Placeholder toggle — this prototype sends no notifications.',
    icon: 'volume-2',
    enabled: false,
  },
];

/** Map legend rows (simulated symbology). */
export const mapLegend = [
  { id: 'lg-severe', label: 'Severe cell · ≥55 dBZ', level: 'severe', shape: 'marker' },
  { id: 'lg-high', label: 'High cell · 45–54 dBZ', level: 'high', shape: 'marker' },
  { id: 'lg-moderate', label: 'Moderate · 30–44 dBZ', level: 'moderate', shape: 'marker' },
  { id: 'lg-low', label: 'Light cell · <30 dBZ', level: 'low', shape: 'marker' },
  { id: 'lg-zone', label: 'Simulated hazard zone', level: 'high', shape: 'zone' },
  { id: 'lg-vector', label: 'Storm motion vector', level: 'info', shape: 'vector' },
];

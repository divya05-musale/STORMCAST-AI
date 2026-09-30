import {
  Cloud,
  CloudDrizzle,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  Droplets,
  Layers,
  RefreshCw,
  Volume2,
  Wind,
  Zap,
} from 'lucide-react';

/**
 * Maps the kebab-case icon keys used in src/data/simulatedData.js to Lucide
 * components, so data files never import components directly.
 */
export const ICONS = {
  cloud: Cloud,
  'cloud-lightning': CloudLightning,
  'cloud-hail': CloudHail,
  'cloud-rain': CloudRain,
  'cloud-rain-wind': CloudRainWind,
  'cloud-drizzle': CloudDrizzle,
  droplets: Droplets,
  wind: Wind,
  zap: Zap,
  layers: Layers,
  'refresh-cw': RefreshCw,
  'volume-2': Volume2,
};

export function iconFor(name) {
  return ICONS[name] ?? Cloud;
}

/** Renders a data-driven icon with a sensible fallback. */
export function DataIcon({ name, size = 18, className = '', strokeWidth = 1.9, title }) {
  const Icon = iconFor(name);
  return <Icon size={size} className={className} strokeWidth={strokeWidth} aria-hidden={title ? undefined : true} titleAccess={title} />;
}

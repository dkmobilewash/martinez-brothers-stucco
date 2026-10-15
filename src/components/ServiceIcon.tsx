import { Building2, Hammer, Home, Layers, PaintRoller, RefreshCw, Sparkles, Wrench, type LucideProps } from 'lucide-react';
import type { ServiceIconName } from '../data/types';

const ICONS = {
  hammer: Hammer,
  refresh: RefreshCw,
  home: Home,
  building: Building2,
  sparkles: Sparkles,
  wrench: Wrench,
  layers: Layers,
  paintbrush: PaintRoller,
} satisfies Record<ServiceIconName, unknown>;

export default function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" {...props} />;
}

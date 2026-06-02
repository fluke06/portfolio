'use client';
import { MASCOT_PATHS, type MascotName } from '@/lib/projects';

interface MascotProps {
  name?: MascotName;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export function Mascot({ name = 'pebble', className = '', style = {}, color }: MascotProps) {
  const p = MASCOT_PATHS[name] ?? MASCOT_PATHS.pebble;
  const colorStyle = color ? { color, ...style } : style;
  return (
    <svg
      viewBox={p.vb}
      className={className}
      style={colorStyle}
      fill={p.stroke ? 'none' : 'currentColor'}
      stroke={p.stroke ? 'currentColor' : undefined}
      strokeWidth={p.stroke ?? undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule={p.fillRule}
      aria-hidden="true"
    >
      <path d={p.d} />
    </svg>
  );
}

export function Monogram({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" style={{ color: 'var(--accent)' }} aria-hidden="true">
      <path d="M58 22 C50 14, 36 12, 26 22 C16 32, 16 50, 26 60 C36 70, 50 68, 58 62" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <circle cx="56" cy="42" r="8" fill="currentColor" />
    </svg>
  );
}

export function Asterisk({ size = 16, color = 'var(--accent)', className = '', style = {} }: {
  size?: number; color?: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} style={{ color, ...style }} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <line x1="30" y1="8" x2="30" y2="52" />
        <line x1="10" y1="30" x2="50" y2="30" />
        <line x1="16" y1="16" x2="44" y2="44" />
        <line x1="44" y1="16" x2="16" y2="44" />
      </g>
    </svg>
  );
}

export function ArrowNE({ size = 14, className = '', style = {} }: {
  size?: number; className?: string; style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path d="M6 18 L18 6 M9 6 H18 V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

import { Asterisk } from './mascot';

export function Marquee({ items, speed = 40 }: { items: string[]; speed?: number }) {
  const dup = [...items, ...items, ...items];
  return (
    <div className="marquee" style={{ '--marquee-duration': `${items.length * speed}s` } as React.CSSProperties}>
      <div className="marquee-track">
        {dup.map((it, i) => (
          <span key={i} className="marquee-item" style={{ fontFamily: 'var(--font-display)' }}>
            <span>{it}</span>
            <Asterisk size={14} />
          </span>
        ))}
      </div>
    </div>
  );
}

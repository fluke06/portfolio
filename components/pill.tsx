interface PillProps {
  children: React.ReactNode;
  variant?: 'default' | 'status';
  dot?: boolean;
  dotColor?: string;
  ta?: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function Pill({ children, variant = 'default', dot, dotColor, ta, className = '', onClick, active }: PillProps) {
  return (
    <span
      className={`pill pill-${variant} ${active ? 'pill-active' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {dot && <span className="pill-dot" style={dotColor ? { background: dotColor } : undefined} />}
      <span>{children}</span>
      {ta && <span className="pill-ta">{ta}</span>}
    </span>
  );
}

import { ArrowNE } from './mascot';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'text';
  children: React.ReactNode;
  onClick?: () => void;
  icon?: 'arrow';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, icon, type = 'button', disabled, className = '' }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-magnetic
    >
      <span>{children}</span>
      {icon === 'arrow' && <ArrowNE size={14} />}
    </button>
  );
}

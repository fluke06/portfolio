interface BilingualLabelProps {
  num?: string;
  en: string;
  ta?: string;
  className?: string;
}

export function BilingualLabel({ num, en, ta, className = '' }: BilingualLabelProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {num && (
        <span
          className="font-inter font-medium text-[#8A94B0] uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#888280' }}
        >
          ({num})
        </span>
      )}
      <span
        className="font-inter font-medium text-[#EDE8E0]"
        style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
      >
        {en}
      </span>
      {ta && (
        <span
          className="font-inter font-light text-[#EDE8E0]"
          style={{ fontSize: 'clamp(0.7rem, 1vw, 0.875rem)', opacity: 0.7 }}
        >
          {ta}
        </span>
      )}
    </div>
  );
}

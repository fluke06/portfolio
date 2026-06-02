'use client';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
}

export function LiveProjectButton({ href, label = 'View project' }: LiveProjectButtonProps) {
  if (!href || href === '#') return null;

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="rounded-full border border-[#5B82FF]/60 text-[#E4EAF5] font-inter font-medium tracking-wide px-5 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm inline-block hover:bg-[#5B82FF]/10 transition-colors flex-shrink-0"
    >
      {label}
    </a>
  );
}

export function ContactButton() {
  return (
    <a
      href="#contact"
      className="font-inter font-medium text-[#100F0D] text-sm inline-flex items-center gap-2 px-7 py-3 rounded-full transition-opacity duration-200 hover:opacity-85"
      style={{ background: '#EDE8E0' }}
    >
      Start a project
      <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 13 L13 3 M7 3 H13 V9" />
      </svg>
    </a>
  );
}

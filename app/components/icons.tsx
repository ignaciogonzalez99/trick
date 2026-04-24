export function ShieldIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M20 2L4 8V22C4 32 12 40 20 42C28 40 36 32 36 22V8L20 2Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 20L18 24L26 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="10" y="6" width="36" height="48" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="6" x2="10" y2="54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="20" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="26" x2="38" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="34" x2="30" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="46" r="12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      <text x="48" y="51" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">?</text>
    </svg>
  );
}

export function NotepadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="12" y="10" width="40" height="48" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" />
      <rect x="22" y="6" width="20" height="10" rx="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
      <line x1="22" y1="26" x2="42" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="34" x2="42" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="42" x2="34" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 46 L50 34 L54 38 L42 50 L36 52 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="48" y1="36" x2="52" y2="40" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

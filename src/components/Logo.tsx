export function Logo({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* panel outline */}
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" className="stroke-line" strokeWidth="1.5" />

      {/* patch cable — the one active connection */}
      <path
        d="M7 7C10 9 14 15 17 17"
        className="stroke-signal"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* four jacks — two idle, two connected */}
      <circle cx="17" cy="7" r="1.8" className="fill-panel stroke-line" strokeWidth="1.2" />
      <circle cx="7" cy="17" r="1.8" className="fill-panel stroke-line" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1.8" className="fill-signal" />
      <circle cx="17" cy="17" r="1.8" className="fill-data" />
    </svg>
  );
}
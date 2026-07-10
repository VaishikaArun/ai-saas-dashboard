const ITEMS = ["AI Chat", "Image Generator", "Resume Builder", "Code Reviewer"];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative z-10 overflow-hidden border-y border-line bg-panel/50">
      <div className="marquee-track flex w-max py-3">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="dot">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
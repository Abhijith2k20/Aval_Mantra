// A flowing wave edge. `fill` should match the neighbouring section's background.
export default function Wave({ fill, flip = false, className = "" }: { fill: string; flip?: boolean; className?: string }) {
  const d = "M0,40 C120,80 240,0 360,30 C480,60 600,10 720,40 C840,70 960,5 1080,35 C1200,65 1320,15 1440,40 L1440,0 L0,0 Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 z-10 h-12 overflow-hidden md:h-20 ${flip ? "bottom-0 rotate-180" : "top-0"} ${className}`} aria-hidden>
      <div className="flex h-full w-[200%] animate-[marquee_18s_linear_infinite]">
        {[0, 1].map((k) => (
          <svg key={k} viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={d} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}

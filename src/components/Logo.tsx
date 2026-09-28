import { BRAND } from "@/lib/site";

// The brand artwork is a single-colour SVG used as a CSS mask, so it takes the text colour it sits in.
const MARK = { src: "/brand/aval-mantra-mark.svg", ratio: 3.017 };

export function BrandArt({ className = "" }: { className?: string }) {
  const a = MARK;
  return (
    <span
      role="img"
      aria-label={BRAND.name}
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: a.ratio,
        mask: `url(${a.src}) center / contain no-repeat`,
        WebkitMask: `url(${a.src}) center / contain no-repeat`,
      }}
    />
  );
}

export default function Logo({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const color = tone === "light" ? "text-ivory" : "text-maroon";
  return <BrandArt className={`h-11 md:h-14 ${color} transition-colors duration-500 ${className}`} />;
}

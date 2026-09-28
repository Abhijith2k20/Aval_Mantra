
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { img, waLink } from "@/lib/site";
import { Arrow, Chevron } from "./Icons";

const SLICES = 7;
const STACK = ["three-sisters", "sea-banarasi", "kanjivaram-pink", "golden-hour"];
const RANGE = [
  { name: "Organza", count: 36 },
  { name: "Georgette & Chiffon", count: 42 },
  { name: "Tissue", count: 24 },
  { name: "Party Wear", count: 31 },
  { name: "Silk", count: 18 },
];

function SlicedWord() {
  return (
    <div className="relative select-none" aria-label="Latest Trends">
      {/* spacer keeps layout height */}
      <p className="invisible font-display text-[5.2rem] leading-[0.86] uppercase sm:text-[7rem] lg:text-[9.5rem]">Latest<br />Trends</p>
      {Array.from({ length: SLICES }).map((_, i) => {
        const top = (i / SLICES) * 100;
        const bottom = 100 - ((i + 1) / SLICES) * 100;
        return (
          <p
            key={i}
            aria-hidden
            className="lt-slice absolute inset-0 font-display text-[5.2rem] leading-[0.86] uppercase sm:text-[7rem] lg:text-[9.5rem]"
            style={{ clipPath: `inset(${top}% -5% ${bottom}% -5%)` }}
          >
            Latest<br />Trends
          </p>
        );
      })}
    </div>
  );
}

export default function LatestTrends() {
  const root = useRef<HTMLElement>(null);
  const [order, setOrder] = useState(STACK.map((_, i) => i));
  const busy = useRef(false);

  useGSAP(
    () => {
      const slices = gsap.utils.toArray<HTMLElement>(".lt-slice");
      gsap.from(slices, {
        xPercent: (i) => (i % 2 ? 60 : -60),
        opacity: 0,
        duration: 1.4,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(slices, {
        xPercent: (i) => (i % 2 ? 1 : -1) * (8 + i * 4),
        opacity: (i) => 1 - i * 0.1,
        color: (i) => (i % 3 === 0 ? "#7a0f2e" : "#1b1414"),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top -15%", end: "bottom top", scrub: true },
      });
      gsap.from(".lt-range li", { x: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".lt-range", start: "top 85%" } });
    },
    { scope: root },
  );

  const cycle = (dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    const cards = root.current!.querySelectorAll<HTMLElement>(".lt-card");
    const top = cards[order[0]];
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(top, { clearProps: "transform,zIndex,transition" });
        setOrder((o) => (dir === 1 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
        busy.current = false;
      },
    });
    tl.set(top, { transition: "none" })
      .to(top, { xPercent: dir * 120, rotate: dir * 14, duration: 0.45, ease: "power2.in" })
      .set(top, { zIndex: 0 })
      .to(top, { xPercent: 0, rotate: 0, duration: 0.5, ease: "power3.out" });
  };

  return (
    <section ref={root} data-bend className="relative z-10 overflow-x-clip bg-ivory px-5 pt-20 pb-16 md:px-14 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,.8fr)] lg:gap-10">
        <div>
          <span className="inline-block rounded-full border border-black/15 px-4 py-1.5 text-[0.65rem]">Explore Collection</span>
          <div className="mt-5"><SlicedWord /></div>
          <a href={waLink("Hi Aval Mantra! Show me the latest trends.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-[0.65rem] font-bold tracking-[0.15em] text-ivory uppercase transition hover:bg-wine">
            Discover now <Arrow className="size-3" />
          </a>
          <h3 className="mt-10 font-serif text-2xl">The Pastel Palette</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Blush pink, sage, powder blue and butter yellow — soft pastels in featherlight organza and tissue, finished with scalloped borders and hand-painted florals.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="eyebrow text-[0.6rem] text-muted">Shot on location</p>
          <div className="relative mt-8 aspect-[3/3.6] w-[78%] max-w-[380px]">
            {STACK.map((s, i) => {
              const pos = order.indexOf(i);
              return (
                <div
                  key={s}
                  className="lt-card absolute inset-0 overflow-hidden rounded-md bg-cream shadow-[0_30px_50px_-25px_rgba(0,0,0,.5)] transition-transform duration-700"
                  style={{
                    zIndex: STACK.length - pos,
                    transform: `translate(${pos * 14}px, ${pos * -10}px) rotate(${pos * 3}deg) scale(${1 - pos * 0.04})`,
                  }}
                >
                  <Image src={img(s)} alt="Latest trend" fill sizes="(max-width:768px) 78vw, 380px" className="object-cover" />
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-5 text-xs">
            <button onClick={() => cycle(-1)} aria-label="Previous" className="grid size-9 place-items-center rounded-full border border-black/15 hover:bg-ink hover:text-ivory"><Chevron dir="left" /></button>
            <span className="tabular-nums">{order[0] + 1} / {STACK.length}</span>
            <button onClick={() => cycle(1)} aria-label="Next" className="grid size-9 place-items-center rounded-full border border-black/15 hover:bg-ink hover:text-ivory"><Chevron /></button>
          </div>
        </div>

        <div className="lg:pt-24">
          <h3 className="font-serif text-3xl">Explore The Range</h3>
          <ul className="lt-range mt-5">
            {RANGE.map((r) => (
              <li key={r.name}>
                <a href={waLink(`Hi Aval Mantra! Please show me your ${r.name} sarees.`)} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-black/10 py-4 text-sm">
                  <span className="transition-transform duration-500 group-hover:translate-x-2 group-hover:text-maroon">{r.name}</span>
                  <span className="text-xs text-muted">{r.count} Sarees</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { formatINR, img, productMessage } from "@/lib/site";
import { Arrow } from "./Icons";

const CARDS = [
  { name: "Tara Peacock Organza", sub: "Organza · Hand-painted pallu", price: 6400, image: "peacock-silk" },
  { name: "Aaranya Sage Tissue", sub: "Tissue silk · Zari checks", price: 8900, image: "sage-silk" },
  { name: "Ruhani Rose Party Saree", sub: "Soft silk · Stone work", price: 7200, image: "kanjivaram-pink" },
  { name: "Saanjh Coral Tissue", sub: "Tissue · Zari border", price: 6800, image: "sea-banarasi" },
  { name: "Padma Garden Georgette", sub: "Georgette · Floral pallu", price: 4800, image: "pink-orange-trees" },
  { name: "Leela Blush Net", sub: "Net · Hand embroidery", price: 7800, image: "rose-embroidered" },
  { name: "Mohini Magenta Satin", sub: "Satin silk · Black pallu", price: 4600, image: "magenta-ikat" },
  { name: "Swarna Butter Chanderi", sub: "Chanderi · Mustard border", price: 3900, image: "ivory-yellow" },
  { name: "Kesari Golden Organza", sub: "Organza · Hand-painted florals", price: 5600, image: "golden-hour" },
];

// Two copies so the curved wall can loop endlessly.
const LOOP = [...CARDS, ...CARDS];

export default function Signatures() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Cards sit on the inside of a cylinder ("C" curve): centre cards far and small, edge cards near, larger and lower.
  // Positions are computed (no layout reads) and only transforms change, so it stays at 60fps.
  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const cards = Array.from(st.querySelectorAll<HTMLElement>(".sg-card"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, step = 0, R = 0, total = 0, sag = 0.3;
    const measure = () => {
      const vw = window.innerWidth;
      w = vw < 768 ? Math.min(vw * 0.44, 200) : Math.min(Math.max(vw * 0.17, 210), 290);
      step = w + (vw < 768 ? 6 : 5);
      R = vw < 768 ? Math.max(vw * 1.05, 380) : Math.max(vw * 1.02, 1100);
      total = step * cards.length;
      sag = vw < 768 ? 0.25 : 0.32; // nearer (edge) cards drop lower -> the row reads as a "C" arc
      cards.forEach((c) => {
        c.style.width = `${w}px`;
        c.style.marginLeft = `${-w / 2}px`;
      });
      st.style.height = `${w * 1.43 * (vw < 768 ? 1.3 : 1.45)}px`;
    };
    measure();

    let target = 0, current = 0, drift = 0;
    let visible = false;
    let dragging = false, lastX = 0, moved = 0;

    const render = () => {
      const scrollPart = window.scrollY * 0.55;
      target = scrollPart + drift;
      current += (target - current) * (dragging ? 0.35 : 0.08);
      cards.forEach((c, i) => {
        let sArc = (((i * step - current) % total) + total) % total;
        sArc -= total / 2;
        const th = sArc / R;
        if (Math.abs(th) > 1.05) {
          c.style.visibility = "hidden";
          return;
        }
        const x = R * Math.sin(th);
        const z = R * (1 - Math.cos(th));
        c.style.visibility = "visible";
        c.style.transform = `translate3d(${x.toFixed(1)}px,${(z * sag).toFixed(1)}px,${z.toFixed(1)}px) rotateY(${(-th * 57.2958).toFixed(2)}deg)`;
      });
    };

    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      if (!dragging && !reduce) drift += dt * 0.022; // slow ambient drift
      render();
    };
    gsap.ticker.add(tick);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "200px" });
    io.observe(st);

    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; moved = 0;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      drift -= dx * 1.1;
    };
    const up = () => { dragging = false; };
    const click = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    st.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    st.addEventListener("click", click, true);
    window.addEventListener("resize", measure);
    render();

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      st.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      st.removeEventListener("click", click, true);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".sg-head > *", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.from(".sg-stage", { opacity: 0, y: 60, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    },
    { scope: root },
  );

  return (
    <section id="signatures" ref={root} className="overflow-hidden pt-16 pb-10 md:pt-20 md:pb-16">
      <div className="sg-head flex w-full flex-col gap-3 px-5 md:flex-row md:items-end md:justify-between md:px-14">
        <div>
          <p className="eyebrow text-[0.6rem] text-maroon">The Aval Mantra Boutique Edit</p>
          <h2 className="mt-3 font-serif text-4xl leading-none font-light md:text-[3.4rem]">
            Chosen to Be <span className="ml-2 font-script text-5xl text-gold md:text-[4rem]">Remembered</span>
          </h2>
        </div>
        <a href="#arrivals" className="eyebrow flex items-center gap-2 text-[0.6rem] text-ink/70 hover:text-maroon">
          Explore the edit <Arrow />
        </a>
      </div>

      <div
        ref={stage}
        className="sg-stage relative mt-6 cursor-grab touch-pan-y select-none active:cursor-grabbing md:mt-8"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 8%", transformStyle: "preserve-3d" }}
      >
        {LOOP.map((c, i) => (
          <a
            key={i}
            href={productMessage(c)}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            aria-hidden={i >= CARDS.length}
            tabIndex={i >= CARDS.length ? -1 : undefined}
            className="sg-card group absolute top-0 left-1/2 block aspect-[3/4.3] overflow-hidden rounded-[3px] bg-cream shadow-[0_18px_40px_-22px_rgba(0,0,0,.55)]"
            style={{ willChange: "transform", backfaceVisibility: "hidden", visibility: "hidden" }}
          >
            <Image src={img(c.image)} alt={c.name} fill draggable={false} sizes="(max-width:768px) 62vw, 290px" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-ivory md:p-5">
              <p className="eyebrow text-[0.5rem] text-ivory/75">{c.sub}</p>
              <h3 className="mt-1.5 font-serif text-xl leading-tight md:text-[1.45rem]">{c.name}</h3>
              <p className="mt-1.5 text-[0.7rem]">{formatINR(c.price)}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LOGO_PARTS } from "./logoParts";

const INK = "#111111";
const GOLD = "#b8903f";
const BG = "#fbfaf7";
const VB = "188 132 3129 1045"; // same box as /brand/aval-mantra-mark.svg, so the photo mask lines up exactly
const MARK = "/brand/aval-mantra-mark.svg";
const MARK_RATIO = 3129 / 1045;
const IVORY = "#f7f3ee";

function Part({ html, className }: { html: string; className?: string }) {
  return <g className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Quiet luxury intro with a seamless hand-off to the hero:
 * gold feather "eyes" drift in and settle → ink blooms outward from them to reveal the peacock →
 * letters come into focus one by one → lotus blooms →
 * the white background fades away to the hero while the logo shrinks and glides into the header's
 * logo spot (turning ivory on the way) → the header fades in around it, so the logo simply stays.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      document.documentElement.dataset.loading = "1";
      window.scrollTo(0, 0);
      const q = gsap.utils.selector(root);

      // Ink bloom: each soft circle is centred on a feather "eye" and grows until the peacock and swoosh are revealed.
      const eyes = q(".lx-eye") as unknown as SVGGraphicsElement[];
      const inks = q(".lx-ink") as unknown as SVGCircleElement[];
      eyes.forEach((e, i) => {
        const b = e.getBBox();
        inks[i]?.setAttribute("cx", String(b.x + b.width / 2));
        inks[i]?.setAttribute("cy", String(b.y + b.height / 2));
      });
      gsap.set(inks, { attr: { r: 0 } });
      gsap.set(eyes, {
        x: (i: number) => [-260, -140, 120, 260, -60][i % 5],
        y: (i: number) => [-320, 260, -380, 200, 360][i % 5],
        rotate: (i: number) => [-40, 30, 60, -25, 15][i % 5],
        scale: 0.4,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(q(".lx-head"), { opacity: 0, y: 40 });
      gsap.set(q(".lx-letter"), { opacity: 0, y: 30, filter: "blur(10px)" });
      gsap.set(q(".lx-petal"), { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" });

      // Where the header logo sits once the header has settled (it waits 14px higher while loading).
      const target = () => {
        const el = document.querySelector('header a[aria-label="Aval Mantra home"] [role="img"]');
        const r = el?.getBoundingClientRect();
        if (!r || !r.width) return null;
        const h = r.height, w = h * MARK_RATIO; // mask is "contain": height-limited
        return { cx: r.left + r.width / 2, cy: r.top + 14 + h / 2, h, w };
      };
      const wrap = q(".lx-wrap")[0] as HTMLElement;
      const fly = { x: 0, y: 0, s: 1 };
      const computeFly = () => {
        const t = target();
        const r = wrap.getBoundingClientRect();
        if (!t) return;
        fly.x = t.cx - (r.left + r.width / 2);
        fly.y = t.cy - (r.top + r.height / 2);
        fly.s = t.h / r.height;
      };

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => setDone(true),
      });

      tl
        // 1. feathers drift in and settle into the peacock's tail
        .to(eyes, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.3, stagger: 0.09, ease: "expo.out" }, 0)
        // 2. ink blooms outward from the feathers, revealing the peacock and swoosh
        .to(inks, { attr: { r: 3400 }, duration: 1.8, stagger: 0.08, ease: "power2.inOut" }, 0.55)
        .to(q(".lx-head"), { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.9)
        // 3. letters come into focus one by one
        .to(q(".lx-letter"), { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.07, ease: "expo.out" }, 1.1)
        // 4. lotus blooms
        .to(q(".lx-petal"), { opacity: 1, scale: 1, duration: 1, stagger: { each: 0.07, from: "center" }, ease: "back.out(1.6)" }, 1.7)
        // 5. white fades to the hero while the logo glides into the header's logo spot
        .add(() => {
          computeFly();
          window.dispatchEvent(new Event("am:loaded"));
          if (root.current) root.current.style.pointerEvents = "none";
        }, 2.9)
        .to(root.current, { backgroundColor: "rgba(251,250,247,0)", duration: 1.3, ease: "power2.inOut" }, 2.9)
        .to(q(".lx-logo"), { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 2.9)
        .to(q(".lx-mono"), { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 2.9)
        .to(q(".lx-mono"), { color: IVORY, duration: 1.1, ease: "power2.inOut" }, 3.05)
        .to(wrap, { x: () => fly.x, y: () => fly.y, scale: () => fly.s, duration: 1.35, ease: "expo.inOut" }, 2.9)
        // 6. header fades in around the logo, then the loader's copy steps aside
        .add(() => {
          delete document.documentElement.dataset.loading;
          window.__lenis?.start();
        }, 4.25)
        .to(q(".lx-mono"), { opacity: 0, duration: 0.9, ease: "power1.inOut" }, 4.3);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.timeScale(3);

      let cancelled = false;
      const hero = new Image();
      hero.src = window.matchMedia("(max-width: 767px)").matches ? "/media/img/hero-mobile.webp" : "/media/img/hero-desktop.webp";
      Promise.race([
        Promise.all([document.fonts.ready, hero.decode().catch(() => {})]),
        new Promise((r) => setTimeout(r, 2500)),
      ]).then(() => requestAnimationFrame(() => { if (!cancelled) tl.play(); }));
      return () => { cancelled = true; };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden" style={{ backgroundColor: BG }} aria-hidden>
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
          <div className="lx-wrap relative will-change-transform">
          <svg viewBox={VB} className="lx-logo block w-[70vw] max-w-[460px] overflow-visible" fill={INK}>
            <defs>
              <radialGradient id="lx-soft">
                <stop offset="0.72" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="lx-ink-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="3600" height="1400">
                {LOGO_PARTS.eyes.map((_, i) => <circle key={i} className="lx-ink" r="0" fill="url(#lx-soft)" />)}
              </mask>
            </defs>
            <g mask="url(#lx-ink-mask)">
              <Part html={LOGO_PARTS.body} />
            </g>
            <Part html={LOGO_PARTS.head} className="lx-head" />
            {LOGO_PARTS.letters.map((h, i) => <Part key={i} html={h} className="lx-letter" />)}
            <g fill={GOLD}>
              {LOGO_PARTS.eyes.map((h, i) => <Part key={i} html={h} className="lx-eye" />)}
              {LOGO_PARTS.petals.map((h, i) => <Part key={i} html={h} className="lx-petal" />)}
            </g>
          </svg>
          {/* single-colour copy used for the flight to the header (matches the header logo exactly) */}
          <span
            className="lx-mono absolute inset-0 bg-current opacity-0"
            style={{ color: INK, mask: `url(${MARK}) center / contain no-repeat`, WebkitMask: `url(${MARK}) center / contain no-repeat` }}
          />
          </div>
        </div>
      </div>
      <style>{`.lm-hole{fill:${BG}}`}</style>
    </div>
  );
}

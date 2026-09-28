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
// Thickest solid point of the logo (the peacock's body), as a fraction of the logo box: the camera dives here.
const DIVE = { x: 0.1323, y: 0.2708, radius: 56 / 3129 };

function Part({ html, className }: { html: string; className?: string }) {
  return <g className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Quiet luxury intro with a seamless hand-off to the hero:
 * gold feather "eyes" drift in and settle → ink blooms outward from them to reveal the peacock →
 * letters come into focus one by one → lotus blooms → gold hairline draws beneath it →
 * the hero photo fills the logo's shape → the camera dives into the peacock until the photo fills
 * the screen (framed exactly like the hero) → loader is removed on the same frame, so the hero continues.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      document.documentElement.dataset.loading = "1";
      window.scrollTo(0, 0);
      const q = gsap.utils.selector(root);
      const line = q(".lx-line")[0] as HTMLElement;

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
      gsap.set(line, { scaleX: 0 });
      gsap.set(q(".lx-tag"), { opacity: 0, letterSpacing: "0.5em" });
      gsap.set(q(".lx-img"), { scale: 1.3 });

      // Photo-through-logo mask, positioned exactly over the drawn logo and zoomed around DIVE.
      const through = q(".lx-through")[0] as HTMLElement;
      const box = { x: 0, y: 0, w: 0, h: 0 };
      const dive = { s: 1 };
      const applyMask = () => {
        const px = box.x + box.w * DIVE.x, py = box.y + box.h * DIVE.y;
        const size = `${box.w * dive.s}px ${box.h * dive.s}px`;
        const pos = `${px - (px - box.x) * dive.s}px ${py - (py - box.y) * dive.s}px`;
        through.style.maskSize = size; through.style.webkitMaskSize = size;
        through.style.maskPosition = pos; through.style.webkitMaskPosition = pos;
      };
      const alignMask = () => {
        const r = (q(".lx-logo")[0] as Element).getBoundingClientRect();
        Object.assign(box, { x: r.left, y: r.top, w: r.width, h: r.height });
        applyMask();
      };
      // zoom until the peacock's body is wider than the screen
      const maxZoom = () => (Math.hypot(window.innerWidth, window.innerHeight) / (box.w * DIVE.radius)) * 0.6;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          delete document.documentElement.dataset.loading;
          window.__lenis?.start();
          setDone(true);
        },
      });

      tl
        // 1. feathers drift in and settle into the peacock's tail
        .to(eyes, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.3, stagger: 0.09, ease: "expo.out" }, 0)
        // 2. ink blooms outward from the feathers, revealing the peacock and swoosh
        .to(inks, { attr: { r: 3400 }, duration: 1.8, stagger: 0.08, ease: "power2.inOut" }, 0.55)
        .to(q(".lx-head"), { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.9)
        // 3. letters come into focus one by one
        .to(q(".lx-letter"), { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.07, ease: "expo.out" }, 1.1)
        // 4. lotus blooms, hairline and tagline
        .to(q(".lx-petal"), { opacity: 1, scale: 1, duration: 1, stagger: { each: 0.07, from: "center" }, ease: "back.out(1.6)" }, 1.7)
        .to(line, { scaleX: 1, duration: 1.1, ease: "expo.inOut" }, 1.9)
        .to(q(".lx-tag"), { opacity: 1, letterSpacing: "0.38em", duration: 1.2 }, 2.1)
        // 5. the photo fills the logo: the black mark fades into the hero photo seen through the logo shape
        .add(alignMask, 2.9)
        .to(q(".lx-line, .lx-tag"), { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 3.0)
        .to(q(".lx-through"), { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 3.0)
        .to(q(".lx-logo"), { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 3.05)
        // 6. dive into the peacock until the photo fills the screen
        .to(dive, { s: () => maxZoom(), duration: 1.7, ease: "power3.in", onUpdate: applyMask }, 4.0)
        .to(q(".lx-full"), { opacity: 1, duration: 0.45, ease: "power1.in" }, 5.25)
        .to(q(".lx-img"), { scale: 1.12, duration: 1.7, ease: "power2.inOut" }, 4.0) // hero starts at 1.12
        .add(() => window.dispatchEvent(new Event("am:loaded")), 5.7);

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
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden" style={{ background: BG }} aria-hidden>
      {/* hero photo seen through the logo shape (framed identically to <Hero />) */}
      <div
        className="lx-through absolute inset-0 bg-night opacity-0"
        style={{ maskImage: `url(${MARK})`, WebkitMaskImage: `url(${MARK})`, maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/img/hero-mobile.webp" />
          <img src="/media/img/hero-desktop.webp" alt="" className="lx-img h-full w-full object-cover object-[50%_30%] will-change-transform md:object-[65%_40%]" />
        </picture>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      {/* unmasked copy that takes over at the end of the dive */}
      <div className="lx-full absolute inset-0 bg-night opacity-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/img/hero-mobile.webp" />
          <img src="/media/img/hero-desktop.webp" alt="" className="lx-img h-full w-full object-cover object-[50%_30%] will-change-transform md:object-[65%_40%]" />
        </picture>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
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
          <span className="lx-line mt-6 block h-px w-28 origin-center md:mt-8 md:w-40" style={{ background: GOLD }} />
          <p className="lx-tag mt-4 font-sans text-[0.58rem] font-medium text-ink/55 uppercase md:mt-5 md:text-[0.62rem]">
            Boutique Sarees · Bengaluru
          </p>
        </div>
      </div>
      <style>{`.lm-hole{fill:${BG}}`}</style>
    </div>
  );
}

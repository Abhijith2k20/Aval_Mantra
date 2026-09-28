"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Arrow, Close, Leaf, Play, Return, Truck } from "./Icons";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [story, setStory] = useState(false);

  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true });
      intro
        .fromTo(".h-media img", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
        .from(".h-line > span", { yPercent: 115, rotate: 3, duration: 1.3, stagger: 0.12, ease: "expo.out" }, 0.1)
        .from(".h-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.35)
        .from(".h-quote span span", { yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" }, 0.9)
        .from(".h-trust", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" }, 1);

      const play = () => intro.play();
      if (document.documentElement.dataset.loading) window.addEventListener("am:loaded", play, { once: true });
      else play();

      return () => window.removeEventListener("am:loaded", play);
    },
    { scope: root },
  );

  return (
    <>
    <section id="top" ref={root} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-night text-ivory">
      <div className="h-media absolute inset-0">
        {/* Portrait photo on phones, landscape on larger screens */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/img/hero-mobile.webp" />
          <img
            src="/media/img/hero-desktop.webp"
            alt="Woman in a red silk saree seated by a temple wall"
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_30%] will-change-transform md:object-[65%_40%]"
          />
        </picture>
      </div>
      <div className="h-shade absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="h-copy relative flex h-full flex-col justify-end px-5 pb-40 md:justify-center md:px-14 md:pt-16 md:pb-0">
        <p className="h-fade eyebrow mb-5 font-bold text-ivory">Boutique sarees · Bengaluru</p>
        <h1 className="font-serif text-[3.25rem] leading-[0.98] font-medium sm:text-6xl lg:text-[4.75rem]">
          <span className="h-line block overflow-hidden pb-1"><span className="inline-block">More</span></span>
          <span className="h-line block overflow-hidden pb-2"><span className="inline-block">Than a Saree</span></span>
        </h1>
        <p className="h-fade eyebrow mt-3 font-bold text-ivory/90">Designer drapes for every you</p>
        <p className="h-fade mt-5 max-w-md text-sm leading-relaxed font-semibold text-ivory md:text-[0.95rem]">
          Organza, georgette, tissue and handpicked silks —
          <br />
          styled for parties, work and every day in between.
        </p>
        <div className="h-fade mt-8 flex flex-wrap items-center gap-5">
          <a
            href="#arrivals"
            onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo("#arrivals", { offset: -60 }); }}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-marigold px-7 text-[0.68rem] font-bold tracking-[0.18em] text-ink uppercase shadow-[0_10px_30px_-10px_rgba(233,192,70,.6)] transition hover:bg-ivory"
          >
            Shop the boutique
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button onClick={() => setStory(true)} className="group flex items-center gap-3 text-left">
            <span className="grid size-11 place-items-center rounded-full border border-ivory/70 bg-black/20 transition group-hover:scale-110 group-hover:bg-ivory group-hover:text-ink">
              <Play />
            </span>
            <span className="eyebrow leading-5 font-bold">Watch<br />our story</span>
          </button>
        </div>
      </div>

      {/* Quote revealed on scroll */}
      <div className="pointer-events-none absolute top-[22%] right-5 hidden md:block max-w-[15rem] text-right font-serif text-xl leading-snug italic md:right-14 md:max-w-md md:text-4xl">
        <p className="h-quote">
          {["Zari catches the light", "the way memory", "catches a moment."].map((l) => (
            <span key={l} className="block overflow-hidden"><span className="block">{l}</span></span>
          ))}
        </p>
      </div>

      {/* Floating trust panel (bottom-left, as in the reference) */}
      <div className="h-trust absolute inset-x-5 bottom-5 overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md md:inset-x-auto md:bottom-8 md:left-14">
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-4 py-3.5 text-[0.66rem] leading-tight font-semibold whitespace-nowrap md:gap-8 md:px-6 md:py-4 md:text-[0.72rem]">
          {[
            { Icon: Leaf, a: "Handpicked", b: "designer pieces" },
            { Icon: Truck, a: "Free Shipping", b: "Across India" },
            { Icon: Return, a: "Easy Returns", b: "within 7 days" },
          ].map(({ Icon, a, b }) => (
            <span key={a} className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20"><Icon className="size-4 text-marigold" /></span>
              <span>{a}<br /><span className="font-medium text-ivory/75">{b}</span></span>
            </span>
          ))}
        </div>
      </div>

    </section>
      {story && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4" onClick={() => setStory(false)}>
          <button aria-label="Close" className="absolute top-5 right-5 text-ivory"><Close /></button>
          <video src="/media/video/story-film.mp4" autoPlay controls playsInline className="max-h-[80vh] w-full max-w-4xl rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

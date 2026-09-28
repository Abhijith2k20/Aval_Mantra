"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { looks } from "@/lib/products";
import { formatINR, img, waLink } from "@/lib/site";
import { Arrow, Chevron, Expand, Heart, Play, Share, Sparkle, Star, WhatsApp } from "./Icons";

const SIZES = ["S", "M", "L", "XL", "2XL"];

export default function ChangeLook() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const busy = useRef(false);
  const touched = useRef(false);
  const [shownPrice, setShownPrice] = useState(looks[0].price);
  const look = looks[idx];

  const go = useCallback(
    (next: number, dir = 1, user = true) => {
      if (busy.current || next === idx) return;
      if (user) touched.current = true;
      busy.current = true;
      const q = gsap.utils.selector(root);
      const models = q(".cl-model");
      const tl = gsap.timeline({ onComplete: () => { busy.current = false; } });
      tl.to(models[idx], { xPercent: -dir * 18, opacity: 0, scale: 0.94, filter: "blur(10px)", duration: 0.7, ease: "power3.in" }, 0)
        .fromTo(models[next], { xPercent: dir * 22, opacity: 0, scale: 1.04, filter: "blur(10px)" }, { xPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out" }, 0.45)
        .to(q(".cl-arc"), { rotate: `+=${dir * 72}`, duration: 1.6, ease: "expo.inOut" }, 0)
        .to(q(".cl-glow"), { backgroundColor: looks[next].swatch, duration: 1.2 }, 0.2)
        .to(q(".cl-swap"), { yPercent: -100, opacity: 0, duration: 0.4, stagger: 0.04, ease: "power3.in", overwrite: true }, 0)
        .add(() => setIdx(next), 0.62);
      const pv = { v: looks[idx].price };
      tl.to(pv, { v: looks[next].price, duration: 1, ease: "power2.out", onUpdate: () => setShownPrice(Math.round(pv.v / 10) * 10) }, 0.62);
    },
    [idx],
  );

  // Animate the new text in after each change.
  useEffect(() => {
    const q = gsap.utils.selector(root);
    gsap.fromTo(q(".cl-swap"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "expo.out", overwrite: true });
    gsap.fromTo(q(".cl-wm"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.4, ease: "expo.out" });
  }, [idx]);


  
  // Autoplay while visible until the visitor interacts.
  useEffect(() => {
    let visible = false;
    
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 60%", end: "bottom 40%", onToggle: (s) => { visible = s.isActive; } });
    const id = setInterval(() => {
      if (visible && !touched.current) go((idx + 1) % looks.length, 1, false);
    }, 5200);
    return () => { clearInterval(id); st.kill(); };
  }, [go, idx]);

  useGSAP(
    () => {
      gsap.from(".cl-stage", { y: 80, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
      gsap.from(".cl-thumb", { x: -40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".cl-thumb", start: "top 92%", once: true } });
      gsap.from(".cl-cta", { rotate: -40, scale: 0.6, opacity: 0, duration: 1.4, ease: "elastic.out(1,0.6)", scrollTrigger: { trigger: root.current, start: "top 40%" } });
    },
    { scope: root },
  );

  const order = waLink(
    `Hi Aval Mantra! I'd like to order *${look.name.join(" ")}* (${formatINR(look.price)}) — blouse size ${size}, quantity ${qty}.`,
  );

  return (
    <section ref={root} data-bend className="relative z-10 overflow-x-clip bg-[#f3efea] py-16 md:py-20">
      {/* collection strip from reference */}
      <div className="mx-auto mb-10 flex max-w-[1400px] items-end justify-between px-5 md:px-14">
        <div>
          <p className="eyebrow text-muted">The lookbook</p>
          <h2 className="mt-2 font-serif text-4xl leading-none font-light md:text-6xl">
            Find Your <span className="font-script text-gold">Drape</span>
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted md:block">Three drapes. One muse. Tap a look to see how each weave falls, flows and catches the light.</p>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 md:px-14 lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,470px)] lg:gap-10">
        {/* Thumbnails */}
        <div className="order-2 lg:order-1">
          <p className="font-hand text-2xl text-ink/80">Change look ↓</p>
          <div className="mt-3 flex gap-3 lg:flex-col lg:gap-5">
            {looks.map((l, i) => (
              <div key={l.id} className="cl-thumb w-20 lg:w-full">
              <button
                onClick={() => go(i, i > idx ? 1 : -1)}
                aria-label={`Show ${l.name.join(" ")}`}
                className={`relative block aspect-[3/4.2] w-full overflow-hidden rounded-[6px] transition-[opacity,box-shadow,background-color] duration-500 ${
                  i === idx
                    ? "bg-white/70 shadow-[0_0_0_1.5px_#f0b6c4,0_12px_30px_-8px_rgba(232,120,150,.55)]"
                    : "bg-transparent opacity-80 drop-shadow-[0_8px_14px_rgba(232,120,150,.35)] hover:opacity-100"
                }`}
              >
                <Image src={l.image} alt="" fill sizes="150px" className="object-contain p-1" />
              </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div className="cl-stage relative order-1 h-[64svh] min-h-[440px] lg:order-2 lg:h-[78vh] lg:max-h-[760px]">
          <div className="cl-glow absolute top-1/2 left-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: looks[0].swatch }} />
          <svg className="cl-arc absolute top-1/2 left-1/2 aspect-square w-[92%] max-w-[640px] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="96" fill="none" stroke="#1b1414" strokeOpacity=".18" strokeWidth=".4" strokeDasharray="120 40 60 30" />
            <circle cx="100" cy="4" r="2.2" fill="#7a0f2e" />
            <circle cx="4" cy="100" r="1.4" fill="#c9a24a" />
          </svg>
          <p className="cl-wm pointer-events-none absolute top-[30%] left-1/2 -translate-x-1/2 font-script text-[7rem] whitespace-nowrap text-ink/[0.06] md:text-[11rem]">
            {look.watermark}
          </p>

          {looks.map((l, i) => (
            <div key={l.id} className="cl-model absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
              <Image src={l.image} alt={l.name.join(" ")} fill loading="eager" sizes="(max-width:1024px) 90vw, 40vw" className="object-contain object-bottom drop-shadow-[0_30px_30px_rgba(0,0,0,.18)]" />
            </div>
          ))}

          <button onClick={() => go((idx + looks.length - 1) % looks.length, -1)} aria-label="Previous look" className="absolute top-1/2 left-0 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 shadow backdrop-blur transition hover:scale-110 md:left-4"><Chevron dir="left" /></button>
          <button onClick={() => go((idx + 1) % looks.length, 1)} aria-label="Next look" className="absolute top-1/2 right-0 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 shadow backdrop-blur transition hover:scale-110 md:right-4"><Chevron /></button>
          <button aria-label="Expand" className="absolute top-4 right-4 hidden size-9 place-items-center rounded-full bg-white/70 lg:grid"><Expand /></button>

          <p className="absolute bottom-16 left-0 -rotate-6 font-hand text-2xl text-ink/80 md:left-6 md:text-3xl">New in ↗</p>
          <a href={waLink("Hi Aval Mantra! Please share your latest lookbook.")} target="_blank" rel="noreferrer" className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 py-1.5 pr-2 pl-1.5 shadow-lg backdrop-blur">
            <span className="grid size-8 place-items-center rounded-full bg-maroon text-ivory"><Play className="size-3" /></span>
            <span className="text-xs whitespace-nowrap">Watch lookbook</span>
            <span className="flex -space-x-2">
              {["red-organza", "rose-embroidered", "kanjivaram-pink"].map((s) => (
                <span key={s} className="relative size-7 overflow-hidden rounded-full border-2 border-white"><Image src={img(s)} alt="" fill sizes="28px" className="object-cover" /></span>
              ))}
            </span>
          </a>
        </div>

        {/* Details */}
        <div className="order-3 flex flex-col lg:pt-10">
          <p className="text-xs text-muted">Shop all sarees ▾</p>
          <p className="mt-4 flex items-center gap-1 text-xs text-marigold">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
            <span className="ml-1 text-ink">{look.rating}</span>
            <span className="text-muted">({look.reviews} Reviews)</span>
          </p>
          <h3 className="mt-3 font-serif text-4xl leading-[1.02] uppercase md:text-5xl">
            {look.name.map((n) => (
              <span key={n} className="block overflow-hidden"><span className="cl-swap block">{n}</span></span>
            ))}
          </h3>
          <p className="mt-3 overflow-hidden text-xl font-semibold"><span className="cl-swap block">{formatINR(shownPrice)}</span></p>
          <p className="mt-4 overflow-hidden text-sm leading-relaxed text-muted"><span className="cl-swap block">{look.description}</span></p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-black/10 py-4 sm:grid-cols-4">
            {look.features.map((f) => (
              <span key={f} className="flex items-center gap-2 text-[0.68rem] leading-tight text-ink/80"><Sparkle className="size-4 shrink-0 text-gold" />{f}</span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="eyebrow text-[0.6rem]">Select blouse size</p>
            <button className="text-[0.65rem] text-muted underline">Size guide</button>
          </div>
          <div className="mt-3 flex gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`h-10 flex-1 rounded-md border text-xs transition ${s === size ? "border-ink bg-white shadow-[0_0_0_1px_#1b1414]" : "border-transparent text-muted hover:border-black/20"}`}>{s}</button>
            ))}
          </div>

          <p className="eyebrow mt-5 text-[0.6rem]">Select colour: <span className="text-muted">{look.watermark}</span></p>
          <div className="mt-3 flex items-center gap-3">
            {looks.map((l, i) => (
              <button key={l.id} onClick={() => go(i, i > idx ? 1 : -1)} aria-label={l.watermark} className={`size-12 rounded-[5px] transition ${i === idx ? "ring-2 ring-ink/70 ring-offset-2 ring-offset-[#f3efea]" : "hover:scale-105"}`} style={{ background: l.swatch }} />
            ))}
            <div className="ml-auto flex items-center rounded-full border border-black/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2" aria-label="Decrease">−</button>
              <span className="w-6 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2" aria-label="Increase">+</button>
            </div>
          </div>

          {/* Curved CTA (desktop) */}
          <div className="relative mt-6 hidden h-44 lg:block">
            <a href={order} target="_blank" rel="noreferrer" className="cl-cta group absolute -right-8 bottom-2 block w-[410px]" aria-label="Order on WhatsApp">
              <svg viewBox="0 0 380 150" className="w-full drop-shadow-[0_20px_30px_rgba(122,15,46,.35)]">
                <path id="cta-curve" d="M30,120 Q190,-10 350,60" fill="none" stroke="#7a0f2e" strokeWidth="74" strokeLinecap="round" className="transition-[stroke] duration-500 group-hover:stroke-[#4a0a1c]" />
                <path id="cta-text" d="M52,118 Q190,8 330,66" fill="none" />
                <text className="fill-ivory font-sans text-[17px] font-bold tracking-[0.16em]">
                  <textPath href="#cta-text" startOffset="8%">ORDER ON WHATSAPP</textPath>
                </text>
              </svg>
              <span className="absolute top-[18px] right-[8px] grid size-14 place-items-center rounded-full border-4 border-maroon bg-ivory text-maroon transition-transform duration-500 group-hover:rotate-[-45deg]">
                <Arrow className="size-5" />
              </span>
            </a>
            <div className="absolute bottom-0 left-0 flex gap-3">
              <button onClick={() => setLiked((v) => !v)} aria-label="Wishlist" className={`grid size-11 place-items-center rounded-full bg-white shadow ${liked ? "text-maroon" : ""}`}><Heart className="size-4" filled={liked} /></button>
              <button aria-label="Share" className="grid size-11 place-items-center rounded-full bg-white shadow"><Share /></button>
            </div>
          </div>

          {/* Mobile CTA */}
          <a href={order} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-between rounded-full bg-maroon py-2 pr-2 pl-6 text-ivory lg:hidden">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em]"><WhatsApp className="size-4" /> ORDER ON WHATSAPP</span>
            <span className="grid size-11 place-items-center rounded-full bg-ivory text-maroon"><Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

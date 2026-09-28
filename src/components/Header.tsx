"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { Bag, Close, Heart, Menu, Search, User, WhatsApp } from "./Icons";
import { waLink } from "@/lib/site";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "New In", href: "#arrivals" },
  { label: "Boutique", href: "#signatures" },
  { label: "Silk", href: "#silk" },
  { label: "Occasion", href: "#edits" },
];

function scrollToHash(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.85);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = drawer.current;
    if (!el) return;
    if (open) {
      window.__lenis?.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.9, ease: "power3.inOut" });
      gsap.fromTo(el.querySelectorAll(".dl"), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, delay: 0.3, duration: 0.8, ease: "expo.out" });
    } else if (el.style.display === "flex") {
      window.__lenis?.start();
      gsap.to(el, { clipPath: "circle(0% at 92% 4%)", duration: 0.6, ease: "power3.inOut", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  const light = !solid;

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        {/* Announcement bar */}
        <div className="relative flex h-9 items-center justify-center overflow-hidden bg-plum text-[0.66rem] font-bold tracking-[0.18em] text-ivory uppercase md:h-10">
          <div className="hidden items-center gap-5 sm:flex">
            <span>✦ New Drop</span>
            <span className="h-3.5 w-px bg-ivory/30" />
            <span className="rounded-[3px] bg-marigold px-3 py-1 text-ink">Up to 45% off</span>
            <span className="h-3.5 w-px bg-ivory/30" />
            <span>Free shipping all over India ✦</span>
          </div>
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap sm:hidden">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-10">
                <span>✦ New Drop</span>
                <span className="text-marigold">Up to 45% off</span>
                <span>Free shipping all over India</span>
                <span>✦ Order on WhatsApp</span>
              </div>
            ))}
          </div>
          <div className="absolute right-6 hidden gap-5 opacity-85 lg:flex">
            <span>INR ▾</span>
            <span>EN ▾</span>
          </div>
        </div>

        {/* Main nav */}
        <div
          className={`transition-colors duration-500 ${
            solid ? "bg-ivory text-ink shadow-[0_1px_0_rgba(0,0,0,.06)]" : "bg-gradient-to-b from-black/35 to-transparent text-ivory"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 md:h-20 md:px-14">
            <a href="#top" onClick={(e) => { e.preventDefault(); scrollToHash("#top"); }} aria-label="Aval Mantra home">
              <Logo tone={light ? "light" : "dark"} />
            </a>

            <nav className="hidden items-center gap-9 lg:flex">
              {NAV.map((n, i) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => { e.preventDefault(); scrollToHash(n.href); }}
                  className="group relative text-[0.84rem] font-semibold tracking-wide"
                >
                  {n.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ${i === 0 ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-5">
              <label className={`hidden items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-5 xl:flex ${light ? "border-white/25 bg-white/10" : "border-black/10 bg-white/70"}`}>
                <input
                  placeholder="Search organza, georgette, silk…"
                  className="w-60 bg-transparent text-xs outline-none placeholder:text-current placeholder:opacity-70"
                />
                <span className={`grid size-8 place-items-center rounded-full ${light ? "bg-white/15" : "bg-black/5"}`}>
                  <Search className="size-4" />
                </span>
              </label>
              <button aria-label="Search" className="xl:hidden"><Search /></button>
              <button aria-label="Wishlist" className="hidden sm:block"><Heart /></button>
              <a href={waLink("Hi Aval Mantra! I'd like help with my order.")} target="_blank" rel="noreferrer" aria-label="Account" className="hidden sm:block"><User /></a>
              <a href={waLink("Hi Aval Mantra! I'd like to know more about your sarees.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="relative">
                <Bag />
                <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-marigold text-[0.55rem] font-bold text-ink">
                  <WhatsApp className="size-2.5" />
                </span>
              </a>
              <button aria-label="Open menu" className="lg:hidden" onClick={() => setOpen(true)}>
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div ref={drawer} className="fixed inset-0 z-[60] hidden flex-col bg-maroon px-6 pt-6 pb-10 text-ivory" style={{ clipPath: "circle(0% at 92% 4%)" }}>
        <div className="flex items-center justify-between">
          <Logo />
          <button aria-label="Close menu" onClick={() => setOpen(false)}><Close /></button>
        </div>
        <nav className="mt-14 flex flex-col gap-3">
          {NAV.map((n, i) => (
            <div key={n.label} className="overflow-hidden">
              <a
                href={n.href}
                onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToHash(n.href), 450); }}
                className="dl flex items-baseline gap-4 font-serif text-5xl"
              >
                <span className="font-sans text-xs opacity-50">0{i + 1}</span>
                {n.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-auto overflow-hidden">
          <a href={waLink("Hi Aval Mantra! I'd like to see your latest collection.")} target="_blank" rel="noreferrer" className="dl flex items-center justify-center gap-2 rounded-full bg-marigold py-4 text-sm font-semibold text-ink">
            <WhatsApp /> Shop on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

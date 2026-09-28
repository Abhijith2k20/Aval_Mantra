"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { bestSellers, newArrivals, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Arrow } from "./Icons";

function Rail({ eyebrow, title, link, items, drift }: { eyebrow: string; title: string; link: string; items: Product[]; drift: number }) {
  return (
    <div className="pr-rail" data-drift={drift}>
      <div className="flex items-end justify-between px-5 md:px-14">
        <div>
          <p className="eyebrow text-[0.56rem] text-muted">{eyebrow}</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-none md:text-[2.4rem]">{title}</h2>
        </div>
        <a href="#arrivals" className="flex items-center gap-1.5 text-[0.66rem] text-ink/60 transition hover:text-maroon">
          {link} <Arrow className="size-3" />
        </a>
      </div>
      <div className="no-scrollbar mt-7 overflow-x-auto md:mt-9 md:overflow-visible">
        <div className="pr-track flex w-max gap-4 px-5 md:gap-9 md:px-14">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} className="w-[44vw] shrink-0 sm:w-[30vw] md:w-[20vw] lg:w-[14.2vw]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductRails() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pr-rail .pc", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      // Rows drift sideways with scroll (desktop), as in the reference.
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".pr-rail").forEach((rail) => {
          const d = Number(rail.dataset.drift);
          gsap.fromTo(rail.querySelector(".pr-track"), { x: d }, { x: -d, ease: "none", scrollTrigger: { trigger: rail, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="arrivals" ref={root} data-bend className="relative z-10 space-y-16 overflow-x-clip bg-white pt-16 pb-24 shadow-[0_-30px_60px_-30px_rgba(0,0,0,.25)] md:space-y-20 md:pt-24 md:pb-32">
      <Rail eyebrow="Fresh from the loom" title="New Arrivals" link="View all new arrivals" items={newArrivals} drift={-60} />
      <Rail eyebrow="Chosen again and again" title="Best Sellers" link="View all best sellers" items={bestSellers} drift={60} />
    </section>
  );
}

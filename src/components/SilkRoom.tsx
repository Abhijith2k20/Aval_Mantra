"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { silks } from "@/lib/products";
import { formatINR, img, productMessage, waLink } from "@/lib/site";
import Wave from "./Wave";
import { Arrow, Chevron, WhatsApp } from "./Icons";

export default function SilkRoom() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".br-hero img", { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } });
      gsap.fromTo(".br-hero", { clipPath: "inset(12% 12% 12% 12% round 8px)" }, { clipPath: "inset(0% 0% 0% 0% round 8px)", ease: "expo.out", duration: 1.6, scrollTrigger: { trigger: root.current, start: "top 65%" } });
      gsap.from(".br-card", { x: 80, opacity: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".br-rail", start: "top 80%" } });
      gsap.from(".br-title span", { yPercent: 110, duration: 1.1, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 60%" } });
    },
    { scope: root },
  );

  const scroll = (d: number) => rail.current?.scrollBy({ left: d * 300, behavior: "smooth" });

  return (
    <section id="silk" ref={root} className="relative overflow-hidden bg-[#0d0507] pt-20 pb-24 text-ivory md:pt-28 md:pb-32">
      <Wave fill="#ffffff" />

      <div className="relative mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-[minmax(0,4fr)_minmax(0,8.5fr)] md:gap-10 md:px-14">
        <a href={waLink("Hi Aval Mantra! Please share your silk saree collection.")} target="_blank" rel="noreferrer" className="br-hero group relative block aspect-[4/5] overflow-hidden rounded-[4px]">
          <Image src={img("kanjivaram-pink")} alt="Kanjivaram silk saree" fill sizes="(max-width:768px) 100vw, 38vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-serif text-2xl leading-none italic">View the</p>
            <p className="font-serif text-2xl leading-tight italic">collection</p>
          </div>
          <span className="absolute right-5 bottom-5 grid size-9 place-items-center rounded-[3px] bg-ivory text-ink transition group-hover:rotate-[-45deg]">
            <Arrow />
          </span>
        </a>

        <div className="flex min-w-0 flex-col">
          <p className="eyebrow text-[0.56rem] text-marigold">Handpicked pure silks</p>
          <h2 className="br-title mt-2 overflow-hidden font-serif text-4xl leading-[1.05] md:text-[2.5rem]">
            <span className="inline-block">The Silk</span> <span className="inline-block">Room</span>
          </h2>
          <p className="mt-3 max-w-md text-[0.78rem] leading-relaxed text-ivory/60">
            Alongside our boutique designs, a small, handpicked edit of Kanjivaram, Banarasi and soft silks — for weddings, family functions and moments that call for something timeless.
          </p>

          <div ref={rail} className="br-rail no-scrollbar mt-7 -mr-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-5 pb-2 md:mr-0 md:pr-0">
            {silks.map((p) => (
              <article key={p.id} className="br-card flex w-[46vw] shrink-0 snap-start flex-col overflow-hidden rounded-[3px] bg-ivory text-ink sm:w-[32vw] md:w-[11.6rem]">
                <div className="relative m-1.5 mb-0 aspect-[3/3.6] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 58vw, 250px" className="object-cover transition-transform duration-1000 hover:scale-110" />
                </div>
                <div className="flex-1 px-2.5 pt-2.5 pb-3">
                  <h3 className="truncate font-serif text-[0.95rem] leading-tight">{p.name}</h3>
                  <p className="truncate text-[0.6rem] text-muted">{p.fabric}</p>
                  <p className="mt-1.5 text-[0.75rem] font-semibold">{formatINR(p.price)}</p>
                </div>
                <a href={productMessage(p)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-[#d9a520] py-2.5 text-[0.52rem] font-bold tracking-[0.18em] text-ink uppercase transition hover:bg-marigold">
                  <WhatsApp className="size-3.5" /> Order now
                </a>
              </article>
            ))}
          </div>
          <div className="mt-5 hidden gap-3 md:flex">
            <button onClick={() => scroll(-1)} aria-label="Previous" className="grid size-11 place-items-center rounded-full border border-ivory/25 transition hover:bg-ivory hover:text-ink"><Chevron dir="left" /></button>
            <button onClick={() => scroll(1)} aria-label="Next" className="grid size-11 place-items-center rounded-full border border-ivory/25 transition hover:bg-ivory hover:text-ink"><Chevron /></button>
          </div>
        </div>
      </div>
      <Wave fill="#f7f3ee" flip />
    </section>
  );
}

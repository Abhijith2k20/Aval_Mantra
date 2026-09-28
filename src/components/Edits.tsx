"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { img, waLink } from "@/lib/site";
import { Arrow } from "./Icons";

const EDITS = [
  { title: "Party & Evening", note: "Sequins · Stone work · Satin", image: "magenta-black" },
  { title: "Wedding Guest", note: "Tissue · Soft silk · Zari", image: "pink-orange-trees" },
  { title: "Day Events", note: "Organza · Pastels · Florals", image: "three-sisters" },
  { title: "Work & Everyday", note: "Georgette · Chanderi · Linen", image: "linen-yellow" },
];

export default function Edits() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.from(".ed-title > span", { yPercent: 110, stagger: 0.08, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      gsap.from(".ed-card", {
        y: 120,
        rotate: (i) => [-4, 3, -2, 4][i],
        opacity: 0,
        stagger: 0.1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ed-grid", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="edits" ref={root} className="px-5 pt-16 pb-6 md:px-14 md:pt-20 md:pb-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow text-muted">Curated by the house</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="ed-title flex flex-wrap items-end gap-x-4 overflow-hidden font-display text-5xl leading-none uppercase md:text-7xl">
            <span className="inline-block">Edits for</span>
            <span className="inline-block font-script text-4xl text-gold normal-case md:text-6xl">every occasion</span>
          </h2>
          <a href="#arrivals" className="eyebrow hidden shrink-0 items-center gap-2 text-ink/70 hover:text-maroon md:flex">View all categories <Arrow /></a>
        </div>

        <div className="ed-grid mt-8 grid grid-cols-2 gap-3 md:mt-9 md:grid-cols-4 md:gap-5">
          {EDITS.map((e) => (
            <a
              key={e.title}
              href={waLink(`Hi Aval Mantra! Please show me sarees from ${e.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="ed-card group relative block aspect-[3/4] overflow-hidden rounded-[4px]"
            >
              <Image src={img(e.image)} alt={e.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-maroon/90" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-ivory md:p-6">
                <p className="text-[0.55rem] tracking-wide opacity-80 md:text-[0.65rem]">{e.note}</p>
                <h3 className="mt-1 font-serif text-xl leading-tight md:text-3xl">{e.title}</h3>
                <span className="eyebrow mt-3 flex items-center gap-2 text-[0.55rem] md:text-[0.6rem]">
                  Explore now <Arrow className="size-3 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

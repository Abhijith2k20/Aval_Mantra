"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { img } from "@/lib/site";

const MOODS = [
  { label: "Pastel Organza", image: "rose-embroidered" },
  { label: "Party Sequins", image: "black-silver" },
  { label: "Tissue Glow", image: "mint-silk" },
  { label: "Floral Georgette", image: "purple-trio" },
  { label: "Everyday Easy", image: "linen-yellow" },
  { label: "Silk Classics", image: "purple-kanjivaram" },
];

export default function Moods() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".m-title > span", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.fromTo(
        ".m-frame",
        { clipPath: "inset(100% 0% 0% 0% round 999px 999px 18px 18px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 999px 999px 18px 18px)",
          duration: 1.3,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: ".m-row", start: "top 85%" },
        },
      );
      gsap.fromTo(".m-arch img", { scale: 1.35 }, { scale: 1, duration: 1.8, stagger: 0.09, ease: "expo.out", scrollTrigger: { trigger: ".m-row", start: "top 85%" } });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-5 pt-12 pb-10 md:px-14 md:pt-14 md:pb-14">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted">Shop by mood</p>
          <h2 className="m-title mt-3 flex items-end gap-3 overflow-hidden font-display text-5xl leading-none tracking-tight uppercase md:text-[4rem]">
            <span className="inline-block">Six Moods.</span>
            <span className="mb-1.5 inline-block font-serif text-base italic text-muted normal-case tracking-normal md:text-lg">one boutique</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          From soft pastel organzas to sequinned party drapes — find the saree that matches your mood.
        </p>
      </div>

      <div className="m-row no-scrollbar mx-auto mt-8 flex max-w-[1180px] snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto pt-2 pb-4 md:mt-10 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible">
        {MOODS.map((m) => (
          <a key={m.label} href="#arrivals" className="group w-[40vw] shrink-0 snap-start sm:w-[28vw] md:w-auto">
            <div className="m-frame rounded-t-[999px] rounded-b-[14px] bg-white p-[5px] shadow-[0_14px_30px_-14px_rgba(74,10,28,.35)] transition-transform duration-500 group-hover:-translate-y-1.5">
            <div className="m-arch relative aspect-[3/4.4] overflow-hidden rounded-t-[999px] rounded-b-[10px] bg-cream">
              <Image src={img(m.image)} alt={m.label} fill sizes="(max-width:768px) 45vw, 16vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            </div>
            <p className="eyebrow mt-3.5 text-center text-[0.56rem] text-ink/70 transition-colors group-hover:text-maroon">{m.label}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

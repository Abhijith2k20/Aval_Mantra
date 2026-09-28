"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { img, waLink } from "@/lib/site";
import { Arrow } from "./Icons";

const OFFERS = [
  { big: "SALE", title: "The Boutique Sale — up to 45% off", note: "On selected boutique sarees", image: "red-organza" },
  { big: "BOGO", title: "Buy 2, get 10% off", note: "Mix & match any boutique sarees", image: "magenta-black" },
  { big: "FREE", title: "Free shipping", note: "On every order across India", image: "black-silver" },
  { big: "NEW", title: "First order? Flat ₹1,000 off", note: "Mention code AVAL1000 on WhatsApp", image: "ivory-orange" },
  { big: "GIFT", title: "Complimentary gift box", note: "With every silk saree", image: "purple-zari" },
  { big: "DROP", title: "New drops every week", note: "Ask us for this week’s arrivals on WhatsApp", image: "blue-banarasi-seated" },
];

export default function Offers() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % OFFERS.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = root.current?.querySelectorAll(".of-panel")[active];
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".of-in"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, delay: 0.25, ease: "expo.out" });
  }, [active]);

  useGSAP(
    () => {
      gsap.from(".of-panel", { y: 80, opacity: 0, stagger: 0.06, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".of-row", start: "top 85%" } });
    },
    { scope: root },
  );

  return (
    <section id="offers" ref={root} className="px-5 pt-10 pb-20 md:px-14 md:pt-12 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow text-muted">Current offers</p>
        <div className="mt-3 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-light md:text-[2.6rem]">Worth your attention</h2>
          <a href={waLink("Hi Aval Mantra! What offers are running right now?")} target="_blank" rel="noreferrer" className="eyebrow hidden items-center gap-2 text-ink/70 hover:text-maroon md:flex">Shop all offers <Arrow /></a>
        </div>

        <div
          className="of-row mt-10 flex h-[640px] flex-col gap-2 md:h-[480px] md:flex-row md:gap-3"
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {OFFERS.map((o, i) => {
            const on = i === active;
            return (
              <div
                key={o.big}
                role="button"
                tabIndex={0}
                aria-expanded={on}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
                onClick={() => { setActive(i); paused.current = true; }}
                onMouseEnter={() => setActive(i)}
                className="of-panel group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[4px] text-left text-ivory transition-[flex-grow] duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ flexGrow: on ? 6 : 1, flexBasis: 0 }}
              >
                <Image
                  src={img(o.image)}
                  alt={o.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className={`object-cover transition-[filter,transform] duration-700 ${on ? "scale-100 grayscale-0" : "scale-110 grayscale"}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent" : "bg-black/45"}`} />
                <span className="absolute top-3 left-3 text-[0.6rem] font-semibold opacity-80">0{i + 1}</span>

                {/* collapsed label */}
                <span className={`eyebrow absolute text-[0.55rem] whitespace-nowrap transition-opacity duration-300 max-md:top-1/2 max-md:left-12 max-md:-translate-y-1/2 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:[writing-mode:vertical-rl] md:rotate-180 ${on ? "opacity-0" : "opacity-100"}`}>
                  Current offer
                </span>

                {on && (
                  <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
                    <p className="of-in font-serif text-[5.5rem] leading-none font-medium text-[#ff4d5e] mix-blend-screen md:text-[9rem]">{o.big}</p>
                    <div>
                      <p className="of-in text-xs opacity-80">{o.note}</p>
                      <p className="of-in mt-1 font-serif text-2xl md:text-4xl">{o.title}</p>
                      <a
                        href={waLink(`Hi Aval Mantra! I'd like to use the offer: ${o.title}.`)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="of-in mt-4 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[0.62rem] font-bold tracking-[0.2em] text-ink uppercase"
                      >
                        Claim on WhatsApp <Arrow className="size-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

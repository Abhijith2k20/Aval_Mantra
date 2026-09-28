"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BRAND, CONTACT, img, waLink } from "@/lib/site";
import { BrandArt } from "./Logo";

const COLS = [
  { title: "Shop", links: ["New arrivals", "Boutique sarees", "Party wear", "Silk sarees"] },
  { title: "Explore", links: ["Our story", "Lookbook", "Saree care", "Visit the store"] },
  { title: "Support", links: ["Contact us", "Shipping & delivery", "Returns & exchanges", "FAQs"] },
];

const SOCIAL = [
  { label: "Instagram", href: CONTACT.instagram.url, d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" },
  { label: "YouTube", href: CONTACT.youtube.url, d: "M3 8.5C3 6.5 4.5 5 6.5 5h11C19.5 5 21 6.5 21 8.5v7c0 2-1.5 3.5-3.5 3.5h-11C4.5 19 3 17.5 3 15.5v-7ZM10 9v6l5-3-5-3Z" },
  { label: "WhatsApp", href: waLink(`Hi ${BRAND.name}!`), d: "M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Zm5-11c0 3.5 2.5 6 6 6l1-1.5-2-1-1 1c-1.2-.4-2.1-1.3-2.5-2.5l1-1-1-2L9 9Z" },
  { label: "Website", href: CONTACT.website.url, d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [phone, setPhone] = useState("");

  useGSAP(
    () => {
      gsap.from(".ft-col", { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
      gsap.fromTo(".ft-img img", { yPercent: -8, scale: 1.18 }, { yPercent: 0, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".ft-img", start: "top bottom", end: "bottom bottom", scrub: true } });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative bg-ivory">
      <div className="relative z-10 grid gap-10 px-5 pt-10 pb-4 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr] md:px-14">
        <div className="ft-col">
          <BrandArt className="w-full max-w-[300px] text-maroon" />
          <p className="mt-4 font-hand text-2xl leading-tight text-ink/80">
            <span className="underline decoration-maroon/40 underline-offset-4">Boutique sarees & silks,</span>
            <br />
            <span className="underline decoration-maroon/40 underline-offset-4">picked for every occasion.</span>
          </p>
          <div className="mt-5 space-y-1 text-[0.72rem] text-ink/60">
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="block hover:text-maroon">{CONTACT.phone}</a>
            <a href={CONTACT.instagram.url} target="_blank" rel="noreferrer" className="block hover:text-maroon">{CONTACT.instagram.handle}</a>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="block leading-relaxed hover:text-maroon">
              {CONTACT.address.map((l) => <span key={l} className="block">{l}</span>)}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 md:contents">
          {COLS.map((c) => (
            <div key={c.title} className="ft-col">
              <p className="font-serif text-xl italic">{c.title}</p>
              <ul className="mt-3 space-y-2 text-[0.8rem] text-ink/70">
                {c.links.map((l) => (
                  <li key={l}><a href="#top" className="transition hover:text-maroon">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ft-col">
          <p className="font-serif text-xl italic">Stay updated</p>
          <p className="mt-3 text-[0.8rem] text-ink/70">Get new collections, private offers and styling notes straight on WhatsApp.</p>
          <form
            className="mt-4 flex items-center gap-2 border-b border-black/20 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(`Hi ${BRAND.name}! Please add me to your updates list.${phone ? ` My number: ${phone}` : ""}`), "_blank");
            }}
          >
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Your WhatsApp number" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            <button className="rounded-full bg-wine px-5 py-2 text-xs font-semibold text-ivory transition hover:bg-maroon">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="relative">
      <div className="ft-img relative -mt-8 h-[26vw] max-h-[400px] min-h-[240px] overflow-hidden md:-mt-16">
        <Image src={img("three-sisters")} alt="Women in silk sarees" fill sizes="100vw" className="object-cover object-[50%_42%]" />
        {/* clean fade into the page at the top only; a light shade at the very bottom keeps the copyright row legible */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-ivory via-ivory/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/50 to-transparent" />
      </div>
        <div className="relative flex flex-col items-center gap-4 bg-[#1b1414] px-5 py-5 text-ivory md:absolute md:inset-x-0 md:bottom-0 md:flex-row md:justify-between md:bg-transparent md:px-14">
          <p className="text-[0.7rem]">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-9 place-items-center rounded-full border border-ivory/40 transition hover:bg-ivory hover:text-ink">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
          <div className="flex gap-5 text-[0.7rem]">
            <a href="#top">Terms &amp; Conditions</a>
            <a href="#top">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


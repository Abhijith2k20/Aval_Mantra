"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatINR, productMessage } from "@/lib/site";
import { Bag, Heart, Star, WhatsApp } from "./Icons";

const TAG_STYLE = {
  NEW: "bg-[#d42a6b] text-white",
  BESTSELLER: "bg-marigold text-ink",
  SALE: "bg-maroon text-ivory",
} as const;

export function ProductCard({ p, className = "" }: { p: Product; className?: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className={`pc group ${className}`}>
      <div className="relative aspect-[3/4.1] overflow-hidden rounded-[6px] bg-cream">
        <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 46vw, 15vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
        {p.tag && (
          <span className={`absolute top-2.5 left-2.5 rounded-[2px] px-1.5 py-0.5 text-[0.5rem] font-bold tracking-[0.12em] ${TAG_STYLE[p.tag]}`}>{p.tag}</span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={() => setLiked((v) => !v)}
          className={`absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-white/70 ring-1 ring-black/5 backdrop-blur transition active:scale-90 ${liked ? "text-maroon" : "text-ink/70"}`}
        >
          <Heart className="size-3.5" filled={liked} />
        </button>
        <a
          href={productMessage(p)}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-x-2.5 bottom-2.5 hidden translate-y-[140%] items-center justify-center gap-2 rounded-full bg-ink/90 py-2.5 text-[0.58rem] font-bold tracking-[0.2em] text-ivory uppercase backdrop-blur transition-transform duration-500 group-hover:translate-y-0 md:flex"
        >
          <WhatsApp className="size-3.5" /> Quick enquire
        </a>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          {p.rating && (
            <p className="mb-1.5 flex items-center gap-0.5 text-ink/55">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-2.5" />)}
              <span className="ml-1 text-[0.62rem]">{p.rating}</span>
            </p>
          )}
          <h3 className="truncate text-[0.8rem] font-medium">{p.name}</h3>
          <p className="mt-0.5 truncate text-[0.66rem] text-muted">{p.fabric}</p>
          <p className="mt-2 text-[0.8rem] font-medium">
            {formatINR(p.price)}
            {p.mrp && <span className="ml-2 text-[0.68rem] font-normal text-muted line-through">{formatINR(p.mrp)}</span>}
          </p>
        </div>
        <a href={productMessage(p)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${p.name} on WhatsApp`} className="grid size-8 shrink-0 place-items-center rounded-full bg-[#25D366] text-white md:hidden">
          <WhatsApp className="size-4" />
        </a>
      </div>
    </article>
  );
}

const SIZES = ["S", "M", "L", "XL"];

// "Trend of the Day" style: open layout, image left, size chips and a round gold cart on the right.
export function TrendCard({ p }: { p: Product }) {
  const [size, setSize] = useState("M");
  return (
    <article className="pc group flex gap-4 md:gap-5">
      <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-[3px] shadow-[0_10px_24px_-14px_rgba(0,0,0,.45)] md:w-36">
        <Image src={p.image} alt={p.name} fill sizes="150px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        {p.rating && (
          <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[0.58rem] font-semibold backdrop-blur">
            <Star className="size-2.5 text-marigold" /> {p.rating}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <h3 className="text-[0.78rem] leading-snug font-medium">{p.name}</h3>
        <p className="mt-0.5 text-[0.64rem] text-muted">{p.fabric}</p>
        <p className="mt-3 text-[0.5rem] font-semibold tracking-[0.2em] text-muted uppercase">Blouse size</p>
        <div className="mt-1.5 flex gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`grid size-9 place-items-center rounded-[2px] text-[0.62rem] transition ${s === size ? "bg-ink text-ivory" : "bg-white text-ink/70 ring-1 ring-black/5 hover:ring-ink"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[0.8rem] font-medium">{formatINR(p.price)}</span>
          <a
            href={productMessage(p, `blouse size ${size}`)}
            target="_blank"
            rel="noreferrer"
            aria-label="Order on WhatsApp"
            className="grid size-11 place-items-center rounded-full bg-[#d9a520] text-ink shadow-[0_8px_18px_-8px_rgba(217,165,32,.8)] transition hover:scale-110 hover:bg-maroon hover:text-ivory"
          >
            <Bag className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

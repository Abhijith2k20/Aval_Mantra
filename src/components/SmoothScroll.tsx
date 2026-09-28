"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling synced with GSAP, plus the "fabric bend" effect:
 * any element with [data-bend] gets its top edge curved by scroll velocity.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: !reduce });
    window.__lenis = lenis;
    if (document.documentElement.dataset.loading) lenis.stop();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fabric bend: each [data-bend] section gets a curved "lip" in its own colour above its top edge.
    // Only the lip's transform changes (GPU-composited), so nothing repaints while scrolling.
    const LIP = 80;
    const lips = Array.from(document.querySelectorAll<HTMLElement>("[data-bend]")).map((el) => {
      const lip = document.createElement("div");
      lip.setAttribute("aria-hidden", "true");
      Object.assign(lip.style, {
        position: "absolute",
        left: "-10%",
        right: "-10%",
        top: `${-LIP + 1}px`,
        height: `${LIP}px`,
        background: getComputedStyle(el).backgroundColor,
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        transformOrigin: "50% 100%",
        transform: "scaleY(0)",
        pointerEvents: "none",
        willChange: "transform",
      });
      el.prepend(lip);
      return lip;
    });

    let target = 0;
    let current = 0;
    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      if (!reduce) target = Math.max(target, gsap.utils.clamp(0, 1, Math.abs(velocity) / 28));
    });
    const bendTick = () => {
      target *= 0.9; // ease back once scrolling slows
      const next = current + (target - current) * 0.18;
      if (Math.abs(next - current) < 0.001 && next < 0.002) {
        if (current !== 0) lips.forEach((l) => (l.style.transform = "scaleY(0)"));
        current = 0;
        return;
      }
      current = next;
      const t = `scaleY(${current.toFixed(3)})`;
      lips.forEach((l) => (l.style.transform = t));
    };
    gsap.ticker.add(bendTick);

    return () => {
      gsap.ticker.remove(bendTick);
      lips.forEach((l) => l.remove());
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      // Page progress is informational and does not alter native scrolling.
      gsap.to(".page-progress-fill", { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduced: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { desktop, reduced } = ctx.conditions!;
        if (reduced) return;
        let removeFocusListener: (() => void) | undefined;
        if (desktop) {
          gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power2.out", clearProps: "all" });
          const hero = gsap.timeline({ scrollTrigger: { id: "hero-story", trigger: ".hero-scene", start: "top top", end: "+=110%", pin: true, scrub: 0.65, anticipatePin: 1 } });
          hero.to(".hero-copy", { y: -100, opacity: 0, duration: 0.4 }, 0)
            .to(".hero-photo", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "none" }, 0)
            .to(".hero-photo img", { scale: 1.04, duration: 1, ease: "none" }, 0)
            .to(".hero-shade", { opacity: 0.28, duration: 0.6 }, 0)
            .fromTo(".transition-copy", { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.35 }, 0.55);
          gsap.fromTo(".about-heading .line", { opacity: 0.85, y: 15 }, { opacity: 1, y: 0, stagger: 0.5, ease: "none", scrollTrigger: { id: "about-story", trigger: ".about-grid", start: "top 24%", end: "+=45%", pin: true, scrub: 0.5 } });
          const track = root.current!.querySelector<HTMLElement>(".practice-track")!;
          gsap.to(track, { x: () => -(track.scrollWidth - track.parentElement!.clientWidth), ease: "none", scrollTrigger: { id: "practice-story", trigger: ".practice-section", start: "top top", end: () => `+=${track.scrollWidth - track.parentElement!.clientWidth}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
          // Keep keyboard focus inside the visible panel of a horizontal narrative.
          const focusPanel = (event: FocusEvent) => {
            const target = event.target as HTMLElement;
            const panel = target.closest(".practice-panel");
            const trigger = ScrollTrigger.getById("practice-story");
            if (!panel || !trigger) return;
            const panels = Array.from(track.children);
            const index = panels.indexOf(panel);
            track.parentElement!.scrollLeft = 0;
            window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * index / (panels.length - 1), behavior: "instant" });
            trigger.getTween()?.progress(1);
          };
          track.addEventListener("focusin", focusPanel);
          removeFocusListener = () => track.removeEventListener("focusin", focusPanel);
        } else {
          gsap.to(".hero-photo img", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".hero-scene", start: "top top", end: "bottom top", scrub: true } });
        }
        gsap.utils.toArray<HTMLElement>(".reveal").forEach(element => {
          gsap.fromTo(element, { y: 32 }, { y: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 93%", end: "top 65%", scrub: 0.3 } });
        });
        gsap.fromTo(".manifesto-word", { opacity: 0.85, y: 18 }, { opacity: 1, y: 0, stagger: 0.35, ease: "none", scrollTrigger: { trigger: ".manifesto", start: "top 70%", end: "bottom 70%", scrub: 0.5 } });
        return () => removeFocusListener?.();
      });
    }, root);
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => { active = false; window.removeEventListener("load", refresh); mm.revert(); context.revert(); };
  }, []);
  return <div ref={root}>{children}<div className="page-progress" aria-hidden="true"><span className="page-progress-fill" /></div></div>;
}

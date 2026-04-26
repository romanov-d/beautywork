"use client";

import React, { useEffect, createContext, useContext } from "react";
import Script from "next/script";

const AnimationContext = createContext<any>(null);

export function useAnimation() {
  return useContext(AnimationContext);
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // We'll initialize everything once the scripts are loaded.
    // The actual initialization logic will be in the onReady handlers of the Scripts.
  }, []);

  const initLenis = () => {
    if (typeof window === "undefined" || !(window as any).Lenis) return;
    
    // Disable Lenis on mobile/touch devices to ensure native scroll works perfectly
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      console.log("Lenis disabled on mobile/touch device");
      return;
    }
    
    const lenis = new (window as any).Lenis({
      duration: 0.6,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integration with ScrollTrigger
    if ((window as any).gsap && (window as any).ScrollTrigger) {
      lenis.on('scroll', (window as any).ScrollTrigger.update);
      (window as any).gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      (window as any).gsap.ticker.lagSmoothing(0);
    }

    console.log("Lenis initialized");
  };

  const initAnimations = () => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const Draggable = (window as any).Draggable;
    const InertiaPlugin = (window as any).InertiaPlugin;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    // 1. Parallax logic
    document.querySelectorAll('[data-parallax="trigger"]').forEach((trigger: any) => {
      const target = trigger.querySelector('[data-parallax="target"]') || trigger;
      const direction = trigger.getAttribute("data-parallax-direction") || "vertical";
      const prop = direction === "horizontal" ? "xPercent" : "yPercent";
      const scrub = parseFloat(trigger.getAttribute("data-parallax-scrub") || "1");
      const startVal = parseFloat(trigger.getAttribute("data-parallax-start") || "-13");
      const endVal = parseFloat(trigger.getAttribute("data-parallax-end") || "3");

      gsap.fromTo(target, 
        { [prop]: startVal },
        {
          [prop]: endVal,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: scrub,
          }
        }
      );
    });

    // 2. Video Hover logic
    document.querySelectorAll('[data-video-on-hover]').forEach((el: any) => {
      const video = el.querySelector('video');
      if (!video) return;
      el.addEventListener('mouseenter', () => video.play().catch(() => {}));
      el.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });

    // 3. Nav Dropdown interaction (Sync with is-open class)
    const navBar = document.querySelector('.nav-bar');
    const navDropdownTrigger = document.querySelector('[data-nav-dropdown]');
    if (navBar && navDropdownTrigger) {
      navDropdownTrigger.addEventListener('mouseenter', () => {
        navBar.classList.add('is-open');
      });
      navDropdownTrigger.addEventListener('mouseleave', () => {
        navBar.classList.remove('is-open');
      });
    }

    // 4. Slider logic
    initSliders();
    
    console.log("GSAP Animations initialized");
  };

  const initSliders = () => {
    const gsap = (window as any).gsap;
    const Draggable = (window as any).Draggable;
    if (!gsap || !Draggable) return;

    document.querySelectorAll('[data-gsap-slider-init]').forEach((root: any) => {
      const track = root.querySelector('[data-gsap-slider-list]') as HTMLElement;
      const collection = root.querySelector('[data-gsap-slider-collection]') as HTMLElement;
      const items = Array.from(root.querySelectorAll('[data-gsap-slider-item]')) as HTMLElement[];
      if (!track || !items.length || !collection) return;

      const slideW = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(items[0]).marginRight || "0");
      const vw = collection.clientWidth;
      const tw = track.scrollWidth;
      const maxScroll = Math.max(tw - vw, 0);
      
      const snapPoints: number[] = [];
      for (let i = 0; i < items.length; i++) {
        const p = -i * slideW;
        if (p < -maxScroll) {
          snapPoints.push(-maxScroll);
          break;
        }
        snapPoints.push(p);
      }

      Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { minX: -maxScroll, maxX: 0 },
        snap: snapPoints,
        onDragEnd: function() {
          const index = Math.round(Math.abs(this.x) / slideW);
          items.forEach((item: any, i) => {
            item.setAttribute('data-gsap-slider-item-status', i === index ? 'active' : 'not-active');
          });
        },
        onThrowUpdate: function() {
           const index = Math.round(Math.abs(this.x) / slideW);
           items.forEach((item: any, i) => {
             item.setAttribute('data-gsap-slider-item-status', i === index ? 'active' : 'not-active');
           });
        }
      });
    });
  };

  return (
    <AnimationContext.Provider value={{}}>
      <Script src="/scripts/lenis.js" strategy="afterInteractive" />
      <Script src="/scripts/gsap.min.js" strategy="afterInteractive" />
      <Script src="/scripts/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/scripts/Draggable.min.js" strategy="afterInteractive" />
      <Script src="/scripts/InertiaPlugin.min.js" strategy="afterInteractive" onReady={() => {
        initLenis();
        initAnimations();
      }} />
      {children}
    </AnimationContext.Provider>
  );
}

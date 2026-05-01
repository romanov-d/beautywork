"use client";

import React, { useEffect, createContext, useContext, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const AnimationContext = createContext<any>(null);

export function useAnimation() {
  return useContext(AnimationContext);
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Global anchor scroll handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.hash && (link.pathname === window.location.pathname || link.pathname === "/")) {
        const id = link.hash.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, {
            offset: -100, // Account for sticky header
            duration: 1.5,
          });
          
          // Update URL without jump
          window.history.pushState(null, "", `#${id}`);
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      window.removeEventListener("click", handleAnchorClick);
    };
  }, []);

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



    // 4. Global Reveal animations
    const revealElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, section, .icon-container, .product-card, .blur-box, .featured-product');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 5. Floating animations for icons and images
    document.querySelectorAll('.icon, .intro-photo-left, .intro-photo-right').forEach((el) => {
      el.classList.add('floating');
    });

    // 6. Slider logic
    initSliders();
    
    console.log("GSAP Global Animations initialized");
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
      <Script src="/scripts/gsap.min.js" strategy="afterInteractive" />
      <Script src="/scripts/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/scripts/Draggable.min.js" strategy="afterInteractive" />
      <Script src="/scripts/InertiaPlugin.min.js" strategy="afterInteractive" onReady={() => {
        initAnimations();
      }} />
      {children}
    </AnimationContext.Provider>
  );
}

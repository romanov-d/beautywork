"use client";

import { useRef } from "react";
import ArrowIcon from "../ArrowIcon";
import UnicornScene from "unicornstudio-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const leftPhotoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rightPhotoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section 
      ref={containerRef} 
      data-load-hero="" 
      className="hero-section" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        height: "100vh", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {/* Background Layer */}
      <div 
        className="hero-video"
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%", 
          zIndex: 0,
          backgroundColor: "#0c0c0c"
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            transform: "translateY(30%)", 
            zIndex: 0,
            WebkitTransform: "translate3d(0,30%,0)"
          }}
        >
          <UnicornScene
            projectId="WhVQD1DNG4orgcekBasL"
            width="100%"
            height="100vh"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
          />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", pointerEvents: "none", zIndex: 1 }} />
      </div>

      {/* Left side photo with parallax */}
      <motion.img
        src="/images/intro-person-left.jpg"
        alt=""
        style={{
          position: "absolute", left: "2%", top: "28%", zIndex: 5,
          width: "13%", aspectRatio: "2/3", objectFit: "cover", borderRadius: "999px",
          pointerEvents: "none", y: leftPhotoY,
        }}
      />

      {/* Right side photo with parallax */}
      <motion.img
        src="/images/intro-person.jpg"
        alt=""
        style={{
          position: "absolute", right: "2%", top: "42%", zIndex: 5,
          width: "13%", aspectRatio: "2/3", objectFit: "cover", borderRadius: "999px",
          pointerEvents: "none", y: rightPhotoY,
        }}
      />

      {/* Heading + CTA with parallax */}
      <motion.div className="centre-flex" style={{ paddingBottom: "30vh", y: textY, position: "relative", zIndex: 10 }}>
        <h1 data-load-hero-title="" className="hero-heading"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 1.0 }}>
          Оборудование<br />красоты для<br />вашего бизнеса
        </h1>
        <a data-load-hero-button="" data-button="" href="#" className="primary-button w-inline-block"
          onClick={(e) => { e.preventDefault(); onOpenModal(); }}>
          <ArrowIcon />
          <div data-button-text="">Посмотреть категории</div>
        </a>
      </motion.div>
    </section>
  );
}

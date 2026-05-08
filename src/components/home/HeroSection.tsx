"use client";

import { useRef } from "react";
import Link from "next/link";
import ArrowIcon from "../ArrowIcon";
import UnicornScene from "unicornstudio-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background moves down slower than scroll → appears to lag behind (parallax depth)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Text moves down faster → floats away quicker
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

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
      }}
    >
      {/* Background Layer with parallax */}
      <motion.div
        className="hero-video"
        style={{
          y: bgY,
          position: "absolute",
          top: "-15%",
          left: 0,
          width: "100%",
          height: "130%",
          zIndex: 0,
          backgroundColor: "#0c0c0c",
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: "translateY(35%)",
            zIndex: 0,
            WebkitTransform: "translate3d(0,35%,0)",
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </motion.div>

      {/* Heading + CTA with parallax */}
      <motion.div
        className="centre-flex"
        style={{ y: textY, position: "relative", zIndex: 10, willChange: "transform" }}
      >
        <h1
          data-load-hero-title=""
          className="hero-heading"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 1.0 }}
        >
          <span className="pc-only">Оборудование красоты<br />для вашего бизнеса</span>
          <span className="mob-only">Оборудование<br />красоты для<br />вашего бизнеса</span>
        </h1>
        <a
          data-load-hero-button=""
          data-button=""
          href="#"
          className="primary-button w-inline-block"
          onClick={(e) => {
            e.preventDefault();
            onOpenModal();
          }}
        >
          <ArrowIcon />
          <div data-button-text="">Посмотреть категории</div>
        </a>
      </motion.div>

      {/* Social Proof Card - Bottom Left - PC Only */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pc-only"
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          zIndex: 15,
          width: "480px",
          padding: "2rem 2.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1.5rem"
        }}
      >
        {/* Avatars Stack */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex" }}>
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                style={{ 
                  width: "52px", 
                  height: "52px", 
                  borderRadius: "50%", 
                  overflow: "hidden",
                  marginLeft: i === 1 ? 0 : "-18px",
                  zIndex: 5 - i,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.4)"
                }}
              >
                <img src={`/images/owners/owner${i}.png`} alt={`Owner ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div style={{ 
            marginLeft: "1.5rem", 
            fontSize: "28px", 
            fontWeight: 700, 
            color: "#d2a382",
            fontFamily: "'Kudryashev Display Sans', sans-serif",
            WebkitTextStroke: "0.04em #d2a382",
            lineHeight: "1"
          }}>
            50+ клиник
          </div>
        </div>

        {/* Text Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: 600, 
            color: "#f0ede8", 
            fontFamily: "var(--font-inter), sans-serif",
            lineHeight: "1.3"
          }}>
            Пользуются нашим оборудованием
          </div>
          <div style={{ fontSize: "15px", lineHeight: "1.6", color: "#f0ede8", opacity: 0.75 }}>
            Качественное и доступное по стоимости оборудование по всей России
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href="/cart#request-form"
          className="primary-button is-small w-inline-block"
          style={{
            marginTop: "0.75rem",
            padding: "12px 24px",
            fontSize: "14px",
            width: "fit-content",
            backgroundColor: "#f0ede8",
            color: "#0c0c0c",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none"
          }}
        >
          <div style={{ color: "#0c0c0c", width: "16px", height: "16px", display: "flex", alignItems: "center" }}>
            <ArrowIcon />
          </div>
          <div style={{ color: "#0c0c0c", fontWeight: 700 }}>Оставить заявку</div>
        </Link>
      </motion.div>

      {/* Bottom-Right Contacts - PC Only */}
      <div
        className="pc-only"
        style={{
          position: "absolute",
          right: "4%",
          bottom: "4%",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.75rem",
          textAlign: "right"
        }}
      >
        <a
          href="https://t.me/your_telegram"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{
            fontSize: "16px",
            textDecoration: "none",
            opacity: 0.8,
            display: "block",
            transition: "opacity 0.3s ease",
            color: "#f0ede8",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
        >
          Telegram
        </a>
        <a
          href="https://wa.me/your_whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{
            fontSize: "16px",
            textDecoration: "none",
            opacity: 0.8,
            display: "block",
            transition: "opacity 0.3s ease",
            color: "#f0ede8",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
        >
          WhatsApp
        </a>
      </div>
      {/* Decorative Arrow & Text - PC Only */}
    </section>
  );
}

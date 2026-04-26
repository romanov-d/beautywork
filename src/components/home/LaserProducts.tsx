"use client";

import Link from "next/link";
import ProductsSlider, { Product } from "./ProductsSlider";
import ArrowIcon from "../ArrowIcon";

const laserProducts: Product[] = [
  {
    name: "Soprano Titanium 1600Вт — Чёрный",
    category: "Лазер для эпиляции, манипула 1600Вт",
    categoryColor: "#6a8360",
    image: "/images/product-soprano-black.avif",
    href: "/products/soprano-titanium",
  },
  {
    name: "Soprano Titanium 1600Вт — Белый",
    category: "Лазер для эпиляции, манипула 1600Вт",
    categoryColor: "#6a8360",
    image: "/images/product-soprano-white.avif",
    href: "/products/soprano-titanium",
  },
  {
    name: "Soprano Titanium 1200Вт — Белый",
    category: "Лазер для эпиляции, манипула 1200Вт",
    categoryColor: "#6a8360",
    image: "/images/product-soprano-1200-white.avif",
    href: "/products/soprano-titanium",
  },
  {
    name: "Soprano Titanium 1200Вт — Золотой",
    category: "Лазер для эпиляции, манипула 1200Вт",
    categoryColor: "#6a8360",
    image: "/images/product-soprano-1200-gold.png",
    href: "/products/soprano-titanium",
  },
];

export default function LaserProducts() {
  const accentColor = "#d2a382"; // Changed to beige as requested
  return (
    <section className="products-section" style={{ padding: "4rem 1.5rem", background: "none" }}>
      <div 
        style={{ 
          position: "relative",
          borderRadius: "160px",
          overflow: "hidden",
          padding: "clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 6rem)",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "6rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Background Image & Overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/4e86325d2822f0dd659120c41ab61e49-rotated.jpg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.05)" }}
          />
          <div style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            background: "linear-gradient(135deg, rgba(12,12,12,0.85) 0%, rgba(12,12,12,0.4) 50%, rgba(12,12,12,0.9) 100%)" 
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: "2rem", 
            marginBottom: "4rem",
            flexWrap: "nowrap" 
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
              <span style={{ fontSize: "1rem", opacity: 0.6, fontWeight: 600, color: accentColor, fontFamily: "serif" }}>01</span>
              <h2 style={{ 
                margin: 0, 
                fontSize: "clamp(3rem, 7vw, 6rem)", 
                lineHeight: 0.85, 
                textTransform: "uppercase",
                letterSpacing: "-0.02em"
              }}>
                Лазерная<br />эпиляция
              </h2>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", 
              maxWidth: "35ch", 
              opacity: 0.9, 
              lineHeight: 1.4,
              fontWeight: 300,
              paddingBottom: "0.5rem"
            }}>
              Профессиональные лазеры Soprano Titanium для эпиляции всех типов кожи и волос. Технологии Alexandrite, Diode, Nd:YAG в одном аппарате.
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Link href="/weight-loss" className="primary-button is-secondary w-inline-block" 
              style={{ 
                backgroundColor: "rgba(255,255,255,0.08)", 
                backdropFilter: "blur(12px)", 
                border: "1px solid rgba(255,255,255,0.3)", 
                borderRadius: "999px",
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
              <ArrowIcon />
              <div data-button-text="">Смотреть все лазеры</div>
            </Link>
            <Link href="/products/elza" className="primary-button w-inline-block" style={{ backgroundColor: accentColor, padding: "16px 32px", borderRadius: "999px" }}>
              <div data-button-text="">Оставить заявку</div>
            </Link>
          </div>
        </div>

        {/* Content Bottom: Product cards */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <ProductsSlider
            title=""
            indexNum=""
            description=""
            products={laserProducts}
          />
        </div>
      </div>
    </section>
  );
}

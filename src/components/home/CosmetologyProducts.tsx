"use client";

import Link from "next/link";
import ProductsSlider, { Product } from "./ProductsSlider";
import ArrowIcon from "../ArrowIcon";

const cosmetologyProducts: Product[] = [
  {
    name: "Morpheus MR 8 PRO",
    category: "RF-лифтинг и микроигольчатая терапия, 3 манипулы",
    categoryColor: "#d2a382",
    image: "/images/product-morpheus.avif",
    href: "/products/elza",
  },
  {
    name: "Velashape Sculptor",
    category: "Коррекция фигуры, 5 методик в одном",
    categoryColor: "#d2a382",
    image: "/images/product-velashape.avif",
    href: "/products/elza",
  },
  {
    name: "Vibrosphere LPG",
    category: "LPG-массаж, 50 силиконовых шариков",
    categoryColor: "#d2a382",
    image: "/images/vibrosphere.avif",
    href: "/products/elza",
  },
  {
    name: "Кушетка «Эльза»",
    category: "Косметологическая кушетка, эко-кожа",
    categoryColor: "#d2a382",
    image: "/images/product-couch-elsa.avif",
    href: "/products/elza",
  },
];

export default function CosmetologyProducts() {
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
            src="/images/11814a2f09ff58d6a561fbef5ec39ee0-rotated.jpg"
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

        {/* Content Top */}
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
              <span style={{ fontSize: "1rem", opacity: 0.6, fontWeight: 600, color: accentColor, fontFamily: "serif" }}>02</span>
              <h2 style={{ 
                margin: 0, 
                fontSize: "clamp(3rem, 7vw, 6rem)", 
                lineHeight: 0.85, 
                textTransform: "uppercase",
                letterSpacing: "-0.02em"
              }}>
                Аппаратная<br />косметология
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
              Инновационные решения для омоложения, контурирования тела и ухода за кожей. Оборудование с клинически доказанной эффективностью.
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Link href="/daily-wellness" className="primary-button is-secondary w-inline-block" 
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
              <div data-button-text="">Смотреть всё оборудование</div>
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
            products={cosmetologyProducts}
          />
        </div>
      </div>
    </section>
  );
}

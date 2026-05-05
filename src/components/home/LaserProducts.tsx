"use client";

import Link from "next/link";
import ProductsSlider, { Product } from "./ProductsSlider";


const laserProducts: Product[] = [
  {
    id: "soprano-titanium-1600-black-gold",
    name: "Soprano Titanium 1600Вт — Чёрный с золотом",
    category: "Лазер для эпиляции · Новинка 2025",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-1600-black-hero.png",
    href: "/products/soprano-titanium-1600-black-gold",
    price: 141000,
    specs: [
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "Охлаждение ICE TECH до -31°C · Ресурс 100 млн вспышек",
      "Доступен в 2 цветах · Наличие в Москве или под заказ из Китая",
    ],
  },
  {
    id: "soprano-titanium-1600-white-silver",
    name: "Soprano Titanium 1600Вт — Белый с серебром",
    category: "Лазер для эпиляции · Новинка 2025",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-1600-white-hero.png",
    href: "/products/soprano-titanium-1600-white-silver",
    price: 141000,
    specs: [
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "Охлаждение ICE TECH до -31°C · Ресурс 100 млн вспышек",
      "Доступен в 2 цветах · Наличие в Москве или под заказ из Китая",
    ],
  },
  {
    id: "soprano-titanium-1200-black-gold",
    name: "Soprano Titanium 1200Вт — Чёрный с золотом",
    category: "Лазер для эпиляции",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-1200-black-hero.png",
    href: "/products/soprano-titanium-1200-black-gold",
    price: 195000,
    specs: [
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "Охлаждение ICE TECH до -31°C · Ресурс 100 млн вспышек",
      "Доступен в 2 цветах · Наличие в Москве или под заказ из Китая",
    ],
  },
  {
    id: "soprano-titanium-1200-white-silver",
    name: "Soprano Titanium 1200Вт — Белый с серебром",
    category: "Лазер для эпиляции",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-1200-white-hero.png",
    href: "/products/soprano-titanium-1200-white-silver",
    price: 195000,
    specs: [
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "Охлаждение ICE TECH до -31°C · Ресурс 100 млн вспышек",
      "Доступен в 2 цветах · Наличие в Москве или под заказ из Китая",
    ],
  },
  {
    id: "soprano-titanium-1600-carbon-2handles",
    name: "Soprano Titanium 1600Вт — 2 манипулы + насадка для карбона",
    category: "Лазер для эпиляции · Новинка 2025",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-1600-black-hero.png",
    href: "/products/soprano-titanium-1600-carbon-2handles",
    price: 0,
    specs: [
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "2 манипулы · Насадка для карбонового пилинга в комплекте",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "soprano-titanium-compact",
    name: "Soprano Titanium — Компакт (новый корпус)",
    category: "Лазер для эпиляции",
    categoryColor: "#6a8360",
    image: "/images/products/soprano-compact-hero.png",
    href: "/products/soprano-titanium-compact",
    price: 0,
    specs: [
      "Начинка Soprano Titanium · Компактный новый корпус",
      "3 длины волны: Alexandrite 755 нм, Diode 810 нм, Nd:YAG 1064 нм",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "alexandrite-grey",
    name: "Александрит — Серый",
    category: "Лазер для эпиляции",
    categoryColor: "#6a8360",
    image: "/images/products/alexandrite-hero.png",
    href: "/products/alexandrite-grey",
    price: 295000,
    specs: [
      "Александритовый лазер 755 нм · Эффективен для светлой кожи",
      "Высокая скорость обработки · Подходит для тёмных волос",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
];

export default function LaserProducts() {
  const accentColor = "#d2a382";
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

            <Link href="/cart" className="primary-button w-inline-block" style={{ backgroundColor: accentColor, padding: "16px 32px", borderRadius: "999px" }}>
              <div data-button-text="">Оставить заявку</div>
            </Link>
          </div>
        </div>

        {/* Product cards */}
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

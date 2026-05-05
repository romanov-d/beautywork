"use client";

import Link from "next/link";
import ProductsSlider, { Product } from "./ProductsSlider";


const cosmetologyProducts: Product[] = [
  {
    id: "velashape-sculptor-white-black",
    name: "Velashape Sculptor (Скульптор) — Белый с чёрным",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/velashape-hero.png",
    href: "/products/velashape-sculptor-white-black",
    price: 170500,
    specs: [
      "5 методик: ИК, РФ, вакуум, ролики, кавитация · 5 манипул",
      "Коррекция фигуры, антицеллюлитные программы",
      "Есть в наличии в Москве · Также доступен под заказ из Китая",
    ],
  },
  {
    id: "morpheus-mr8-pro-black-blue",
    name: "Morpheus MR 8 PRO — Чёрный с синим",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/morpheus-hero.png",
    href: "/products/morpheus-mr8-pro-black-blue",
    price: 75000,
    specs: [
      "Микроигольчатый РФ + EMRF + Криотерапия · 3 манипулы",
      "Глубина воздействия до 8 мм · Омоложение и лифтинг",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "fbody-roller-vibrosphere",
    name: "FBody Roller / Вибросфера (Эндосфера)",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/vibrosphere-hero.png",
    href: "/products/fbody-roller-vibrosphere",
    price: 82000,
    specs: [
      "50 силиконовых шариков для тела · 60 для лица",
      "Компрессионная микровибрация 151–200 Гц",
      "Есть в наличии в Москве · Также доступен под заказ из Китая",
    ],
  },
  {
    id: "elza-couch-white",
    name: "Кушетка «Эльза» — Белый",
    category: "Мебель для салонов",
    categoryColor: "#d2a382",
    image: "/images/products/elza-hero.png",
    href: "/products/elza-couch-white",
    price: 0,
    specs: [
      "Эко-кожа · Анатомический матрас · Нагрузка 150–200 кг",
      "Ширина 64 см · Длина 178 см · Высота 60 см",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "velashape-sculptor-vacuum-cavitation",
    name: "Velashape Sculptor + вакуумная кавитация",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/velashape-hero.png",
    href: "/products/velashape-sculptor-vacuum-cavitation",
    price: 0,
    specs: [
      "5 методик: ИК, РФ, вакуум, ролики, кавитация · 5 манипул",
      "Расширенная вакуумная кавитация · Глубокая коррекция фигуры",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "hydrafacial-original",
    name: "Hydrafacial 1:1 Оригинал",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/hydrafacial-original-hero.png",
    href: "/products/hydrafacial-original",
    price: 171000,
    specs: [
      "Оригинальный аппарат · Совместим с расходниками США и аналогами",
      "Глубокое очищение, пилинг, увлажнение, защита",
      "Под заказ · Есть бюджетный аналог — уточните у менеджера",
    ],
  },
  {
    id: "hydrafacial-analog",
    name: "Hydrafacial — Аналог (наш корпус и ПО)",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/hydrafacial-analog-hero.png",
    href: "/products/hydrafacial-analog",
    price: 119000,
    specs: [
      "Собственный корпус и программное обеспечение",
      "Те же методики: очищение, пилинг, увлажнение, защита",
      "Под заказ · Доступная альтернатива оригиналу",
    ],
  },
  {
    id: "endosphere-vibrosphere-black",
    name: "Эндосфера + Жиромер — Чёрный",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/endosphere-black-hero.png",
    href: "/products/endosphere-vibrosphere-black",
    price: 98000,
    specs: [
      "Эндосфера-терапия · Компрессионная микровибрация 151–200 Гц",
      "Встроенный жиромер для точного контроля результатов",
      "Под заказ · Уточните наличие у менеджера",
    ],
  },
  {
    id: "cryolipolysis",
    name: "Криолиполиз",
    category: "Аппаратная косметология",
    categoryColor: "#d2a382",
    image: "/images/products/cryolipolysis-hero.png",
    href: "/products/cryolipolysis",
    price: 0,
    specs: [
      "Неинвазивное замораживание жировых клеток",
      "Коррекция фигуры без операций и реабилитации",
      "Под заказ · Уточните наличие у менеджера",
    ],
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

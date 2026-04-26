"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";

const specs = [
  { label: "Внешняя ширина", value: "64 см" },
  { label: "Внутренняя ширина", value: "53 см" },
  { label: "Глубина сидения", value: "50 см" },
  { label: "Общая длина", value: "178 см" },
  { label: "Высота", value: "60 см" },
  { label: "Максимальная нагрузка", value: "150–200 кг" },
  { label: "Материал обивки", value: "Эко-кожа" },
  { label: "Вес кушетки", value: "23 кг" },
  { label: "Вес с упаковкой", value: "25 кг" },
  { label: "Габариты упаковки", value: "120×31×61 см" },
  { label: "Объём", value: "0,23 м³" },
];

const features = [
  "Анатомический матрас и отверстие для лица",
  "Съёмные подлокотники и лотки под мягким элементом",
  "Раскладывается в горизонтальное положение",
  "Обивка — эко-кожа, нагрузка до 200 кг",
];

export default function ProductElzaPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="page-wrapper" style={{ backgroundColor: "#0c0c0c", color: "#f0ede8", overflowX: "hidden" }}>
        <Navbar onOpenModal={() => setModalOpen(true)} />

        <div className="product-page-styles w-embed">
          <style dangerouslySetInnerHTML={{ __html: `
            .product-hero-section { padding-top: 6rem; padding-bottom: 3rem; }
            .product-hero-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              align-items: flex-start;
              padding: 0 5%;
              max-width: 1400px;
              margin: 0 auto;
              width: 100%;
            }
            .product-title-text {
              font-size: clamp(2.5rem, 6vw, 5rem);
              line-height: 1.05;
              margin: 0 0 2rem;
              font-weight: 500;
              letter-spacing: -0.02em;
              color: #f0ede8;
              text-align: left;
            }
            .product-description {
              font-size: 1.1rem;
              line-height: 1.6;
              color: rgba(240, 237, 232, 0.7);
              margin-bottom: 2rem;
              max-width: 600px;
            }
            .product-image-container {
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent !important;
              padding: 0 !important;
              transform: translateX(15%);
            }
            .product-image-container img {
              width: 125%;
              max-width: 850px;
              height: auto;
              object-fit: contain;
              background: transparent !important;
            }
            .button-group {
              display: flex;
              gap: 1.2rem;
              margin-bottom: 3rem;
            }
            .product-features {
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
              padding: 0;
              margin: 3rem 0;
            }
            .product-features li {
              list-style: none;
              display: flex;
              align-items: center;
              gap: 1rem;
              font-size: 1.05rem;
              color: rgba(240, 237, 232, 0.8);
            }
            .product-features li::before {
              content: "";
              width: 1.4rem;
              height: 1.4rem;
              background: #d2a382;
              border-radius: 0.4rem;
              flex-shrink: 0;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M1 4 3.5 6.5 9 1' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: center;
              background-size: 60%;
            }
            .specs-section {
              margin-top: 2rem;
              border-top: 1px solid rgba(240, 237, 232, 0.1);
              padding-top: 2rem;
            }
            .specs-section h3 {
              font-size: 1.5rem;
              margin-bottom: 1.5rem;
              color: #f0ede8;
            }
            .specs-list { padding: 0; margin: 0; }
            .specs-list li {
              list-style: none;
              display: flex;
              justify-content: space-between;
              padding: 0.75rem 0;
              border-bottom: 1px solid rgba(240, 237, 232, 0.05);
              font-size: 0.95rem;
            }
            .specs-list li span:first-child { color: rgba(240, 237, 232, 0.4); }
            .specs-list li span:last-child { color: #f0ede8; font-weight: 500; }
            
            @media (max-width: 900px) {
              .product-hero-grid { grid-template-columns: 1fr; gap: 3rem; }
              .product-hero-section { padding-top: 5rem; }
            }
          `}} />
        </div>

        <section className="product-hero-section">
          <div className="product-hero-grid">
            <div className="product-info">
              <h1 className="product-title-text">Кушетка косметологическая «Эльза»</h1>
              <p className="product-description">
                Косметологическая кушетка «Эльза» — популярная модель с матрасом анатомической формы, отверстием для лица и съёмными подлокотниками. Оснащена пластиковыми лотками под мягким элементом для хранения инструмента. Кушетку можно разложить в горизонтальное положение — подходит как под косметологию, так и под массаж.
              </p>
              
              <div className="button-group">
                <a href="#" className="primary-button w-inline-block" 
                   style={{ backgroundColor: "#d2a382", borderColor: "#d2a382" }}
                   onClick={(e) => { e.preventDefault(); setModalOpen(true); }}>
                  <div data-button-text="">Оставить заявку</div>
                </a>
                <Link href="/cart" className="primary-button w-inline-block">
                  <ArrowIcon />
                  <div data-button-text="">В корзину</div>
                </Link>
              </div>

              <div className="specs-section">
                <h3>Характеристики</h3>
                <ul className="specs-list">
                  {specs.map((spec) => (
                    <li key={spec.label}>
                      <span>{spec.label}</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="product-features">
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="product-image-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/SHR-BL-1000x1000.png" alt="Кушетка косметологическая «Эльза»" />
            </div>
          </div>
        </section>

        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

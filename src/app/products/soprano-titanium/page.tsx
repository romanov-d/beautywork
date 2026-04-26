"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";

const specs = [
  { label: "Мощность манипулы", value: "1600Вт" },
  { label: "Тип лазера", value: "Alexandrite + Diode + Nd:YAG" },
  { label: "Длина волны", value: "755нм, 808нм, 1064нм" },
  { label: "Ресурс вспышек", value: "50 000 000" },
  { label: "Система охлаждения", value: "Ice Plus (до -16°C)" },
  { label: "Размер пятна", value: "4 см²" },
  { label: "Частота", value: "1-10 Гц" },
  { label: "Дисплей", value: "15.6'' Android Smart Clinic" },
];

const features = [
  "Технология 3D (три длины волны в одной манипуле)",
  "Система постоянного охлаждения Ice Plus",
  "Умная клиника (облачное управление данными)",
  "Двойной коннектор для быстрой смены насадок",
];

export default function ProductSopranoPage() {
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
              <h1 className="product-title-text">Soprano Titanium 1600Вт</h1>
              <p className="product-description">
                Soprano Titanium — это инновационная платформа для лазерной эпиляции, которая сочетает в себе максимальную функциональность и непревзойденный комфорт. Благодаря технологии 3D и системе охлаждения Ice Plus, процедура проходит быстро, эффективно и безболезненно.
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
              <img src="/images/product-soprano-black.avif" alt="Soprano Titanium 1600Вт" />
            </div>
          </div>
        </section>

        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

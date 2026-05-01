"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import ArrowIcon from "@/components/ArrowIcon";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import Link from "next/link";

const PAGE_STYLES = `
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
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.05;
    margin: 0 0 0.75rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #f0ede8;
    text-align: left;
  }
  .product-category-label {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #d2a382;
    margin-bottom: 1.5rem;
    display: block;
  }
  .product-description {
    font-size: 1.05rem;
    line-height: 1.65;
    color: rgba(240, 237, 232, 0.7);
    margin-bottom: 2.5rem;
    max-width: 600px;
  }
  .product-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent !important;
    padding: 0 !important;
    transform: translateX(10%);
  }
  .product-image-container img {
    width: 115%;
    max-width: 800px;
    height: auto;
    object-fit: contain;
    background: transparent !important;
  }
  .button-group {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  .product-features {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0;
    margin: 2.5rem 0;
  }
  .product-features li {
    list-style: none;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1rem;
    color: rgba(240, 237, 232, 0.8);
    line-height: 1.5;
  }
  .product-features li::before {
    content: "";
    width: 1.3rem;
    height: 1.3rem;
    min-width: 1.3rem;
    background: #d2a382;
    border-radius: 0.35rem;
    margin-top: 0.1rem;
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
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
    color: #f0ede8;
    font-weight: 500;
  }
  .specs-list { padding: 0; margin: 0; }
  .specs-list li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(240, 237, 232, 0.05);
    font-size: 0.9rem;
  }
  .specs-list li span:first-child { color: rgba(240, 237, 232, 0.4); flex-shrink: 0; }
  .specs-list li span:last-child { color: #f0ede8; font-weight: 500; text-align: right; }
  .not-found-section {
    padding: 10rem 5%;
    text-align: center;
  }
  @media (max-width: 900px) {
    .product-hero-grid { grid-template-columns: 1fr; gap: 3rem; }
    .product-hero-section { padding-top: 5rem; }
    .product-image-container { transform: none; }
    .product-image-container img { width: 100%; }
  }
`;

export default function ProductSlugPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const product = getProductById(slug);

  const [modalOpen, setModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: 0,
      image: product.image,
      specs: product.cardSpecs,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="page-wrapper" style={{ backgroundColor: "#0c0c0c", color: "#f0ede8", overflowX: "hidden" }}>
        <Navbar onOpenModal={() => setModalOpen(true)} />
        <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

        {!product ? (
          <div className="not-found-section">
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Товар не найден</h1>
            <p style={{ color: "rgba(240,237,232,0.5)", marginBottom: "2rem" }}>
              Возможно, он был удалён или ссылка устарела.
            </p>
            <Link href="/" className="primary-button w-inline-block" style={{ backgroundColor: "#d2a382" }}>
              <div data-button-text="">На главную</div>
            </Link>
          </div>
        ) : (
          <section className="product-hero-section">
            <div className="product-hero-grid">
              <div className="product-info">
                <span className="product-category-label">{product.category}</span>
                <h1 className="product-title-text">{product.name}</h1>
                <p className="product-description">{product.description}</p>

                <div className="button-group">
                  <a
                    href="#"
                    className="primary-button w-inline-block"
                    style={{ backgroundColor: "#d2a382", borderColor: "#d2a382" }}
                    onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
                  >
                    <div data-button-text="">Оставить заявку</div>
                  </a>
                  <button
                    className="primary-button w-inline-block"
                    style={{
                      background: "none",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onClick={handleAddToCart}
                  >
                    {added ? (
                      <div data-button-text="">Добавлено ✓</div>
                    ) : (
                      <>
                        <ArrowIcon />
                        <div data-button-text="">В корзину</div>
                      </>
                    )}
                  </button>
                </div>

                {product.specs.length > 0 && (
                  <div className="specs-section">
                    <h3>Характеристики</h3>
                    <ul className="specs-list">
                      {product.specs.map((spec) => (
                        <li key={spec.label}>
                          <span>{spec.label}</span>
                          <span>{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.features.length > 0 && (
                  <ul className="product-features" style={{ marginTop: product.specs.length > 0 ? "2rem" : "0" }}>
                    {product.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="product-image-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          </section>
        )}

        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

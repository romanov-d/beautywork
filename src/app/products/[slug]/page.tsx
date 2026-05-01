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
  .product-hero-section { padding-top: 6rem; padding-bottom: 4rem; }
  .product-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: flex-start;
    padding: 0 5%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  .product-title-text {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    line-height: 1.05;
    margin: 0 0 0.75rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #f0ede8;
  }
  .product-category-label {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #d2a382;
    margin-bottom: 1.25rem;
    display: block;
  }
  .product-description {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(240, 237, 232, 0.65);
    margin-bottom: 2.5rem;
  }
  .button-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  .product-features {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0;
    margin: 2rem 0 0;
  }
  .product-features li {
    list-style: none;
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    font-size: 0.95rem;
    color: rgba(240, 237, 232, 0.8);
    line-height: 1.5;
  }
  .product-features li::before {
    content: "";
    width: 1.2rem;
    height: 1.2rem;
    min-width: 1.2rem;
    background: #d2a382;
    border-radius: 0.3rem;
    margin-top: 0.15rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M1 4 3.5 6.5 9 1' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
  }
  .specs-section {
    margin-top: 2.5rem;
    border-top: 1px solid rgba(240, 237, 232, 0.08);
    padding-top: 2rem;
  }
  .specs-section h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #f0ede8;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  .specs-list { padding: 0; margin: 0; }
  .specs-list li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(240, 237, 232, 0.05);
    font-size: 0.88rem;
  }
  .specs-list li span:first-child { color: rgba(240, 237, 232, 0.35); flex-shrink: 0; }
  .specs-list li span:last-child { color: #f0ede8; font-weight: 500; text-align: right; }

  /* Gallery */
  .gallery-wrap { position: sticky; top: 6rem; }
  .gallery-main {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 1.5rem;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
  .gallery-main img, .gallery-main video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
  .gallery-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(12,12,12,0.6);
    border: 1px solid rgba(255,255,255,0.15);
    color: #f0ede8;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(8px);
    z-index: 2;
    font-size: 1rem;
    transition: background 0.2s;
  }
  .gallery-nav-btn:hover { background: rgba(210,163,130,0.3); }
  .gallery-nav-btn.prev { left: 0.75rem; }
  .gallery-nav-btn.next { right: 0.75rem; }
  .gallery-thumbs {
    display: flex;
    gap: 0.6rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
  }
  .gallery-thumb {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0.6rem;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.15s;
    background: rgba(255,255,255,0.04);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gallery-thumb.active { border-color: #d2a382; }
  .gallery-thumb img, .gallery-thumb video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .gallery-video-badge {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.6);
    color: #f0ede8;
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    backdrop-filter: blur(6px);
    white-space: nowrap;
    pointer-events: none;
  }
  .not-found-section {
    padding: 10rem 5%;
    text-align: center;
  }
  /* Mobile-only header: hidden on desktop */
  .product-mobile-header { display: none; }

  @media (max-width: 900px) {
    .product-hero-section {
      padding-top: 6.5rem !important;
      padding-bottom: 3rem !important;
      row-gap: 0 !important;
      gap: 0 !important;
    }
    .product-hero-grid {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
      row-gap: 0 !important;
      column-gap: 0 !important;
      padding-top: 0 !important;
    }
    .gallery-wrap { position: static; }

    /* Show mobile header (title above gallery), hide desktop copies */
    .product-mobile-header {
      display: block;
      padding: 0 5%;
      margin-bottom: 0.5rem;
    }
    .product-desktop-title { display: none; }
  }
`;

function isVideo(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function ProductGallery({ image, gallery }: { image: string; gallery?: string[] }) {
  const items = gallery && gallery.length > 0 ? [image, ...gallery] : [image];
  const [active, setActive] = useState(0);

  function prev() { setActive((i) => (i - 1 + items.length) % items.length); }
  function next() { setActive((i) => (i + 1) % items.length); }

  const src = items[active];
  const video = isVideo(src);

  return (
    <div className="gallery-wrap">
      <div className="gallery-main">
        {video ? (
          <video key={src} src={src} autoPlay muted loop playsInline controls={false} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" />
        )}
        {video && <div className="gallery-video-badge">▶ видео</div>}
        {items.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={prev} aria-label="Предыдущее">‹</button>
            <button className="gallery-nav-btn next" onClick={next} aria-label="Следующее">›</button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="gallery-thumbs">
          {items.map((item, i) => (
            <div
              key={i}
              className={`gallery-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
            >
              {isVideo(item) ? (
                <video src={item} muted playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item} alt="" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
            {/* Mobile-only title above gallery */}
            <div className="product-mobile-header">
              <h1 className="product-title-text">{product.name}</h1>
            </div>
            <div className="product-hero-grid">
              {/* LEFT: gallery */}
              <ProductGallery image={product.image} gallery={product.gallery} />

              {/* RIGHT: info */}
              <div className="product-info">
                <h1 className="product-title-text product-desktop-title">{product.name}</h1>
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
                      border: "1px solid rgba(255,255,255,0.25)",
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
                  <ul className="product-features">
                    {product.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}

        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "../ArrowIcon";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  image: string;
  href: string;
  price: number;
  specs: string[];
}

interface ProductsSliderProps {
  title: string;
  indexNum: string;
  description: string;
  products: Product[];
  sliderClass?: string;
}

export default function ProductsSlider({
  title,
  indexNum,
  description,
  products,
  sliderClass = "gsap-slider--one"
}: ProductsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const goTo = (direction: "prev" | "next") => {
    setActiveIndex((prev) => {
      if (direction === "next") return Math.min(prev + 1, products.length - 1);
      return Math.max(prev - 1, 0);
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      specs: product.specs,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <>
      {title && (
        <div className="product-section-content" style={{ position: 'relative', zIndex: 10 }}>
          <div className="test-container" style={{ position: 'relative', zIndex: 10 }}>
            <h2 data-text-in-view="" className="display is-w-m is-home">{title}</h2>
            <div className="featured-flex is-w-m">
              <div className="subheading is-nm">{indexNum}</div>
              <p className="heading-5 grey-text is-cm is-w-m">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div aria-label="Slider" data-gsap-slider-init="" role="region" aria-roledescription="carousel"
        className={sliderClass} style={{ position: 'relative', zIndex: 11 }}>
        <div data-gsap-slider-collection="" className="gsap-slider__collection w-dyn-list">
          <div data-gsap-slider-list="" role="list" className="gsap-slider__list w-dyn-items">
            {products.map((product, i) => (
              <div key={i}
                data-gsap-slider-item-status={i === activeIndex ? "active" : "not-active"}
                data-gsap-slider-item=""
                role="listitem"
                className="gsap-slider__item-copy w-dyn-item">
                <div className="product-slide">
                  <Link href={product.href} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                    <div data-video-on-hover="not-active" className="product-card">
                      <div className="before__125" />
                      <div className="card-content">
                        <div className="card-top">
                          <div className="product-title-div">
                            <div className="heading-6" style={{ color: "#d2a382" }}>{product.name}</div>
                            <div className="rx-text">Rx</div>
                          </div>
                        </div>
                        <div className="card-bottom">
                          <div className="card-asset-contain">
                            <div className="video-card-visual">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img loading="lazy" src={product.image} alt="" sizes="100vw"
                                className="video-card-visual__img" />
                              <video muted loop playsInline className="video-card-visual__video" />
                            </div>
                          </div>
                          <div className="card-buttons-wrap">
                            <div className="card-buttons-flex">
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product); }}
                                className="primary-button is-p-l w-inline-block"
                                style={{
                                  backgroundColor: addedId === product.id ? "#4a7a40" : product.categoryColor,
                                  cursor: "pointer",
                                  border: "none",
                                  whiteSpace: "nowrap",
                                  minWidth: "fit-content",
                                }}
                              >
                                <div data-button-text="" style={{ whiteSpace: "nowrap" }}>
                                  {addedId === product.id ? "Добавлено ✓" : "В корзину"}
                                </div>
                              </button>
                              <div
                                className="primary-button is-p-r w-inline-block"
                                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                              >
                                <ArrowIcon />
                                <div data-button-text="">Подробнее</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-gsap-slider-controls="" className="gsap-slider__controls">
          <button data-gsap-slider-control="prev" className="gsap-slider__control"
            onClick={() => goTo("prev")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 12 8" fill="none" className="slider-arrow is-left">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.34208 0.0567323L8.03384 0L12 4.01702L8.06744 8L6.31133 7.94616L8.25885 5.97367C8.73288 5.49356 9.16703 5.06338 9.56209 4.68311L0 4.65232L0.0590857 3.31696L9.62103 3.3479C9.23475 2.97674 8.80767 2.55394 8.33968 2.07995L6.34208 0.0567323Z" fill="currentColor" />
            </svg>
          </button>
          <button data-gsap-slider-control="next" className="gsap-slider__control"
            onClick={() => goTo("next")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 12 8" fill="none" className="slider-arrow">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.34208 0.0567323L8.03384 0L12 4.01702L8.06744 8L6.31133 7.94616L8.25885 5.97367C8.73288 5.49356 9.16703 5.06338 9.56209 4.68311L0 4.65232L0.0590857 3.31696L9.62103 3.3479C9.23475 2.97674 8.80767 2.55394 8.33968 2.07995L6.34208 0.0567323Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

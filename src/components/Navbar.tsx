"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "@phosphor-icons/react";

interface NavbarProps {
  onOpenModal: () => void;
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 10" fill="none" className="user-icon">
      <circle cx="4.5" cy="3" r="2.5" stroke="currentColor" strokeLinejoin="round" />
      <path
        d="M0.870336 6.89376C1.50691 6.1321 2.60581 5.5 4.5 5.5C6.39419 5.5 7.49309 6.1321 8.12966 6.89375C9.14233 8.10539 7.77043 9.5 6.19133 9.5L4.5 9.5L2.80867 9.5C1.22958 9.5 -0.142325 8.10539 0.870336 6.89376Z"
        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return <ShoppingCart size={22} weight="duotone" />;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const { count } = useCart();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero-section');
    const check = () => {
      if (!hero) {
        setIsDark(window.scrollY > 100);
        return;
      }
      const bottom = hero.getBoundingClientRect().bottom;
      // We want it to stay transparent longer, or have a very smooth glass transition
      setIsDark(bottom <= 60); // Trigger slightly before it completely leaves
    };
    
    // Initial check
    check();
    
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleAccordion = useCallback((index: number) => {
    setOpenAccordion(prev => prev === index ? null : index);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenAccordion(null);
  }, []);

  const menuCategories = [
    {
      title: "Лазерная эпиляция",
      items: [
        { name: "Soprano Titanium 1600Вт — Чёрный", href: "/products/soprano-titanium" },
        { name: "Soprano Titanium 1600Вт — Белый", href: "/products/soprano-titanium" },
        { name: "Soprano Titanium 1200Вт — Белый", href: "/products/soprano-titanium" },
        { name: "Soprano Titanium 1200Вт — Золотой", href: "/products/soprano-titanium" },
      ],
      allLink: "/weight-loss",
      allText: "Все лазеры",
    },
    {
      title: "Аппаратная косметология",
      items: [
        { name: "Morpheus MR 8 PRO", href: "/products/elza" },
        { name: "Velashape Sculptor", href: "/products/elza" },
        { name: "Vibrosphere LPG", href: "/products/elza" },
      ],
      allLink: "/daily-wellness",
      allText: "Все аппараты",
    },
    {
      title: "Коррекция фигуры",
      items: [
        { name: "VelaShape Sculptor", href: "/products/elza" },
        { name: "EMS Sculpt", href: "/products/elza" },
      ],
      allLink: "/products",
      allText: "Все аппараты",
    },
    {
      title: "Мебель для салонов",
      items: [
        { name: "Кушетка «Эльза»", href: "/products/elza" },
      ],
      allLink: "/hair",
      allText: "Вся мебель",
    },
  ];

  return (
    <nav className="navigation is-v1">
      {/* ===== Desktop navbar ===== */}
      <div data-load-nav="" data-nav-dropdown="" className={`nav-bar is-main${isDark ? ' is-dark-nav' : ''}`}>
        <div id="w-node-a9fcd343-232f-f2a3-62ff-4d3bbaa4e17b-baa4e179" className="nav-left">
          <Link href="/" className="nav-logo w-inline-block">
            <span style={{
              display: "inline-block", fontFamily: "'Kudryashev Display Sans', Arial, sans-serif", fontWeight: 700,
              fontSize: "18px", letterSpacing: "0.05em", color: "#d2a382",
              whiteSpace: "nowrap", textDecoration: "none", WebkitTextStroke: "0.06em #d2a382",
            }}>КРАСИВОЕ ДЕЛО</span>
          </Link>
        </div>

        <div id="w-node-a9fcd343-232f-f2a3-62ff-4d3bbaa4e183-baa4e179" className="nav-middle">
          <Link href="/#catalog" className="nav-link is-light">Каталог</Link>
          <div className="nav-divider" />
          <Link href="/#about" className="nav-link is-light">О нас</Link>
          <div className="nav-divider" />
          <Link href="/#reviews" className="nav-link is-light">Отзывы</Link>
        </div>

        <div id="w-node-a9fcd343-232f-f2a3-62ff-4d3bbaa4e18f-baa4e179" className="nav-right" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a 
            href="#" 
            className="login-button w-inline-block" 
            style={{ backgroundColor: "#d2a382" }}
            onClick={(e) => { e.preventDefault(); onOpenModal(); }}
          >
            <UserIcon />
            <div data-button-text="">Оставить заявку</div>
          </a>
          <Link href="/cart" className="nav-link is-light cart-link-wrapper">
            <CartIcon />
            {count > 0 && <span className="cart-counter">{count}</span>}
          </Link>
        </div>
      </div>

      {/* ===== Mobile navbar ===== */}
      <div data-load-nav="" className="mobile-navbar">
        <div className="mobile-menu-container">
          <button 
            className={`mobile-burger ${menuOpen ? 'is-active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="burger-line line-1" />
            <div className="burger-line line-2" />
          </button>
        </div>
        <div className="mob-logo">
          <Link href="/" className="nav-logo w-inline-block" style={{ textDecoration: "none" }}>
            <span style={{ color: "currentColor", textDecoration: "none" }}>КРАСИВОЕ ДЕЛО</span>
          </Link>
        </div>
        <div className="login-container">
          <Link href="/cart" className="mobile-cart-btn" onClick={() => setMenuOpen(false)}>
            <div className="cart-link-wrapper">
              <CartIcon />
              {count > 0 && <span className="cart-counter">{count}</span>}
            </div>
          </Link>
        </div>
      </div>

      {/* ===== Mobile menu (fullscreen overlay) ===== */}
      <div
        data-lenis-prevent=""
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
      >
        <div className="menu-content">
          <div className="main-links">
            {/* 2-level accordion menu */}
            <div className="mobile-menu-categories">
              {menuCategories.map((cat, catIdx) => (
                <div key={catIdx} className="mobile-cat-item">
                  <button
                    className="mobile-cat-header"
                    onClick={() => toggleAccordion(catIdx)}
                  >
                    <span className="mobile-cat-title">{cat.title}</span>
                    <svg
                      className={`mobile-cat-chevron ${openAccordion === catIdx ? 'mobile-cat-chevron--open' : ''}`}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className="mobile-cat-body"
                    style={{
                      maxHeight: openAccordion === catIdx ? `${cat.items.length * 60 + 80}px` : '0',
                      opacity: openAccordion === catIdx ? 1 : 0,
                    }}
                  >
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className="mobile-cat-link"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href={cat.allLink}
                      className="mobile-cat-all"
                      onClick={closeMenu}
                    >
                      <ArrowIcon />
                      <span>{cat.allText}</span>
                    </Link>
                  </div>
                  <div className="mobile-divider" />
                </div>
              ))}
            </div>

            {/* Extra links */}
            <div className="mobile-extra-links">
              <div className="mobile-divider" />
              <Link href="/about" className="mobile-extra-link" onClick={closeMenu}>О нас</Link>
              <Link href="/terms-and-conditions" className="mobile-extra-link" onClick={closeMenu}>Условия</Link>
              <Link href="/cart" className="mobile-extra-link" onClick={closeMenu}>Корзина</Link>
            </div>

            <div className="login-mobile">
              <a 
                href="#" 
                className="primary-button is-menu w-inline-block" 
                onClick={(e) => { e.preventDefault(); closeMenu(); onOpenModal(); }}
              >
                <ArrowIcon />
                <div>Оставить заявку</div>
              </a>
              <div className="mobile-divider" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="footer-section">
      <div className="footer-container">
        <div className="w-layout-grid global-grid is-ft">
          <div>
            <Link href="/" className="nav-logo is-footer w-inline-block">
              <span style={{
                display: "inline-block", fontFamily: "'Kudryashev Display Sans', Arial, sans-serif", fontWeight: 700,
                fontSize: "28px", letterSpacing: "0.05em", color: "#d2a382",
                whiteSpace: "nowrap", textDecoration: "none", WebkitTextStroke: "0.04em #d2a382",
              }}>КРАСИВОЕ ДЕЛО</span>
            </Link>
          </div>
        </div>
        <div className="w-layout-grid global-grid is-footer">
          <div className="footer-heading-wrapper" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2 className="hero-heading is-footer" style={{ marginBottom: "2.5rem", textAlign: "left" }}>
              Оборудование, которое <span>работает на ваш салон</span>
            </h2>
            <div className="footer-ctas">
              <a href="#" className="primary-button is-footer w-inline-block"
                onClick={(e) => { e.preventDefault(); onOpenModal(); }}>
                <ArrowIcon />
                <div data-button-text="">Оставить заявку</div>
              </a>
            </div>
          </div>
          
          <div className="quicklinks-div is-catalog">
            <h3 className="subheading is-white">Каталог</h3>
            <div className="quicklinks-flex">
              <Link href="/#catalog" className="body-large is-link">Лазерная эпиляция</Link>
              <Link href="/#catalog" className="body-large is-link">Аппаратная косметология</Link>
            </div>
          </div>

          <div className="quicklinks-div is-popular">
            <h3 className="subheading is-white">Популярные модели</h3>
            <div className="quicklinks-flex">
              <Link href="/products/soprano-titanium-1600-black-gold" className="body-large is-link">Soprano Titanium 1600Вт</Link>
              <Link href="/products/soprano-titanium-1200-black-gold" className="body-large is-link">Soprano Titanium 1200Вт</Link>
              <Link href="/products/morpheus-mr8-pro-black-blue" className="body-large is-link">Morpheus MR 8 PRO</Link>
              <Link href="/products/velashape-sculptor-white-black" className="body-large is-link">Velashape Sculptor</Link>
              <Link href="/products/elza-couch-white" className="body-large is-link">Кушетка «Эльза»</Link>
            </div>
          </div>

          <div className="quicklinks-div is-company">
            <h3 className="subheading is-white">Компания</h3>
            <div className="quicklinks-flex">
              <Link href="/terms-and-conditions" className="body-large is-link">Условия сотрудничества</Link>
              <Link href="/privacy-policy" className="body-large is-link">Политика конфиденциальности</Link>
              <a href="#" className="body-large is-link" onClick={(e) => { e.preventDefault(); onOpenModal(); }}>Оставить заявку</a>
            </div>
          </div>

          <div className="quicklinks-div is-sales">
            <h3 className="subheading is-white">Отдел продаж</h3>
            <div className="quicklinks-flex">
              <a href="tel:+74951234567" className="body-large is-link">+7 (495) 123-45-67</a>
              <a href="mailto:sales@krasivoedelo.com" className="body-large is-link">sales@krasivoedelo.com</a>
            </div>
          </div>

          <div className="quicklinks-div is-service">
            <h3 className="subheading is-white">Сервис и поддержка</h3>
            <div className="quicklinks-flex">
              <a href="mailto:service@krasivoedelo.com" className="body-large is-link">service@krasivoedelo.com</a>
              <a href="#" className="body-large is-link">Москва, склад и сервисный центр</a>
            </div>
          </div>

          <div className="quicklinks-div is-delivery">
            <h3 className="subheading is-white">Доставка</h3>
            <div className="quicklinks-flex">
              <span className="body-large">Москва — ~20 000 ₽</span>
              <span className="body-large">Московская область — ~20 000 ₽</span>
              <span className="body-large">Регионы — индивидуальный расчёт</span>
            </div>
          </div>


        </div>
      </div>

      <div className="footer-base">
        <div className="w-layout-grid global-grid is-final">
          <div>
            <div className="body-large is-legal is-cm">© 2026 ООО «Красивое дело». Все права защищены.</div>
          </div>
          <div className="footer-legal-links">
            <Link href="/privacy-policy" className="body-large is-legal is-cm">Политика конфиденциальности</Link>
            <Link href="/terms-and-conditions" className="body-large is-legal is-cm">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

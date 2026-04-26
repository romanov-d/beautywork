"use client";

import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import Marquee from "./Marquee";

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
          <div>
            <h2 className="hero-heading is-footer">Оборудование, которое <span>работает на ваш салон</span></h2>
          </div>
          <div id="w-node-bc1cee08-c56f-e341-6d21-996ad81758da-d81758c0" className="footer-flex">
            <div className="quicklinks-div">
              <h3 className="subheading is-white">Каталог</h3>
              <div className="quicklinks-flex">
                <Link href="/" className="body-large is-link">Лазерная эпиляция</Link>
                <Link href="/" className="body-large is-link">Аппаратная косметология</Link>
                <Link href="/" className="body-large is-link">Коррекция фигуры</Link>
                <Link href="/" className="body-large is-link">Мебель для салонов</Link>
              </div>
            </div>
            <div className="quicklinks-div is-popular">
              <h3 className="subheading is-white">Популярные модели</h3>
              <div className="quicklinks-flex">
                <Link href="/products/elza" className="body-large is-link">Soprano Titanium 1600Вт</Link>
                <Link href="/products/elza" className="body-large is-link">Soprano Titanium 1200Вт</Link>
                <Link href="/products/elza" className="body-large is-link">Morpheus MR 8 PRO</Link>
                <Link href="/products/elza" className="body-large is-link">Velashape Sculptor</Link>
                <Link href="/products/elza" className="body-large is-link">Кушетка «Эльза»</Link>
              </div>
            </div>
          </div>
          <div className="quicklinks-div is-company">
            <h3 className="subheading is-white">Компания</h3>
            <div className="quicklinks-flex">
              <Link href="/" className="body-large is-link">О нас</Link>
              <Link href="/terms-and-conditions" className="body-large is-link">Условия сотрудничества</Link>
              <Link href="/return-policy" className="body-large is-link">Гарантия и возврат</Link>
              <Link href="/shipping-policy" className="body-large is-link">Доставка</Link>
              <Link href="/privacy-policy" className="body-large is-link">Политика конфиденциальности</Link>
            </div>
          </div>
          <div className="quicklinks-div is-sales">
            <h3 className="subheading is-white">Отдел продаж</h3>
            <div className="quicklinks-flex">
              <a href="tel:+74951234567" className="body-large is-link">+7 (495) 123-45-67</a>
              <a href="mailto:sales@krasivoe-delo.ru" className="body-large is-link">sales@krasivoe-delo.ru</a>
            </div>
          </div>
          <div className="quicklinks-div is-service">
            <h3 className="subheading is-white">Сервис и поддержка</h3>
            <div className="quicklinks-flex">
              <a href="mailto:service@krasivoe-delo.ru" className="body-large is-link">service@krasivoe-delo.ru</a>
              <a href="#" className="body-large is-link">Москва, склад и сервисный центр</a>
            </div>
          </div>
          <div id="w-node-bc1cee08-c56f-e341-6d21-996ad8175924-d81758c0" className="footer-ctas">
            <a href="#" className="primary-button is-footer w-inline-block"
              onClick={(e) => { e.preventDefault(); onOpenModal(); }}>
              <ArrowIcon />
              <div data-button-text="">Оставить заявку</div>
            </a>
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

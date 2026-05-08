"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { items, updateQty, removeItem, clearCart, total } = useCart();

  useEffect(() => {
    setIsMounted(true);
    document.body.classList.add("is-cart");
    document.body.classList.remove("is-home");
    return () => {
      document.body.classList.remove("is-cart");
    };
  }, []);

  const handleSubmit = (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setSubmitError(null);

    const data = new FormData(e.currentTarget);
    const form = {
      company: data.get("company") as string,
      entity_type: data.get("entity_type") as string,
      inn: data.get("inn") as string,
      kpp: data.get("kpp") as string,
      legal_address: data.get("legal_address") as string,
      contact_name: data.get("contact_name") as string,
      contact_role: data.get("contact_role") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      telegram: data.get("telegram") as string,
    };
    const payload = JSON.stringify({ items, form });

    const itemsSnapshot = items;
    clearCart();
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(err => {
      console.error("Order delivery failed", err, { items: itemsSnapshot });
    });
  };

  if (!isMounted) return null;

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="page-wrapper">
        <Navbar onOpenModal={() => setModalOpen(true)} />

        <section className="cart-hero-section">
          <div className="cart-container">
            <div className="cart-breadcrumbs">
              <Link href="/" className="cart-breadcrumb-link">Главная</Link>
              <span className="cart-breadcrumb-sep">/</span>
              <span className="cart-breadcrumb-current">Корзина</span>
            </div>
            <div className="cart-hero-grid">
              <div className="cart-hero-left">
                <div className="subheading is-nm">01 · Оформление заявки</div>
                <h1 className="display is-cart-title">Ваша корзина</h1>
              </div>
              <div className="cart-hero-right">
                <p className="heading-5 is-cm">Оставьте заявку — менеджер перезвонит в течение рабочего дня, уточнит комплектацию и выставит счёт на юридическое лицо. Предоплата не требуется.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cart-section">
          <div className="cart-container">
            <div className="cart-grid">
              <div className="cart-items-col">
                {items.length > 0 ? (
                  <>
                    <div className="cart-block-head">
                      <div className="subheading">Товары в заявке</div>
                      <div className="cart-block-count"><span>{items.length}</span> {items.length === 1 ? "позиция" : items.length < 5 ? "позиции" : "позиций"}</div>
                    </div>

                    <div className="cart-list">
                      {items.map(item => (
                        <article key={item.id} className="cart-item">
                          <div className="cart-item-visual">
                            <img src={item.image} alt={item.name} loading="lazy" className="cart-item-img" />
                          </div>
                          <div className="cart-item-body">
                            <div className="cart-item-meta">
                              <div className="subheading">{item.category}</div>
                              <h3 className="heading-5 is-cart-item">{item.name}</h3>
                              {item.price > 0 && (
                                <div style={{ fontFamily: "'Kudryashev Display Sans', Arial, sans-serif", fontSize: "1.6rem", color: "#d2a382", margin: "0.4rem 0 0.6rem", letterSpacing: "-0.02em", lineHeight: 1, WebkitTextStroke: "0.04em currentColor" } as React.CSSProperties}>
                                  {item.price.toLocaleString("ru-RU")} ₽{item.qty > 1 && ` × ${item.qty} = ${(item.price * item.qty).toLocaleString("ru-RU")} ₽`}
                                </div>
                              )}
                              <ul className="cart-item-specs">
                                {item.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                              </ul>
                            </div>
                            <div className="cart-item-actions">
                              <div className="cart-qty" role="group" aria-label="Количество">
                                <button type="button" className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                                <input type="text" className="cart-qty-input" value={item.qty} readOnly aria-label="Количество" />
                                <button type="button" className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                              </div>
                              <button type="button" className="cart-remove" onClick={() => removeItem(item.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                                <span>Удалить</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="cart-empty-hint">
                    <p className="subheading" style={{ marginBottom: "0.5rem" }}>Товары не выбраны</p>
                    <p className="is-cm" style={{ marginBottom: "1.25rem", maxWidth: "38ch" }}>Можно добавить оборудование из каталога — тогда менеджер сразу поймёт, что вас интересует. Или просто оставьте контакт — разберёмся вместе.</p>
                    <button onClick={() => setModalOpen(true)} className="primary-button is-secondary w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <ArrowIcon />
                      <div data-button-text="">Посмотреть каталог</div>
                    </button>
                  </div>
                )}

                <div className="cart-promo">
                  <div className="cart-promo-text">
                    <div className="subheading is-dark">Бонусы заявки</div>
                    <h3 className="heading-5 is-cart-promo">Запуск и сервис — уже в стоимости</h3>
                    <p className="is-cm">Инженер привезёт и установит оборудование, а сервисный центр в Москве закроет любое обслуживание на весь срок работы с аппаратом.</p>
                  </div>
                  <ul className="cart-promo-list">
                    <li><span>01</span>Гарантия 12 месяцев от производителя</li>
                    <li><span>02</span>Профессиональное обучение мастеров</li>
                    <li><span>03</span>Доставка по Москве и МО — ~20 000 ₽</li>
                    <li><span>04</span>Регионы — индивидуальный расчёт по тарифам ТК</li>
                  </ul>
                </div>
              </div>

              <aside className="cart-summary-col">
                <div className="cart-summary">
                  <div className="cart-summary-head">
                    <div className="subheading is-white">Заявка</div>
                    <h2 className="hero-heading is-cart-summary">
                      {items.length > 0
                        ? <>{items.length} {items.length === 1 ? "позиция" : items.length < 5 ? "позиции" : "позиций"}</>
                        : <>Без товаров</>}
                    </h2>
                  </div>
                  <div className="cart-summary-rows">
                    {total > 0 && (
                      <div className="cart-summary-row" style={{ borderBottom: "1px solid rgba(240,237,232,0.12)", paddingBottom: "0.75rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontWeight: 600 }}>Итого (ориентировочно)</span>
                        <span style={{ fontFamily: "'Kudryashev Display Sans', Arial, sans-serif", color: "#d2a382", fontSize: "1.6rem", letterSpacing: "-0.02em", WebkitTextStroke: "0.04em currentColor" } as React.CSSProperties}>{total.toLocaleString("ru-RU")} ₽</span>
                      </div>
                    )}
                    <div className="cart-summary-row">
                      <span>Доставка по Москве</span>
                      <span>~20 000 ₽</span>
                    </div>
                    <div className="cart-summary-row">
                      <span>Доставка по МО</span>
                      <span>~20 000 ₽</span>
                    </div>
                    <div className="cart-summary-row">
                      <span>Доставка в регионы</span>
                      <span>По тарифам ТК</span>
                    </div>
                    <div className="cart-summary-row">
                      <span>Пуско-наладка</span>
                      <span>Включена</span>
                    </div>
                  </div>
                  <div className="cart-summary-note">
                    <p>Стоимость фиксируется в коммерческом предложении. Менеджер выставит счёт на юридическое лицо без предоплаты.</p>
                  </div>
                  <a href="#request-form" className="primary-button is-cart-cta w-inline-block">
                    <ArrowIcon />
                    <div data-button-text="">Перейти к оформлению</div>
                  </a>
                </div>

                <div className="cart-assurance">
                  <div className="cart-assurance-item">
                    <div className="subheading">01</div>
                    <p className="is-cm">Работаем только с юридическими лицами и ИП. Документы — УПД, договор, счёт-фактура.</p>
                  </div>
                  <div className="cart-assurance-item">
                    <div className="subheading">02</div>
                    <p className="is-cm">Менеджер отдела продаж свяжется в течение рабочего дня, чтобы согласовать спецификацию.</p>
                  </div>
                  <div className="cart-assurance-item">
                    <div className="subheading">03</div>
                    <p className="is-cm">Резерв оборудования на складе — до подписания договора, без предоплаты.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="request-form" className="cart-form-section is-dark" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
            <div className="cart-container">
              <div className="cart-form-grid">
                <div className="cart-form-intro">
                  <div className="subheading is-nm">02 · Данные юридического лица</div>
                  <h2 className="display is-cart-form-title">Реквизиты <span>и контакты</span></h2>
                  <p className="heading-5 is-cm is-form-lead">Менеджер подготовит коммерческое предложение, договор и счёт на указанное юридическое лицо. ИНН нужен для автоматической подстановки реквизитов.</p>
                  <div className="cart-form-contacts">
                    <div className="cart-form-contact">
                      <div className="subheading">Отдел продаж</div>
                      <a href="tel:+74951234567" className="body-large is-link">+7 (495) 123-45-67</a>
                      <br />
                      <a href="mailto:sales@krasivoedelo.com" className="body-large is-link">sales@krasivoedelo.com</a>
                    </div>
                    <div className="cart-form-contact">
                      <div className="subheading">Режим работы</div>
                      <p className="body-large">Пн — Пт · 09:00 — 19:00 МСК</p>
                      <p className="body-large">Сб · 10:00 — 16:00 МСК</p>
                    </div>
                  </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="cart-form is-dark">
                  <div className="cart-form-section-title">
                    <div className="subheading">Компания</div>
                    <h3 className="heading-5 is-form-section">Данные организации</h3>
                  </div>

                  <div className="cart-form-row is-2">
                    <label className="cart-field">
                      <span className="cart-field-label">Название компании *</span>
                      <input type="text" name="company" className="cart-input w-input" placeholder="ООО «Ромашка»" required />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">Форма собственности *</span>
                      <select name="entity_type" className="cart-input cart-select w-select" required>
                        <option value="" style={{ color: "#000" }}>Выберите...</option>
                        <option value="ooo" style={{ color: "#000" }}>ООО</option>
                        <option value="ip" style={{ color: "#000" }}>ИП</option>
                        <option value="ao" style={{ color: "#000" }}>АО / ПАО</option>
                        <option value="other" style={{ color: "#000" }}>Другое</option>
                      </select>
                    </label>
                  </div>

                  <div className="cart-form-row is-2">
                    <label className="cart-field">
                      <span className="cart-field-label">ИНН *</span>
                      <input
                        type="text"
                        name="inn"
                        className="cart-input w-input"
                        placeholder="7701234567"
                        required
                        inputMode="numeric"
                        pattern="\d{10}|\d{12}"
                        title="ИНН должен содержать 10 цифр (юр. лицо) или 12 цифр (ИП)"
                        maxLength={12}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                        }}
                      />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">КПП</span>
                      <input
                        type="text"
                        name="kpp"
                        className="cart-input w-input"
                        placeholder="770101001"
                        inputMode="numeric"
                        pattern="\d{9}"
                        title="КПП должен содержать 9 цифр"
                        maxLength={9}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                        }}
                      />
                    </label>
                  </div>

                  <div className="cart-form-row is-1">
                    <label className="cart-field">
                      <span className="cart-field-label">Юридический адрес</span>
                      <input type="text" name="legal_address" className="cart-input w-input" placeholder="г. Москва, ул. Тверская, д. 1, офис 100" />
                    </label>
                  </div>

                  <div className="cart-form-section-title is-spaced">
                    <div className="subheading">Контактное лицо</div>
                    <h3 className="heading-5 is-form-section">С кем связаться по заявке</h3>
                  </div>

                  <div className="cart-form-row is-2">
                    <label className="cart-field">
                      <span className="cart-field-label">ФИО *</span>
                      <input type="text" name="contact_name" className="cart-input w-input" placeholder="Иванова Анна Сергеевна" required />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">Должность</span>
                      <input type="text" name="contact_role" className="cart-input w-input" placeholder="Директор салона" />
                    </label>
                  </div>

                  <div className="cart-form-row is-2">
                    <label className="cart-field">
                      <span className="cart-field-label">Телефон *</span>
                      <input
                        type="tel"
                        name="phone"
                        className="cart-input w-input"
                        placeholder="+7 (___) ___-__-__"
                        required
                        inputMode="tel"
                        pattern="^\+?[0-9\s\-\(\)]{10,20}$"
                        title="Введите телефон, например +7 (495) 123-45-67"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^\d+\s\-()]/g, "");
                        }}
                      />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">E-mail *</span>
                      <input
                        type="email"
                        name="email"
                        className="cart-input w-input"
                        placeholder="anna@salon.ru"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                        title="Введите корректный e-mail, например anna@salon.ru"
                      />
                    </label>
                  </div>

                  <div className="cart-form-row is-1">
                    <label className="cart-field">
                      <span className="cart-field-label">Telegram</span>
                      <input type="text" name="telegram" className="cart-input w-input" placeholder="@username или номер телефона" />
                    </label>
                  </div>

                  <div className="cart-form-checks">
                    <label className="cart-check">
                      <input type="checkbox" name="agree_terms" className="cart-check-input" required />
                      <span className="cart-check-box" aria-hidden="true"></span>
                      <span className="cart-check-label">
                        Согласен с <Link href="/terms-and-conditions" className="is-link" style={{ textDecoration: "underline" }}>пользовательским соглашением</Link> и <Link href="/privacy-policy" className="is-link" style={{ textDecoration: "underline" }}>политикой конфиденциальности</Link> *
                      </span>
                    </label>
                  </div>

                  {submitError && (
                    <div style={{ color: "#e57373", fontSize: "0.9rem", marginBottom: "1rem" }}>
                      {submitError}
                    </div>
                  )}

                  <div className="cart-form-submit">
                    <button
                      type="submit"
                      className="primary-button is-cart-submit w-button"
                    >
                      <ArrowIcon />
                      <span data-button-text>Отправить заявку на счёт</span>
                    </button>
                    <p className="cart-form-submit-note">Нажимая «Отправить заявку», вы подтверждаете корректность реквизитов. Менеджер перезвонит в течение рабочего дня.</p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        <Footer onOpenModal={() => setModalOpen(true)} />

        {isSuccess && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <div
              style={{
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: "1.5rem",
                padding: "3rem 2.5rem",
                maxWidth: "32rem",
                width: "100%",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="subheading is-white" style={{ marginBottom: "1rem" }}>Готово</div>
              <h3 className="hero-heading is-cart-summary" style={{ marginBottom: "1rem" }}>Заявка отправлена</h3>
              <p style={{ marginBottom: "2rem", opacity: 0.85 }}>
                Мы получили ваши реквизиты. Менеджер отдела продаж свяжется в течение рабочего дня, чтобы согласовать спецификацию и выставить счёт.
              </p>
              <Link href="/" className="primary-button is-secondary w-inline-block">
                <div data-button-text="">Вернуться на главную</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

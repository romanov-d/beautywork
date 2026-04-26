"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import ArrowIcon from "@/components/ArrowIcon";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
  specs: string[];
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "soprano-titanium",
    name: "Soprano Titanium 1600Вт",
    category: "Лазерная эпиляция",
    price: 4890000,
    qty: 1,
    image: "/images/SHR-BL-1000x1000.png",
    specs: [
      "Комплектация: 3 манипулы (755 / 810 / 1064 нм)",
      "Гарантия: 12 месяцев",
      "Доставка: 5–10 рабочих дней"
    ]
  },
  {
    id: "morpheus-mr8",
    name: "Morpheus MR 8 PRO",
    category: "Аппаратная косметология",
    price: 3150000,
    qty: 1,
    image: "/images/SHR-BL-1000x1000.png",
    specs: [
      "Комплектация: RF-лифтинг + микроигольчатая терапия, 3 манипулы",
      "Гарантия: 12 месяцев",
      "Обучение мастеров в подарок"
    ]
  },
  {
    id: "elsa-couch",
    name: "Кушетка «Эльза»",
    category: "Мебель для салонов",
    price: 92000,
    qty: 2,
    image: "/images/SHR-BL-1000x1000.png",
    specs: [
      "Экокожа премиум-класса, 3 секции",
      "Грузоподъёмность до 250 кг",
      "Пульт управления в комплекте"
    ]
  }
];

export default function CartPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.classList.add("is-cart");
    document.body.classList.remove("is-home");
    return () => {
      document.body.classList.remove("is-cart");
    };
  }, []);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.min(99, Math.max(1, item.qty + delta));
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const fmt = new Intl.NumberFormat('ru-RU');
  const money = (n: number) => fmt.format(n) + ' ₽';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {items.length > 0 ? (
              <div className="cart-grid">
                <div className="cart-items-col">
                  <div className="cart-block-head">
                    <div className="subheading">Товары в заявке</div>
                    <div className="cart-block-count"><span>{items.length}</span> позиции</div>
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
                            <div className="cart-item-price">
                              <div className="subheading is-dark">Стоимость</div>
                              <div className="heading-5 is-price">{money(item.price * item.qty)}</div>
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

                  <div className="cart-promo">
                    <div className="cart-promo-text">
                      <div className="subheading is-dark">Бонусы заявки</div>
                      <h3 className="heading-5 is-cart-promo">Обучение, запуск и сервис — уже в стоимости</h3>
                      <p className="is-cm">Инженер привезёт и установит оборудование, методист обучит мастеров, а сервисный центр в Москве закроет любое обслуживание на весь срок работы с аппаратом.</p>
                    </div>
                    <ul className="cart-promo-list">
                      <li><span>01</span>Гарантия 12 месяцев от производителя</li>
                      <li><span>02</span>Бесплатное обучение на 2 мастеров</li>
                      <li><span>03</span>Собственный склад и сервис в Москве</li>
                      <li><span>04</span>Отгрузка в регионы за 5–10 дней</li>
                    </ul>
                  </div>
                </div>

                <aside className="cart-summary-col">
                  <div className="cart-summary">
                    <div className="cart-summary-head">
                      <div className="subheading is-white">Сумма заявки</div>
                      <h2 className="hero-heading is-cart-summary">Итого <span>{money(total)}</span></h2>
                    </div>
                    <div className="cart-summary-rows">
                      <div className="cart-summary-row">
                        <span>Оборудование ({items.length})</span>
                        <span>{money(total)}</span>
                      </div>
                      <div className="cart-summary-row">
                        <span>Доставка по Москве</span>
                        <span>Бесплатно</span>
                      </div>
                      <div className="cart-summary-row">
                        <span>Пуско-наладка</span>
                        <span>Включена</span>
                      </div>
                      <div className="cart-summary-row is-dotted">
                        <span>НДС 20%</span>
                        <span>Включён в цену</span>
                      </div>
                    </div>
                    <div className="cart-summary-note">
                      <p>Итоговая стоимость фиксируется в коммерческом предложении. Счёт выставляется на указанное юридическое лицо без предоплаты.</p>
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
            ) : (
              <div className="cart-empty">
                <h3 className="heading-5 is-cart-item">Корзина пуста</h3>
                <p className="is-cm">Добавьте оборудование из каталога, чтобы оформить заявку.</p>
                <button onClick={() => setModalOpen(true)} className="primary-button w-inline-block">
                  <ArrowIcon />
                  <div data-button-text="">Открыть каталог</div>
                </button>
              </div>
            )}
          </div>
        </section>

        {!isSuccess ? (
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
                      <a href="mailto:sales@krasivoe-delo.ru" className="body-large is-link">sales@krasivoe-delo.ru</a>
                    </div>
                    <div className="cart-form-contact">
                      <div className="subheading">Режим работы</div>
                      <p className="body-large">Пн — Пт · 09:00 — 19:00 МСК</p>
                      <p className="body-large">Сб · 10:00 — 16:00 МСК</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="cart-form is-dark">
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
                      <input type="text" name="inn" className="cart-input w-input" placeholder="7701234567" required />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">КПП</span>
                      <input type="text" name="kpp" className="cart-input w-input" placeholder="770101001" />
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
                      <input type="tel" name="phone" className="cart-input w-input" placeholder="+7 (___) ___-__-__" required />
                    </label>
                    <label className="cart-field">
                      <span className="cart-field-label">E-mail *</span>
                      <input type="email" name="email" className="cart-input w-input" placeholder="anna@salon.ru" required />
                    </label>
                  </div>

                  <div className="cart-form-checks">
                    <label className="cart-check">
                      <input type="checkbox" name="agree_terms" className="cart-check-input" required />
                      <span className="cart-check-box" aria-hidden="true"></span>
                      <span className="cart-check-label">Согласен с условиями сотрудничества и политикой обработки данных *</span>
                    </label>
                  </div>

                  <div className="cart-form-submit">
                    <button type="submit" className="primary-button is-cart-submit w-button">
                      <ArrowIcon />
                      <span data-button-text>Отправить заявку на счёт</span>
                    </button>
                    <p className="cart-form-submit-note">Нажимая «Отправить заявку», вы подтверждаете корректность реквизитов. Менеджер перезвонит в течение рабочего дня.</p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-form-section">
            <div className="cart-container">
              <div className="cart-form-success">
                <div className="subheading is-white">Готово</div>
                <h3 className="hero-heading is-cart-summary">Заявка отправлена</h3>
                <p>Мы получили ваши реквизиты. Менеджер отдела продаж свяжется в течение рабочего дня, чтобы согласовать спецификацию и выставить счёт.</p>
                <Link href="/" className="primary-button is-secondary w-inline-block">
                  <div data-button-text="">Вернуться на главную</div>
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

const faqData = [
  {
    question: "Кто такие «Красивое дело»?",
    answer: "«Красивое дело» — официальный поставщик профессионального лазерного оборудования и аппаратной косметологии для салонов и клиник по всей России. Работаем напрямую с производителями — Soprano Titanium, Velashape, Morpheus и другими премиальными брендами — без посредников. Мы не просто продаём аппараты: подбираем комплектацию под задачи конкретного салона, привозим, устанавливаем, обучаем мастеров и обеспечиваем сервис на всём сроке эксплуатации."
  },
  {
    question: "Какие сроки доставки и где находится склад?",
    answer: "Собственный склад в Москве — популярные модели всегда в наличии, отгрузка в течение 1–2 рабочих дней. По Москве и МО доставляем сами, в регионы — транспортными компаниями (СДЭК, ПЭК, Деловые Линии), обычно 5–10 дней."
  },
  {
    question: "Есть ли обучение работе на аппарате?",
    answer: "Да, мы проводим профессиональное обучение. Обучение платное, проводится нашими технологами: настройка параметров под разные типы кожи и волос, техника работы, безопасность и протоколы процедур. По окончании выдаём сертификат."
  },
  {
    question: "Какая гарантия и есть ли сервис?",
    answer: "На всё оборудование — официальная гарантия 12 месяцев от производителя. У нас собственный сервисный центр в Москве: ремонт, замена ламп/картриджей, плановое ТО. Работаем с гарантийными и постгарантийными обращениями."
  },
  {
    question: "Есть ли сертификаты и регистрационные документы?",
    answer: "Да, у всех аппаратов полный пакет документов: регистрационное удостоверение Росздравнадзора, декларация соответствия ТР ТС, ввозная документация и инструкции на русском языке. Всё выдаём вместе с товаром — можете спокойно открывать кабинет или проходить проверки."
  },
  {
    question: "Возможна ли рассрочка?",
    answer: "Да, работаем с банками-партнёрами — оформляем рассрочку до 24 месяцев. Одобрение обычно в день обращения, первоначальный взнос обсуждается индивидуально. Оставьте заявку — менеджер пришлёт условия под ваш бюджет."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="w-layout-grid global-grid is-faq">
        <div id="w-node-_81278c26-e174-fb0c-20d5-b6a6d81a16d8-0310c67f" className="faq-heading">
          <h2 className="heading-3">Частые <span className="questions">вопросы</span></h2>
        </div>
        <div id="w-node-cc166435-bc4d-2a33-d42d-72bf0e20468d-0310c67f">
          <p className="heading-5 grey-text is-max">
            Ответы на частые вопросы о поставке оборудования, обучении мастеров, сервисе и условиях рассрочки.
          </p>
        </div>
        <div id="w-node-_768c11ff-65e6-27f8-e47c-d56913cc460f-0310c67f" className="accordion-container">
          <div data-accordion-close-siblings="true" className="accordion-css w-dyn-list">
            <div role="list" className="accordion-css__list w-dyn-items">
              {faqData.map((item, i) => (
                <div 
                  key={i}
                  data-accordion-status={openIndex === i ? "active" : "not-active"}
                  role="listitem" 
                  className="accordion-css__item w-dyn-item"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div data-hover="" data-accordion-toggle="" className="accordion-css__item-top">
                    <h3 className="body-large is-bold">{item.question}</h3>
                    <div className="accordion-css__item-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 36 36" fill="none" className="accordion-css__item-icon-svg">
                        <path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" />
                      </svg>
                    </div>
                  </div>
                  <div 
                    className="accordion-css__item-bottom"
                    style={{ 
                      height: openIndex === i ? "auto" : 0,
                      opacity: openIndex === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "height 0.3s ease, opacity 0.3s ease"
                    }}
                  >
                    <div className="accordion-css__item-bottom-wrap">
                      <div className="accordion-css__item-bottom-content">
                        <div className="rich-text w-richtext">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="w-node-f0db3e83-19e5-3493-6d5d-8da48c8acf7c-0310c67f" className="faq-image">
          <div data-parallax-start="0" data-parallax="trigger" data-parallax-end="15" className="image-trigger">
            <div data-parallax="target" className="image-target">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/691dea77c2ed430c05cca369_GL Pills.avif" loading="lazy" sizes="100vw"
                srcSet="/images/691dea77c2ed430c05cca369_GL Pills-p-500.avif 500w, /images/691dea77c2ed430c05cca369_GL Pills-p-800.avif 800w, /images/691dea77c2ed430c05cca369_GL Pills-p-1080.avif 1080w, /images/691dea77c2ed430c05cca369_GL Pills-p-1600.avif 1600w, /images/691dea77c2ed430c05cca369_GL Pills.avif 2364w"
                alt="" className="image-full is-contain" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

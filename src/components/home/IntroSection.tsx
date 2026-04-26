"use client";

export default function IntroSection({ onOpenModal: _onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="intro-section">
      <div className="intro-top-flex" style={{ display: "flex", alignItems: "center", gap: "3rem", padding: "0 1.5rem" }}>
        {/* Photo left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/intro-person-left.jpg"
          alt=""
          className="intro-photo-left"
          style={{ flexShrink: 0, width: "22%", aspectRatio: "3/4", objectFit: "cover", borderRadius: "999px" }}
        />

        {/* Center text */}
        <div className="intro-center-text" style={{ flex: "1 1 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>
          <div style={{ width: "3rem", height: "2px", backgroundColor: "currentColor", opacity: 0.4 }} />
          <h2 data-text-in-view="" className="intro-title" style={{ margin: 0, fontSize: "clamp(1.8rem, 2.4vw, 2.6rem)", lineHeight: 1.1, maxWidth: "100%", width: "100%" }}>
            Что такое Красивое Дело
          </h2>
          <p className="intro-description" style={{ margin: 0, maxWidth: "48ch" }}>
            Мы — официальный поставщик профессионального лазерного и аппаратного оборудования для клиник и студий красоты. Работаем напрямую с производителями, без посредников. Помогаем выбрать аппарат, обучаем мастеров и сопровождаем на каждом этапе — от заявки до запуска.
          </p>
        </div>

        {/* Photo right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/intro-person.jpg"
          alt=""
          className="intro-photo-right"
          style={{ flexShrink: 0, width: "22%", aspectRatio: "3/4", objectFit: "cover", borderRadius: "999px" }}
        />
      </div>

      <div className="intro-benefits-wrapper" style={{ paddingTop: "5rem" }}>
        <div className="heading-4 intro-benefits-heading" style={{ display: "block", textAlign: "center", width: "100%", padding: "0 1.5rem 2rem" }}>
          Наши преимущества
        </div>
        <div className="w-layout-grid global-grid intro-icons">
          <div className="icon-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/69161a2545b46f20befebb82_icons8-medicine (2).svg" loading="lazy" alt="" className="icon" />
            <div className="small-flex">
              <h3 className="heading-5">Всё сертифицированно</h3>
              <p className="p-max-width">Все аппараты имеют сертификаты РФ и полный пакет ввозной документации.</p>
            </div>
          </div>
          <div className="icon-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/69161a5ba77813a6d0c4bc40_icons8-lab-coat.svg" loading="lazy" alt="" className="icon" />
            <div className="small-flex">
              <h3 className="heading-5">Обучение мастеров</h3>
              <p className="p-max-width">После покупки — бесплатный тренинг работе на аппарате от наших специалистов.</p>
            </div>
          </div>
          <div className="icon-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/69161a8aca08650579c01851_icons8-delivery.svg" loading="lazy" alt="" className="icon" />
            <div className="small-flex">
              <h3 className="heading-5">Доставка по всей России</h3>
              <p className="p-max-width">Отгрузка со склада в Москве, регионы — 5–10 дней транспортной компанией.</p>
            </div>
          </div>
          <div className="icon-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons8-shield-guarantee.svg" loading="lazy" alt="" className="icon" />
            <div className="small-flex">
              <h3 className="heading-5">Гарантия 12 месяцев</h3>
              <p className="p-max-width">Официальная гарантия производителя и собственный сервисный центр в Москве.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

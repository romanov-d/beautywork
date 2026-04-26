"use client";

const marqueeItems = [
  "Прямые поставки от производителя",
  "Гарантия 12 месяцев",
  "Обучение мастеров в подарок",
  "Сертификаты РФ на всё оборудование",
  "Сервисный центр в Москве",
  "Доставка по всей России",
  "Soprano Titanium · Velashape · Morpheus",
];

export default function Marquee({ variant = "v1" }: { variant?: "v1" | "footer" | "footer-reverse" }) {
  const isFooter = variant.includes("footer");
  const isReverse = variant.includes("reverse");
  const isNormal = variant === "footer";

  const items = isFooter ? ["Подобрать оборудование"] : marqueeItems;

  const wrapperClasses = [
    "marquee-css",
    variant === "v1" && "is-v1",
    isFooter && "is-footer",
    isNormal && "is-normal",
    isReverse && "is-reverse",
  ].filter(Boolean).join(" ");

  const listClasses = [
    "marquee-css__list",
    isReverse && "is-reverse",
  ].filter(Boolean).join(" ");

  // data-load-marquee only on the top-level v1 marquee
  const dataAttrs: Record<string, string> = { "data-css-marquee": "" };
  if (variant === "v1") {
    dataAttrs["data-load-marquee"] = "";
  }

  return (
    <div {...dataAttrs} className={wrapperClasses}>
      <div data-css-marquee-list="" className={listClasses}>
        {items.map((text, i) => (
          <div className="marquee-css__item" key={i}>
            <p className={`marquee-css__item-p${isFooter ? " is-footer" : ""}`}>{text}</p>
            <div className={`nav-divider${isFooter ? " is-footer" : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

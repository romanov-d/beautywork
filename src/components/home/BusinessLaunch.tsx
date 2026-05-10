"use client";

const steps = [
  { num: "01", title: "Аудит и подбор", text: "Изучаем формат и поток клиентов — подбираем аппараты и комплектацию под задачи." },
  { num: "02", title: "Запуск", text: "Доставка, монтаж, обучение мастеров и помощь с документами для старта работы." },
  { num: "03", title: "Сопровождение", text: "Маркетинговые материалы, сервис и поддержка на весь срок работы оборудования." },
];

export default function BusinessLaunch({ onOpenRequest }: { onOpenRequest: () => void }) {
  return (
    <section className="business-launch-section" style={{ padding: "6rem 0" }}>
      <div
        className="business-launch-container"
        style={{
          width: "100%",
          padding: "0 5rem",
        }}
      >
        <div
          className="business-launch-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="subheading" style={{ color: "#d2a382" }}>
              Запуск бизнеса под ключ
            </div>
            <h2
              data-text-in-view=""
              className="display is-light-text"
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4.2vw, 3.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                wordSpacing: "0.1em",
              }}
            >
              Поможем запустить салон{" "}
              <span style={{ color: "#d2a382" }}>и подобрать оборудование</span>
            </h2>
            <p
              className="is-light-text"
              style={{
                margin: 0,
                maxWidth: "52ch",
                opacity: 0.75,
                fontSize: "1.05rem",
                lineHeight: 1.55,
              }}
            >
              Сопровождаем на каждом этапе — от выбора аппарата и помещения до обучения мастеров
              и запуска первых процедур. Работаем напрямую с производителями, без посредников.
            </p>

            <div
              className="business-launch-steps"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "rgba(240,237,232,0.04)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "1.25rem 1.1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.5), 0 8px 16px -8px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="subheading is-white" style={{ color: "#d2a382" }}>
                    [{s.num}]
                  </div>
                  <h3 className="heading-5" style={{ margin: 0, color: "#f0ede8" }}>
                    {s.title}
                  </h3>
                  <p className="is-light-text" style={{ margin: 0, opacity: 0.7, fontSize: "0.92rem", lineHeight: 1.45 }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="business-launch-cta-wrap" style={{ marginTop: "1.5rem" }}>
              <button
                type="button"
                onClick={onOpenRequest}
                className="primary-button business-launch-cta"
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "#d2a382",
                  color: "#1e1e1e",
                }}
              >
                <div data-button-text="" style={{ color: "#1e1e1e" }}>Оставить заявку</div>
              </button>
            </div>
          </div>

          <div className="business-launch-photo-wrap" style={{ display: "flex", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/intro-person.jpg"
              alt="Запуск бизнеса"
              className="business-launch-photo"
              style={{
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "3/4",
                objectFit: "cover",
                borderRadius: "999px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .business-launch-section {
            padding: 4rem 0 !important;
          }
          :global(.business-launch-container) {
            padding: 0 1.25rem !important;
          }
          :global(.business-launch-grid) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          :global(.business-launch-photo-wrap) {
            order: -1;
          }
          :global(.business-launch-photo) {
            max-width: 260px !important;
          }
          :global(.business-launch-cta-wrap) {
            display: flex !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

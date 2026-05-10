"use client";

import { useEffect, useState } from "react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export default function RequestModal({ isOpen, onClose, source }: RequestModalProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 300);
      return () => clearTimeout(t);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      city: String(data.get("city") || ""),
      business: String(data.get("business") || ""),
      comment: String(data.get("comment") || ""),
      source: source || "Запуск бизнеса",
    };
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Не удалось отправить. Попробуйте ещё раз.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "560px",
          background: "#1e1e1e",
          color: "#f0ede8",
          borderRadius: "32px",
          padding: "2.5rem 2rem",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.25s ease",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            background: "rgba(240,237,232,0.08)",
            border: "none",
            color: "#f0ede8",
            fontSize: "22px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
            <h3 className="heading-5" style={{ color: "#f0ede8", marginBottom: "0.75rem" }}>
              Заявка отправлена
            </h3>
            <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>
              Менеджер свяжется с вами в течение рабочего дня.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="primary-button"
              style={{ cursor: "pointer", border: "none" }}
            >
              <div data-button-text="">Закрыть</div>
            </button>
          </div>
        ) : (
          <>
            <div className="subheading" style={{ color: "#d2a382", marginBottom: "0.75rem" }}>
              Оставить заявку
            </div>
            <h3
              className="heading-3"
              style={{
                color: "#f0ede8",
                margin: 0,
                marginBottom: "0.75rem",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                lineHeight: 1.1,
              }}
            >
              Поможем запустить ваш бизнес
            </h3>
            <p style={{ opacity: 0.7, marginBottom: "1.75rem", fontSize: "0.95rem", lineHeight: 1.5 }}>
              Подберём оборудование, рассчитаем окупаемость и сопроводим до первого клиента.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <input
                type="text"
                name="name"
                required
                placeholder="Ваше имя"
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Телефон *"
                inputMode="tel"
                style={inputStyle}
              />
              <input
                type="text"
                name="city"
                placeholder="Город"
                style={inputStyle}
              />
              <input
                type="text"
                name="business"
                placeholder="Формат бизнеса (студия, клиника, кабинет)"
                style={inputStyle}
              />
              <textarea
                name="comment"
                placeholder="Комментарий"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              />

              {errorMsg && (
                <div style={{ color: "#e88a8a", fontSize: "0.9rem" }}>{errorMsg}</div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="primary-button"
                style={{
                  marginTop: "0.5rem",
                  cursor: status === "sending" ? "wait" : "pointer",
                  border: "none",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                <div data-button-text="">
                  {status === "sending" ? "Отправляем…" : "Отправить заявку"}
                </div>
              </button>

              <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.5rem", textAlign: "center" }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(240,237,232,0.06)",
  border: "1px solid rgba(240,237,232,0.15)",
  borderRadius: "14px",
  padding: "0.9rem 1.1rem",
  color: "#f0ede8",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
};

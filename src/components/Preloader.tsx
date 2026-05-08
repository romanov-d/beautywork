"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const TEXT = "КРАСИВОЕ ДЕЛО";
const LETTER_STAGGER_MS = 90;
const LETTER_DURATION_MS = 750;
const HOLD_AFTER_LETTERS_MS = 1000;
const FADE_OUT_MS = 700;

export default function Preloader() {
  const pathname = usePathname();
  const [show, setShow] = useState(pathname === "/");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const totalLetters = TEXT.length;
    const lettersFinishAt = totalLetters * LETTER_STAGGER_MS + LETTER_DURATION_MS;
    const fadeStart = lettersFinishAt + HOLD_AFTER_LETTERS_MS;
    const removeAt = fadeStart + FADE_OUT_MS;

    const t1 = window.setTimeout(() => setFading(true), fadeStart);
    const t2 = window.setTimeout(() => setShow(false), removeAt);

    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      aria-hidden={fading}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#323232",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease`,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          display: "inline-flex",
          padding: "0.2em 0",
        }}
      >
        <div
          data-preloader-text
          style={{
            margin: 0,
            fontFamily: "'Kudryashev Display Sans', Arial, sans-serif",
            fontWeight: 700,
            color: "#d2a382",
            letterSpacing: "0.05em",
            WebkitTextStroke: "0.04em #d2a382",
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            display: "inline-flex",
            whiteSpace: "nowrap",
          }}
        >
          {TEXT.split("").map((ch, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: "translateY(110%)",
                opacity: 0,
                animation: `kdRise ${LETTER_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                animationDelay: `${i * LETTER_STAGGER_MS}ms`,
                whiteSpace: "pre",
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes kdRise {
          0% { transform: translateY(110%); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

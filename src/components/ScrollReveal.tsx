"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      "section, .product-card, .blur-box, .intro-content, .footer-container, h1, h2, h3, .heading-5, p"
    );
    
    elements.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

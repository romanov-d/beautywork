"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reviews = [
  { src: "/images/reviews/photo_1_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_2_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_3_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_4_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_5_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_6_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_7_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_8_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_9_2026-04-23_14-59-52.jpg" },
  { src: "/images/reviews/photo_10_2026-04-23_14-59-52.jpg" },
];

export default function Reviews() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="testimonial-section" style={{ padding: "100px 0", backgroundColor: "transparent" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="heading-3" style={{ 
            fontSize: "clamp(2rem, 5vw, 4rem)", 
            color: "#f0ede8", 
            margin: "0 auto 20px", 
            textAlign: "center", 
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            Нам доверяют <span style={{ color: "#d2a382", marginLeft: "15px" }}>лучшие клиники</span>
          </h2>
          <p style={{ opacity: 0.7, maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6, textAlign: "center" }}>
            Десятки отзывов от наших партнеров по всей России. Мы гарантируем качество оборудования и сервиса.
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "20px", 
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => setSelectedImage(review.src)}
              style={{
                width: "calc(25% - 20px)",
                minWidth: "250px",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={review.src} 
                alt={`Review ${i + 1}`} 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              cursor: "zoom-out"
            }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Fullscreen review"
              style={{ 
                maxWidth: "90%", 
                maxHeight: "90%", 
                objectFit: "contain", 
                borderRadius: "12px",
                boxShadow: "0 0 50px rgba(0,0,0,0.5)"
              }}
            />
            
            <div style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
              fontSize: "30px",
              cursor: "pointer"
            }}>
              &times;
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

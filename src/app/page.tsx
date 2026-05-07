"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import LaserProducts from "@/components/home/LaserProducts";
import CosmetologyProducts from "@/components/home/CosmetologyProducts";
import Reviews from "@/components/home/Reviews";
import HowItWorks from "@/components/home/HowItWorks";
import HealthGuide from "@/components/home/HealthGuide";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* global-css embed — outside page-wrapper, exactly like original */}
      <div className="global-css w-embed">
        <style dangerouslySetInnerHTML={{ __html: `
          .wf-editor-mode .nav-dropdown,
          .wf-design-mode .nav-dropdown { display: none; }
          .wf-editor-mode .nav-dropdown[data-webflow-open=true],
          .wf-design-mode .nav-dropdown[data-webflow-open=true] { display: block; }
        `}} />
      </div>

      {/* Modal — outside page-wrapper */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* page-wrapper — everything else inside */}
      <div className="page-wrapper">
        <Navbar onOpenModal={() => setModalOpen(true)} />
        <HeroSection onOpenModal={() => setModalOpen(true)} />
        <div id="about">
          <IntroSection onOpenModal={() => setModalOpen(true)} />
        </div>
        <div id="catalog">
          <LaserProducts />
        </div>
        <div id="cosmetology" style={{ marginTop: "5rem" }}>
          <CosmetologyProducts />
        </div>
        <div id="reviews" style={{ marginTop: "5rem" }}>
          <Reviews />
        </div>
        <HowItWorks />
        <HealthGuide />
        <FAQ />
        <Footer onOpenModal={() => setModalOpen(true)} />
      </div>
    </>
  );
}

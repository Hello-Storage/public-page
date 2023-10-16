"use client";

import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Hero } from "../sections";
import ParticleAnimation from "../utils/particles";

const Page = () => {
  useEffect(() => {
    const canvasElements = document.querySelectorAll(
      "[data-particle-animation]"
    );
    canvasElements.forEach((canvas) => {
      const options = {
        quantity: canvas.dataset.particleQuantity,
        staticity: canvas.dataset.particleStaticity,
        ease: canvas.dataset.particleEase,
      };
      new ParticleAnimation(canvas, options);
    });
  }, []);

  return (
    <div className="relative overflow-hidden h-screen text-gray-100 bg-slate-950">
      <div className="absolute inset-0 bg-[url('https://media.publit.io/file/-Pngtree-noise-texture-black-background-1575880.png')] opacity-5"></div>
      <canvas
        data-particle-animation
        data-particle-quantity="100"
        data-particle-staticity="50"
        data-particle-ease="50"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Page;

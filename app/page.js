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
    <div className="bg-slate-950 relative overflow-hidden h-screen text-gray-100">
      <canvas
        data-particle-animation
        data-particle-quantity="70"
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
      <Hero className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Page;

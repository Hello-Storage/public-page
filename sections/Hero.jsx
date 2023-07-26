"use client";

import React from "react";
import ThreeDScene from "../components/homepage/hello3d";

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 z-10 -mt-40 md:mt-0">
        <ThreeDScene />
      </div>
      <div
        className="absolute inset-0 z-20 px-6 flex flex-col justify-center mt-40 md:justify-end items-center pointer-events-none"
        style={{ paddingBottom: "17vh" }}
      >
        <div className="max-w-lg mx-auto p-6 shadow-lg bg-black rounded-2xl border border-gray-700 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="mb-2 text-lg text-gray-300 text-center">
              For decades, the internet has been controlled and monopolized by
              very few tech giants.{" "}
              <span className="italic">Our data is our asset, not theirs.</span>
            </h1>
            <p className="text-white text-xl mb-6 font-medium text-center">
              Secure and control your storage
            </p>
          </div>

          <button className="pointer-events-auto relative overflow-hidden rounded-lg bg-black px-24 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2 cursor-emoji">
            <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 text-neutral-400">
              Get priority access
            </span>
            <span
              aria-hidden
              className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-pink-500 before:to-green-400"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

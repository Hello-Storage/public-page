"use client";

import React, { useEffect, useState } from "react";

class ParticleAnimation {
  constructor(el, { quantity = 30, staticity = 50, ease = 50 } = {}) {
    this.canvas = el;
    if (!this.canvas) return;
    this.canvasContainer = this.canvas.parentElement;
    this.context = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio || 1;
    this.settings = {
      quantity: quantity,
      staticity: staticity,
      ease: ease,
    };
    this.circles = [];
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.canvasSize = {
      w: 0,
      h: 0,
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
    this.drawParticles = this.drawParticles.bind(this);
    this.remapValue = this.remapValue.bind(this);
    this.animate = this.animate.bind(this);
    this.init();
  }

  init() {
    this.initCanvas();
    this.animate();
    window.addEventListener("resize", this.initCanvas);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  initCanvas() {
    this.resizeCanvas();
    this.drawParticles();
  }

  onMouseMove(event) {
    const { clientX, clientY } = event;
    const rect = this.canvas.getBoundingClientRect();
    const { w, h } = this.canvasSize;
    const x = clientX - rect.left - w / 2;
    const y = clientY - rect.top - h / 2;
    const inside = x < w / 2 && x > -(w / 2) && y < h / 2 && y > -(h / 2);
    if (inside) {
      this.mouse.x = x;
      this.mouse.y = y;
    }
  }

  resizeCanvas() {
    this.circles.length = 0;
    this.canvasSize.w = this.canvasContainer.offsetWidth;
    this.canvasSize.h = this.canvasContainer.offsetHeight;
    this.canvas.width = this.canvasSize.w * this.dpr;
    this.canvas.height = this.canvasSize.h * this.dpr;
    this.canvas.style.width = this.canvasSize.w + "px";
    this.canvas.style.height = this.canvasSize.h + "px";
    this.context.scale(this.dpr, this.dpr);
  }

  circleParams() {
    const x = Math.floor(Math.random() * this.canvasSize.w);
    const y = Math.floor(Math.random() * this.canvasSize.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }

  drawCircle(circle, update = false) {
    const { x, y, translateX, translateY, size, alpha } = circle;
    this.context.translate(translateX, translateY);
    this.context.beginPath();
    this.context.arc(x, y, size, 0, 2 * Math.PI);
    this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    this.context.fill();
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (!update) {
      this.circles.push(circle);
    }
  }

  clearContext() {
    this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  }

  drawParticles() {
    this.clearContext();
    const particleCount = this.settings.quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = this.circleParams();
      this.drawCircle(circle);
    }
  }

  // This function remaps a value from one range to another range
  remapValue(value, start1, end1, start2, end2) {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  }

  animate() {
    this.clearContext();
    this.circles.forEach((circle, i) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        this.canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        this.canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = this.remapValue(
        closestEdge,
        0,
        20,
        0,
        1
      ).toFixed(2);
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha)
          circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (this.mouse.x / (this.settings.staticity / circle.magnetism) -
          circle.translateX) /
        this.settings.ease;
      circle.translateY +=
        (this.mouse.y / (this.settings.staticity / circle.magnetism) -
          circle.translateY) /
        this.settings.ease;
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > this.canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > this.canvasSize.h + circle.size
      ) {
        // remove the circle from the array
        this.circles.splice(i, 1);
        // create a new circle
        const circle = this.circleParams();
        this.drawCircle(circle);
        // update the circle position
      } else {
        this.drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true
        );
      }
    });
    window.requestAnimationFrame(this.animate);
  }
}

const Hero = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const uploadRef = React.useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://ounn.space/email/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const uploadDiv = uploadRef.current;
      if (uploadDiv) {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        uploadDiv.style.transform = `translate(${x - 50}px, ${y - 50}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  // Drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // handle the files
      console.log(e.dataTransfer.files);
    }
  };

  return (
    <div>
      <canvas
        data-particle-animation
        data-particle-quantity="40"
        data-particle-staticity="50"
        data-particle-ease="50"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div
        class="absolute bottom-0 left-20 z-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="https://media.publit.io/file/shape.svg"
          class="max-w-none"
          width="852"
          height="582"
          alt="Illustration"
        />
      </div>

      <div
        class="absolute top-0 right-0 z-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="https://media.publit.io/file/shape.svg"
          class="max-w-none"
          width="852"
          height="582"
          alt="Illustration"
        />
      </div>
      <section className="relative flex flex-col justify-start mt-8 items-center">
        <div className="max-w-3xl flex flex-col gap-10 justify-center text-center mb-8">
          <h1 className="font-extrabold text-white md:text-6xl text-4xl text-center antialiased">
            dream with us try to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-300">
              upload anything you want
            </span>
          </h1>
          <p className="text-gray-400 text-xl">upload anything you want</p>
        </div>
        <div
          ref={uploadRef}
          className="relative cursor-pointer pointer-events-auto shadow-2xl"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          <div className="group relative translate-z-10">
            <div className="w-[280px] h-[260px] bg-[#292a2c] rounded-[2rem] relative flex text-gray-300">
              <div className="inset-8 absolute rounded-3xl rainbow-border group:hover:border-gradient-animation"></div>{" "}
              <div className="m-auto inline-flex gap-12 flex-col items-center dropzoneContent pointer-events-none">
                {dragging ? (
                  <span className="text-xl">Drop files here</span>
                ) : (
                  <span className="text-xl">Upload anything</span>
                )}
                <span className="text-base text-gray-400">(or click)</span>
              </div>
              <input
                type="file"
                multiple
                accept="image/jpeg, image/png, image/gif, image/webp, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain, application/zip"
                className="absolute inset-0 cursor-pointer translate-z-10 w-full opacity-0 bg-primary-100"
                aria-label="Upload Thumbnail"
              />
            </div>
            <div className="dropAnimShadow absolute inset-0 top-0 left-0 bg-black/50 blur-xl pointer-events-none"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-16">
          <button className="px-12 py-3 bg-gradient-to-b from-purple-500 to-purple-800 hover:cursor-pointer rounded-xl hover:from-purple-600 hover:to-purple-900">
            About
          </button>
          <button className="px-12 py-3 bg-gradient-to-b from-purple-500 to-purple-800 hover:cursor-pointer rounded-xl hover:from-purple-600 hover:to-purple-900">
            Stats
          </button>
        </div>

        {showModal && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-black-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-300">
                    Enter your email
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-white bg-gray-800 rounded-lg border border-gray-700 my-4 p-2 w-full sm:w-2/3"
                    />
                    <button
                      type="submit"
                      className="pointer-events-auto relative overflow-hidden rounded-lg bg-black px-24 py-6 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-2"
                    >
                      <span className="absolute inset-px z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 text-white-400">
                        Submit
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-pink-500 before:to-green-400"
                      />
                    </button>
                  </form>
                </div>
                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-800 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;

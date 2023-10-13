"use client";

import React from "react";
import { global } from "styled-jsx/css";

const Hero = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

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

  return (
    <section className="relative flex flex-col justify-start mt-8 items-center">
      <div className="max-w-3xl flex flex-col gap-10 justify-center text-center">
        <h1 className="font-extrabold text-white md:text-6xl text-4xl text-center">
          dream with us try to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-300">
            upload anything you want
          </span>
        </h1>
        <p className="text-gray-400 text-xl">upload anything you want</p>
      </div>
      <div className="relative rotate-x-[35deg] cursor-pointer pointer-events-auto transform-style-3d scale-y-75">
        <div className="group relative translate-z-10 transform-style-3d">
          <div className="w-[400px] h-[400px] bg-[#292a2c] rounded-[2rem] relative flex text-3xl text-gray-300 transform-style-3d">
            <div className="inset-8 absolute rounded-3xl rainbow-border group:hover:border-gradient-animation"></div>{" "}
            <div className="m-auto inline-flex gap-12 flex-col items-center dropzoneContent pointer-events-none">
              {/* SVG goes here */}
              <span className="scale-y-125">Upload anything</span>
              <span className="scale-y-125 text-base text-gray-400">
                (or click)
              </span>
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
      <div className="flex items-center gap-4">
        <button className="px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-800 hover:cursor-pointer rounded hover:from-purple-600 hover:to-purple-900">
          About
        </button>
        <button className="px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-800 hover:cursor-pointer rounded hover:from-purple-600 hover:to-purple-900">
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
  );
};

export default Hero;

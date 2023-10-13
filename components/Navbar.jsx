"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { navVariants } from "../utils/motion";

const Navbar = () => (
  <>
    {" "}
    <div className="gradient-02"></div>
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className="p-8 relative"
    >
      <div className="relative w-full flex justify-between">
        <p className="text-2xl font-semibold text-white flex items-center gap-2">
          {" "}
          hello.app
          <Image
            src="https://hello.app/assets/beta-e8ce8431.png"
            width={48}
            height={48}
            alt="hello beta"
          />
        </p>
        <button className="px-6 py-2.5 bg-gradient-to-b from-purple-500 to-purple-800 hover:cursor-pointer rounded hover:from-purple-600 hover:to-purple-900">
          launch app
        </button>
      </div>
    </motion.nav>
  </>
);

export default Navbar;

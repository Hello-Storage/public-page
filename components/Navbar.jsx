"use client";

import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import Image from "next/image";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className="p-8 relative"
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className="absolute mx-8 md:mx-12 pt-8 w-[50%] inset-0 flex font-semibold text-white">
      <Image src="/helloLogo.png" width={32} height={32} alt="Hello logo" />
    </div>
  </motion.nav>
);

export default Navbar;

"use client";

import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className="p-8 relative"
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className="absolute w-[50%] inset-0 flex text-2xl font-semibold text-white">
      <span>Hello.app</span>
    </div>
  </motion.nav>
);

export default Navbar;

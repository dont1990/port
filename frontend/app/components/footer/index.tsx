"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-container">
      <motion.footer
        ref={ref}
        className="mt-20 pt-8 border-t text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>&copy; 2025 Alex Johnson. All rights reserved.</p>
      </motion.footer>
    </section>
  );
};

export default Footer;

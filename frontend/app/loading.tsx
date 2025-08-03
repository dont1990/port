"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      >
        <motion.h1
          className="text-5xl font-bold text-primary" // Using a green color similar to the image
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Loading ...
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}

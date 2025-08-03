"use client";

import { motion } from "framer-motion";

interface AboutTextBlockProps {
  description?: string[];
  skills?: string[];
  isInView: boolean;
}

export function AboutTextBlock({
  description,
  skills,
  isInView,
}: AboutTextBlockProps) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {description?.slice(1).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {skills?.map((tech, index) => (
          <motion.span
            key={tech}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

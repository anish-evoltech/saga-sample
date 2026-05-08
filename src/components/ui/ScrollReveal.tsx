"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120, scale: 0.9, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        ease: [0.17, 0.55, 0.15, 1], // easeOutCubic kind of curve for a smooth dramatic pop
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      {children}
    </motion.div>
  );
}

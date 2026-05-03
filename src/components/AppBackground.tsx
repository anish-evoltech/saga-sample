"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import CursorGlow from "@/components/CursorGlow";
import EdgeTextures from "@/components/EdgeTextures";

export default function AppBackground() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <motion.div style={{ opacity: bgOpacity, scale: bgScale, position: "fixed", inset: 0, zIndex: 1 }}>
        <EdgeTextures />
      </motion.div>

      <CursorGlow />

      {/* Optimized Frosted Glass Layer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          backgroundColor: "rgba(3, 3, 6, 0.3)",
          pointerEvents: "none",
          willChange: "backdrop-filter",
          transform: "translateZ(0)"
        }}
      />
    </>
  );
}

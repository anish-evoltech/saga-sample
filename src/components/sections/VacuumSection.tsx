"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";

const EnergyPulse = ({ delay = 0, path }: { delay?: number; path: string }) => (
  <motion.path
    d={path}
    fill="none"
    stroke="rgba(123, 47, 255, 0.4)"
    strokeWidth="2"
    strokeDasharray="10 100"
    initial={{ strokeDashoffset: 110 }}
    animate={{ strokeDashoffset: -110 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
);

export default function VacuumSection() {
  const leftPath = "M 600,0 C 600,0 550,400 0,600";
  const rightPath = "M 600,0 C 600,0 650,400 1200,600";
  const midLeftPath = "M 600,20 C 600,20 570,400 300,600";
  const midRightPath = "M 600,20 C 600,20 630,400 900,600";

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.5]);

  return (
    <section
      style={{
        padding: "100px 0 0",
        position: "relative",
        overflow: "hidden",
        marginTop: "-80px",
        zIndex: 1,
      }}
    >
      <div
        className="container-xl"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              background: "rgba(123, 47, 255, 0.1)",
              padding: "8px 24px",
              borderRadius: "99px",
              border: "1px solid rgba(123, 47, 255, 0.2)",
              marginBottom: "32px",
              display: "inline-block",
            }}
          >
            AI Chat Bot
          </span>
          <h2
            className="text-h1 font-display"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.1,
              fontWeight: 100,
              color: "#fff",
            }}
          >
            Smarter AI for <br />
            Better Results
          </h2>
        </motion.div>
      </div>

      {/* The Vacuum Effect Visual */}
      <motion.div
        style={{
          position: "relative",
          height: "600px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          y,
          opacity
        }}
      >
        {/* Central glowing core pulse */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "100px",
            width: "300px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(123, 47, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          style={{ position: "absolute", bottom: 0, zIndex: 1 }}
        >
          <defs>
            <radialGradient id="vacuumCenter" cx="50%" cy="100%" r="90%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="20%" stopColor="#bf5fff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#7B2FFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <filter id="vacuumGlow">
              <feGaussianBlur stdDeviation="35" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* The Main Funnel Shape */}
          <path
            d="M 600,0 C 600,0 650,400 1200,600 L 0,600 C 550,400 600,0 600,0 Z"
            fill="url(#vacuumCenter)"
            filter="url(#vacuumGlow)"
            opacity="0.8"
          />

          {/* Static lines for structure */}
          <path
            d={leftPath}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
          <path
            d={rightPath}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />

          {/* Flowing Energy Pulses */}
          <EnergyPulse path={leftPath} delay={0} />
          <EnergyPulse path={rightPath} delay={1.5} />
          <EnergyPulse path={midLeftPath} delay={0.7} />
          <EnergyPulse path={midRightPath} delay={2.2} />

          {/* Additional core flowing lines */}
          <motion.path
            d="M 600,0 L 600,600"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="50 150"
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Ambient bottom expansion glow (Theme matching purple) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "300px",
            background:
              "linear-gradient(to bottom, transparent, rgba(123, 47, 255, 0.25) 100%)",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
      </motion.div>
    </section>
  );
}

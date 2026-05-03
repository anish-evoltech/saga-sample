"use client";

import { motion } from "framer-motion";
import { Sparkles, Command } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { useEffect, useState } from "react";

// ── Components ──────────────────────────────────────────────────────────────

const StarField = () => {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map(star => (
        <motion.div
          key={star.id}
          animate={{ opacity: [star.opacity, star.opacity * 0.4, star.opacity] }}
          transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "transparent",
            borderRadius: "50%",
            zIndex: 0
          }}
        />
      ))}
    </div>
  );
};

const ShootingPulse = ({ delay = 0, x = "50%" }) => (
  <motion.div
    initial={{ y: -100, opacity: 0, height: 0 }}
    animate={{
      y: [0, 500],
      opacity: [0, 0.6, 0.6, 0],
      height: [20, 100, 20]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    style={{
      position: "absolute",
      left: x,
      width: "1px",
      background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
      zIndex: 2,
    }}
  />
);

const LogoMarquee = () => {
  const logos = [
    { name: "Google", icon: "Google" },
    { name: "GitHub", icon: "GitHub" },
    { name: "Alchemy", icon: "Alchemy" },
    { name: "Brave", icon: "Brave" },
    { name: "Solana", icon: "Solana" },
    { name: "Vercel", icon: "Vercel" },
  ];

  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      padding: "60px 0 40px",
      position: "relative",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", width: "max-content", gap: "100px", alignItems: "center" }}
      >
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.25 }}>
            <span style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "0.05em",
              fontFamily: "var(--font-display)"
            }}>
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ComputeSection() {
  return (
    <section style={{
      padding: "160px 0 60px",
      position: "relative",
      backgroundColor: "transparent",
      overflow: "hidden"
    }}>
      <StarField />

      <div className="container-xl" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.02)", padding: "6px 16px", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "32px" }}>
            <Sparkles size={13} color="rgba(255,255,255,0.4)" />
            <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>
              Welcome to our onion ai
            </span>
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
            lineHeight: 1.1,
            fontWeight: 100,
            marginBottom: "28px",
            color: "#fff",
            letterSpacing: "-0.01em"
          }}>
            Modular compute<br />powered by CORA Engine.
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "1.05rem",
            fontWeight: 300,
            marginBottom: "44px",
            maxWidth: "580px",
            margin: "0 auto 44px",
            lineHeight: 1.6
          }}>
            Voice-triggered. Chain-aware. Built to scale.
          </p>

          <motion.div style={{ position: "relative", display: "inline-block" }}>
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "99px",
                background: "radial-gradient(circle, rgba(123,47,255,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
                zIndex: 0
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              style={{
                position: "relative",
                zIndex: 1,
                padding: "16px 48px",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.02em"
              }}
            >
              Enter the MCP Engine
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Central Visual */}
        <div style={{
          position: "relative",
          height: "500px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center"
        }}>
          {/* Wings - Smooth Rounded Curves */}
          <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="none" style={{ position: "absolute", zIndex: 1, opacity: 0.6 }}>
              <defs>
                <linearGradient id="wingFade" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="85%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                </linearGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Left Curve */}
              <path
                d="M 100,50 C 450,120 450,380 100,450"
                fill="none"
                stroke="url(#wingFade)"
                strokeWidth="1.5"
                filter="url(#softGlow)"
              />

              {/* Right Curve */}
              <path
                d="M 1100,50 C 750,120 750,380 1100,450"
                fill="none"
                stroke="url(#wingFade)"
                strokeWidth="1.5"
                filter="url(#softGlow)"
              />
            </svg>
          </div>

          {/* Central Lane / Pulses */}
          <div style={{
            position: "relative",
            width: "200px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
            zIndex: 2
          }}>
            <ShootingPulse x="25%" delay={0} />
            <ShootingPulse x="75%" delay={1.2} />
            <ShootingPulse x="50%" delay={2.4} />
            <ShootingPulse x="40%" delay={3.6} />

            {/* The Central Node */}
            <div style={{
              position: "absolute",
              top: "200px",
              width: "54px",
              height: "54px",
              borderRadius: "12px",
              background: "#030306",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(255,255,255,0.05)",
              zIndex: 10
            }}>
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Command size={24} color="rgba(255,255,255,0.8)" strokeWidth={1} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <LogoMarquee />
      </div>

      {/* Global Bottom Glow */}
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1400px",
        height: "600px",
        background: "radial-gradient(circle, rgba(123,47,255,0.03) 0%, transparent 70%)",
        filter: "blur(120px)",
        pointerEvents: "none"
      }} />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeIn, viewport } from "@/lib/animations";

const logos = [
  "Agentiq",
  "Nebula",
  "Quantum",
  "Synthex",
  "Neural",
  "Cortex",
  "DataFlow",
  "Axiom",
];

export default function LogoBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeIn}
      style={{
        padding: "40px 0",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: "24px",
        }}
      >
        Trusted by forward-thinking companies
      </p>
      <div className="logo-bar" style={{ overflow: "hidden" }}>
        <div
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "56px",
            whiteSpace: "nowrap",
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                transition: "color 0.3s",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  background: "rgba(123,47,255,0.06)",
                  border: "1px solid rgba(123,47,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "rgba(123,47,255,0.5)",
                  }}
                >
                  {logo[0]}
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight, Wifi, Shield, Zap } from "lucide-react";
import { slideRight, slideLeft, viewport } from "@/lib/animations";

export default function MobileSection() {
  return (
    <section style={{ padding: "120px 0", position: "relative" }}>
      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          right: "-100px",
          bottom: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,47,255,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(123,47,255,0.12), transparent)",
        }}
      />

      <div className="container-xl">
        <div
          className="mobile-grid"
          style={{ display: "grid", gap: "48px", alignItems: "center" }}
        >
          {/* Frosted Glass Card with Phone Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideRight}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                height: "500px",
                borderRadius: "32px",
                background:
                  "linear-gradient(180deg, rgba(30,20,50,0.6) 0%, rgba(5,5,10,0.9) 100%)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/phone-img.png"
                alt="SAGA Mobile App"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  zIndex: 2,
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  animation: "float-phone 6s ease-in-out infinite",
                }}
              />
              {/* Black fade overlay at the bottom to reduce sharpness */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "180px",
                  background:
                    "linear-gradient(to bottom, transparent 0%, #000 100%)",
                  zIndex: 3,
                  borderRadius: "0 0 32px 32px",
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideLeft}
          >
            <span className="section-badge">
              <Smartphone size={12} /> Mobile Ready
            </span>
            <h2
              className="text-h2 font-display"
              style={{
                marginTop: "24px",
                letterSpacing: "-0.03em",
                fontWeight: 100,
              }}
            >
              All you need to{" "}
              <span className="gradient-text">integrate AI</span> with your plan
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                maxWidth: "480px",
                marginTop: "20px",
                fontWeight: 300,
              }}
            >
              Access your AI models on the go. Our mobile-optimized platform
              lets you monitor, deploy, and manage models from anywhere.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                marginTop: "28px",
              }}
            >
              {[
                { icon: <Zap size={16} />, label: "Real-time Sync" },
                { icon: <Shield size={16} />, label: "Encrypted" },
                { icon: <Wifi size={16} />, label: "Offline Mode" },
                { icon: <Smartphone size={16} />, label: "Native Feel" },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span style={{ color: "#7B2FFF" }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              style={{ marginTop: "32px" }}
              id="mobile-cta"
            >
              Download App <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-phone {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @media (min-width: 1024px) {
          .mobile-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

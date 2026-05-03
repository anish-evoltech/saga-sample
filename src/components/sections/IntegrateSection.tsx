"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { slideLeft, slideRight, viewport } from "@/lib/animations";

export default function IntegrateSection() {
  const sparkles = Array.from({ length: 30 }).map((_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 170 + Math.random() * 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const size = 1 + Math.random() * 3;
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: Math.random() > 0.4 ? "#fff" : "#7B2FFF",
          boxShadow: "0 0 6px 2px #7B2FFF",
          animation: `sparkle-anim ${duration}s ease-in-out ${delay}s infinite alternate`,
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />
    );
  });

  return (
    <section
      id="integration"
      style={{ padding: "120px 0", position: "relative", overflowX: "hidden" }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "-200px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle top border line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(123,47,255,0.15), transparent)",
        }}
      />

      <div className="container-xl" style={{}}>
        <div
          className="integrate-grid"
          style={{ display: "grid", gap: "48px", alignItems: "center" }}
        >
          {/* Image & Flame Aura */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideLeft}
            style={{
              height: "420px",
              position: "relative",
              order: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="integrate-ring"
          >
            {/* Core background glow */}
            <div
              style={{
                position: "absolute",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(123,47,255,0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
                zIndex: 0,
              }}
            />

            {/* Aura Waves */}
            <div className="aura-wave aura-1" />
            <div className="aura-wave aura-2" />
            <div className="aura-wave aura-3" />

            {/* Robo Arm Image */}
            <img
              src="/robo-arm.png"
              alt="AI Robot Arm"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                position: "relative",
                transform: "scaleX(-1)",
                zIndex: 2,
                animation: "float-arm 6s ease-in-out infinite",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideRight}
            style={{ order: 2 }}
          >
            <span className="section-badge">
              <Zap size={12} /> Integration
            </span>
            <p
              className="text-[48px] font-display"
              style={{
                marginTop: "24px",
                letterSpacing: "-0.03em",
                fontWeight: 100,
                lineHeight: 1.1,
              }}
            >
              Easily integrate{" "}
              <span className="gradient-text">our services</span> into your
              product
            </p>
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
              Our powerful API allows seamless integration with your existing
              infrastructure. Connect your data pipelines, automate model
              training, and deploy AI solutions in minutes — not months.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              {[
                { label: "RESTful API", color: "#00E87A" },
                { label: "WebSocket Support", color: "#2F8FFF" },
                { label: "SDK Libraries", color: "#7B2FFF" },
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
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: f.color,
                      boxShadow: `0 0 8px ${f.color}40`,
                    }}
                  />
                  {f.label}
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              style={{ marginTop: "32px" }}
              id="integrate-cta"
            >
              Get started <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .aura-wave {
          position: absolute;
          z-index: 1;
          box-shadow:
            0 0 15px rgba(123, 47, 255, 0.6),
            inset 0 0 15px rgba(123, 47, 255, 0.6);
        }
        .aura-1 {
          width: 400px;
          height: 400px;
          border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%;
          border: 2px solid rgba(123, 47, 255, 0.8);
          animation: aura-spin-1 8s linear infinite;
        }
        .aura-2 {
          width: 420px;
          height: 420px;
          border-radius: 50% 50% 40% 60% / 60% 40% 50% 50%;
          border: 1px solid rgba(255, 255, 255, 0.5);
          animation: aura-spin-2 12s linear infinite reverse;
        }
        .aura-3 {
          width: 440px;
          height: 440px;
          border-radius: 60% 40% 55% 45% / 40% 60% 45% 55%;
          border: 3px solid rgba(123, 47, 255, 0.4);
          animation: aura-spin-3 10s linear infinite;
        }

        @keyframes aura-spin-1 {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.03);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        @keyframes aura-spin-2 {
          0% {
            transform: rotate(0deg) scale(1.01);
          }
          50% {
            transform: rotate(180deg) scale(0.98);
          }
          100% {
            transform: rotate(360deg) scale(1.01);
          }
        }
        @keyframes aura-spin-3 {
          0% {
            transform: rotate(0deg) scale(0.99);
          }
          50% {
            transform: rotate(180deg) scale(1.04);
          }
          100% {
            transform: rotate(360deg) scale(0.99);
          }
        }

        @keyframes sparkle-anim {
          0% {
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4) translateY(-15px);
            opacity: 1;
            filter: brightness(1.5);
          }
        }
        @keyframes float-arm {
          0%,
          100% {
            transform: translateY(0) scaleX(-1);
          }
          50% {
            transform: translateY(-12px) scaleX(-1);
          }
        }
        @media (min-width: 1024px) {
          .integrate-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

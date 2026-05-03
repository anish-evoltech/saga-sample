"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Cpu,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Wrench,
} from "lucide-react";
import {
  fadeUp,
  slideRight,
  slideLeft,
  staggerContainer,
  viewport,
} from "@/lib/animations";

const steps = [
  {
    num: "01",
    icon: <Upload size={20} />,
    title: "Upload your data",
    desc: "Upload datasets in any format — CSV, JSON, or connect directly to your database.",
  },
  {
    num: "02",
    icon: <Cpu size={20} />,
    title: "Train the model",
    desc: "Select pre-built architectures or customize your own with AutoML optimization.",
  },
  {
    num: "03",
    icon: <BarChart3 size={20} />,
    title: "Get results",
    desc: "Deploy via API or embed directly. Monitor performance in real-time.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section style={{ padding: "120px 0", position: "relative" }}>
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
          className="hiw-grid"
          style={{ display: "grid", gap: "48px", alignItems: "start" }}
        >
          {/* Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideRight}
          >
            <span className="section-badge">
              <Wrench size={12} /> How it works
            </span>
            <h2
              className="text-h2 font-display"
              style={{
                marginTop: "24px",
                letterSpacing: "-0.03em",
                fontWeight: 100,
              }}
            >
              Learn how <span className="gradient-text">SAGA</span> works
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                maxWidth: "420px",
                marginTop: "16px",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Three simple steps to transform your data into actionable AI
              insights.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "36px",
              }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {steps.map((step, i) => (
                  <motion.button
                    key={step.num}
                    variants={fadeUp}
                    onClick={() => setActiveStep(i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "18px 20px",
                      borderRadius: "14px",
                      border: `1px solid ${activeStep === i ? "rgba(180,130,255,0.35)" : "rgba(255,255,255,0.08)"}`,
                      background:
                        activeStep === i
                          ? "rgba(255,255,255,0.09)"
                          : "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      color: "#fff",
                    }}
                    id={`step-${i}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "14px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background:
                            activeStep === i
                              ? "rgba(123,47,255,0.12)"
                              : "rgba(255,255,255,0.03)",
                          border: `1px solid ${activeStep === i ? "rgba(123,47,255,0.15)" : "rgba(255,255,255,0.04)"}`,
                          color:
                            activeStep === i ? "#7B2FFF" : "var(--text-muted)",
                          transition: "all 0.3s",
                        }}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              fontFamily: "var(--font-mono)",
                              color:
                                activeStep === i
                                  ? "#7B2FFF"
                                  : "var(--text-muted)",
                            }}
                          >
                            {step.num}
                          </span>
                          <h3 style={{ fontSize: "14px", fontWeight: 100 }}>
                            {step.title}
                          </h3>
                        </div>
                        {activeStep === i && (
                          <p
                            style={{
                              fontSize: "13px",
                              color: "var(--text-secondary)",
                              lineHeight: 1.65,
                              marginTop: "4px",
                              fontWeight: 300,
                            }}
                          >
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Training Panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideLeft}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                padding: "28px",
                position: "sticky",
                top: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#7B2FFF",
                      boxShadow: "0 0 12px rgba(123,47,255,0.5)",
                      animation: "pulse-glow 2s infinite",
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 300 }}>
                    Train on new model AI
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  v3.2.1
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {[
                  {
                    label: "Data Upload",
                    icon: <Upload size={14} />,
                    active: activeStep >= 0,
                    color: "#7B2FFF",
                  },
                  {
                    label: "Model Training",
                    icon: <Cpu size={14} />,
                    active: activeStep >= 1,
                    color: "#2F8FFF",
                  },
                  {
                    label: "Results & Deploy",
                    icon: <BarChart3 size={14} />,
                    active: activeStep >= 2,
                    color: "#00E87A",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      border: `1px solid ${s.active ? `${s.color}18` : "rgba(255,255,255,0.04)"}`,
                      background: s.active
                        ? `${s.color}06`
                        : "rgba(255,255,255,0.01)",
                      transition: "all 0.5s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: s.active ? s.color : "var(--text-muted)",
                          }}
                        >
                          {s.icon}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 300,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                      {s.active && <CheckCircle size={14} color="#00E87A" />}
                    </div>
                    <div
                      style={{
                        height: "4px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.04)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "999px",
                          background: `linear-gradient(to right, ${s.color}, ${s.color}88)`,
                          width: s.active ? "100%" : "0%",
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={activeStep >= 2 ? "btn-primary" : ""}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border:
                    activeStep >= 2
                      ? "1px solid rgba(180,130,255,0.35)"
                      : "1px solid rgba(255,255,255,0.08)",
                  background:
                    activeStep >= 2
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  color:
                    activeStep >= 2
                      ? "rgba(255,255,255,0.92)"
                      : "var(--text-muted)",
                  cursor: activeStep >= 2 ? "pointer" : "not-allowed",
                }}
              >
                {activeStep >= 2 ? (
                  <>
                    Deploy Model <ArrowRight size={14} />
                  </>
                ) : (
                  "Waiting for training..."
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .hiw-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

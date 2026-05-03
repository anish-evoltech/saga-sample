"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Quote, MessageSquare } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/animations";

const testimonials = [
  {
    name: "John Clarke",
    role: "CTO at TechVision",
    avatar: "JC",
    quote:
      "SAGA improved efficiency and accuracy in our manufacturing process. The automated ML pipelines reduced our model deployment time by 85%.",
    rating: 5,
  },
  {
    name: "Sophie Moore",
    role: "Head of AI at DataFlow",
    avatar: "SM",
    quote:
      "SAGA recognition improved speed and accuracy of inventory management. Processing 50,000 items daily with zero human intervention.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "VP Engineering at NeuralOps",
    avatar: "MC",
    quote:
      "The integration was seamless. Within a week, we had our entire NLP pipeline running on SAGA. 40% faster inference and 15% better accuracy.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Data Science Lead at Synthex",
    avatar: "ER",
    quote:
      "What sets SAGA apart is the AutoML capability. We went from raw data to production model in under 4 hours. Unprecedented.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)",
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto 72px",
          }}
        >
          <span className="section-badge">
            <MessageSquare size={12} /> Testimonials
          </span>
          <h2
            className="text-h2 font-display"
            style={{
              marginTop: "24px",
              letterSpacing: "-0.03em",
              fontWeight: 100,
            }}
          >
            Hear what they say <span className="gradient-text">about us</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "18px",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Trusted by thousands of businesses worldwide
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "20px",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                padding: "28px",
                transition:
                  "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(123,47,255,0.15)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px rgba(123,47,255,0.1), 0 20px 50px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Quote
                size={20}
                color="rgba(123,47,255,0.2)"
                style={{ marginBottom: "16px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7B2FFF, #2F8FFF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 300,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 100 }}>
                    {t.name}
                  </h4>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "2px", marginBottom: "14px" }}
              >
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star key={j} size={13} color="#FBBF24" fill="#FBBF24" />
                ))}
              </div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <button className="btn-primary" id="testimonials-cta">
            Get started <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ImageIcon, Tag, Target } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/animations";

const tabs = [
  {
    id: "text",
    label: "Text Classification",
    icon: <FileText size={16} />,
    title: "Text Classification",
    description:
      "Our advanced NLP models can automatically classify, categorize, and extract insights from text data across multiple languages. Process thousands of documents in seconds with industry-leading accuracy.",
    badges: [
      "Automated Annotation",
      "Language Translation",
      "Sentiment Analysis",
      "Customer Feedback",
    ],
  },
  {
    id: "image",
    label: "Image Classification",
    icon: <ImageIcon size={16} />,
    title: "Image Classification",
    description:
      "Leverage state-of-the-art computer vision to classify images, detect objects, and perform semantic segmentation. Our models are trained on billions of images for unparalleled accuracy.",
    badges: [
      "Object Detection",
      "Scene Recognition",
      "Face Analysis",
      "OCR Processing",
    ],
  },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState("text");
  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="plugins" style={{ padding: "120px 0", position: "relative" }}>
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

      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,47,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
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
            margin: "0 auto 48px",
          }}
        >
          <span className="section-badge">
            <Target size={12} /> Use Cases
          </span>
          <h2
            className="text-h2 font-display"
            style={{
              marginTop: "24px",
              letterSpacing: "-0.03em",
              fontWeight: 100,
            }}
          >
            Use <span className="gradient-text">cases</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 300,
                cursor: "pointer",
                transition: "all 0.3s ease",
                color:
                  activeTab === tab.id
                    ? "rgba(255,255,255,0.95)"
                    : "var(--text-secondary)",
                background:
                  activeTab === tab.id
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab.id ? "rgba(180,130,255,0.40)" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow:
                  activeTab === tab.id
                    ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(123,47,255,0.25)"
                    : "none",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={scaleIn}
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "16px",
            padding: "40px 48px",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <Tag size={20} color="#7B2FFF" />
            <h3
              className="font-display"
              style={{ fontSize: "1.25rem", fontWeight: 100 }}
            >
              {activeData.title}
            </h3>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "24px",
              fontWeight: 300,
            }}
          >
            {activeData.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {activeData.badges.map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: "12px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(123,47,255,0.15)",
                  background: "rgba(123,47,255,0.05)",
                  color: "var(--accent-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, FileText } from "lucide-react";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

const articles = [
  {
    category: "Machine Learning",
    date: "Jan 06 2026",
    title: "Simplify ML workflows using SAGA's automated feature engineering",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, rgba(123,47,255,0.4), rgba(47,143,255,0.2))",
  },
  {
    category: "NLP",
    date: "Dec 18 2025",
    title: "Expanding language-model capabilities beyond English into 50+ languages",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, rgba(191,95,255,0.3), rgba(123,47,255,0.2))",
  },
  {
    category: "Computer Vision",
    date: "Nov 22 2025",
    title: "Real-time object detection at scale: lessons from production deployments",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, rgba(47,143,255,0.4), rgba(0,229,255,0.2))",
  },
  {
    category: "AI Ethics",
    date: "Oct 15 2025",
    title: "Building responsible AI: our approach to bias detection and fairness",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    gradient: "linear-gradient(135deg, rgba(123,47,255,0.3), rgba(255,95,123,0.2))",
  },
];

export default function Articles() {
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <span className="section-badge">
              <FileText size={12} /> Blog
            </span>
            <h2
              className="text-h2 font-display"
              style={{
                marginTop: "24px",
                letterSpacing: "-0.03em",
                fontWeight: 100,
              }}
            >
              Articles and <span className="gradient-text">News</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: "12px",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Stay updated with the latest in AI and machine learning
            </p>
          </div>
          <button
            className="btn-outline"
            style={{ fontSize: "14px" }}
            id="articles-browse-all"
          >
            Browse all posts <ArrowRight size={14} />
          </button>
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
          {articles.map((article, i) => (
            <motion.a
              href="#"
              key={article.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                overflow: "hidden",
                textDecoration: "none",
                color: "#fff",
                transition:
                  "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                display: "block",
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
              {/* Image Area */}
              <div
                style={{
                  height: "220px",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#000",
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(1) contrast(1.2) brightness(0.7)",
                    transition: "transform 0.5s ease",
                  }}
                  className="article-img"
                />
                {/* Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: article.gradient,
                    mixBlendMode: "overlay",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 30%, rgba(3,3,6,0.8) 100%)",
                  }}
                />
              </div>
              {/* Content */}
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "#7B2FFF",
                    }}
                  >
                    {article.category}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-muted)" }}
                  >
                    ·
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <Calendar size={10} /> {article.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 100,
                    lineHeight: 1.45,
                    marginBottom: "16px",
                    fontFamily: "var(--font-display)"
                  }}
                >
                  {article.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    color: "#7B2FFF",
                    fontWeight: 300,
                  }}
                >
                  Read more <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

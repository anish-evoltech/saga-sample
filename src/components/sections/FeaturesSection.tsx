"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Lock,
  ShieldCheck,
  UserX,
  Sparkles,
  ShieldAlert,
  Activity,
  Zap,
  Fingerprint,
  EyeOff,
  Boxes,
  LockKeyhole
} from "lucide-react";
import { fadeUp, staggerContainer, viewport } from "@/lib/animations";

// ── Components for "Live" Visuals ───────────────────────────────────────────

const Card1Visual = () => (
  <div style={{ position: "relative", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    <motion.div
      animate={{
        boxShadow: ["0 0 20px rgba(123,47,255,0.2)", "0 0 40px rgba(123,47,255,0.4)", "0 0 20px rgba(123,47,255,0.2)"]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "radial-gradient(circle, #1a0b33 0%, #030306 100%)",
        border: "1px solid rgba(123,47,255,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
      }}
    >
      <TrendingDown color="#7B2FFF" size={28} />
    </motion.div>

    {/* Connection lines and nodes */}
    <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="240" height="100" style={{ position: "absolute" }}>
        <motion.line
          x1="40" y1="50" x2="88" y2="50"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="152" y1="50" x2="200" y2="50"
          stroke="rgba(47,143,255,0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, 8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div style={{ position: "absolute", left: "30px", opacity: 0.4 }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Fingerprint size={12} color="#fff" />
        </div>
      </div>

      <div style={{ position: "absolute", right: "30px" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1a45ff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 15px rgba(26,69,255,0.5)" }}
        >
          <ShieldCheck size={14} color="#fff" />
        </motion.div>
      </div>
    </div>
  </div>
);

const Card2Visual = () => {
  const nodes = [
    { icon: <Lock size={10} />, x: -60, y: -40 },
    { icon: <ShieldAlert size={10} />, x: 60, y: -40 },
    { icon: <Boxes size={10} />, x: -80, y: 0 },
    { icon: <Activity size={10} />, x: 80, y: 0 },
    { icon: <Zap size={10} />, x: -60, y: 40 },
    { icon: <EyeOff size={10} />, x: 60, y: 40 },
  ];

  return (
    <div style={{ position: "relative", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "120px", height: "120px", border: "1px solid rgba(123,47,255,0.1)", borderRadius: "50%" }}
      />

      <div style={{
        width: "50px",
        height: "58px",
        background: "rgba(123,47,255,0.15)",
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(123,47,255,0.4)",
        boxShadow: "0 0 20px rgba(123,47,255,0.2)"
      }}>
        <LockKeyhole color="#fff" size={24} />
      </div>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          style={{
            position: "absolute",
            transform: `translate(${node.x}px, ${node.y}px)`,
            width: "24px",
            height: "24px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {node.icon}
          <svg style={{ position: "absolute", width: "100px", height: "100px", overflow: "visible", pointerEvents: "none" }}>
            <line
              x1="12" y1="12" x2={-node.x + 12} y2={-node.y + 12}
              stroke="rgba(123,47,255,0.2)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Card3Visual = () => (
  <div style={{ position: "relative", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "radial-gradient(circle, #7B2FFF 0%, transparent 70%)", filter: "blur(40px)" }} />

    <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            style={{ width: "20px", height: "20px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        ))}
      </div>

      <motion.div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #1a45ff 0%, #7B2FFF 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px rgba(123,47,255,0.4)",
          position: "relative"
        }}
      >
        <ShieldCheck color="#fff" size={32} />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", inset: "-10px", border: "1px solid rgba(123,47,255,0.3)", borderRadius: "16px" }}
        />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {[1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            style={{ width: "20px", height: "20px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Card4Visual = () => (
  <div style={{ position: "relative", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{ position: "absolute", width: "130px", height: "130px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "50%" }}
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{ position: "absolute", width: "100px", height: "100px", border: "1px dashed rgba(123,47,255,0.15)", borderRadius: "50%" }}
    />

    <div style={{
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "radial-gradient(circle, #330b1a 0%, #030306 100%)",
      border: "1px solid rgba(255,20,56,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 20px rgba(255,20,56,0.15)"
    }}>
      <UserX color="#ff1438" size={28} />
    </div>

    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ position: "absolute", top: "45px", right: "45px", width: "12px", height: "12px", borderRadius: "50%", background: "#ff1438", border: "2px solid #030306" }}
    />
  </div>
);

// ── Feature Data ────────────────────────────────────────────────────────────

const features = [
  {
    title: "Massive Losses",
    description: "$1.7B+ stolen from wallets in 2024 alone, with losses accelerating monthly.",
    visual: <Card1Visual />
  },
  {
    title: "Hidden Approvals",
    description: "65% of users have unrevoked malicious approvals draining their wallets silently.",
    visual: <Card2Visual />
  },
  {
    title: "Privacy Tracking",
    description: "Most don't know they're being tracked until it's too late to protect their assets.",
    visual: <Card3Visual />
  },
  {
    title: "Automated Attacks",
    description: "Fake airdrops and Telegram bot scrapers cause 20K+ wallet drains per month.",
    visual: <Card4Visual />
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: "120px 0", position: "relative", backgroundColor: "transparent" }}>
      {/* Background Atmosphere */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "600px", background: "radial-gradient(ellipse at center, rgba(123,47,255,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 80px" }}
        >
          <span className="section-badge" style={{ background: "rgba(123,47,255,0.1)", color: "#7B2FFF", border: "1px solid rgba(123,47,255,0.2)" }}>
            <Sparkles size={12} style={{ marginRight: "6px" }} /> Security Intelligence
          </span>
          <h2 className="text-h2 font-display" style={{ marginTop: "24px", letterSpacing: "-0.02em", fontWeight: 100 }}>
            Stay ahead of <span className="gradient-text">evolving threats</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "20px", fontSize: "1.1rem", fontWeight: 300 }}>
            Our AI-powered security engine monitors global blockchain activity to protect your digital assets in real-time.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                transition: "border-color 0.3s ease, background 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(123,47,255,0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              }}
            >
              {/* Subtle top-corner glow */}
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(123,47,255,0.1) 0%, transparent 70%)", filter: "blur(20px)" }} />

              {/* Visual Asset Container */}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: "16px",
                marginBottom: "32px",
                border: "1px solid rgba(255,255,255,0.03)",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {feature.visual}
              </div>

              {/* Text Content */}
              <h3 className="font-display" style={{ fontSize: "1.25rem", marginBottom: "16px", color: "#fff", fontWeight: 100 }}>
                {feature.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 300 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

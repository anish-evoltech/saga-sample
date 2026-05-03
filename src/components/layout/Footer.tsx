"use client";

import { Zap, ArrowRight } from "lucide-react";

const footerColumns = [
  {
    title: "Pages",
    links: ["Home", "About", "Features", "Pricing", "Blog"],
  },
  {
    title: "Utility Pages",
    links: ["Style Guide", "404 Page", "Password", "Licenses", "Changelog"],
  },
  {
    title: "Sample Pages",
    links: ["SaaS Page", "Landing Page", "Pricing Page", "Contact Page", "More..."],
  },
];

export default function Footer() {
  return (
    <footer id="footer" style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Main Footer Content */}
      <div className="container-xl" style={{ padding: "64px 24px" }}>
        <div className="footer-grid" style={{ display: "grid", gap: "40px" }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <img src="/logo.png" alt="SAGA Logo" style={{ height: "30px", width: "auto" }} />
              <span style={{ 
                fontFamily: "'Gugi', cursive", 
                fontSize: "20px", 
                color: "#fff", 
                letterSpacing: "0.05em",
                marginTop: "2px" 
              }}>
                SAGA
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.75, maxWidth: "280px", marginBottom: "28px", fontWeight: 300 }}>
              Empowering businesses with intelligent AI automation solutions. Transform your workflows with cutting-edge machine learning.
            </p>

            {/* Newsletter */}
            <div style={{ display: "flex", gap: "8px", maxWidth: "340px" }}>
              <input
                type="email"
                placeholder="Enter your email"
                id="footer-email-input"
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  fontSize: "13px",
                  color: "#fff",
                  outline: "none",
                }}
              />
              <button className="btn-primary" style={{ padding: "10px 18px", fontSize: "13px", whiteSpace: "nowrap" }}>
                Subscribe <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: "14px", fontWeight: 100, marginBottom: "20px" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-xl" style={{ padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} SAGA. All rights reserved. Designed with 💜
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a key={link} href="#" style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

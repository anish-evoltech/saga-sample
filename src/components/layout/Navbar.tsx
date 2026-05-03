"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Plugins", href: "#plugins" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      id="navbar"
      className={scrolled ? "navbar-blur" : ""}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? undefined : "transparent",
      }}
    >
      <div className="container-xl" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img src="/logo.png" alt="SAGA Logo" style={{ height: "30px", width: "auto" }} />
          <span style={{
            fontFamily: "'Gugi', cursive",
            fontSize: "30px",
            color: "#fff",
            letterSpacing: "0.05em",
            marginTop: "2px"
          }}>
            SAGA
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-desktop">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ fontSize: "14px", fontWeight: 300, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }} className="nav-desktop">
          <a href="#" style={{ fontSize: "14px", fontWeight: 300, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}>
            Sign In
          </a>
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "13px" }}>
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", color: "#fff", padding: "8px", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "rgba(3,3,6,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container-xl" style={{ padding: "24px" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ display: "block", padding: "12px 0", fontSize: "16px", fontWeight: 300, color: "var(--text-secondary)", textDecoration: "none" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "12px 0" }} />
            <a href="#" style={{ display: "block", padding: "12px 0", fontSize: "16px", fontWeight: 300, color: "var(--text-secondary)", textDecoration: "none" }}>
              Sign In
            </a>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}>
              Get Started
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-mobile-toggle { display: none; }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

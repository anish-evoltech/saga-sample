"use client";

import React, { useEffect, useRef } from "react";

// ── Tuning ──────────────────────────────────────────────────────────────────
const PANEL_W = 200; // px wide for each edge panel
const DOT_GAP = 8; // dot-grid spacing (px in SVG coords)
const DOT_R = 1.5; // dot radius
const SVG_H = 1000; // viewBox height (scales to 100dvh via CSS)
const ZONE = 320; // px from edge where hover glow starts
const BRIGHTNESS_REST = 0.6; // idle brightness (dim)
const BRIGHTNESS_PEAK = 1.5; // peak brightness on cursor-at-edge

// ── Inner SVG ───────────────────────────────────────────────────────────────
// Each SVG has two curved "sheet" bands clipped with S-curve bezier paths,
// a dot-grid fill, and colored gradient washes (blue → purple → red/pink)
// matching the photo reference.  The right panel mirrors this with scaleX(-1)
// applied on the inner wrapper so mix-blend-mode on the outer div still works.

function EdgeSVG({ pfx }: { pfx: string }) {
  const id = (s: string) => `${pfx}-${s}`;
  const W = PANEL_W;
  const H = SVG_H;

  // Band 1: wide S-curve band, upper-dominant (blue → purple wash)
  const band1 = [
    `M 0,0 L ${W},0`,
    `C ${W},132 ${W * 0.82},256 ${W * 0.64},386`,
    `C ${W * 0.46},516 ${W * 0.52},616 ${W * 0.7},731`,
    `C ${W * 0.88},846 ${W},904 ${W},${H}`,
    `L 0,${H} Z`,
  ].join(" ");

  // Band 2: narrower band in lower-right, overlaps band 1 (purple → red wash)
  const band2 = [
    `M ${W * 0.32},268`,
    `C ${W * 0.62},308 ${W},408 ${W},534`,
    `C ${W},660 ${W * 0.76},766 ${W * 0.5},866`,
    `C ${W * 0.24},966 0,${H} 0,${H}`,
    `L 0,574`,
    `C ${W * 0.1},537 ${W * 0.2},437 ${W * 0.32},268 Z`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        {/* ── Dot grid ── */}
        <pattern
          id={id("d")}
          width={DOT_GAP}
          height={DOT_GAP}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={DOT_GAP / 2}
            cy={DOT_GAP / 2}
            r={DOT_R}
            fill="rgba(235,218,255,0.82)"
          />
        </pattern>

        {/* ── Color washes ── */}
        {/* Blue — top of panel */}
        <radialGradient id={id("gb")} cx="42%" cy="16%" r="72%">
          <stop offset="0%" stopColor="#1845ff" stopOpacity="1" />
          <stop offset="44%" stopColor="#2e14bb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* Purple — mid panel */}
        <radialGradient id={id("gp")} cx="58%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#aa22ff" stopOpacity="1" />
          <stop offset="52%" stopColor="#5808bb" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* Red/pink — bottom of panel */}
        <radialGradient id={id("gr")} cx="44%" cy="83%" r="56%">
          <stop offset="0%" stopColor="#ff1438" stopOpacity="0.9" />
          <stop offset="42%" stopColor="#cc0668" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* ── Clip paths ── */}
        <clipPath id={id("c1")}>
          <path d={band1} />
        </clipPath>
        <clipPath id={id("c2")}>
          <path d={band2} />
        </clipPath>
      </defs>

      {/* ── Band 1: blue / purple ── */}
      <g clipPath={`url(#${id("c1")})`}>
        <rect width={W} height={H} fill={`url(#${id("d")})`} />
        <rect width={W} height={H} fill={`url(#${id("gb")})`} opacity="0.78" />
        <rect width={W} height={H} fill={`url(#${id("gp")})`} opacity="0.62" />
      </g>

      {/* ── Band 2: purple / red ── */}
      <g clipPath={`url(#${id("c2")})`}>
        <rect width={W} height={H} fill={`url(#${id("d")})`} opacity="0.9" />
        <rect width={W} height={H} fill={`url(#${id("gp")})`} opacity="0.58" />
        <rect width={W} height={H} fill={`url(#${id("gr")})`} opacity="0.72" />
      </g>
    </svg>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function EdgeTextures() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;

      const lt = Math.max(0, 1 - e.clientX / ZONE);
      const rt = Math.max(0, 1 - (w - e.clientX) / ZONE);

      const bLeft = BRIGHTNESS_REST + lt * (BRIGHTNESS_PEAK - BRIGHTNESS_REST);
      const bRight = BRIGHTNESS_REST + rt * (BRIGHTNESS_PEAK - BRIGHTNESS_REST);

      if (leftRef.current)
        leftRef.current.style.filter = `brightness(${bLeft})`;
      if (rightRef.current)
        rightRef.current.style.filter = `brightness(${bRight})`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Outer div: blend mode + filter (no transform — avoids blend-mode conflicts)
  const outer: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: `${PANEL_W}px`,
    height: "100dvh",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 1,
    mixBlendMode: "screen",
    filter: `brightness(${BRIGHTNESS_REST})`,
    transition: "filter 0.4s ease",
  };

  // Inner div for right side: mirror content, keeps outer blend mode clean
  const mirrorInner: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transform: "scaleX(-1)",
  };

  return (
    <>
      {/* ── Left edge ── */}
      <div ref={leftRef} aria-hidden="true" style={{ ...outer, left: 0 }}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <EdgeSVG pfx="el" />
        </div>
      </div>

      {/* ── Right edge (mirrored content) ── */}
      <div ref={rightRef} aria-hidden="true" style={{ ...outer, right: 0 }}>
        <div style={mirrorInner}>
          <EdgeSVG pfx="er" />
        </div>
      </div>
    </>
  );
}

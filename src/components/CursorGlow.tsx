"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 8; // independent spread blobs

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const target = useRef({ x: -600, y: -600 });
  const head = useRef({ x: -600, y: -600 });
  // Each node independently chases `target` (not the previous node)
  // → they spread out in space when you move = "spreading smear" feel
  const nodes = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -600, y: -600 })),
  );
  const prev = useRef({ x: -600, y: -600 });
  const smoothVx = useRef(0);
  const smoothVy = useRef(0);
  const rafRef = useRef<number>(0);

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const HOVER_SEL =
      'a, button, [role="button"], input, textarea, select, label, [tabindex]';

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SEL)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SEL)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    // ── Frame-rate-independent exponential decay lerp ──
    // alpha = 1 - exp(-k * dt)  →  same feel at any FPS
    // k values tuned for ~60 fps baseline
    const headK = 2.8;
    // Each node chases the one in front — keeps the chain connected at any speed
    const nodeK = 9.5; // high k = node snaps tightly to its leader

    const dlerp = (a: number, b: number, k: number, dt: number) =>
      a + (b - a) * (1 - Math.exp(-k * dt));

    let lastTime = 0;

    const loop = (timestamp: number) => {
      const dt =
        lastTime === 0 ? 0.016 : Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      prev.current = { ...head.current };
      head.current.x = dlerp(head.current.x, target.current.x, headK, dt);
      head.current.y = dlerp(head.current.y, target.current.y, headK, dt);

      const rawVx = head.current.x - prev.current.x;
      const rawVy = head.current.y - prev.current.y;
      smoothVx.current += (rawVx - smoothVx.current) * 0.2;
      smoothVy.current += (rawVy - smoothVy.current) * 0.2;
      const speed = Math.sqrt(smoothVx.current ** 2 + smoothVy.current ** 2);

      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${head.current.x}px, ${head.current.y}px)`;
        mainRef.current.style.filter = `blur(${dlerp(22, 14, 4, Math.min(speed / 6, 1))}px)`;
      }

      // Chain: node[0] chases head, node[i] chases node[i-1]
      // Each node's k is slightly lower so the tail eases more — gives spread feel
      // without ever disconnecting because the gap between leader and follower
      // is bounded by the lerp ratio, not by cursor jump distance
      const chainKs = [9.0, 7.5, 6.2, 5.1, 4.1, 3.3, 2.6, 2.0];
      nodes.current.forEach((node, i) => {
        const leader = i === 0 ? head.current : nodes.current[i - 1];
        node.x = dlerp(node.x, leader.x, chainKs[i], dt);
        node.y = dlerp(node.y, leader.y, chainKs[i], dt);

        const el = trailRefs.current[i];
        if (!el) return;

        const t = (i + 1) / (TRAIL_COUNT + 1);
        const spreadScale = 0.88 + t * 0.42;

        el.style.transform = `translate(${node.x}px, ${node.y}px) scale(${spreadScale})`;
        el.style.opacity = String(0.62 * (1 - t * t));
      });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  const blobBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    willChange: "transform, opacity",
    mixBlendMode: "screen",
    transformOrigin: "center center",
    zIndex: 2,
  };

  return (
    <>
      {/* ── Spread trail blobs (rendered beneath main) ── */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          aria-hidden="true"
          style={{
            ...blobBase,
            width: "300px",
            height: "300px",
            marginLeft: "-150px",
            marginTop: "-150px",
            borderRadius: "50%",
            background: `radial-gradient(
              ellipse 60% 100% at 50% 48%,
              rgba(210, 160, 255, 0.75)  0%,
              rgba(150, 70,  255, 0.55) 20%,
              rgba(100, 25,  210, 0.30) 46%,
              rgba(55,  0,   155, 0.10) 70%,
              transparent 100%
            )`,
            filter: "blur(28px)",
            opacity: 0,
          }}
        />
      ))}

      {/* ── Main head blob ── */}
      <div
        ref={mainRef}
        aria-hidden="true"
        style={{
          ...blobBase,
          width: "260px",
          height: "260px",
          marginLeft: "-130px",
          marginTop: "-130px",
          borderRadius: "50%",
          background: `radial-gradient(
            ellipse 48% 100% at 50% 38%,
            rgba(255, 252, 255, 1.00)  0%,
            rgba(232, 195, 255, 0.95)  9%,
            rgba(185, 105, 255, 0.82) 24%,
            rgba(135, 55,  245, 0.60) 44%,
            rgba(85,  12,  205, 0.30) 66%,
            rgba(45,  0,   145, 0.08) 85%,
            transparent 100%
          )`,
          filter: "blur(20px)",
        }}
      />

      {/* ── Cursor dot ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...blobBase,
          mixBlendMode: "normal",
          marginLeft: hovering ? "-10px" : "-7px",
          marginTop: hovering ? "-10px" : "-7px",
          width: hovering ? "20px" : "14px",
          height: hovering ? "20px" : "14px",
          borderRadius: "50%",
          zIndex: 9999,
          backgroundColor: hovering ? "#9b30ff" : "rgba(240, 230, 255, 0.92)",
          boxShadow: hovering
            ? "0 0 12px rgba(155, 48, 255, 0.9), 0 0 28px rgba(155, 48, 255, 0.45)"
            : "0 0 8px rgba(255, 245, 255, 0.7)",
          filter: "none",
          transition:
            "width 0.18s ease, height 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, margin 0.18s ease",
        }}
      />
    </>
  );
}

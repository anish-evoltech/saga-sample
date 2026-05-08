"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -600, y: -600 });
    const currentPos = useRef({ x: -600, y: -600 });
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

      const dlerp = (a: number, b: number, k: number, dt: number) =>
        a + (b - a) * (1 - Math.exp(-k * dt));

      const cursorK = 12.0; // The smaller, the smoother/slower. 12 gives a nice fluid follow.
      let lastTime = 0;

      const loop = (timestamp: number) => {
        const dt =
          lastTime === 0 ? 0.016 : Math.min((timestamp - lastTime) / 1000, 0.05);
        lastTime = timestamp;

        currentPos.current.x = dlerp(currentPos.current.x, target.current.x, cursorK, dt);
        currentPos.current.y = dlerp(currentPos.current.y, target.current.y, cursorK, dt);

        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
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
    willChange: "transform",
    mixBlendMode: "normal",
    transformOrigin: "center center",
    zIndex: 9999,
  };

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        ...blobBase,
        marginLeft: hovering ? "-30px" : "-25px",
        marginTop: hovering ? "-30px" : "-25px",
        width: hovering ? "60px" : "50px",
        height: hovering ? "60px" : "50px",
        borderRadius: "50%",
        backgroundColor: hovering ? "rgba(155, 48, 255, 0.1)" : "transparent",
        border: hovering ? "2px solid #9b30ff" : "2px solid rgba(240, 230, 255, 0.92)",
        boxShadow: hovering
          ? "0 0 12px rgba(155, 48, 255, 0.5)"
          : "0 0 8px rgba(255, 245, 255, 0.3)",
        transition:
          "width 0.18s ease, height 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, margin 0.18s ease",
      }}
    />
  );
}


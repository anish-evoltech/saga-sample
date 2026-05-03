"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  angle: number;
  angularVel: number;
  distFromCenter: number;
  life: number;
  maxLife: number;
  phase: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const centerX = () => width / 2;
    const centerY = () => height / 2;

    // Particle pool — dense in the top area
    const MAX_PARTICLES = 1000;
    const particles = particlesRef.current;
    particles.length = 0;

    const createParticle = (): Particle => {
      let spawnX: number, spawnY: number;
      const edge = Math.random();

      if (edge < 0.5) {
        // Top edge — primary spawn area
        spawnX = Math.random() * width;
        spawnY = -Math.random() * 80 - 5;
      } else if (edge < 0.7) {
        // Upper-left corner funnel
        spawnX = -Math.random() * 60;
        spawnY = Math.random() * height * 0.4;
      } else if (edge < 0.9) {
        // Upper-right corner funnel
        spawnX = width + Math.random() * 60;
        spawnY = Math.random() * height * 0.4;
      } else {
        // Scattered across top half
        spawnX = Math.random() * width;
        spawnY = Math.random() * height * 0.3;
      }

      const dx = centerX() - spawnX;
      const dy = centerY() - spawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Give slight initial velocity toward SAGA
      const initSpeed = Math.random() * 0.4 + 0.1;

      return {
        x: spawnX,
        y: spawnY,
        vx: (dx / (dist + 1)) * initSpeed,
        vy: (dy / (dist + 1)) * initSpeed,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        angle: Math.atan2(dy, dx),
        angularVel: (Math.random() - 0.5) * 0.008,
        distFromCenter: dist,
        life: 0,
        maxLife: Math.random() * 500 + 350,
        phase: 0,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize — densely scatter particles in the TOP section
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = createParticle();
      if (i < MAX_PARTICLES * 0.75) {
        // Fill the upper 60% of the viewport densely
        p.x = Math.random() * width;
        p.y = Math.random() * height * 0.6;
        const dx = centerX() - p.x;
        const dy = centerY() - p.y;
        p.distFromCenter = Math.sqrt(dx * dx + dy * dy);
        p.angle = Math.atan2(dy, dx);
        p.life = Math.random() * p.maxLife * 0.5;
        // Gentle drift toward center
        const speed = Math.random() * 0.3 + 0.05;
        p.vx = (dx / (p.distFromCenter + 1)) * speed;
        p.vy = (dy / (p.distFromCenter + 1)) * speed;
      }
      particles.push(p);
    }

    // Background star field — extra dense in top half
    let bgStars: { x: number; y: number; size: number; opacity: number }[] = [];
    const generateBgStars = () => {
      bgStars = [];
      // Base stars across full viewport
      for (let i = 0; i < 300; i++) {
        bgStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.4 + 0.05,
        });
      }
      // Extra dense stars in the top 50% to fill the gaps
      for (let i = 0; i < 200; i++) {
        bgStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          size: Math.random() * 0.6 + 0.15,
          opacity: Math.random() * 0.35 + 0.08,
        });
      }
    };
    generateBgStars();

    // ── Vector arc drawing function ──
    const drawDimensionArc = (t: number) => {
      // Horizon arc positioned behind SAGA text
      const arcCenterX = width / 2;
      const arcRadius = width * 1.4;
      // Position arc so edge passes right behind the text center
      const arcCenterY = centerY() + arcRadius * 0.68;

      const pulse = 0.9 + 0.1 * Math.sin(t * 0.008);

      // ── Atmosphere glow layers — violet gradient only, no white lines ──

      // Layer 1: Wide diffuse outer violet glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, arcRadius + 120, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      const outerGlow = ctx.createRadialGradient(
        arcCenterX,
        arcCenterY,
        arcRadius - 40,
        arcCenterX,
        arcCenterY,
        arcRadius + 120,
      );
      outerGlow.addColorStop(0, "rgba(0, 0, 0, 0)");
      outerGlow.addColorStop(0.2, `rgba(80, 30, 180, ${0.025 * pulse})`);
      outerGlow.addColorStop(0.45, `rgba(123, 47, 255, ${0.06 * pulse})`);
      outerGlow.addColorStop(0.65, `rgba(100, 50, 220, ${0.045 * pulse})`);
      outerGlow.addColorStop(0.85, `rgba(60, 30, 160, ${0.02 * pulse})`);
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Layer 2: Concentrated violet edge glow (the "horizon" feel)
      ctx.save();
      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, arcRadius + 40, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      const midGlow = ctx.createRadialGradient(
        arcCenterX,
        arcCenterY,
        arcRadius - 10,
        arcCenterX,
        arcCenterY,
        arcRadius + 40,
      );
      midGlow.addColorStop(0, "rgba(0, 0, 0, 0)");
      midGlow.addColorStop(0.2, `rgba(120, 60, 240, ${0.08 * pulse})`);
      midGlow.addColorStop(0.5, `rgba(140, 70, 255, ${0.14 * pulse})`);
      midGlow.addColorStop(0.75, `rgba(100, 50, 220, ${0.07 * pulse})`);
      midGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = midGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Layer 3: Tight bright violet edge glow (replaces stroke line)
      ctx.save();
      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, arcRadius + 12, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      const edgeGlow = ctx.createRadialGradient(
        arcCenterX,
        arcCenterY,
        arcRadius - 2,
        arcCenterX,
        arcCenterY,
        arcRadius + 12,
      );
      edgeGlow.addColorStop(0, "rgba(0, 0, 0, 0)");
      edgeGlow.addColorStop(0.25, `rgba(160, 100, 255, ${0.2 * pulse})`);
      edgeGlow.addColorStop(0.5, `rgba(140, 80, 255, ${0.12 * pulse})`);
      edgeGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = edgeGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Layer 5: Surface below the arc (very dark with subtle gradient)
      ctx.save();
      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, arcRadius - 1, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      const surfaceGrad = ctx.createRadialGradient(
        arcCenterX,
        arcCenterY,
        arcRadius * 0.85,
        arcCenterX,
        arcCenterY,
        arcRadius,
      );
      surfaceGrad.addColorStop(0, "rgba(3, 3, 6, 0.98)");
      surfaceGrad.addColorStop(0.5, "rgba(10, 5, 20, 0.95)");
      surfaceGrad.addColorStop(0.8, "rgba(20, 10, 40, 0.5)");
      surfaceGrad.addColorStop(1, "rgba(40, 20, 80, 0.15)");
      ctx.fillStyle = surfaceGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Layer 6: Secondary subtle outer haze (wider atmospheric scatter)
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath();
      ctx.arc(arcCenterX, arcCenterY, arcRadius + 120, Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      const hazeGrad = ctx.createRadialGradient(
        arcCenterX,
        arcCenterY,
        arcRadius,
        arcCenterX,
        arcCenterY,
        arcRadius + 120,
      );
      hazeGrad.addColorStop(0, `rgba(123, 47, 255, ${0.05 * pulse})`);
      hazeGrad.addColorStop(0.4, `rgba(80, 60, 180, ${0.025 * pulse})`);
      hazeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const animate = () => {
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // ── Galaxy background nebula glow ──
      const bgGrad = ctx.createRadialGradient(
        centerX(),
        centerY() * 0.9,
        0,
        centerX(),
        centerY() * 0.9,
        Math.max(width, height) * 0.7,
      );
      bgGrad.addColorStop(0, "rgba(20, 10, 40, 0.15)");
      bgGrad.addColorStop(0.25, "rgba(10, 5, 25, 0.08)");
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebula haze 1
      const nebulaGrad = ctx.createRadialGradient(
        centerX() - width * 0.15,
        centerY() - height * 0.1,
        0,
        centerX() - width * 0.15,
        centerY() - height * 0.1,
        width * 0.5,
      );
      nebulaGrad.addColorStop(0, "rgba(123, 47, 255, 0.025)");
      nebulaGrad.addColorStop(0.5, "rgba(80, 30, 180, 0.012)");
      nebulaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebula haze 2
      const nebula2 = ctx.createRadialGradient(
        centerX() + width * 0.2,
        centerY() + height * 0.15,
        0,
        centerX() + width * 0.2,
        centerY() + height * 0.15,
        width * 0.4,
      );
      nebula2.addColorStop(0, "rgba(47, 80, 255, 0.018)");
      nebula2.addColorStop(0.5, "rgba(30, 50, 150, 0.008)");
      nebula2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // ── Static background stars ──
      for (const star of bgStars) {
        const twinkle =
          0.5 + 0.5 * Math.sin(t * 0.02 + star.x * 0.01 + star.y * 0.01);
        const alpha = star.opacity * (0.4 + twinkle * 0.6);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // ── Draw the vector dimension arc ──
      drawDimensionArc(t);

      // ── Dimensional vortex glow at center ──
      const vortexPulse = 0.85 + 0.15 * Math.sin(t * 0.015);
      const vortexSize = Math.min(width, height) * 0.18 * vortexPulse;
      const vortexGrad = ctx.createRadialGradient(
        centerX(),
        centerY(),
        0,
        centerX(),
        centerY(),
        vortexSize,
      );
      vortexGrad.addColorStop(0, `rgba(160, 140, 255, ${0.08 * vortexPulse})`);
      vortexGrad.addColorStop(0.4, `rgba(123, 47, 255, ${0.04 * vortexPulse})`);
      vortexGrad.addColorStop(0.7, `rgba(80, 40, 200, ${0.015 * vortexPulse})`);
      vortexGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = vortexGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Particles ──
      // Wide vacuum mouth — target is a horizontal band matching SAGA text width
      const textHalfWidth = width * 0.28; // ~55% of viewport width (matches SAGA text span)
      const textLeft = centerX() - textHalfWidth;
      const textRight = centerX() + textHalfWidth;
      const textY = centerY();
      const suctionRadius = Math.min(width, height) * 0.6;
      const absorptionHeight = 35; // vertical absorption zone
      const spiralStrength = 0.002;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Target: nearest point on the SAGA text band (horizontal line)
        const targetX = Math.max(textLeft, Math.min(textRight, p.x));
        const targetY = textY;

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Suction physics toward the wide vacuum mouth
        if (dist < suctionRadius && dist > 0.1) {
          p.phase = 1;
          const normalDist = dist / suctionRadius;
          const pullStrength = Math.pow(1 - normalDist, 1.8) * 0.1;

          p.vx += (dx / dist) * pullStrength;
          p.vy += (dy / dist) * pullStrength;

          // Slight lateral spread so particles don't all bunch at one X
          const lateralJitter = (Math.random() - 0.5) * 0.008;
          p.vx += lateralJitter;

          p.vx *= 0.988;
          p.vy *= 0.988;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 3.5) {
            p.vx = (p.vx / speed) * 3.5;
            p.vy = (p.vy / speed) * 3.5;
          }
        } else if (dist > 0.1) {
          // Gentle ambient drift + pull toward the text band
          p.vx += (Math.random() - 0.5) * 0.012;
          p.vy += (Math.random() - 0.5) * 0.012;
          p.vx += (dx / dist) * 0.004;
          p.vy += (dy / dist) * 0.004;
          p.vx *= 0.995;
          p.vy *= 0.995;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Absorption — wide band matching text width
        const inTextX = p.x >= textLeft && p.x <= textRight;
        const nearTextY = Math.abs(p.y - textY) < absorptionHeight;
        if (inTextX && nearTextY) {
          p.opacity *= 0.85;
          p.size *= 0.92;
        }

        // Twinkle + alpha
        const twinkle =
          0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinkleOffset);
        let alpha = p.opacity * (0.6 + twinkle * 0.4);

        if (p.life < 30) {
          alpha *= p.life / 30;
        }
        if (p.life > p.maxLife - 50) {
          alpha *= (p.maxLife - p.life) / 50;
        }

        // Draw particle
        if (alpha > 0.005 && p.size > 0.05) {
          const glowSize = p.size * (p.phase === 1 ? 3 : 2);

          if (glowSize > 1) {
            const glow = ctx.createRadialGradient(
              p.x,
              p.y,
              0,
              p.x,
              p.y,
              glowSize,
            );
            glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.7})`);
            glow.addColorStop(0.5, `rgba(220, 225, 255, ${alpha * 0.2})`);
            glow.addColorStop(1, `rgba(180, 190, 255, 0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }

        // Recycle
        if (
          p.life > p.maxLife ||
          p.opacity < 0.01 ||
          p.size < 0.05 ||
          (inTextX && nearTextY && p.opacity < 0.1)
        ) {
          particles[i] = createParticle();
        }
      }

      // ── Shooting Stars ──
      // Spawn new shooting stars rarely
      if (Math.random() < 0.0008 && shootingStars.length < 1) {
        const fromLeft = Math.random() < 0.5;
        const sx = fromLeft
          ? Math.random() * width * 0.3
          : width * 0.7 + Math.random() * width * 0.3;
        const sy = Math.random() * height * 0.25;
        const angle = fromLeft
          ? Math.random() * 0.4 + 0.2 // angled down-right
          : -(Math.random() * 0.4 + 0.2) + Math.PI; // angled down-left
        const speed = Math.random() * 6 + 5;
        shootingStars.push({
          x: sx,
          y: sy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + Math.random() * 2 + 1,
          life: 0,
          maxLife: Math.random() * 50 + 30,
          size: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          trail: [],
        });
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const star = shootingStars[s];
        star.life++;

        // Store trail positions
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 20) star.trail.shift();

        star.x += star.vx;
        star.y += star.vy;

        // Life-based alpha
        let sAlpha = star.opacity;
        if (star.life < 8) sAlpha *= star.life / 8;
        if (star.life > star.maxLife - 10)
          sAlpha *= (star.maxLife - star.life) / 10;

        // Draw trail
        if (star.trail.length > 1 && sAlpha > 0.01) {
          for (let ti = 1; ti < star.trail.length; ti++) {
            const trailAlpha = (ti / star.trail.length) * sAlpha * 0.6;
            const trailSize = star.size * (ti / star.trail.length) * 0.8;
            ctx.beginPath();
            ctx.moveTo(star.trail[ti - 1].x, star.trail[ti - 1].y);
            ctx.lineTo(star.trail[ti].x, star.trail[ti].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${trailAlpha})`;
            ctx.lineWidth = trailSize;
            ctx.stroke();
          }

          // Bright head
          const headGlow = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 3,
          );
          headGlow.addColorStop(0, `rgba(255, 255, 255, ${sAlpha})`);
          headGlow.addColorStop(0.4, `rgba(200, 210, 255, ${sAlpha * 0.4})`);
          headGlow.addColorStop(1, "rgba(180, 190, 255, 0)");
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = headGlow;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
          ctx.fill();
        }

        // Remove when expired or off screen
        if (
          star.life > star.maxLife ||
          star.x < -50 ||
          star.x > width + 50 ||
          star.y > height + 50
        ) {
          shootingStars.splice(s, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Shooting stars pool
    const shootingStars: ShootingStar[] = [];

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      generateBgStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Single canvas — everything rendered here */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      {/* Vignette overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(3,3,6,0.5) 70%, rgba(3,3,6,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Human hand — absolute left, reaching right toward SAGA */}
      <motion.img
        src="/humanhand.png"
        alt=""
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          position: "absolute",
          left: "-2%",
          top: "2%",
          width: "clamp(200px, 50vw, 1800px)",
          height: "auto",
          objectFit: "contain",
          zIndex: 5,
          pointerEvents: "none",
          filter:
            "drop-shadow(0 0 30px rgba(123, 47, 255, 0.25)) brightness(0.85)",
        }}
      />

      {/* Robot hand — absolute right, reaching down toward SAGA */}
      {/* Wrapper owns the static scaleX(-1.2) so Framer never touches it */}
      <motion.img
        src="/robohand.png"
        alt=""
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={
          {
            position: "absolute",
            right: "-1%",
            top: "0%",
            width: "clamp(180px, 25vw, 500px)",
            height: "auto",
            objectFit: "contain",
            zIndex: 5,
            pointerEvents: "none",
            filter:
              "drop-shadow(0 0 30px rgba(123, 47, 255, 0.3)) brightness(0.9)",
            scaleX: -1.2,
          } as React.CSSProperties
        }
      />

      {/* SAGA text — centered, on top */}
      {/*
        Plain div owns the centering transform so Framer never overwrites it.
        motion.div inside handles only opacity / y / filter.
      */}
      <div
        style={{
          position: "absolute",
          top: "56%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            textAlign: "center",
            willChange: "opacity, transform, filter",
          }}
        >
          <h1
            style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(3.5rem, 14vw, 12rem)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              color: "transparent",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.75) 35%, rgba(200,190,255,0.5) 65%, rgba(123,47,255,0.25) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 40px rgba(123, 47, 255, 0.2)) drop-shadow(0 0 80px rgba(123, 47, 255, 0.08))",
              margin: 0,
              padding: 0,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            SAGA
          </h1>

          {/* Horizontal flare below SAGA */}
          <style>{`
          @keyframes flarePulse {
            0%, 100% {
              transform: scaleX(0.6);
              opacity: 0.7;
            }
            50% {
              transform: scaleX(1.3);
              opacity: 1;
            }
          }
        `}</style>
          <div
            style={{
              position: "relative",
              width: "clamp(300px, 60vw, 900px)",
              marginTop: "clamp(8px, 12vh, 100px)",
              marginLeft: "auto",
              marginRight: "auto",
              animation: "flarePulse 4s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          >
            {/* Core bright line */}
            <div
              style={{
                width: "100%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.05) 85%, transparent 100%)",
                borderRadius: "1px",
              }}
            />
            {/* Soft violet glow spread */}
            <div
              style={{
                position: "absolute",
                top: "-6px",
                left: "10%",
                right: "10%",
                height: "14px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(123,47,255,0.0) 10%, rgba(160,120,255,0.2) 30%, rgba(200,180,255,0.35) 50%, rgba(160,120,255,0.2) 70%, rgba(123,47,255,0.0) 90%, transparent 100%)",
                filter: "blur(6px)",
                borderRadius: "50%",
              }}
            />
            {/* Wide atmospheric scatter */}
            <div
              style={{
                position: "absolute",
                top: "-12px",
                left: "5%",
                right: "5%",
                height: "26px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(123,47,255,0.0) 15%, rgba(123,47,255,0.08) 35%, rgba(160,130,255,0.12) 50%, rgba(123,47,255,0.08) 65%, rgba(123,47,255,0.0) 85%, transparent 100%)",
                filter: "blur(12px)",
                borderRadius: "50%",
              }}
            />
          </div>
        </motion.div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "150px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0), #000000)",
          zIndex: 6,
          pointerEvents: "none",
        }}
      />

      {/* Top subtle gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to top, transparent, rgba(3,3,6,0.3))",
          zIndex: 6,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

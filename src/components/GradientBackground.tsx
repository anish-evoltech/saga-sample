"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// ── Fragment shader: single floating purple flame blob ──
// Matches: deep black bg, sweeping violet cloud, white-lavender hot centre
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uRes;
  varying vec2  vUv;

  // ── Lightweight value noise (no external lib needed) ──
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }
  // 3-octave fBm for organic shape distortion
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * vnoise(p);
      p *= 2.1;
      a *= 0.48;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    // Aspect-correct UV
    vec2 uv = vec2(vUv.x * aspect, vUv.y);

    // Ultra-slow time: full animation cycle ~25-35 s
    float t = uTime * 0.038;

    // ── Organic warp field (flame / lava-lamp distortion) ──
    float warpScale = 0.90;
    vec2 warpUv = uv * warpScale;
    float wx = fbm(warpUv + vec2(0.0,  t * 0.55));
    float wy = fbm(warpUv + vec2(3.14, t * 0.45 + 1.7));
    vec2 warp = vec2(wx, wy) * 0.38;

    // Warped UV used for all distance calculations
    vec2 wuv = uv + warp;

    // ── Single main blob: drifts lazily across the viewport ──
    // Starts right-of-centre, floats toward centre-left and back
    vec2 blobCenter = vec2(
      aspect * (0.58 + sin(t * 0.61)        * 0.14 + sin(t * 0.37 + 1.3) * 0.07),
      0.50   + cos(t * 0.53)        * 0.11 + cos(t * 0.29 + 0.9) * 0.05
    );

    // ── "Tail" extends toward lower-left (gives the sweeping comet look) ──
    vec2 tailDir = normalize(vec2(-1.0, -0.3));
    vec2 fromBlob = wuv - blobCenter;

    // Elliptical blob: wider along tail direction gives the tear-drop/comet shape
    float along  = dot(fromBlob, tailDir);
    float perp   = dot(fromBlob, vec2(-tailDir.y, tailDir.x));
    // Stretch factor > 1 pulls the tail further left
    float stretch = 1.0 + smoothstep(0.0, 0.6, -along) * 0.9;
    float ellDist = length(vec2(along / stretch, perp));

    // Additional small secondary lobe drifting independently (the deeper purple shoulder)
    vec2 p2 = vec2(
      aspect * (0.26 + cos(t * 0.44 + 2.0) * 0.12),
      0.52   + sin(t * 0.36 + 1.1) * 0.09
    );
    float d2 = length(wuv - p2);

    // ── Gaussian weights ──
    float gMain = exp(-ellDist * ellDist * 1.60);   // main bright blob
    float gTail = exp(-ellDist * ellDist * 0.65);   // wide soft tail falloff
    float gSec  = exp(-d2      * d2      * 1.90);   // secondary purple shoulder

    // ── Bright lavender / white hot-centre highlight ──
    // (the blown-out white circle in the top-right of the reference image)
    float hotDist = length(wuv - blobCenter);
    float hot = exp(-hotDist * hotDist * 7.5);      // very tight falloff → small bright core

    // ── Palette ──
    vec3 colDark    = vec3(0.0,       0.0,      0.0  );  // pure black
    vec3 colViolet  = vec3(0.25,      0.01,     0.55 );  // deep purple  #400090
    vec3 colPurple  = vec3(0.42,      0.04,     0.78 );  // vivid purple  #6B0AC7
    vec3 colLavender= vec3(0.72,      0.55,     0.95 );  // soft lavender #B88DF2
    vec3 colWhite   = vec3(0.95,      0.90,     1.00 );  // near-white centre

    // ── Composite ──
    vec3 color = colDark;

    // Wide tail sweep (deep violet)
    color = mix(color, colViolet, clamp(gTail * 0.55, 0.0, 1.0));
    // Secondary shoulder blob (slightly brighter violet)
    color = mix(color, colViolet, clamp(gSec  * 0.60, 0.0, 1.0));
    // Main body (vivid purple)
    color = mix(color, colPurple, clamp(gMain * 0.85, 0.0, 1.0));
    // Lavender inner glow
    color = mix(color, colLavender, clamp(hot * 1.10, 0.0, 1.0));
    // White hot-spot centre
    color = mix(color, colWhite,   clamp(hot * 0.70, 0.0, 1.0));

    // ── Global intensity: keep it dim so content stays readable ──
    color *= 0.72;

    // ── Vignette: all four edges fall to absolute black ──
    vec2 vig = vUv - 0.5;
    float vignette = 1.0 - smoothstep(0.18, 0.72, dot(vig, vig) * 3.2);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ── Inner component (must live inside <Canvas>) ──
function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uRes.value.set(size.width, size.height);
  }, [size]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Exported component ──
export default function GradientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#000000",
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
        }}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 1] }}
        frameloop="always"
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}

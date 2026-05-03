"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function AnimatedRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.5 + 0.6;
    meshRef.current.rotation.y = t * 0.35;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group>
      <Torus ref={meshRef} args={[1.5, 0.5, 128, 256]}>
        <MeshDistortMaterial
          color="#8B3FFF"
          emissive="#5020CC"
          emissiveIntensity={1.2}
          metalness={0.85}
          roughness={0.12}
          distort={0.35}
          speed={2.5}
        />
      </Torus>
    </group>
  );
}

export default function OrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 4]} color="#9B4FFF" intensity={3} />
      <pointLight position={[-3, -2, 3]} color="#2F8FFF" intensity={2} />
      <pointLight position={[0, 4, 2]} color="#FF5F8F" intensity={1.5} />
      <pointLight position={[-2, 0, 5]} color="#00D4FF" intensity={1} />

      <AnimatedRing />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={2.8}
        />
      </EffectComposer>
    </Canvas>
  );
}

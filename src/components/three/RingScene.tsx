"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function AnimatedRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.4 + 0.5;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.35) * 0.06;
  });

  return (
    <Torus ref={meshRef} args={[2, 0.65, 128, 256]}>
      <MeshDistortMaterial
        color="#6B30EE"
        emissive="#3518AA"
        emissiveIntensity={1.3}
        metalness={0.9}
        roughness={0.08}
        distort={0.3}
        speed={1.8}
      />
    </Torus>
  );
}

export default function RingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 5]} color="#9B4FFF" intensity={3} />
      <pointLight position={[-4, -3, 4]} color="#2F8FFF" intensity={2.5} />
      <pointLight position={[0, 5, 2]} color="#FF4F7B" intensity={1.5} />
      <pointLight position={[-3, 0, 5]} color="#00D4FF" intensity={1.2} />

      <AnimatedRing />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={3.2}
        />
      </EffectComposer>
    </Canvas>
  );
}

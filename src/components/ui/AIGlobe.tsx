"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const pointsRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Generate particles and build geometry inside useMemo to avoid R3F reconciliation issues
  const geometry = useMemo(() => {
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const radius = 2.6;

    const color1 = new THREE.Color("#4338CA"); // indigo
    const color2 = new THREE.Color("#7C3AED"); // violet
    const color3 = new THREE.Color("#00e5ff"); // cyan

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      // add noise
      const r = radius + (Math.random() - 0.5) * 0.15;

      positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixRatio = Math.random();
      const mixedColor = color1.clone().lerp(mixRatio > 0.5 ? color2 : color3, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      const targetScale = hovered ? 1.05 : 1;
      pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      const wave = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      pointsRef.current.scale.x = targetScale + wave;
      pointsRef.current.scale.y = targetScale + wave;
      pointsRef.current.scale.z = targetScale + wave;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <pointsMaterial
        size={hovered ? 0.06 : 0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rings() {
  const ringsRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ringsRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.0, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function AIGlobe() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Globe />
        <Rings />

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#0a0a1a" transparent opacity={0.8} />
        </mesh>

        <Text
          position={[0, 0, 1.9]}
          fontSize={2.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          AI
          <meshBasicMaterial color="#ffffff" transparent opacity={1} blending={THREE.AdditiveBlending} />
        </Text>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

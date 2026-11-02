"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += mouse.y * 0.0002;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#5eead4"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: "transparent" }}
      gl={{ 
        alpha: true, 
        antialias: false,
        powerPreference: "low-power",
      }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  );
}
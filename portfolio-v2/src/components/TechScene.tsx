"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color="#5eead4"
        emissive="#5eead4"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export default function TechScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      dpr={[1, 1]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#5eead4" />
      <Icosahedron />
    </Canvas>
  );
}
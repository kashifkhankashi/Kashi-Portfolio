"use client";

import { Suspense, useRef } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

function RotatingTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export default function MinimalScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      <Stars
        radius={100}
        depth={50}
        count={500}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />

      <RotatingTorus />
    </Suspense>
  );
}



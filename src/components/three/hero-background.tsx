"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

export default function HeroBackground() {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 1);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        opacity={0.2}
        transparent
      />
    </mesh>
  );
}


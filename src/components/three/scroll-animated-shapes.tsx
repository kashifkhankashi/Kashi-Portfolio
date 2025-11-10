"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

interface ScrollShapeProps {
  position: [number, number, number];
  scrollOffset: number;
}

function ScrollShape({ position, scrollOffset }: ScrollShapeProps) {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.OctahedronGeometry(0.4, 0);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.5 + scrollOffset;
      meshRef.current.rotation.y = time * 0.3 + scrollOffset;
      meshRef.current.position.y = position[1] + Math.sin(time + scrollOffset) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#6366f1"
        transparent
        opacity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function ScrollAnimatedShapes() {
  const shapes = useMemo(
    () => [
      { position: [-4, 0, -3] as [number, number, number], scrollOffset: 0 },
      { position: [4, 0, -3] as [number, number, number], scrollOffset: Math.PI / 2 },
      { position: [0, 2, -5] as [number, number, number], scrollOffset: Math.PI },
      { position: [-2, -2, -4] as [number, number, number], scrollOffset: Math.PI * 1.5 },
      { position: [2, -2, -4] as [number, number, number], scrollOffset: Math.PI * 2 },
    ],
    []
  );

  return (
    <>
      {shapes.map((shape, index) => (
        <ScrollShape key={index} {...shape} />
      ))}
    </>
  );
}


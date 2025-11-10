"use client";

import { Suspense, useRef, useMemo } from "react";
import { Stars, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";

function OrbitingElement({ radius, speed, color, size }: { radius: number; speed: number; color: string; size: number }) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.position.x = Math.cos(time * speed) * radius;
      groupRef.current.position.z = Math.sin(time * speed) * radius;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function CentralCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
        emissive="#6366f1"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function OrbitalScene() {
  const orbits = useMemo(
    () => [
      { radius: 2.5, speed: 0.5, color: "#6366f1", size: 0.2 },
      { radius: 3.5, speed: -0.3, color: "#8b5cf6", size: 0.15 },
      { radius: 4.5, speed: 0.4, color: "#a855f7", size: 0.12 },
    ],
    []
  );

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />

      <Stars
        radius={100}
        depth={50}
        count={600}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />

      <CentralCore />

      {orbits.map((orbit, index) => (
        <OrbitingElement key={index} {...orbit} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Suspense>
  );
}



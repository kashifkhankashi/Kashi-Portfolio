"use client";

import { Suspense } from "react";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";
import { useMemo } from "react";

// Elegant rotating torus
function RotatingTorus() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Subtle particle field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Floating orbs
function FloatingOrbs() {
  const groupRef = useRef<Group>(null);
  
  const orbs = useMemo(
    () => [
      { position: [-3, 1, -2], speed: 0.5 },
      { position: [3, -1, -2], speed: 0.7 },
      { position: [0, 2, -4], speed: 0.6 },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const orb = orbs[i];
        if (child instanceof THREE.Mesh) {
          child.position.y = orb.position[1] + Math.sin(state.clock.elapsedTime * orb.speed) * 0.5;
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#6366f1" : i === 1 ? "#8b5cf6" : "#a855f7"}
            transparent
            opacity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ProfessionalHeroScene() {
  return (
    <Suspense fallback={null}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      {/* Subtle starfield */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Main focal element - rotating torus */}
      <RotatingTorus />

      {/* Subtle particle field */}
      <ParticleField />

      {/* Floating orbs */}
      <FloatingOrbs />

      {/* Subtle camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Suspense>
  );
}



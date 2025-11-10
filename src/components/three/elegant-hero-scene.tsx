"use client";

import { Suspense, useRef, useMemo } from "react";
import { Stars, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";

// Elegant rotating torus knot
function RotatingTorusKnot() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusKnotGeometry args={[1.2, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.7}
        emissive="#6366f1"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Subtle particle system
function SubtleParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
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
        size={0.15}
        color="#8b5cf6"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Minimal floating elements
function FloatingElements() {
  const groupRef = useRef<Group>(null);
  
  const elements = useMemo(
    () => [
      { position: [-2.5, 1.5, -3], size: 0.25, color: "#6366f1" },
      { position: [2.5, -1.5, -3], size: 0.2, color: "#8b5cf6" },
      { position: [0, 2, -4], size: 0.15, color: "#a855f7" },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const el = elements[i];
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime;
          child.position.y = el.position[1] + Math.sin(time * (0.5 + i * 0.2)) * 0.3;
          child.rotation.x = time * 0.5;
          child.rotation.y = time * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <mesh key={i} position={el.position}>
          <icosahedronGeometry args={[el.size, 0]} />
          <meshStandardMaterial
            color={el.color}
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ElegantHeroScene() {
  return (
    <Suspense fallback={null}>
      {/* Lighting - soft and elegant */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />

      {/* Subtle starfield */}
      <Stars
        radius={100}
        depth={50}
        count={500}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />

      {/* Main focal element */}
      <RotatingTorusKnot />

      {/* Subtle particles */}
      <SubtleParticles />

      {/* Minimal floating elements */}
      <FloatingElements />

      {/* Gentle auto-rotation */}
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


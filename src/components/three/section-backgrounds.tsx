"use client";

import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Subtle particles for About section
export function AboutBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.3} />
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
          size={0.05}
          color="#6366f1"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </Suspense>
  );
}

// Interactive particles for Projects section
export function ProjectsBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.12;

      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i3]) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
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
          size={0.06}
          color="#8b5cf6"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Suspense>
  );
}

// Geometric shapes for Experience section
export function ExperienceBackground() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(
    () => [
      { position: [-4, 2, -3], rotation: [0, 0, 0], color: "#6366f1" },
      { position: [4, -2, -3], rotation: [0, 0, 0], color: "#8b5cf6" },
      { position: [-3, -3, -2], rotation: [0, 0, 0], color: "#a855f7" },
      { position: [3, 3, -4], rotation: [0, 0, 0], color: "#6366f1" },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <group ref={groupRef}>
        {shapes.map((shape, index) => (
          <mesh key={index} position={shape.position as [number, number, number]}>
            {index % 2 === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : (
              <octahedronGeometry args={[0.8, 0]} />
            )}
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.3}
              distort={0.3}
              speed={1.5}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>
    </Suspense>
  );
}

// Wave animation for Contact section
export function ContactBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.geometry) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      if (positions) {
        const count = positions.count;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = positions.getX(i);
          const y = positions.getY(i);
          positions.setZ(i, Math.sin(state.clock.elapsedTime + x * 0.1 + y * 0.1) * 0.3);
        }
        positions.needsUpdate = true;
      }
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          transparent
          opacity={0.2}
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </mesh>
    </Suspense>
  );
}

// Skills section 3D visualization
export function SkillsBackground() {
  const groupRef = useRef<THREE.Group>(null);

  const skillIcons = useMemo(
    () => [
      { position: [-3, 1, -2], color: "#3b82f6" },
      { position: [3, -1, -2], color: "#8b5cf6" },
      { position: [-2, -2, -3], color: "#10b981" },
      { position: [2, 2, -3], color: "#f59e0b" },
      { position: [0, 0, -4], color: "#ef4444" },
    ],
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1);
          child.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.1);
          const baseY = skillIcons[index].position[1];
          child.position.y = baseY + Math.sin(state.clock.elapsedTime + index) * 0.3;
        }
      });
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <group ref={groupRef}>
        {skillIcons.map((icon, index) => (
          <mesh key={index} position={icon.position as [number, number, number]}>
            <icosahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={icon.color}
              transparent
              opacity={0.6}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </Suspense>
  );
}


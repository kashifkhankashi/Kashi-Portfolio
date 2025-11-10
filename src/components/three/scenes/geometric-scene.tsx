"use client";

import { Suspense, useRef, useMemo } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  floatSpeed: number;
  shape: "box" | "sphere" | "torus" | "octahedron";
  color: string;
  size: number;
}

function FloatingShape({ position, rotationSpeed, floatSpeed, shape, color, size }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  const geometry = useMemo(() => {
    switch (shape) {
      case "box":
        return new THREE.BoxGeometry(size, size, size);
      case "sphere":
        return new THREE.SphereGeometry(size, 16, 16);
      case "torus":
        return new THREE.TorusGeometry(size, size * 0.3, 16, 32);
      case "octahedron":
        return new THREE.OctahedronGeometry(size, 0);
      default:
        return new THREE.BoxGeometry(size, size, size);
    }
  }, [shape, size]);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function GeometricScene() {
  const shapes = useMemo(
    () => [
      {
        position: [-3, 2, -2] as [number, number, number],
        rotationSpeed: 0.01,
        floatSpeed: 0.5,
        shape: "box" as const,
        color: "#6366f1",
        size: 0.4,
      },
      {
        position: [3, -1, -3] as [number, number, number],
        rotationSpeed: 0.015,
        floatSpeed: 0.7,
        shape: "sphere" as const,
        color: "#8b5cf6",
        size: 0.3,
      },
      {
        position: [-2, -2, -1] as [number, number, number],
        rotationSpeed: 0.012,
        floatSpeed: 0.6,
        shape: "torus" as const,
        color: "#a855f7",
        size: 0.3,
      },
      {
        position: [2, 1, -4] as [number, number, number],
        rotationSpeed: 0.008,
        floatSpeed: 0.4,
        shape: "octahedron" as const,
        color: "#6366f1",
        size: 0.35,
      },
      {
        position: [0, 3, -2] as [number, number, number],
        rotationSpeed: 0.02,
        floatSpeed: 0.8,
        shape: "sphere" as const,
        color: "#8b5cf6",
        size: 0.25,
      },
    ],
    []
  );

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />

      <Stars
        radius={100}
        depth={50}
        count={800}
        factor={4}
        saturation={0}
        fade
        speed={0.25}
      />

      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </Suspense>
  );
}



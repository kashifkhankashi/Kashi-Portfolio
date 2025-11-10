"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  floatSpeed: number;
  shape: "box" | "sphere" | "torus";
  color: string;
}

function FloatingShape({ position, rotationSpeed, floatSpeed, shape, color }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  const geometry = useMemo(() => {
    switch (shape) {
      case "box":
        return new THREE.BoxGeometry(0.3, 0.3, 0.3);
      case "sphere":
        return new THREE.SphereGeometry(0.2, 16, 16);
      case "torus":
        return new THREE.TorusGeometry(0.2, 0.1, 16, 32);
      default:
        return new THREE.BoxGeometry(0.3, 0.3, 0.3);
    }
  }, [shape]);

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
          opacity={0.6}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function FloatingShapes() {
  const shapes = useMemo(
    () => [
      {
        position: [-3, 2, -2] as [number, number, number],
        rotationSpeed: 0.01,
        floatSpeed: 0.5,
        shape: "box" as const,
        color: "#6366f1",
      },
      {
        position: [3, -1, -3] as [number, number, number],
        rotationSpeed: 0.015,
        floatSpeed: 0.7,
        shape: "sphere" as const,
        color: "#8b5cf6",
      },
      {
        position: [-2, -2, -1] as [number, number, number],
        rotationSpeed: 0.012,
        floatSpeed: 0.6,
        shape: "torus" as const,
        color: "#a855f7",
      },
      {
        position: [2, 1, -4] as [number, number, number],
        rotationSpeed: 0.008,
        floatSpeed: 0.4,
        shape: "box" as const,
        color: "#6366f1",
      },
      {
        position: [0, 3, -2] as [number, number, number],
        rotationSpeed: 0.02,
        floatSpeed: 0.8,
        shape: "sphere" as const,
        color: "#8b5cf6",
      },
    ],
    []
  );

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
}


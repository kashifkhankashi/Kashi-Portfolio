"use client";

import { Suspense, useRef, useMemo } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef<Mesh>(null);

  const { positions, normals, uvs, indices } = useMemo(() => {
    const segments = 40;
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const x = (i / segments - 0.5) * 10;
        const z = (j / segments - 0.5) * 10;
        const y = 0;

        positions.push(x, y, z);
        normals.push(0, 1, 0);
        uvs.push(i / segments, j / segments);

        if (i < segments && j < segments) {
          const a = i * (segments + 1) + j;
          const b = a + 1;
          const c = a + segments + 1;
          const d = c + 1;

          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }
    }

    return { positions, normals, uvs, indices };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] =
          Math.sin(x * 0.5 + time) * 0.5 +
          Math.cos(z * 0.5 + time * 0.8) * 0.5 +
          Math.sin((x + z) * 0.3 + time * 1.2) * 0.3;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -3]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-normal"
          count={normals.length / 3}
          array={new Float32Array(normals)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-uv"
          count={uvs.length / 2}
          array={new Float32Array(uvs)}
          itemSize={2}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={new Uint16Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="#6366f1"
        transparent
        opacity={0.4}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

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
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function WavesScene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <Stars
        radius={100}
        depth={50}
        count={700}
        factor={4}
        saturation={0}
        fade
        speed={0.25}
      />

      <WaveMesh />
      <FloatingParticles />
    </Suspense>
  );
}



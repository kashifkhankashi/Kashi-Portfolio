"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

export default function WaveMesh() {
  const meshRef = useRef<Mesh>(null);

  const { positions, normals, uvs, indices } = useMemo(() => {
    const segments = 50;
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
          Math.sin(x * 0.5 + time) * 0.3 +
          Math.cos(z * 0.5 + time * 0.8) * 0.3;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
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
        opacity={0.2}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}


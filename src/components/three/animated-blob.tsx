"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

export default function AnimatedBlob() {
  const meshRef = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    }),
    []
  );

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 20);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.u_time.value = state.clock.elapsedTime;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const vertexShader = `
    uniform float u_time;
    uniform float u_intensity;
    
    varying vec3 v_position;
    varying vec3 v_normal;
    
    void main() {
      v_position = position;
      v_normal = normal;
      
      vec3 pos = position;
      float noise = sin(pos.x * 2.0 + u_time) * 
                    sin(pos.y * 3.0 + u_time * 1.2) * 
                    sin(pos.z * 2.5 + u_time * 0.8);
      pos += normal * noise * u_intensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 v_position;
    varying vec3 v_normal;
    
    void main() {
      vec3 color1 = vec3(0.39, 0.40, 0.95); // #6366f1
      vec3 color2 = vec3(0.59, 0.40, 0.95); // Purple tint
      
      float fresnel = pow(1.0 - dot(v_normal, vec3(0.0, 0.0, 1.0)), 2.0);
      vec3 color = mix(color1, color2, fresnel);
      
      gl_FragColor = vec4(color, 0.3);
    }
  `;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}


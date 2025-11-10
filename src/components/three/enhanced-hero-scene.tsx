"use client";

import { Suspense } from "react";
import { Environment, Stars } from "@react-three/drei";
import ParticleSystem from "./particle-system";
import AnimatedBlob from "./animated-blob";
import FloatingShapes from "./floating-shapes";
import InteractiveParticles from "./interactive-particles";
import WaveMesh from "./wave-mesh";

export default function EnhancedHeroScene() {
  return (
    <Suspense fallback={null}>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Main animated blob */}
      <AnimatedBlob />

      {/* Particle system */}
      <ParticleSystem />

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Interactive particles that react to mouse */}
      <InteractiveParticles />

      {/* Animated wave mesh */}
      <WaveMesh />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </Suspense>
  );
}


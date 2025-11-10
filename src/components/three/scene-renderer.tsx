"use client";

import { SceneType } from "@/components/scene-selector";
import MinimalScene from "./scenes/minimal-scene";
import ParticlesScene from "./scenes/particles-scene";
import GeometricScene from "./scenes/geometric-scene";
import OrbitalScene from "./scenes/orbital-scene";
import WavesScene from "./scenes/waves-scene";

interface SceneRendererProps {
  scene: SceneType;
}

export default function SceneRenderer({ scene }: SceneRendererProps) {
  switch (scene) {
    case "minimal":
      return <MinimalScene />;
    case "particles":
      return <ParticlesScene />;
    case "geometric":
      return <GeometricScene />;
    case "orbital":
      return <OrbitalScene />;
    case "waves":
      return <WavesScene />;
    default:
      return <MinimalScene />;
  }
}



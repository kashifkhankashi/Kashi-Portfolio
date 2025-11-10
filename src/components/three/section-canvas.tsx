"use client";

import { Canvas } from "@react-three/fiber";
import {
  AboutBackground,
  ProjectsBackground,
  ExperienceBackground,
  ContactBackground,
  SkillsBackground,
} from "./section-backgrounds";

interface SectionCanvasProps {
  type: "about" | "projects" | "experience" | "contact" | "skills";
  className?: string;
}

export default function SectionCanvas({ type, className = "" }: SectionCanvasProps) {
  const renderBackground = () => {
    switch (type) {
      case "about":
        return <AboutBackground />;
      case "projects":
        return <ProjectsBackground />;
      case "experience":
        return <ExperienceBackground />;
      case "contact":
        return <ContactBackground />;
      case "skills":
        return <SkillsBackground />;
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        {renderBackground()}
      </Canvas>
    </div>
  );
}


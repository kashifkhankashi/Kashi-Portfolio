"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import SceneRenderer from "@/components/three/scene-renderer";
import SceneSelector, { SceneType } from "@/components/scene-selector";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScene, setCurrentScene] = useState<SceneType>("minimal");

  // Save scene preference to localStorage
  useEffect(() => {
    const savedScene = localStorage.getItem("preferred-scene") as SceneType;
    if (savedScene && ["minimal", "particles", "geometric", "orbital", "waves"].includes(savedScene)) {
      setCurrentScene(savedScene);
    }
  }, []);

  const handleSceneChange = (scene: SceneType) => {
    setCurrentScene(scene);
    localStorage.setItem("preferred-scene", scene);
  };

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Scene Selector */}
      <div className="absolute top-20 md:top-24 right-4 sm:right-8 z-50">
        <SceneSelector currentScene={currentScene} onSceneChange={handleSceneChange} />
      </div>

      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              className="w-full h-full"
              gl={{ antialias: true, alpha: true }}
            >
              <SceneRenderer scene={currentScene} />
            </Canvas>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
          >
            Hi, I&apos;m <span className="text-primary">Kashi</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-muted-foreground"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            I build web products with clean architecture and smooth user
            experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="group"
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const projectsSection = document.querySelector("#projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center gap-6"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>


      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}


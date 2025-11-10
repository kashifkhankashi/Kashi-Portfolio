"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Zap, Layers, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SceneType = "minimal" | "particles" | "geometric" | "orbital" | "waves";

interface SceneOption {
  id: SceneType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sceneOptions: SceneOption[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple",
    icon: Sparkles,
  },
  {
    id: "particles",
    name: "Particles",
    description: "Dynamic particle system",
    icon: Zap,
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Floating shapes",
    icon: Layers,
  },
  {
    id: "orbital",
    name: "Orbital",
    description: "Rotating elements",
    icon: Orbit,
  },
  {
    id: "waves",
    name: "Waves",
    description: "Flowing wave mesh",
    icon: Sparkles,
  },
];

interface SceneSelectorProps {
  currentScene: SceneType;
  onSceneChange: (scene: SceneType) => void;
}

export default function SceneSelector({ currentScene, onSceneChange }: SceneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = sceneOptions.find((opt) => opt.id === currentScene) || sceneOptions[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative z-50">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50"
        aria-label="Change animation style"
      >
        <CurrentIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentOption.name}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 w-64 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <div className="p-2">
                {sceneOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = option.id === currentScene;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSceneChange(option.id);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                        isSelected
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{option.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}



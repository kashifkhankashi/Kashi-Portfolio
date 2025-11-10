"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Lock,
  Server,
  Zap,
  Box,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionCanvas from "@/components/three/section-canvas";

const skills = [
  { name: "React", icon: Code, color: "text-blue-500" },
  { name: "Next.js", icon: Globe, color: "text-black dark:text-white" },
  { name: "Node.js", icon: Server, color: "text-green-600" },
  { name: "Express", icon: Server, color: "text-gray-600 dark:text-gray-400" },
  { name: "NestJS", icon: Box, color: "text-red-600" },
  { name: "FastAPI", icon: Zap, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-green-700 dark:text-green-500" },
  { name: "SQL", icon: Database, color: "text-blue-600" },
  { name: "JWT / Auth", icon: Lock, color: "text-purple-600" },
  { name: "REST & GraphQL", icon: Layers, color: "text-pink-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 md:py-32 bg-background overflow-hidden"
    >
      <SectionCanvas type="about" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m a passionate full-stack developer with expertise in building
            scalable web applications. I love creating clean, efficient code and
            delivering exceptional user experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div key={skill.name} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <Icon
                      className={`h-8 w-8 mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


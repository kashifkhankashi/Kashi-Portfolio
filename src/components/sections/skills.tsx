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
  Cpu,
  Cloud,
  GitBranch,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionCanvas from "@/components/three/section-canvas";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: Code, color: "text-blue-500", level: 95 },
      { name: "Next.js", icon: Globe, color: "text-black dark:text-white", level: 90 },
      { name: "TypeScript", icon: Code, color: "text-blue-600", level: 88 },
      { name: "Tailwind CSS", icon: Layers, color: "text-cyan-500", level: 92 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: Server, color: "text-green-600", level: 90 },
      { name: "Express", icon: Server, color: "text-gray-600 dark:text-gray-400", level: 88 },
      { name: "NestJS", icon: Box, color: "text-red-600", level: 85 },
      { name: "FastAPI", icon: Zap, color: "text-green-500", level: 82 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", icon: Database, color: "text-green-700 dark:text-green-500", level: 90 },
      { name: "PostgreSQL", icon: Database, color: "text-blue-600", level: 85 },
      { name: "Redis", icon: Database, color: "text-red-600", level: 80 },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: Box, color: "text-blue-500", level: 85 },
      { name: "Git", icon: GitBranch, color: "text-orange-600", level: 92 },
      { name: "AWS", icon: Cloud, color: "text-orange-500", level: 75 },
      { name: "JWT / Auth", icon: Lock, color: "text-purple-600", level: 88 },
    ],
  },
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

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 md:py-32 bg-background overflow-hidden"
    >
      <SectionCanvas type="skills" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
            across different technologies and domains.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={category.category} variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 text-center">{category.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Icon
                              className={`h-8 w-8 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                            />
                            <span className="text-sm font-semibold text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold mb-3">{skill.name}</h4>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className={`h-2 rounded-full bg-gradient-to-r ${skill.color.replace("text-", "from-")} to-primary`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


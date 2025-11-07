"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard. Built with Next.js and MongoDB for scalable product management.",
    tech: ["Next.js", "React", "MongoDB", "Node.js", "JWT", "Stripe"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 2,
    title: "Task Management API",
    description:
      "RESTful API for task management with real-time updates. Features include user authentication, task CRUD operations, and team collaboration. Uses MongoDB for data persistence.",
    tech: ["NestJS", "MongoDB", "GraphQL", "JWT", "Socket.io"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for social media metrics. Real-time data visualization with interactive charts. Backend built with FastAPI and MongoDB for efficient data handling.",
    tech: ["React", "FastAPI", "MongoDB", "Chart.js", "WebSocket"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 4,
    title: "Blog Platform",
    description:
      "Modern blog platform with markdown support, comments, and user profiles. Features include search, tags, and responsive design. MongoDB stores articles and user data.",
    tech: ["Next.js", "MongoDB", "Express", "Markdown", "JWT"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my skills and experience with
            various technologies, including MongoDB integration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 h-full flex flex-col cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, "_blank");
                    }}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.demo, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const project = projects.find((p) => p.id === selectedProject);
                  if (!project) return null;
                  return (
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedProject(null)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => window.open(project.github, "_blank")}
                          className="flex-1"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(project.demo, "_blank")}
                          className="flex-1"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


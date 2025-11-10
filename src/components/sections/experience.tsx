"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionCanvas from "@/components/three/section-canvas";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Tech Company",
    location: "Remote",
    period: "2023 - Present",
    description:
      "Developed and maintained multiple web applications using React, Next.js, and Node.js. Implemented RESTful APIs and GraphQL endpoints. Managed MongoDB databases and optimized query performance.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
      "JWT",
      "TypeScript",
    ],
  },
  {
    title: "Backend Developer",
    company: "Startup Inc",
    location: "San Francisco, CA",
    period: "2022 - 2023",
    description:
      "Built scalable backend services using NestJS and FastAPI. Designed database schemas for MongoDB and SQL databases. Implemented authentication and authorization systems.",
    technologies: [
      "NestJS",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "JWT",
      "Docker",
      "Redis",
    ],
  },
  {
    title: "Junior Developer",
    company: "Web Agency",
    location: "New York, NY",
    period: "2021 - 2022",
    description:
      "Worked on client projects using React and Express. Developed REST APIs and integrated third-party services. Gained experience with MongoDB and SQL databases.",
    technologies: [
      "React",
      "Express",
      "MongoDB",
      "SQL",
      "REST API",
      "JavaScript",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      <SectionCanvas type="experience" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the technologies I&apos;ve worked with,
            including MongoDB for database management.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-12 md:pl-0 md:flex md:items-center"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 -translate-y-1/2 top-6" />

                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
                  }`}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


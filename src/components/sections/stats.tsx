"use client";

import { motion } from "framer-motion";
import { Code, Users, Award, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Code,
    value: "50+",
    label: "Projects Completed",
    description: "Successfully delivered projects across various domains",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: "30+",
    label: "Happy Clients",
    description: "Satisfied clients from startups to enterprise companies",
    color: "text-purple-500",
  },
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "Years of professional development experience",
    color: "text-green-500",
  },
  {
    icon: Coffee,
    value: "1000+",
    label: "Cups of Coffee",
    description: "Fueling creativity and problem-solving",
    color: "text-orange-500",
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative py-20 sm:py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">By The Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my journey and achievements as a developer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex mb-4"
                    >
                      <Icon className={`h-12 w-12 ${stat.color}`} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl font-bold mb-2"
                    >
                      {stat.value}
                    </motion.h3>
                    <h4 className="text-lg font-semibold mb-2">{stat.label}</h4>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
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


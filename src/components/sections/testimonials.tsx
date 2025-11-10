"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Corp",
    image: "👩‍💼",
    content:
      "Working with Kashi was an absolute pleasure. Their attention to detail and ability to deliver high-quality code on time exceeded our expectations. The project was completed flawlessly.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    image: "👨‍💻",
    content:
      "Kashi's expertise in full-stack development helped us build a robust and scalable platform. Their problem-solving skills and technical knowledge are outstanding.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Agency",
    image: "👩‍🎨",
    content:
      "The collaboration was seamless. Kashi understood our vision and brought it to life with clean, efficient code. The final product exceeded all our expectations.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    company: "InnovateLab",
    image: "👨‍🚀",
    content:
      "Kashi delivered a complex project with multiple integrations. Their communication was excellent throughout, and they always found creative solutions to challenges.",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from clients and colleagues I&apos;ve had the pleasure of
            working with.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


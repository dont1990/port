"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h3 className="text-2xl font-semibold mb-8">Work Experience</h3>
      <div className="space-y-6">
        {experiences?.map((exp, index) => (
          <motion.div key={index} variants={cardVariants as any}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-primary">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{exp.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies?.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

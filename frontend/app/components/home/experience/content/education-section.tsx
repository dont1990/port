"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

interface EducationSectionProps {
  education?: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-8">Education</h3>
      <div className="space-y-6">
        {education?.map((edu, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {edu.school}
                  </CardDescription>
                </div>
                <Badge variant="outline">{edu.period}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

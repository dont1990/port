"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { SkillCategory } from "@/app/types/shared/skill/skill";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
}

export function SkillCard({ category, index, isInView }: SkillCardProps) {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={cardVariants as any}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <motion.h3
            className="text-xl font-semibold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            {category.title}
          </motion.h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skillIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1 + skillIndex * 0.1,
                }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={
                      isInView ? { width: `${skill.level}%` } : { width: 0 }
                    }
                    transition={{
                      duration: 1,
                      delay: 0.7 + index * 0.1 + skillIndex * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

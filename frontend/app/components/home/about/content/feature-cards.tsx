"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { motion } from "framer-motion";
import { Code, Palette, Zap } from "lucide-react";

interface Feature {
  icon: "Code" | "Palette" | "Zap";
  title: string;
  description: string;
}

interface AboutFeatureCardsProps {
  features?: Feature[];
  isInView: boolean;
}

const iconMap = {
  Code,
  Palette,
  Zap,
};

export function AboutFeatureCards({
  features,
  isInView,
}: AboutFeatureCardsProps) {
  return (
    <motion.div
      className="grid gap-6"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {features?.map((item, index) => {
        const IconComponent = iconMap[item.icon];
        return (
          <motion.div
            key={index}
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconComponent className="h-8 w-8 text-primary me-3" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </motion.div>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

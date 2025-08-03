"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface Certification {
  name: string;
  org: string;
  year: string;
}

interface CertificationsSectionProps {
  certifications?: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h4 className="text-xl font-semibold mb-6">Certifications</h4>
      <div className="space-y-4">
        {certifications?.map((cert, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="font-medium">{cert.name}</h5>
                  <p className="text-sm text-muted-foreground">{cert.org}</p>
                </div>
                <Badge variant="outline">{cert.year}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { CertificationsSection } from "./certifications-section";
import ExperienceHeader from "./header";

type Props = {
  data: ExperienceData;
};

export function ExperienceContent({ data }: Props) {
  const { experiences, education, certifications } = data;

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="section-container">
       <ExperienceHeader/>

        <div className="grid lg:grid-cols-2 gap-12">
          <ExperienceSection experiences={experiences} />
          <div>
            <EducationSection education={education} />
            <CertificationsSection certifications={certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}

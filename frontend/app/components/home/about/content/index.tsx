"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ParallaxContainer } from "@/app/components/section-parallax";
import { AboutData } from "@/app/types/shared/about/aboutData";
import { AboutHeader } from "./header";
import { AboutTextBlock } from "./text-block";
import { AboutFeatureCards } from "./feature-cards";

export function AboutContent({ description, skills, features }: AboutData) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref}>
      <ParallaxContainer>
        <div className="section-container relative z-10">
          <AboutHeader description={description} isInView={isInView} />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AboutTextBlock description={description} skills={skills} isInView={isInView} />
            <AboutFeatureCards features={features} isInView={isInView} />
          </div>
        </div>
      </ParallaxContainer>
    </section>
  );
}

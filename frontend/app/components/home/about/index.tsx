import React from "react";
import { AboutContent } from "./content";
import { fetchAboutData } from "@/app/lib/fetch/fetchAbout";
import { getCurrentLang } from "@/app/lib/language/getCurrentLang";

const About = async () => {
  const lang = getCurrentLang();
  const about = await fetchAboutData(lang as "en" | "fa");
  return (
    <AboutContent
      description={about.description}
      skills={about.skills}
      features={about.features}
    />
  );
};

export default About;

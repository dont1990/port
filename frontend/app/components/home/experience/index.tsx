import { fetchExperiences } from "@/app/lib/fetch/fetchExperiences";
import React from "react";
import { ExperienceContent } from "./content";


const Experience = async () => {
  const experiences = await fetchExperiences();

  return <ExperienceContent data={experiences} />;
};

export default Experience;

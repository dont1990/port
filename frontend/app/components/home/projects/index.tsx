import React from "react";
import { ProjectsContent } from "./content";
import { fetchProjects } from "@/app/lib/fetch/fetchProjects";

const Projects = async () => {
  const projects = await fetchProjects();

  return <ProjectsContent projects={projects} />;
};

export default Projects;

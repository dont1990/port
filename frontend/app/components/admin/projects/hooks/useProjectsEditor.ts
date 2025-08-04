"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Project } from "@/app/types/shared/project/project";
import { updateProjects } from "../actions/updateProjects";
import { fetchProjectsClient } from "@/app/lib/fetch/fetchProjects";
import { useLang } from "@/app/context/langContext";
import { Lang } from "@/app/types/shared/lang/lang";

export function useProjectsEditor() {
  const { lang } = useLang();

  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    () => `/projects?lang=${lang}`,
    () => fetchProjectsClient(lang as Lang)
  );

  const [projects, setProjects] = useState<Project[] | null>(null);

  // Sync SWR data to local state
  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  const handleChange = <K extends keyof Project>(
    index: number,
    key: K,
    value: Project[K]
  ) => {
    if (!projects) return;
    const updated = [...projects];
    updated[index][key] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects((prev) => [
      ...(prev || []),
      {
        title: "New Project",
        description: "",
        image: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (!projects) return;
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const handleSave = async () => {
    if (!projects) return;
    try {
      await updateProjects(projects, lang as Lang);
      mutate();
      toast.success("Projects info updated.");
    } catch (error) {
      toast.error("Failed to update projects info.");
    }
  };

  return {
    projects,
    error,
    isLoading,
    handleChange,
    handleSave,
    addProject,
    removeProject,
  };
}

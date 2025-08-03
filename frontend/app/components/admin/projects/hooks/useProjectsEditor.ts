"use client";

import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Project } from "@/app/types/shared/project/project";
import { fetcher } from "@/app/lib/utils/swr/fetcher";
import { updateProjects } from "../actions/updateProjects";

export function useProjectsEditor() {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    fetcher
  );

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // sync local state when data is loaded
  if (!projects && data) setProjects(data);

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
    setIsSaving(true);
    try {
      await updateProjects(projects);
      mutate();
      toast.success("Projects info updated.");
    } catch (error) {
      toast.error("Failed to update projects info.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    projects,
    error,
    isLoading,
    isSaving,
    handleChange,
    handleSave,
    addProject,
    removeProject,
  };
}

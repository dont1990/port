"use client";

import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { updateProjects } from "./actions/updateProjects";
import ProjectsEditorSkeleton from "./skeleton";
import { Textarea } from "@/app/components/ui/textarea";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import toast from "react-hot-toast";
import { fetcher } from "@/app/lib/utils/swr/fetcher";
import { Project } from "@/app/types/shared/project/project";

export default function ProjectsEditor() {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    fetcher
  );

  const [projects, setProjects] = useState<Project[] | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  if (!projects && data) setProjects(data);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

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

  if (isLoading || !projects) return <ProjectsEditorSkeleton />;
  if (error) return <p>Error loading projects</p>;

  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Projects Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {projects.map((project, idx) => (
            <div key={idx} className="border p-4 rounded-md space-y-4">
              <Input
                value={project.title}
                onChange={(e) => handleChange(idx, "title", e.target.value)}
                placeholder="Project Title"
              />
              <Textarea
                value={project.description}
                onChange={(e) =>
                  handleChange(idx, "description", e.target.value)
                }
                placeholder="Description"
              />
              <Input
                value={project.image}
                onChange={(e) => handleChange(idx, "image", e.target.value)}
                placeholder="Image URL"
              />
              <Input
                value={project.liveUrl}
                onChange={(e) => handleChange(idx, "liveUrl", e.target.value)}
                placeholder="Live URL"
              />
              <Input
                value={project.githubUrl}
                onChange={(e) => handleChange(idx, "githubUrl", e.target.value)}
                placeholder="GitHub URL"
              />
              <Input
                value={project.technologies.join(", ")}
                onChange={(e) =>
                  handleChange(
                    idx,
                    "technologies",
                    e.target.value.split(",").map((tech) => tech.trim())
                  )
                }
                placeholder="Technologies (comma separated)"
              />

              <Button
                variant="destructive"
                onClick={() => removeProject(idx)}
                className="mt-2"
              >
                Remove Project
              </Button>
            </div>
          ))}

          <div className="flex gap-4 pt-6">
            <Button onClick={addProject}>+ Add Project</Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              {!isSaving && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

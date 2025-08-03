"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import ProjectsEditorSkeleton from "./skeleton";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { useProjectsEditor } from "./hooks/useProjectsEditor";

export default function ProjectsEditor() {
  const {
    projects,
    error,
    isLoading,
    isSaving,
    handleChange,
    handleSave,
    addProject,
    removeProject,
  } = useProjectsEditor();

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

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

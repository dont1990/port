"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent } from "@/app/components/ui/card";
import ProjectsEditorSkeleton from "./skeleton";
import { useProjectsEditor } from "./hooks/useProjectsEditor";
import AdminSectionHeader from "../section-header";
import { useTranslation } from "react-i18next";
import { Label } from "@/app/components/ui/label"; // import your Label component

export default function ProjectsEditor() {
  const {
    projects,
    error,
    isLoading,
    handleChange,
    handleSave,
    addProject,
    removeProject,
  } = useProjectsEditor();

  const { t } = useTranslation("dashboard");

  if (isLoading || !projects) return <ProjectsEditorSkeleton />;
  if (error) return <p>{t("projects.UpdateError")}</p>;

  return (
    <section className="section-container py-10">
      <Card>
        <AdminSectionHeader title={t("projects.Title")} />
        <CardContent className="space-y-8">
          {projects.map((project, idx) => {
            const baseId = `project-${idx}`;
            return (
              <div key={idx} className="border p-4 rounded-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-title`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderTitle")}
                  </Label>
                  <Input
                    id={`${baseId}-title`}
                    value={project.title}
                    onChange={(e) => handleChange(idx, "title", e.target.value)}
                    placeholder={t("projects.PlaceholderTitle")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-description`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderDescription")}
                  </Label>
                  <Textarea
                    id={`${baseId}-description`}
                    value={project.description}
                    onChange={(e) => handleChange(idx, "description", e.target.value)}
                    placeholder={t("projects.PlaceholderDescription")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-image`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderImage")}
                  </Label>
                  <Input
                    id={`${baseId}-image`}
                    value={project.image}
                    onChange={(e) => handleChange(idx, "image", e.target.value)}
                    placeholder={t("projects.PlaceholderImage")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-liveUrl`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderLiveUrl")}
                  </Label>
                  <Input
                    id={`${baseId}-liveUrl`}
                    value={project.liveUrl}
                    onChange={(e) => handleChange(idx, "liveUrl", e.target.value)}
                    placeholder={t("projects.PlaceholderLiveUrl")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-githubUrl`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderGithubUrl")}
                  </Label>
                  <Input
                    id={`${baseId}-githubUrl`}
                    value={project.githubUrl}
                    onChange={(e) => handleChange(idx, "githubUrl", e.target.value)}
                    placeholder={t("projects.PlaceholderGithubUrl")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${baseId}-technologies`} className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("projects.PlaceholderTechnologies")}
                  </Label>
                  <Input
                    id={`${baseId}-technologies`}
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      handleChange(
                        idx,
                        "technologies",
                        e.target.value.split(",").map((tech) => tech.trim())
                      )
                    }
                    placeholder={t("projects.PlaceholderTechnologies")}
                  />
                </div>

                <Button
                  variant="destructive"
                  onClick={() => removeProject(idx)}
                  className="mt-2"
                >
                  {t("projects.RemoveProject")}
                </Button>
              </div>
            );
          })}

          <div className="flex gap-4 pt-6">
            <Button onClick={addProject}>{t("projects.AddProject")}</Button>
            <Button onClick={handleSave} isLoading={isLoading}>
              {!isLoading && t("projects.Save")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

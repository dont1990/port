"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent } from "@/app/components/ui/card";
import ProjectsEditorSkeleton from "./skeleton";
import { useProjectsEditor } from "./hooks/useProjectsEditor";
import AdminSectionHeader from "../admin-section-header";
import { useTranslation } from "react-i18next";
import { Label } from "@/app/components/ui/label"; // import your Label component
import ChipsInput from "../../chips-input";
import toast from "react-hot-toast";
import { uploadImage } from "@/app/lib/utils/upload/uploadeImage";

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
    <section className="section-container my-10">
      <Card className="max-w-4xl mx-auto">
        <AdminSectionHeader title={t("projects.Title")} />
        <CardContent className="space-y-8">
          {projects.map((project, idx) => {
            const baseId = `project-${idx}`;
            return (
              <div key={idx} className="border p-4 rounded-md space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-title`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
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
                  <Label
                    htmlFor={`${baseId}-description`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    {t("projects.PlaceholderDescription")}
                  </Label>
                  <Textarea
                    id={`${baseId}-description`}
                    value={project.description}
                    onChange={(e) =>
                      handleChange(idx, "description", e.target.value)
                    }
                    placeholder={t("projects.PlaceholderDescription")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-image`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    {t("projects.PlaceholderImage")}
                  </Label>

                  {/* Image preview */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-h-40 object-contain mb-2 rounded"
                    />
                  )}

                  <input
                    id={`${baseId}-image-upload`}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          const uploadedUrl = await uploadImage(
                            e.target.files[0]
                          );
                          handleChange(idx, "image", uploadedUrl);
                          toast.success(t("projects.ImageUploadSuccess"));
                        } catch {
                          toast.error(t("projects.ImageUploadError"));
                        }
                      }
                    }}
                    className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0
               file:text-sm file:font-semibold
               file:bg-primary file:text-white
               hover:file:bg-primary/90"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-liveUrl`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    {t("projects.PlaceholderLiveUrl")}
                  </Label>
                  <Input
                    id={`${baseId}-liveUrl`}
                    value={project.liveUrl}
                    onChange={(e) =>
                      handleChange(idx, "liveUrl", e.target.value)
                    }
                    placeholder={t("projects.PlaceholderLiveUrl")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-githubUrl`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    {t("projects.PlaceholderGithubUrl")}
                  </Label>
                  <Input
                    id={`${baseId}-githubUrl`}
                    value={project.githubUrl}
                    onChange={(e) =>
                      handleChange(idx, "githubUrl", e.target.value)
                    }
                    placeholder={t("projects.PlaceholderGithubUrl")}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`${baseId}-technologies`}
                    className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    {t("projects.PlaceholderTechnologies")}
                  </Label>
                  <ChipsInput
                    values={project.technologies}
                    onChange={(newValues) =>
                      handleChange(idx, "technologies", newValues)
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

"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import AboutEditorSkeleton from "./skeleton";
import { useAboutForm } from "./hooks/useAboutForm";
import AdminSectionHeader from "../admin-section-header";
import { useTranslation } from "react-i18next";

export default function AboutEditor() {
  const {
    form,
    isLoading,
    error,
    isPending,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    updateFeatureItem,
    addFeature,
    removeFeature,
    handleSave,
  } = useAboutForm();

  const { t } = useTranslation("dashboard");

  if (isLoading) return <AboutEditorSkeleton />;
  if (error || !form) return <p>{t("about.UpdateError")}</p>;

  return (
    <section className="section-container my-10">
      <Card className="max-w-4xl mx-auto">
        <AdminSectionHeader title={t("hero.Title")} />
        <CardContent className="space-y-6">
          {/* Descriptions */}
          <div className="space-y-2">
            <Label>{t("about.Description")}</Label>
            {form.description.map((desc, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={desc}
                  onChange={(e) =>
                    updateArrayItem("description", i, e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("description", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem("description")}
            >
              {t("about.AddDescription")}
            </Button>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>{t("about.Skills")}</Label>
            {form.skills.map((skill, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateArrayItem("skills", i, e.target.value)}
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("skills", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addArrayItem("skills")}>
              {t("about.AddSkill")}
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>{t("about.Features")}</Label>
            {form.features.map((feature, i) => (
              <div key={i} className="space-y-2 border p-4 rounded-md">
                <Input
                  placeholder={t("about.Features") + " " + t("hero.Name")}
                  value={feature.title}
                  onChange={(e) =>
                    updateFeatureItem(i, "title", e.target.value)
                  }
                />
                <Input
                  placeholder={t("about.Description")}
                  value={feature.description}
                  onChange={(e) =>
                    updateFeatureItem(i, "description", e.target.value)
                  }
                />
                <Input
                  placeholder="Icon"
                  value={feature.icon}
                  onChange={(e) => updateFeatureItem(i, "icon", e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeFeature(i)}>
                  {t("about.RemoveFeature")}
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature}>
              {t("about.AddFeature")}
            </Button>
          </div>

          {/* Save */}
          <div>
            <Button
              onClick={handleSave}
              className="w-full"
              isLoading={isPending}
            >
              {!isPending && t("about.Save")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

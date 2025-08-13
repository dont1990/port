"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Plus,
  X,
  Save,
  Trash2,
  Star,
  Code2,
  Palette,
  Database,
  Globe,
  Target,
} from "lucide-react";
import SkillsEditorSkeleton from "../skeleton";
import { useSkillsEditor } from "../hooks/useSkillsEditor";
import AdminSectionHeader from "../../admin-section-header";
import { useTranslation } from "react-i18next";
import { Progress } from "@/app/components/ui/progress";

const categoryIcons = {
  Frontend: Code2,
  Backend: Database,
  Design: Palette,
  Tools: Globe,
  Languages: Target,
  Other: Star,
};

export default function SkillsEditor() {
  const {
    skillsData,
    isLoading,
    error,
    handleCategoryChange,
    handleSkillChange,
    addCategory,
    addSkill,
    removeCategory,
    removeSkill,
    handleSave,
  } = useSkillsEditor();

  const { t } = useTranslation("dashboard");

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (level >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-600";
    if (level >= 40) return "bg-gradient-to-r from-yellow-500 to-orange-600";
    return "bg-gradient-to-r from-red-500 to-pink-600";
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 80) return t("skills.expert");
    if (level >= 60) return t("skills.advanced");
    if (level >= 40) return t("skills.intermediate");
    return t("skills.beginner");
  };

  if (isLoading || !skillsData) return <SkillsEditorSkeleton />;
  if (error) return <p>{t("skills.error")}</p>;

  return (
    <section className="section-container my-10">
      <div className="grid gap-6 max-w-4xl mx-auto">
        <AdminSectionHeader title={t("skills.title")} className="p-0" />
        {skillsData.map((category, catIdx) => {
          const IconComponent =
            categoryIcons[category.title as keyof typeof categoryIcons] || Star;

          return (
            <Card
              key={catIdx}
              className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50"
            >
              <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border-b border-indigo-100/20 dark:border-indigo-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Input
                      value={category.title}
                      onChange={(e) =>
                        handleCategoryChange(catIdx, e.target.value)
                      }
                      className="text-lg font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-foreground"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(catIdx)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-600 rounded-lg border border-gray-100 dark:border-slate-600"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <Input
                        value={skill.name}
                        onChange={(e) =>
                          handleSkillChange(
                            catIdx,
                            skillIdx,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder={t("skills.skillName")}
                        className="flex-1 bg-background text-foreground"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={skill.level}
                          onChange={(e) =>
                            handleSkillChange(
                              catIdx,
                              skillIdx,
                              "level",
                              +e.target.value
                            )
                          }
                          placeholder={t("skills.skillLevel")}
                          min={0}
                          max={100}
                          className="w-20 bg-background text-foreground"
                        />
                        <Badge
                          variant="secondary"
                          className={`${getSkillLevelColor(
                            skill.level
                          )} text-white border-0`}
                        >
                          {getSkillLevelText(skill.level)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(catIdx, skillIdx)}
                          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {skill.level > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>{t("skills.proficiency")}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => addSkill(catIdx)}
                  className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("skills.addSkill")}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4 justify-center pt-6">
        <Button
          onClick={addCategory}
          variant="outline"
          className="border-dashed border-2 border-purple-300 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-600 dark:text-purple-400 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("skills.addCategory")}
        </Button>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("skills.saving")}
            </div>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {t("skills.save")}
            </>
          )}
        </Button>
      </div>
    </section>
  );
}

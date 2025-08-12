"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { FileText, Lightbulb, Star, Plus, Minus, Save, Loader2 } from "lucide-react";
import { useAboutForm } from "../hooks/useAboutForm";
import AdminSectionHeader from "../../admin-section-header";
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

  if (isLoading) return <p>Loading...</p>;
  if (error || !form) return <p className="text-red-600 dark:text-red-400">{t("about.UpdateError")}</p>;

  return (
    <section className="section-container my-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <AdminSectionHeader title={t("hero.Title")} className="p-0" />

        <div className="grid gap-6">
          {/* Left Column: Descriptions & Skills */}
          <div className="space-y-6">
            {/* Description Section */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm dark:from-slate-800 dark:to-slate-900 dark:shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800 dark:text-slate-200">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  {t("about.Description")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.description.map((desc, i) => (
                  <div key={i} className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-2 dark:text-slate-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {t("about.Description")} {i + 1}
                    </Label>
                    <div className="flex gap-2">
                      <Textarea
                        value={desc}
                        onChange={(e) => updateArrayItem("description", i, e.target.value)}
                        className="min-h-[80px] border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/50 dark:placeholder:text-slate-400"
                        placeholder={t("about.EnterDescription")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("description", i)}
                        className="shrink-0 h-10 w-10 p-0 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem("description")}
                  className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("about.AddDescription")}
                </Button>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm dark:from-slate-800 dark:to-slate-900 dark:shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800 dark:text-slate-200">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white">
                    <Star className="w-5 h-5" />
                  </div>
                  {t("about.Skills")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {form.skills.map((skill, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => updateArrayItem("skills", i, e.target.value)}
                        className="border-slate-200 focus:border-green-500 focus:ring-green-500/20 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:focus:border-green-400 dark:focus:ring-green-400/50 dark:placeholder:text-slate-400"
                        placeholder={t("about.EnterSkill")}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("skills", i)}
                        className="shrink-0 h-10 w-10 p-0 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addArrayItem("skills")}
                  className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("about.AddSkill")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Features */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm dark:from-slate-800 dark:to-slate-900 dark:shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800 dark:text-slate-200">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg text-white">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  {t("about.Features")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {form.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 border border-slate-200 rounded-lg bg-white/50 space-y-3 dark:bg-slate-700/60 dark:border-slate-600"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {t("about.Feature")} {i + 1}
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(i)}
                        className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-slate-600 mb-1 block dark:text-slate-400">
                          {t("about.Title")}
                        </Label>
                        <Input
                          placeholder={t("about.FeatureTitlePlaceholder")}
                          value={feature.title}
                          onChange={(e) => updateFeatureItem(i, "title", e.target.value)}
                          className="border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:focus:border-purple-400 dark:focus:ring-purple-400/50 dark:placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-slate-600 mb-1 block dark:text-slate-400">
                          {t("about.Description")}
                        </Label>
                        <Textarea
                          placeholder={t("about.FeatureDescriptionPlaceholder")}
                          value={feature.description}
                          onChange={(e) => updateFeatureItem(i, "description", e.target.value)}
                          className="min-h-[60px] border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:focus:border-purple-400 dark:focus:ring-purple-400/50 dark:placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-slate-600 mb-1 block dark:text-slate-400">
                          {t("about.IconPlaceholder")}
                        </Label>
                        <Input
                          placeholder={t("about.IconPlaceholder")}
                          value={feature.icon}
                          onChange={(e) => updateFeatureItem(i, "icon", e.target.value)}
                          className="border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:focus:border-purple-400 dark:focus:ring-purple-400/50 dark:placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addFeature}
                  className="w-full border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("about.AddFeature")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("about.SavingChanges")}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t("about.Save")}
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

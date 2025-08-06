"use client";

import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { useHeroData } from "../hooks/useHeroData";
import { useResumeUploader } from "../hooks/useResumeUploader";
import HeroForm from "./form";
import ResumeUploader from "./resume-uploader";
import HeroEditorSkeleton from "../skeleton";
import AdminSectionHeader from "../../section-header";
import { Lang } from "@/app/types/shared/lang/lang";
import { useTranslation } from "react-i18next";

export default function HeroEditor() {
  const { t } = useTranslation("dashboard");

  const {
    form,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  } = useHeroData();

  const { resumeFiles, setResumeFile, handleResumeUpload, uploadProgress } =
    useResumeUploader();

  const langs: Lang[] = ["en", "fa"];

  if (isLoading) return <HeroEditorSkeleton />;
  if (error || !form) return <p className="text-red-500">{t("hero.LoadError")}</p>;

  return (
    <section className="section-container">
      <Card className="max-w-3xl mx-auto">
        <AdminSectionHeader title={t("hero.Title")} />
        <CardContent className="space-y-8">
          <HeroForm
            form={form}
            isPending={isPending}
            onChange={handleChange}
            onRolesChange={handleRolesChange}
            onSave={handleSave}
          />
          <ResumeUploader
            langs={langs}
            resumeFiles={resumeFiles}
            setResumeFile={setResumeFile}
            handleResumeUpload={handleResumeUpload}
            uploadProgress={uploadProgress}
          />
        </CardContent>
      </Card>
    </section>
  );
}

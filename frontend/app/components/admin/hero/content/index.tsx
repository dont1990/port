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


export default function HeroEditor() {
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

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  if (isLoading) return <HeroEditorSkeleton />;
  if (error || !form) return <p>Failed to load hero data.</p>;

  return (
    <section className="section-container">
      <Card className="max-w-3xl mx-auto">
        <AdminSectionHeader title="Edit Hero Info" />
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

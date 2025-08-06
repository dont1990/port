"use client";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { Lang } from "@/app/types/shared/lang/lang";
import { useLang } from "@/app/context/langContext";

interface ResumeUploaderProps {
  langs: Lang[];
  resumeFiles: Partial<Record<Lang, File>>;
  setResumeFile: (lang: Lang, file: File) => void;
  handleResumeUpload: (lang: Lang) => Promise<void>;
  uploadProgress: Partial<Record<Lang, number>>;
}

export default function ResumeUploader({
  langs,
  resumeFiles,
  setResumeFile,
  handleResumeUpload,
  uploadProgress,
}: ResumeUploaderProps) {
  const { t } = useTranslation("dashboard");
  const { dir } = useLang();

  return (
    <div className="pt-8 border-t space-y-6">
      <h4 className="text-lg font-medium mb-2">{t("hero.ResumeTitle")}</h4>

      {langs.map((lang) => (
        <div key={lang} className="space-y-2">
          <Label>
            {dir === "rtl"
              ? `${t("hero.Resume")} ${
                  lang === "en" ? t("hero.English") : t("hero.Persian")
                }`
              : `${lang === "en" ? t("hero.English") : t("hero.Persian")} ${t(
                  "hero.Resume"
                )}`}
          </Label>

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) setResumeFile(lang, e.target.files[0]);
            }}
          />
          <div className="flex gap-2 items-center">
            <Button
              onClick={async () => {
                try {
                  await handleResumeUpload(lang);
                  toast.success(
                    t("hero.UploadResumeSuccess", { lang: lang.toUpperCase() })
                  );
                } catch {
                  toast.error(
                    t("hero.UploadResumeError", { lang: lang.toUpperCase() })
                  );
                }
              }}
              disabled={!resumeFiles[lang]}
            >
              {t("hero.Upload")} {lang.toUpperCase()}
            </Button>

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/hero/resume?lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                {t("hero.Download")} {lang.toUpperCase()}
              </Button>
            </a>
          </div>

          {uploadProgress[lang] !== undefined && (
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${uploadProgress[lang]}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

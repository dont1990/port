import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type Lang = "en" | "fa";

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

  return (
    <div className="pt-8 border-t space-y-6">
      <h4 className="text-lg font-medium mb-2">Resume (English & Persian)</h4>

      {langs.map((lang) => (
        <div key={lang} className="space-y-2">
          <Label>{lang === "en" ? "English" : "Persian"} Resume</Label>
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
                  // optionally: show toast success here if you want
                } catch {
                  // optionally: show toast error here if you want
                }
              }}
              disabled={!resumeFiles[lang]}
            >
              Upload {lang.toUpperCase()}
            </Button>

            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/hero/resume?lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">Download {lang.toUpperCase()}</Button>
            </a>
          </div>

          {/* Progress Bar */}
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

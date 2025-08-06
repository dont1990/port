"use client";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/app/components/ui/textarea";

export default function EducationSection({
  data,
  onChange,
  onAdd,
  onRemove,
}: {
  data: any[];
  onChange: Function;
  onAdd: Function;
  onRemove: Function;
}) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-xl">{t("experience.Education")}</h3>
      {data.map((item, idx) => {
        const baseId = `education-${idx}`;
        return (
          <div key={idx} className="space-y-2 border p-4 rounded-md">
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-degree`}>
                {t("experience.Degree")}
              </Label>
              <Input
                id={`${baseId}-degree`}
                value={item.degree}
                onChange={(e) =>
                  onChange("education", idx, "degree", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-school`}>
                {t("experience.School")}
              </Label>
              <Input
                id={`${baseId}-school`}
                value={item.school}
                onChange={(e) =>
                  onChange("education", idx, "school", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-period`}>
                {t("experience.Period")}
              </Label>
              <Input
                id={`${baseId}-period`}
                value={item.period}
                onChange={(e) =>
                  onChange("education", idx, "period", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-description`}>
                {t("experience.Description")}
              </Label>
              <Textarea
                id={`${baseId}-description`}
                value={item.description}
                onChange={(e) =>
                  onChange("education", idx, "description", e.target.value)
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => onRemove("education", idx)}
            >
              {t("experience.Remove")}
            </Button>
          </div>
        );
      })}
      <Button
        variant="link"
        onClick={() =>
          onAdd("education", {
            degree: "",
            school: "",
            period: "",
            description: "",
          })
        }
      >
        {t("experience.Add")}
      </Button>
    </div>
  );
}

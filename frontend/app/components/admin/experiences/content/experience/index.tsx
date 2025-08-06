"use client";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { useTranslation } from "react-i18next";
import ChipsInput from "@/app/components/chips-input";

export default function ExperienceSection({
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
      <h3 className="font-bold text-xl">{t("experience.Experiences")}</h3>
      {data.map((item, idx) => {
        const baseId = `experience-${idx}`;
        return (
          <div key={idx} className="space-y-3 border p-4 rounded-md">
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-title`}>
                {t("experience.TitlePlaceholder")}
              </Label>
              <Input
                id={`${baseId}-title`}
                value={item.title}
                onChange={(e) =>
                  onChange("experiences", idx, "title", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-company`}>
                {t("experience.Company")}
              </Label>
              <Input
                id={`${baseId}-company`}
                value={item.company}
                onChange={(e) =>
                  onChange("experiences", idx, "company", e.target.value)
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
                  onChange("experiences", idx, "period", e.target.value)
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
                  onChange("experiences", idx, "description", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-technologies`}>
                {t("experience.Technologies")}
              </Label>
              <ChipsInput
                values={item.technologies}
                onChange={(newValues) =>
                  onChange("experiences", idx, "technologies", newValues)
                }
                placeholder={t("experience.Technologies")}
              />
            </div>

            <Button
              variant="destructive"
              onClick={() => onRemove("experiences", idx)}
            >
              {t("experience.Remove")}
            </Button>
          </div>
        );
      })}
      <Button
        variant="link"
        onClick={() =>
          onAdd("experiences", {
            title: "",
            company: "",
            period: "",
            description: "",
            technologies: [],
          })
        }
      >
        {t("experience.Add")}
      </Button>
    </div>
  );
}

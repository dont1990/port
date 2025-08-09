"use client";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { useTranslation } from "react-i18next";

export default function CourseSection({
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
      <h3 className="font-bold text-xl">{t("experience.Courses")}</h3>
      {data.map((item, idx) => {
        const baseId = `course-${idx}`;
        return (
          <div key={idx} className="space-y-2 border p-4 rounded-md">
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-name`}>
                {t("experience.CourseName")}
              </Label>
              <Input
                id={`${baseId}-name`}
                value={item.name}
                onChange={(e) =>
                  onChange("courses", idx, "name", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-org`}>
                {t("experience.Organization")}
              </Label>
              <Input
                id={`${baseId}-org`}
                value={item.org}
                onChange={(e) =>
                  onChange("courses", idx, "org", e.target.value)
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${baseId}-year`}>{t("experience.Year")}</Label>
              <Input
                id={`${baseId}-year`}
                value={item.year}
                onChange={(e) =>
                  onChange("courses", idx, "year", e.target.value)
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => onRemove("courses", idx)}
            >
              {t("experience.Remove")}
            </Button>
          </div>
        );
      })}
      <Button
        variant="link"
        onClick={() =>
          onAdd("courses", {
            name: "",
            org: "",
            year: "",
          })
        }
      >
        {t("experience.Add")}
      </Button>
    </div>
  );
}

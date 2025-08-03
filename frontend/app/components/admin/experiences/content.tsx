"use client";

import useSWR from "swr";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { fetcher } from "@/app/lib/utils/swr/fetcher";
import toast from "react-hot-toast";
import { ExperienceData } from "@/app/types/shared/experience/experience";
import { updateExperiences } from "./actions/updateExperiences";
import ExperienceEditorSkeleton from "./skeleton";

export default function ExperienceEditor() {
  const { data, error, isLoading, mutate } = useSWR<ExperienceData>(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences`,
    fetcher
  );

  const [formData, setFormData] = useState<ExperienceData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!formData && data) setFormData(data);

  const handleChange = <K extends keyof ExperienceData>(
    key: K,
    index: number,
    field: keyof ExperienceData[K][0],
    value: any
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any)[index][field] = value;
    setFormData(updated);
  };

  const handleAddItem = <K extends keyof ExperienceData>(
    key: K,
    newItem: ExperienceData[K][0]
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any).push(newItem);
    setFormData(updated);
  };

  const handleRemoveItem = <K extends keyof ExperienceData>(
    key: K,
    index: number
  ) => {
    if (!formData) return;
    const updated = { ...formData };
    (updated[key] as any).splice(index, 1);
    setFormData(updated);
  };

  const handleSave = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await updateExperiences(formData);
      mutate();
      toast.success("Experience data updated.");
    } catch {
      toast.error("Failed to update experience data.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !formData) return <ExperienceEditorSkeleton />;
  if (error) return <p>Error loading experience data</p>;

  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Experience & Education Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Experiences</h3>
            {formData.experiences.map((item, idx) => (
              <div key={idx} className="space-y-2 border p-4 rounded-md">
                <Input
                  value={item.title}
                  onChange={(e) =>
                    handleChange("experiences", idx, "title", e.target.value)
                  }
                  placeholder="Title"
                />
                <Input
                  value={item.company}
                  onChange={(e) =>
                    handleChange("experiences", idx, "company", e.target.value)
                  }
                  placeholder="Company"
                />
                <Input
                  value={item.period}
                  onChange={(e) =>
                    handleChange("experiences", idx, "period", e.target.value)
                  }
                  placeholder="Period"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    handleChange(
                      "experiences",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                />
                <Input
                  value={item.technologies.join(", ")}
                  onChange={(e) =>
                    handleChange(
                      "experiences",
                      idx,
                      "technologies",
                      e.target.value.split(",").map((t) => t.trim())
                    )
                  }
                  placeholder="Technologies (comma separated)"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem("experiences", idx)}
                >
                  Remove Experience
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              onClick={() =>
                handleAddItem("experiences", {
                  title: "",
                  company: "",
                  period: "",
                  description: "",
                  technologies: [],
                })
              }
            >
              + Add Experience
            </Button>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Education</h3>
            {formData.education.map((item, idx) => (
              <div key={idx} className="space-y-2 border p-4 rounded-md">
                <Input
                  value={item.degree}
                  onChange={(e) =>
                    handleChange("education", idx, "degree", e.target.value)
                  }
                  placeholder="Degree"
                />
                <Input
                  value={item.school}
                  onChange={(e) =>
                    handleChange("education", idx, "school", e.target.value)
                  }
                  placeholder="School"
                />
                <Input
                  value={item.period}
                  onChange={(e) =>
                    handleChange("education", idx, "period", e.target.value)
                  }
                  placeholder="Period"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    handleChange(
                      "education",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem("education", idx)}
                >
                  Remove Education
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              onClick={() =>
                handleAddItem("education", {
                  degree: "",
                  school: "",
                  period: "",
                  description: "",
                })
              }
            >
              + Add Education
            </Button>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl">Certifications</h3>
            {formData.certifications.map((item, idx) => (
              <div key={idx} className="space-y-2 border p-4 rounded-md">
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleChange("certifications", idx, "name", e.target.value)
                  }
                  placeholder="Certificate Name"
                />
                <Input
                  value={item.org}
                  onChange={(e) =>
                    handleChange("certifications", idx, "org", e.target.value)
                  }
                  placeholder="Organization"
                />
                <Input
                  value={item.year}
                  onChange={(e) =>
                    handleChange("certifications", idx, "year", e.target.value)
                  }
                  placeholder="Year"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem("certifications", idx)}
                >
                  Remove Certification
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              onClick={() =>
                handleAddItem("certifications", {
                  name: "",
                  org: "",
                  year: "",
                })
              }
            >
              + Add Certification
            </Button>
          </div>

          <Button onClick={handleSave} isLoading={isSaving}>
            {!isSaving && "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

"use client";

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import { useExperienceForm } from "../hooks/useExperienceForm";
import ExperienceEditorSkeleton from "../skeleton";
import AdminSectionHeader from "../../section-header";


export default function ExperienceEditor() {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSave,
  } = useExperienceForm();

  if (isLoading || !formData) return <ExperienceEditorSkeleton />;
  if (error) return <p>Error loading experience data</p>;

  return (
    <section className="section-container py-10">
      <Card>
       <AdminSectionHeader title="Experience & Education Editor"/>
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

          <Button onClick={handleSave} isLoading={isLoading}>
            {!isLoading && "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

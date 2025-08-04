"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import SkillsEditorSkeleton from "./skeleton";
import { useSkillsEditor } from "./hooks/useSkillsEditor";
import { useLang } from "@/app/context/langContext";
import AdminSectionHeader from "../section-header";

export default function SkillsEditor() {
  const {
    skillsData,
    isLoading,
    error,
    handleCategoryChange,
    handleSkillChange,
    addCategory,
    addSkill,
    removeCategory,
    removeSkill,
    handleSave,
  } = useSkillsEditor();


  if (isLoading || !skillsData) return <SkillsEditorSkeleton />;
  if (error) return <p>Error loading skills</p>;

  return (
    <section className="section-container py-10">
      <Card>
       <AdminSectionHeader title="Skills Editor" />
        <CardContent className="space-y-8">
          {skillsData.map((category, catIdx) => (
            <div key={catIdx} className="border p-4 rounded-md space-y-4">
              <div className="flex justify-between gap-4 items-center">
                <Input
                  value={category.title}
                  onChange={(e) => handleCategoryChange(catIdx, e.target.value)}
                  className="w-full"
                />
                <Button
                  variant="destructive"
                  onClick={() => removeCategory(catIdx)}
                >
                  Remove Category
                </Button>
              </div>

              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex gap-4">
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(
                        catIdx,
                        skillIdx,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Skill Name"
                  />
                  <Input
                    type="number"
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(
                        catIdx,
                        skillIdx,
                        "level",
                        +e.target.value
                      )
                    }
                    placeholder="Level"
                    min={0}
                    max={100}
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeSkill(catIdx, skillIdx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button variant="secondary" onClick={() => addSkill(catIdx)}>
                + Add Skill
              </Button>
            </div>
          ))}

          <div className="flex gap-4">
            <Button onClick={addCategory}>+ Add Category</Button>
            <Button onClick={handleSave} isLoading={isLoading}>
              {!isLoading && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

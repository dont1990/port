"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import AboutEditorSkeleton from "./skeleton";
import { useAboutForm } from "./hooks/useAboutForm";


export default function AboutEditor() {
  const {
    form,
    isLoading,
    error,
    isPending,
    lang,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    updateFeatureItem,
    addFeature,
    removeFeature,
    handleSave,
    setLang,
  } = useAboutForm();

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  if (isLoading) return <AboutEditorSkeleton />;
  if (error || !form) return <p>Failed to load about data.</p>;

  return (
    <section className="section-container">
      <Card className="mx-auto space-y-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Edit About Info</CardTitle>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "fa")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="fa">Persian</option>
          </select>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Descriptions */}
          <div className="space-y-2">
            <Label>Description</Label>
            {form.description.map((desc, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={desc}
                  onChange={(e) =>
                    updateArrayItem("description", i, e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("description", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem("description")}
            >
              + Add Description
            </Button>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills</Label>
            {form.skills.map((skill, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateArrayItem("skills", i, e.target.value)}
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("skills", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addArrayItem("skills")}>
              + Add Skill
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            {form.features.map((feature, i) => (
              <div key={i} className="space-y-2 border p-4 rounded-md">
                <Input
                  placeholder="Title"
                  value={feature.title}
                  onChange={(e) =>
                    updateFeatureItem(i, "title", e.target.value)
                  }
                />
                <Input
                  placeholder="Description"
                  value={feature.description}
                  onChange={(e) =>
                    updateFeatureItem(i, "description", e.target.value)
                  }
                />
                <Input
                  placeholder="Icon"
                  value={feature.icon}
                  onChange={(e) => updateFeatureItem(i, "icon", e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeFeature(i)}>
                  − Remove Feature
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature}>
              + Add Feature
            </Button>
          </div>

          {/* Save */}
          <div>
            <Button
              onClick={handleSave}
              className="w-full"
              isLoading={isPending}
            >
              {!isPending && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

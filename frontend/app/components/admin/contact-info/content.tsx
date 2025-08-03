"use client";

import { useLang } from "@/app/context/langContext";
import { Lang } from "@/app/types/shared/lang/lang";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import ContactInfoSkeleton from "./skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { useContactInfoEditor } from "./hooks/useContactInfoEditor";

export default function ContactEditor() {
  const { lang, setLang } = useLang();

  const {
    formData,
    error,
    isLoading,
    isPending,
    handleChange,
    handleSave,
  } = useContactInfoEditor(lang as Lang);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  if (isLoading || !formData) return <ContactInfoSkeleton />;
  if (error) return <p className="text-red-500">Failed to load contact info</p>;

  return (
    <section className="section-container">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <CardTitle>Edit Contact Information</CardTitle>
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-lg font-medium mb-2">Social Links</h4>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                name="social.github"
                value={formData.social.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />

              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />

              <Label htmlFor="twitter">Twitter</Label>
              <Input
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                placeholder="Twitter URL"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full" isLoading={isPending}>
              {!isPending && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

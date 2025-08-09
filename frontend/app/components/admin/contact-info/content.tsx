"use client";

import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import ContactInfoSkeleton from "./skeleton";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { useContactInfoEditor } from "./hooks/useContactInfoEditor";
import AdminSectionHeader from "../admin-section-header";
import { useTranslation } from "react-i18next";

export default function ContactEditor() {
  const { t } = useTranslation("dashboard");
  const { formData, error, isLoading, isPending, handleChange, handleSave } =
    useContactInfoEditor();

  if (isLoading || !formData) return <ContactInfoSkeleton />;
  if (error) return <p className="text-red-500">{t("contact.FailedToLoad")}</p>;

  return (
    <section className="section-container my-10">
      <Card className="max-w-4xl mx-auto">
        <AdminSectionHeader title={t("contact.EditContactInformation")} />
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{t("contact.Email")}</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("contact.Email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("contact.Phone")}</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("contact.Phone")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t("contact.Location")}</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t("contact.Location")}
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-lg font-medium mb-2">
              {t("contact.SocialLinks")}
            </h4>
            <div className="space-y-2">
              <Label htmlFor="github">{t("contact.GitHub")}</Label>
              <Input
                name="social.github"
                value={formData.social.github}
                onChange={handleChange}
                placeholder={t("contact.GitHubURL")}
              />

              <Label htmlFor="linkedin">{t("contact.LinkedIn")}</Label>
              <Input
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                placeholder={t("contact.LinkedInURL")}
              />

              <Label htmlFor="twitter">{t("contact.Twitter")}</Label>
              <Input
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                placeholder={t("contact.TwitterURL")}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full"
              isLoading={isPending}
            >
              {!isPending && t("contact.SaveChanges")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

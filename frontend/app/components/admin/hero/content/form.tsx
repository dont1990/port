"use client";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { HeroData } from "@/app/types/shared/hero/heroData";

interface HeroFormProps {
  form: HeroData;
  isPending: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRolesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function HeroForm({
  form,
  isPending,
  onChange,
  onRolesChange,
  onSave,
}: HeroFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input name="name" value={form.name} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label>Initials</Label>
        <Input name="initials" value={form.initials} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label>Roles (comma-separated)</Label>
        <Input
          value={form.roles.join(", ")}
          onChange={onRolesChange}
          placeholder="e.g. Developer, Designer, Freelancer"
        />
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={onChange}
          className="w-full p-2 rounded-md border"
          rows={4}
        />
      </div>

      <div className="pt-4">
        <Button onClick={onSave} className="w-full" isLoading={isPending}>
          {!isPending && "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

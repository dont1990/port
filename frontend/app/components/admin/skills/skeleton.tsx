"use client";

import { Skeleton } from "@/app/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

export default function SkillsEditorSkeleton() {
  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-48 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {[...Array(2)].map((_, catIdx) => (
            <div key={catIdx} className="border p-4 rounded-md space-y-4">
              <Skeleton className="h-8 w-1/3" />

              {[...Array(3)].map((_, skillIdx) => (
                <div key={skillIdx} className="flex gap-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}

              <Skeleton className="h-8 w-32" />
            </div>
          ))}

          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

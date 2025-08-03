import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function ExperienceEditorSkeleton() {
  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-60" /> {/* Section title */}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* Simulate Experiences */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" /> {/* Section Heading */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`exp-${i}`} className="border p-4 rounded-md space-y-3">
                <Skeleton className="h-10 w-full" /> {/* Title */}
                <Skeleton className="h-10 w-full" /> {/* Company */}
                <Skeleton className="h-10 w-full" /> {/* Period */}
                <Skeleton className="h-20 w-full" /> {/* Description */}
                <Skeleton className="h-10 w-full" /> {/* Technologies */}
              </div>
            ))}
          </div>

          {/* Simulate Education */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={`edu-${i}`} className="border p-4 rounded-md space-y-3">
                <Skeleton className="h-10 w-full" /> {/* Degree */}
                <Skeleton className="h-10 w-full" /> {/* School */}
                <Skeleton className="h-10 w-full" /> {/* Period */}
                <Skeleton className="h-20 w-full" /> {/* Description */}
              </div>
            ))}
          </div>

          {/* Simulate Certifications */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`cert-${i}`} className="border p-4 rounded-md space-y-3">
                <Skeleton className="h-10 w-full" /> {/* Name */}
                <Skeleton className="h-10 w-full" /> {/* Organization */}
                <Skeleton className="h-10 w-full" /> {/* Year */}
              </div>
            ))}
          </div>

          {/* Save button */}
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    </section>
  );
}

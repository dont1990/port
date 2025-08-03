import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function ProjectsEditorSkeleton() {
  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* Simulate 2 project cards */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border p-4 rounded-md space-y-4">
              <Skeleton className="h-10 w-full" /> {/* Title */}
              <Skeleton className="h-24 w-full" /> {/* Description (Textarea) */}
              <Skeleton className="h-10 w-full" /> {/* Image */}
              <Skeleton className="h-10 w-full" /> {/* Live URL */}
              <Skeleton className="h-10 w-full" /> {/* GitHub URL */}
              <Skeleton className="h-10 w-full" /> {/* Technologies */}
              <Skeleton className="h-10 w-32" /> {/* Remove button */}
            </div>
          ))}

          <div className="flex gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

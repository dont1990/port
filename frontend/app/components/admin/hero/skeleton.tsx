import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function HeroEditorSkeleton() {
  return (
    <section className="section-container">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" /> {/* textarea */}
          </div>

          <div className="pt-4 border-t">
            <Skeleton className="h-5 w-40 mb-2" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

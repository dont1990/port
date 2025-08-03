"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Submission } from "@/app/types/submission/submission";
import SubmissionsTable from "./table";

type Props = {
  submissions: Submission[];
};

export default function Submissions({ submissions }: Props) {
  const hasData = submissions && submissions.length > 0;

  return (
    <section className="section-container">
      <Card>
        <CardHeader>
          <CardTitle>Recent Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70">
            {hasData ? (
              <SubmissionsTable submissions={submissions} />
            ) : (
              <div className="text-center text-muted-foreground py-10 bg-slate-100 dark:bg-slate-800/70 rounded-xl">
                No submissions found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

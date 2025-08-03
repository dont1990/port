"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import clsx from "clsx";

function SkeletonCell({ className }: { className?: string }) {
  return (
    <div className={clsx("h-4 rounded bg-muted animate-pulse", className)} />
  );
}

export default function ContactSubmissionsSkeleton() {
  const fakeRows = Array.from({ length: 5 });

  return (
    <section className="section-container">
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fakeRows.map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell><SkeletonCell className="w-24" /></TableCell>
                  <TableCell><SkeletonCell className="w-32" /></TableCell>
                  <TableCell><SkeletonCell className="w-20" /></TableCell>
                  <TableCell><SkeletonCell className="w-40" /></TableCell>
                  <TableCell><SkeletonCell className="w-28" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

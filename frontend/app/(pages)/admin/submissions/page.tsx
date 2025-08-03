import AdminSubmissions from "@/app/components/admin/submission";
import ContactSubmissionsSkeleton from "@/app/components/admin/submission/skeleton";
import React, { Suspense } from "react";

const AdminSubmissionsPage = () => {
  return (
    <Suspense fallback={<ContactSubmissionsSkeleton />}>
      <AdminSubmissions />
    </Suspense>
  );
};

export default AdminSubmissionsPage;

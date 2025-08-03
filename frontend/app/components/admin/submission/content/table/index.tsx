import React from "react";
import SubmissionRow from "./row";
import { Submission } from "@/app/types/submission/submission";

type Props = {
  submissions: Submission[];
};

const SubmissionsTable = ({ submissions }: Props) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-muted text-muted-foreground">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Subject</th>
          <th className="p-3">Message</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((item) => (
          <SubmissionRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionsTable;

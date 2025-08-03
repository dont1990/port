"use client";

export default function SubmissionsTable({ submissions }: { submissions: any[] }) {
  const hasData = submissions && submissions.length > 0;

  return (
    <>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Contact Submissions</h2>

      <div className="rounded-xl border bg-white/80 dark:bg-slate-800/70 overflow-hidden">
        {hasData ? (
          <table className="w-full text-sm p-4">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => (window.location.href = "/admin/submissions")}
                  className="hover:bg-muted transition-colors cursor-pointer border-b"
                >
                  <td className="p-3">{sub.name}</td>
                  <td className="p-3">{sub.email}</td>
                  <td className="p-3">{sub.subject}</td>
                  <td className="p-3">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted-foreground py-10 bg-slate-100 dark:bg-slate-800/70">
            No submissions found.
          </div>
        )}
      </div>
    </>
  );
}

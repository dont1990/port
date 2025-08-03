export default function AboutEditorSkeleton() {
  return (
    <section className="section-container">
      <div className="max-w-3xl mx-auto animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-48" />

        {[...Array(2)].map((_, i) => (
          <div key={`desc-${i}`} className="h-10 bg-muted rounded" />
        ))}

        {[...Array(3)].map((_, i) => (
          <div key={`skill-${i}`} className="h-10 bg-muted rounded" />
        ))}

        {[...Array(2)].map((_, i) => (
          <div key={`feature-${i}`} className="space-y-2 border p-4 rounded">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        ))}

        <div className="h-10 bg-muted rounded w-full" />
      </div>
    </section>
  );
}

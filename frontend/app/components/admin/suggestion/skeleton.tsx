export default function SuggestionsEditorSkeleton() {
  return (
    <section className="section-container">
      <div className="max-w-2xl mx-auto animate-pulse space-y-6">
        {/* Title */}
        <div className="h-8 bg-muted rounded w-48" />

        {/* Add Section (Input + Button) */}
        <div className="flex gap-3">
          <div className="h-10 bg-muted rounded w-full" />
          <div className="h-10 bg-muted rounded w-24" />
        </div>

        {/* Suggestions List */}
        <div className="flex flex-wrap gap-3">
          {[...Array(10)].map((_, i) => (
            <div
              key={`badge-${i}`}
              className="h-8 bg-muted rounded-full w-24"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

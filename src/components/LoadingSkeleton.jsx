export default function LoadingSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 animate-pulse"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="h-4 bg-white/[0.06] rounded-md w-3/5" />
            <div className="h-5 bg-white/[0.06] rounded-full w-16 shrink-0" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-white/[0.04] rounded w-24" />
            <div className="h-6 bg-white/[0.06] rounded w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

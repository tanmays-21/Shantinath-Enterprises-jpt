export default function EmptyState({ search, filter }) {
  const isFiltered = search || filter !== 'all'

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
        {isFiltered ? (
          <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )}
      </div>

      <h3 className="text-white/50 font-medium text-base mb-1.5">
        {isFiltered ? 'No results found' : 'No inventory data'}
      </h3>
      <p className="text-white/25 text-sm max-w-xs">
        {isFiltered
          ? search
            ? `No parts match "${search}". Try a different name or part number.`
            : 'No parts match this filter. Try "All" to see everything.'
          : 'Your Supabase stock table appears to be empty. Add some records to get started.'}
      </p>
    </div>
  )
}

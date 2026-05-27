export default function SearchBar({ search, onSearch, filter, onFilter }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'inStock', label: 'In Stock' },
    { id: 'outOfStock', label: 'Out of Stock' },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by part name or number…"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute inset-y-0 right-3 flex items-center text-white/25 hover:text-white/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              filter === f.id
                ? 'bg-white/[0.10] text-white shadow-sm'
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

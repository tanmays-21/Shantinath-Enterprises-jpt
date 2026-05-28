export default function SearchBar({
  search,
  onSearch,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* Search Input */}
      <div className="relative flex-1">

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <svg
            className={`w-4 h-4 transition-all ${
              search
                ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]'
                : 'text-white/25'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.target.blur()
            }
          }}
          placeholder="Search by part name or number…"
          className="w-full bg-[#071120] border border-cyan-500/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-white/25 text-base sm:text-sm backdrop-blur-xl focus:outline-none focus:border-cyan-500/40 focus:bg-[#0b1628] transition-all shadow-lg shadow-black/20"
        />

        {/* Clear Button */}
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute inset-y-0 right-3 flex items-center text-white/25 hover:text-cyan-300 hover:scale-110 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
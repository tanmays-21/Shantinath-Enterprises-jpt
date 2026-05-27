export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-500/[0.08] border border-red-500/20 flex items-center justify-center mb-5">
        <svg className="w-7 h-7 text-red-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-white/50 font-medium text-base mb-1.5">Failed to load inventory</h3>
      <p className="text-white/25 text-sm max-w-xs mb-5 font-mono text-xs">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-white/[0.06] border border-white/[0.10] rounded-lg text-white/50 text-sm hover:bg-white/[0.10] hover:text-white/70 transition-all"
      >
        Try again
      </button>
    </div>
  )
}

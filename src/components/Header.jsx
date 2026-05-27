import { useState, useEffect } from 'react'

export default function Header({ lastUpdated, onRefresh, loading }) {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    if (!lastUpdated) return
    const update = () => {
      const secs = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
      if (secs < 10) setTimeAgo('just now')
      else if (secs < 60) setTimeAgo(`${secs}s ago`)
      else setTimeAgo(`${Math.floor(secs / 60)}m ago`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [lastUpdated])

  return (
    <header className="bg-[#0a0a0a] border-b border-white/[0.06] px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-semibold text-base tracking-tight leading-none">AutoStock</h1>
            <p className="text-white/30 text-xs mt-0.5">Spare Parts Inventory</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Live badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="text-white/40 text-xs font-mono">
              {loading ? 'syncing…' : timeAgo ? `synced ${timeAgo}` : 'live'}
            </span>
          </div>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.08] transition-all disabled:opacity-40"
            title="Refresh inventory"
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

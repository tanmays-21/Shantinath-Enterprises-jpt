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
        
        {/* Left Side */}
        <div className="flex items-center gap-3">
          
          {/* Logo */}
            <img
              src="/logo.jpg"
              alt="SE Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-white font-semibold text-base tracking-tight leading-none">
              Shantinath Enterprises
            </h1>

            <p className="text-white/30 text-xs mt-0.5">
              Spare Parts Inventory
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          {/* Live Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-white/40 text-xs font-mono">
              {loading
                ? 'syncing…'
                : timeAgo
                ? `synced ${timeAgo}`
                : 'live'}
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh inventory"
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.08] transition-all disabled:opacity-40"
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
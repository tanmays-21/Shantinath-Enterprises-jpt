export default function StatsBar({ stats, loading }) {
  const items = [
    {
      label: 'Total Parts',
      value: stats.total,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      color: 'text-white/60',
      bg: 'bg-white/[0.04]',
      border: 'border-white/[0.08]',
    },
    {
      label: 'In Stock',
      value: stats.inStock,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/[0.08]',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Out of Stock',
      value: stats.outOfStock,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: 'text-white/30',
      bg: 'bg-white/[0.02]',
      border: 'border-white/[0.06]',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`${item.bg} border ${item.border} rounded-xl p-3 sm:p-4 transition-all`}
        >
          <div className={`${item.color} mb-2`}>{item.icon}</div>
          <div className={`text-2xl sm:text-3xl font-semibold ${item.color} leading-none`}>
            {loading ? (
              <span className="inline-block w-8 h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              item.value
            )}
          </div>
          <div className="text-white/30 text-xs mt-1 font-medium tracking-wide">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

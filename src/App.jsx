import { useState, useMemo } from 'react'

import { useStock } from './hooks/useStock'

import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import LoadingSkeleton from './components/LoadingSkeleton'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'

export default function App() {
  const {
    products,
    loading,
    error,
    refetch,
  } = useStock()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')

  // CATEGORY ORDER
  const preferredOrder = [
    'BUMPER',
    'TIE MEMBER',
    'FENDER LINING',
    'BUMPER BRACKET',
    'FRONT GRILLS & BUMPER GRILLS',
    'FOG LAMP COVERS',
    'GRILL',
    'FOG LAMP',
    'MUD FLAP',
    'ENGINE UNDER COVER',
    'COOLANT BOTLES & CAPS',
    'WIPER BOTTLES',
    'CLADDING',
    'OTHER PARTS',
    'BONNET',
    'FENDER',
    'SUB MIRROR',
    'SIDE MIRROR',
    'GAS SPRING / DICKY SHOCKER',
    'WIPER BLADE',
    'REAR WIPER BLADE (with Box)',
    'REAR BLADE',
    'FUEL PUMP MOTOR',
  ]

  // DYNAMIC CATEGORIES
  const categories = useMemo(() => {
    const unique = [
      ...new Set(products.map((p) => p.category || 'OTHERS')),
    ]

    const sorted = [...unique].sort((a, b) => {
      const indexA = preferredOrder.indexOf(a)
      const indexB = preferredOrder.indexOf(b)

      if (indexA === -1) return 1
      if (indexB === -1) return -1

      return indexA - indexB
    })

    return ['ALL', ...sorted]
  }, [products])

  // FILTERING + SORTING
  const filtered = useMemo(() => {
    let result = [...products]

    // NORMALIZE SEARCH
    const normalize = (text) =>
      (text || '')
        .toString()
        .toLowerCase()
        .replace(/[-\s]/g, '')

    // SEARCH
    if (search.trim()) {
      const q = normalize(search)

      result = result.filter((p) => {
        const productName = normalize(p.product_name)
        const partNo = normalize(p.part_no)

        return (
          productName.includes(q) ||
          partNo.includes(q)
        )
      })
    }

    // CATEGORY FILTER
    if (filter !== 'ALL') {
      result = result.filter((p) => p.category === filter)
    }

    // SORTING
    result.sort((a, b) => {
      const stockA = Number(a.remaining || 0)
      const stockB = Number(b.remaining || 0)

      const inStockA = stockA > 0
      const inStockB = stockB > 0

      // IN STOCK FIRST
      if (inStockA !== inStockB) {
        return inStockA ? -1 : 1
      }

      const categoryA = a.category || 'OTHERS'
      const categoryB = b.category || 'OTHERS'

      const indexA = preferredOrder.indexOf(categoryA)
      const indexB = preferredOrder.indexOf(categoryB)

      // UNKNOWN CATEGORY LAST
      if (indexA === -1) return 1
      if (indexB === -1) return -1

      // CATEGORY ORDER
      if (indexA !== indexB) {
        return indexA - indexB
      }

      // ALPHABETICAL INSIDE CATEGORY
      return (a.product_name || '').localeCompare(
        b.product_name || ''
      )
    })

    return result
  }, [products, search, filter])

  return (
    <div className="min-h-screen text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-cyan-500/10 bg-black/40 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-4">

           <div className="glass-card rounded-xl p-2">
              <img
                src="/LOGO.jpg"
                alt="SE"
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient tracking-wide">
                SHANTINATH ENTERPRISE
              </h1>

              <p className="text-xs text-white/40 tracking-[0.25em] uppercase mt-1">
                Auto Parts Inventory
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="glass-card rounded-2xl px-4 py-3 cyan-glow">
            <img
              src="/jpt-logo.png"
              alt="JPT"
              className="h-10 object-contain"
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* SEARCH + CATEGORY */}
        <div className="sticky top-[92px] z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-[#050816]/95 backdrop-blur-xl border-b border-cyan-500/10 space-y-4">

          {/* SEARCH */}
          <SearchBar
            search={search}
            onSearch={setSearch}
          />

          {/* CATEGORY TABS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-2xl text-sm whitespace-nowrap transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-300 text-white shadow-lg shadow-cyan-500/20'
                    : 'glass-card text-white/60 border-white/[0.05] hover:text-white hover:border-cyan-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        {!loading && !error && (
          <div className="flex items-center justify-end text-xs text-white/30">

            {(search || filter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('')
                  setFilter('ALL')
                }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* CONTENT */}
        {error ? (
          <ErrorState
            error={error}
            onRetry={refetch}
          />
        ) : loading ? (
          <LoadingSkeleton count={12} />
        ) : filtered.length === 0 ? (
          <EmptyState
            search={search}
            filter={filter}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-6 border-t border-cyan-500/10">

        <div className="flex flex-col items-center gap-4">

          <div className="flex items-center gap-5">

            <div className="glass-card rounded-xl p-2">
              <img
                src="/LOGO.jpg"
                alt="SE"
                className="w-10 h-10 object-contain"
              />
            </div>

            <div className="glass-card rounded-xl px-3 py-2">
              <img
                src="/jpt-logo.png"
                alt="JPT"
                className="h-7 object-contain"
              />
            </div>
          </div>

          <p className="text-white/20 text-xs text-center tracking-wide">
            © {new Date().getFullYear()} SHANTINATH ENTERPRISE
          </p>
        </div>
      </footer>
    </div>
  )
}
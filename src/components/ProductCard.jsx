import React, { useState,memo } from 'react'
function ProductCard({ product, index }) {
const [copied, setCopied] = useState(false)
  const inStock = Number(product.remaining || 0) > 0

  return (
    <div
      className={`
        group relative rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 cursor-default
        animate-slide-up overflow-hidden backdrop-blur-xl
        ${
          inStock
            ? 'glass-card border-cyan-500/10 hover:border-cyan-400/20 hover:shadow-2xl hover:shadow-cyan-500/10'
            : 'bg-white/[0.02] border-white/[0.04] opacity-70 hover:opacity-90'
        }
      `}
      style={{
        animationDelay: `${Math.min(index * 30, 300)}ms`,
        animationFillMode: 'both',
      }}
    >

      {/* Glow */}
      {inStock && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-blue-500/[0.02] to-transparent pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">

        {/* TOP */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex-1">

    <div className="flex items-start justify-between gap-3">
  
  <div className="space-y-1">
    <h3 className="text-white font-semibold leading-tight">
      {product.product_name}
    </h3>

    <div className="inline-flex items-center px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-medium tracking-wide uppercase">
      {product.category || 'OTHER PARTS'}
    </div>
  </div>

</div>

            <div className="mt-3 flex items-center gap-2">

              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Part No
              </span>

              <code
                className={`
                  font-mono text-xs px-2 py-1 rounded-lg
                  ${
                    inStock
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/10'
                      : 'bg-white/[0.03] text-white/25 border border-white/[0.03]'
                  }
                `}
              >
               <button
  onClick={() => {
    navigator.clipboard.writeText(product.part_no || '')

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }}
  className="relative text-cyan-300 hover:text-cyan-200 active:scale-95 transition-all font-mono text-sm"
  title="Click to copy"
>
  {product.part_no || 'N/A'}

  {copied && (
    <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg bg-cyan-500 text-white text-[10px] shadow-lg">
      Copied!
    </span>
  )}
</button>
              </code>
            </div>
          </div>

          {/* STATUS */}
          <div>

            {inStock ? (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

                In Stock
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/10 text-red-400 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">

                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />

                Out of Stock
              </span>
            )}

          </div>
        </div>
      </div>

      {/* Accent Line */}
      {inStock && (
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent rounded-full" />
      )}
    </div>
  )
}

export default React.memo(ProductCard)
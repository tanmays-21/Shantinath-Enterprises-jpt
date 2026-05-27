import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useStock() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchStock = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch master parts
      const { data: masterParts, error: masterError } = await supabase
        .from('master_parts')
        .select('product_name, part_no, category')
        .order('product_name', { ascending: true })

      if (masterError) throw masterError

      // Fetch inventory
      const { data: inventory, error: inventoryError } = await supabase
        .from('inventory')
        .select('name, qty, sold, part_no')

      if (inventoryError) throw inventoryError

      // Inventory lookup map
      const inventoryMap = {}

      inventory.forEach((item) => {
        const key = item.part_no?.trim()

        if (!key) return

        inventoryMap[key] = {
          qty: item.qty || 0,
          sold: item.sold || 0,
          remaining: (item.qty || 0) - (item.sold || 0),
          name: item.name,
        }
      })

      // Merge master + inventory
      const merged = masterParts.map((part, index) => {
        const stock = inventoryMap[part.part_no?.trim()]

        return {
          id: index + 1,

          product_name: stock?.name || part.product_name,

          part_no: part.part_no || '',

          category: part.category || 'OTHERS',

          remaining: stock?.remaining || 0,
        }
      })

      // Remove duplicates
      const unique = []
      const seen = new Set()

      merged.forEach((item) => {
        const key =
          item.part_no?.trim() ||
          `${item.product_name}-${item.category}`

        if (!seen.has(key)) {
          seen.add(key)
          unique.push(item)
        }
      })

      setProducts(unique)

      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching stock:', err)

      setError(err.message || 'Failed to fetch inventory data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStock()

    // Realtime updates
    const channel = supabase
      .channel('inventory-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inventory',
        },
        () => fetchStock()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchStock])

  const stats = {
    total: products.length,

    inStock: products.filter((p) => p.remaining > 0).length,

    outOfStock: products.filter((p) => p.remaining <= 0).length,
  }

  return {
    products,
    loading,
    error,
    stats,
    refetch: fetchStock,
    lastUpdated,
  }
}
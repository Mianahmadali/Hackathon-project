import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

export default function CampaignList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setError('')
      try {
        // This expects the backend route /api/campaigns (to be implemented next)
        const { data } = await api.get('/campaigns', { params: { q: query, category } })
        if (mounted) setItems(data?.campaigns || [])
      } catch (err) {
        // Graceful fallback until backend endpoints exist
        if (mounted) setError(err?.response?.data?.message || 'Could not load campaigns yet')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [query, category])

  const filtered = useMemo(() => items, [items])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Campaigns</h1>
        <div className="flex gap-2">
          <input
            placeholder="Search..."
            className="border rounded px-3 py-2 w-48"
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          <select className="border rounded px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="environment">Environment</option>
          </select>
        </div>
      </div>

      {loading && <div>Loading campaigns...</div>}
      {error && <div className="bg-yellow-50 text-yellow-800 px-3 py-2 rounded text-sm">{error}</div>}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <article key={c._id} className="bg-white rounded shadow p-4">
              <h3 className="font-semibold text-lg mb-1">{c.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">{c.description}</p>
              <div className="text-sm text-gray-700">Category: {c.category || 'Uncategorized'}</div>
              <Progress goal={c.goalAmount} raised={c.raisedAmount} />
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="text-gray-600">No campaigns found.</div>
          )}
        </div>
      )}
    </div>
  )
}

function Progress({ goal = 0, raised = 0 }) {
  const pct = Math.min(100, Math.round((raised / (goal || 1)) * 100))
  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-primary rounded" style={{ width: pct + '%' }} />
      </div>
      <div className="text-xs text-gray-600 mt-1">Raised ${raised?.toLocaleString?.() || 0} of ${goal?.toLocaleString?.() || 0} ({pct}%)</div>
    </div>
  )
}

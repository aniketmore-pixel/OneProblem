'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CategoriesClient({ categories }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [loadingCategoryId, setLoadingCategoryId] = useState(null)

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleCategoryClick = async (cat) => {
    setLoadingCategoryId(cat.category_id)
    // small delay for demo effect (optional)
    await new Promise((r) => setTimeout(r, 300))
    router.push(`/category/${cat.slug}`)
  }

  return (
    <>
      {/* SEARCH BAR */}
      <div className="mb-10 max-w-md">
        <input
          type="text"
          placeholder="Search categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* RESULTS */}
      {filteredCategories.length === 0 ? (
        <p className="text-gray-500">No matching categories found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <button
              key={cat.category_id}
              onClick={() => handleCategoryClick(cat)}
              className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border w-full text-left flex flex-col items-start justify-center"
              disabled={loadingCategoryId === cat.category_id}
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                {cat.name}
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                {loadingCategoryId === cat.category_id ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-600"></span>
                ) : null}
                Explore blogs →
              </p>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CategoriesClient({ categories }) {
  const [query, setQuery] = useState('')
  const [loadingCategory, setLoadingCategory] = useState(null) // track which category is loading
  const router = useRouter()

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleCategoryClick = async (slug, categoryId) => {
    setLoadingCategory(categoryId) // show loader for this button
    await new Promise(r => setTimeout(r, 300)) // optional delay for UX
    router.push(`/category/${slug}`)
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
              onClick={() => handleCategoryClick(cat.slug, cat.category_id)}
              className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border w-full text-left flex flex-col"
              disabled={loadingCategory === cat.category_id} // disable while loading
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                {cat.name}
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                {loadingCategory === cat.category_id ? (
                  <>
                    {/* Spinner */}
                    <span className="w-4 h-4 border-2 border-t-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    Hold on, fetching blogs for you...
                  </>
                ) : (
                  'Explore blogs →'
                )}
              </p>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CategoriesClient({ categories }) {
  const [query, setQuery] = useState('')

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  )

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
            <Link
              key={cat.category_id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                {cat.name}
              </h2>

              <p className="text-sm text-gray-500">
                Explore articles →
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

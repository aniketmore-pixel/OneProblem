'use client'

import { useState } from 'react'

export default function Trending({ trendingBlogs }) {
  const [loadingBlogId, setLoadingBlogId] = useState(null)

  const handleNavigation = (slug, blogId) => {
    setLoadingBlogId(blogId)
    setTimeout(() => {
      window.location.href = `/blog/${slug}`
    }, 100)
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Trending</h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingBlogs.map(blog => (
          <button
            key={blog.blog_id}
            onClick={() => handleNavigation(blog.slug, blog.blog_id)}
            className="group bg-white rounded-2xl p-6 border border-gray-200 transition text-left w-full"
            disabled={loadingBlogId === blog.blog_id}
          >
            {blog.featured_image && (
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600">
              {blog.title}
            </h3>

            <p className="text-sm text-gray-500">{blog.summary}</p>

            {blog.read_time && (
              <p className="text-xs text-gray-400 mt-1">
                Read time: {blog.read_time} min
              </p>
            )}

            {loadingBlogId === blog.blog_id && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                Hold on, opening blog...
              </p>
            )}
          </button>
        ))}
      </div>

      {loadingBlogId && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">
            Hold on, opening blog...
          </p>
        </div>
      )}
    </section>
  )
}

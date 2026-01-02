// 'use client'
// import Link from 'next/link'
// import { useState, useEffect } from 'react'
// import { getBlogsByCategory } from '@/lib/queries/categories'

// export default function CategoryClient({ category, initialBlogs }) {
//   const [sort, setSort] = useState('latest')
//   const [blogs, setBlogs] = useState(initialBlogs)
//   const [search, setSearch] = useState('')
//   const [debouncedSearch, setDebouncedSearch] = useState(search)

//   useEffect(() => {
//     async function fetchBlogs() {
//       const res = await getBlogsByCategory(category.category_id, sort)
//       setBlogs(res)
//     }
//     fetchBlogs()
//   }, [sort, category.category_id])

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedSearch(search), 200)
//     return () => clearTimeout(timer)
//   }, [search])

//   // ✅ FILTERED BLOGS (CLIENT ONLY)
//   const filteredBlogs = blogs.filter(blog =>
//     blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
//   )

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       <Link href="/categories" className="inline-flex items-center gap-2 text-green-600 mb-8">
//         ← Back to categories
//       </Link>

//       <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
//       {category.description && <p className="text-gray-600 mb-6">{category.description}</p>}

//       {/* Sort Toggle */}
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded-lg ${sort === 'latest' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
//           onClick={() => setSort('latest')}
//         >
//           Latest
//         </button>
//         <button
//           className={`px-4 py-2 rounded-lg ${sort === 'popular' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
//           onClick={() => setSort('popular')}
//         >
//           Popular
//         </button>
//       </div>

//       {/* Search Bar */}
//       {/* Search Bar */}
//       <div className="mb-10 max-w-md">
//         <input
//           type="text"
//           placeholder="Search blogs by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
//         />
//       </div>


//       {/* Blog Grid */}
//       {filteredBlogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredBlogs.map((blog) => (
//             <Link
//               key={blog.blog_id}
//               href={`/blog/${blog.slug}`}
//               className="group bg-white rounded-2xl p-6 border hover:shadow-lg transition"
//             >
//               <img
//                 src={blog.featured_image}
//                 alt={blog.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
//                 {blog.title}
//               </h2>
//               <p className="text-sm text-gray-500">{blog.summary}</p>
//               {/* <p className="text-xs text-gray-400 mt-1">
//                 Read time: {blog.read_time} min
//               </p> */}
//             </Link>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }


'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getBlogsByCategory } from '@/lib/queries/categories'

export default function CategoryClient({ category, initialBlogs }) {
  const [sort, setSort] = useState('latest')
  const [blogs, setBlogs] = useState(initialBlogs)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [loadingBlogId, setLoadingBlogId] = useState(null) // track which blog is clicked

  useEffect(() => {
    async function fetchBlogs() {
      const res = await getBlogsByCategory(category.category_id, sort)
      setBlogs(res)
    }
    fetchBlogs()
  }, [sort, category.category_id])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 200)
    return () => clearTimeout(timer)
  }, [search])

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleBlogClick = async (slug, blogId) => {
    setLoadingBlogId(blogId)
    // optional UX delay
    await new Promise(r => setTimeout(r, 300))
    window.location.href = `/blog/${slug}`
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <Link href="/categories" className="inline-flex items-center gap-2 text-green-600 mb-8">
        ← Back to categories
      </Link>

      <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
      {category.description && <p className="text-gray-600 mb-6">{category.description}</p>}

      {/* Sort Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${sort === 'latest' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setSort('latest')}
        >
          Latest
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${sort === 'popular' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setSort('popular')}
        >
          Popular
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-10 max-w-md">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <button
              key={blog.blog_id}
              onClick={() => handleBlogClick(blog.slug, blog.blog_id)}
              className="group bg-white rounded-2xl p-6 border hover:shadow-lg transition text-left w-full"
              disabled={loadingBlogId === blog.blog_id}
            >
              {blog.featured_image && (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500">
                {loadingBlogId === blog.blog_id
                  ? 'Hold tight, redirecting you to the blog...'
                  : blog.summary}
              </p>

              {/* Optional loader animation */}
              {loadingBlogId === blog.blog_id && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-green-600 rounded-full animate-spin"></div>
                  <span className="text-green-600 text-sm">Loading...</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

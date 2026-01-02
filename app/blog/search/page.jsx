// 'use client'
// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { supabase } from '@/lib/supabase'
// import { ArrowLeft } from 'lucide-react'

// export default function BlogSearchPage() {
//   const searchParams = useSearchParams()
//   const query = searchParams.get('query') || ''
//   const [blogs, setBlogs] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (!query) return

//     const fetchBlogs = async () => {
//       setLoading(true)
//       const { data, error } = await supabase
//         .from('blogs')
//         .select('blog_id, title, slug, summary, featured_image, content')
//         .ilike('title', `%${query}%`)
//         .order('created_at', { ascending: false })

//       if (error) console.error(error)
//       else {
//         // optional: calculate read_time if content is JSON
//         const blogsWithReadTime = data.map(blog => {
//           let readTime = 3 // default 3 min
//           try {
//             const wordCount = blog.content?.blocks?.reduce((acc, b) => acc + (b.text?.split(' ').length || 0), 0) || 0
//             readTime = Math.ceil(wordCount / 200) // 200 words per min
//           } catch (err) { }
//           return { ...blog, read_time: readTime }
//         })
//         setBlogs(blogsWithReadTime)
//       }

//       setLoading(false)
//     }

//     fetchBlogs()
//   }, [query])

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       {/* BACK BUTTON */}
//       <Link
//         href="/"
//         className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline mb-10"
//       >
//         <ArrowLeft size={16} />
//         Back to home
//       </Link>

//       <h1 className="text-4xl font-bold mb-8">
//         Search Results for: <span className="text-green-600">{query}</span>
//       </h1>

//       {loading && <p>Loading...</p>}

//       {!loading && blogs.length === 0 && (
//         <p>No blogs found matching "{query}"</p>
//       )}

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <Link
//             key={blog.blog_id}
//             href={`/blog/${blog.slug}`}
//             className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border"
//           >
//             {blog.featured_image && (
//               <img
//                 src={blog.featured_image}
//                 alt={blog.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//             )}
//             <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">{blog.title}</h2>
//             {blog.summary && <p className="text-sm text-gray-500">{blog.summary}</p>}
//             <p className="text-xs text-gray-400 mt-1">Read time: {blog.read_time} min</p>
//           </Link>
//         ))}
//       </div>
//     </section>
//   )
// }


import { Suspense } from 'react'
import BlogSearchClient from './BlogSearchClient'

export const dynamic = 'force-dynamic'

export default function BlogSearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <BlogSearchClient />
    </Suspense>
  )
}

function SearchLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <p className="text-gray-500">Loading search results…</p>
    </section>
  )
}

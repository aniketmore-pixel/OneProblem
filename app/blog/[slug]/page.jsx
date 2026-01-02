// 'use client'

// import { useEffect, useState } from 'react'
// import BlogContent from '@/components/BlogContent'
// import { calculateReadingTime } from '@/lib/utils/readingTime'
// import { getBlogBySlug } from '@/lib/queries/blogs'
// import ShareButtons from '@/components/ShareButtons'
// import Toast from '@/components/Toast'
// import AffiliateLinks from '@/components/AffiliateLinks'
// import { incrementBlogViews } from '@/lib/queries/blogViews'
// import Link from 'next/link'
// import {
//   ArrowRightIcon,
//   Calendar,
//   ArrowLeftIcon,
// } from 'lucide-react'

// export default function BlogPage({ params }) {
//   const { slug } = params

//   const [blog, setBlog] = useState(null)
//   const [readingProgress, setReadingProgress] = useState(0)
//   const [toc, setToc] = useState([])

//   useEffect(() => {
//     async function fetchBlog() {
//       const data = await getBlogBySlug(slug)
//       if (data) {
//         setBlog(data)
//         incrementBlogViews(data.blog_id)
//       }
//     }
//     fetchBlog()
//   }, [slug])

//   /* 🔹 Reading progress bar */
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY
//       const docHeight =
//         document.documentElement.scrollHeight -
//         window.innerHeight

//       const progress = (scrollTop / docHeight) * 100
//       setReadingProgress(progress)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   /* 🔹 Generate Table of Contents */
//   useEffect(() => {
//     if (!blog) return

//     const headings = document.querySelectorAll(
//       '.blog-content h2, .blog-content h3'
//     )

//     const items = Array.from(headings).map((heading) => {
//       const id =
//         heading.innerText
//           .toLowerCase()
//           .replace(/\s+/g, '-')
//           .replace(/[^\w-]/g, '')

//       heading.id = id

//       return {
//         id,
//         text: heading.innerText,
//         level: heading.tagName,
//       }
//     })

//     setToc(items)
//   }, [blog])

//   if (!blog) {
//     return (
//       <div className="max-w-4xl mx-auto py-32 text-center">
//         <h1 className="text-3xl font-semibold">Loading…</h1>
//       </div>
//     )
//   }

//   const publishedDate = blog.published_at || blog.created_at
//   const formattedDate = publishedDate
//     ? new Date(publishedDate).toLocaleDateString('en-IN', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       })
//     : null

//   const readingTime = calculateReadingTime(blog.content)

//   return (
//     <>
//       {/* 🔥 Reading Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200 z-50">
//         <div
//           className="h-full bg-green-600 transition-all"
//           style={{ width: `${readingProgress}%` }}
//         />
//       </div>

//       <article className="bg-white pt-10">

//         {/* HERO IMAGE */}
//         {blog.featured_image && (
//           <div className="max-w-6xl mx-auto px-4 mt-10">
//             <div className="rounded-3xl overflow-hidden max-h-[65vh]">
//               <img
//                 src={blog.featured_image}
//                 alt={blog.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         )}

//         {/* MAIN GRID */}
//         <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

//           {/* CONTENT */}
//           <div>

//             {/* BACK */}
//             <Link
//               href={
//                 blog.categories?.slug
//                   ? `/category/${blog.categories.slug}`
//                   : '/blog'
//               }
//               className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
//             >
//               <ArrowLeftIcon size={16} />
//               Back to {blog.categories?.name || 'Blogs'}
//             </Link>

//             {/* CATEGORY */}
//             <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-4">
//               {blog.categories?.name || 'Uncategorized'}
//             </p>

//             {/* TITLE */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
//               {blog.title}
//             </h1>

//             {/* META */}
//             <div className="flex items-center gap-6 text-sm text-gray-500 mb-10">
//               {formattedDate && (
//                 <span className="flex items-center gap-1">
//                   <Calendar size={14} />
//                   {formattedDate}
//                 </span>
//               )}

//               {readingTime && (
//                 <span className="flex items-center gap-1">
//                   ⏱ {readingTime}
//                 </span>
//               )}

//               <ShareButtons/>
//             </div>

//             {/* SHARE BUTTONS */}
            


//             {/* SUMMARY */}
//             <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-16 max-w-3xl">
//               {blog.summary}
//             </p>

//             {/* BLOG CONTENT */}
//             <div className="blog-content prose prose-lg lg:prose-xl max-w-none">
//               <BlogContent content={blog.content} />
//             </div>

//             <AffiliateLinks blog={blog} />

//             {/* CTA */}
//             <div className="mt-24 text-center">
//               <h3 className="text-xl font-semibold mb-3">
//                 Want more like this?
//               </h3>

//               <Link
//                 href="/blog"
//                 className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
//               >
//                 Explore all blogs
//                 <ArrowRightIcon size={16} />
//               </Link>
//             </div>
//           </div>

//           {/* 🔹 TOC SIDEBAR */}
//           {toc.length > 0 && (
//             <aside className="hidden lg:block sticky top-32 h-fit">
//               <div className="border rounded-xl p-5">
//                 <p className="text-sm font-semibold mb-4 text-gray-700">
//                   In this article
//                 </p>

//                 <ul className="space-y-3 text-sm">
//                   {toc.map((item) => (
//                     <li
//                       key={item.id}
//                       className={`${
//                         item.level === 'H3'
//                           ? 'ml-4 text-gray-500'
//                           : 'text-gray-700'
//                       }`}
//                     >
//                       <a
//                         href={`#${item.id}`}
//                         className="hover:text-green-600 transition"
//                       >
//                         {item.text}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </aside>
//           )}
//         </div>
//       </article>
//     </>
//   )
// }



import BlogClient from './BlogClient'
import { getBlogBySlug } from '@/lib/queries/blogs'
import { incrementBlogViews } from '@/lib/queries/blogViews'

export default async function BlogPage({ params }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <h1 className="text-3xl font-semibold">Blog not found</h1>
      </div>
    )
  }

  // fire and forget
  incrementBlogViews(blog.blog_id)

  return <BlogClient blog={blog} />
}


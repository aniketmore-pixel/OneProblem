// import Link from 'next/link'
// import { getBlogsByCategorySlug } from '@/lib/queries/blogs'

// export default async function CategoryPage({ params }) {
//   const blogs = await getBlogsByCategorySlug(params.slug)

//   if (!blogs.length) {
//     return (
//       <div className="max-w-4xl mx-auto py-24 text-center">
//         <h1 className="text-2xl font-bold">No blogs found</h1>
//       </div>
//     )
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold mb-10">
//         {blogs[0].categories.name}
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         {blogs.map((blog) => (
//           <Link
//             key={blog.blog_id}
//             href={`/blog/${blog.slug}`}
//             className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//           >
//             {blog.featured_image && (
//               <img
//                 src={blog.featured_image}
//                 alt={blog.title}
//                 className="h-48 w-full object-cover"
//               />
//             )}

//             <div className="p-6">
//               <h2 className="text-xl font-semibold group-hover:text-green-600">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 {blog.summary}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   )
// }


import Link from 'next/link'
import { getCategoryBySlug, getBlogsByCategory } from '@/lib/queries/categories'
import CategoryClient from './CategoryClient'

export const metadata = {
  title: 'Category | SmartBuy',
  description: 'Browse blogs by category',
}

export default async function CategoryPage({ params }) {
  // unwrap params
  const { slug } = await params  // <-- this fixes the Next.js warning
  const category = await getCategoryBySlug(slug)
  if (!category) return <p className="text-center py-24">Category not found</p>

  const blogs = await getBlogsByCategory(category.category_id, 'latest')
  return <CategoryClient category={category} initialBlogs={blogs} />
}



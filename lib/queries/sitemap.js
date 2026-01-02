import { getCategories } from '@/lib/queries/categories'
import { getAllBlogs } from '@/lib/queries/sitemap' // 👈 create this

export async function GET() {
  const baseUrl = 'https://expressdeal.vercel.app'

  const categories = await getCategories()
  const blogs = await getAllBlogs()

  const urls = [
    {
      loc: `${baseUrl}`,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/categories`,
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/blog`,
      changefreq: 'daily',
      priority: 0.8,
    },
    ...categories.map(cat => ({
      loc: `${baseUrl}/category/${cat.slug}`,
      changefreq: 'daily',
      priority: 0.7,
    })),
    ...blogs.map(blog => ({
      loc: `${baseUrl}/blog/${blog.slug}`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: blog.updated_at || blog.created_at,
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date(url.lastmod || Date.now()).toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

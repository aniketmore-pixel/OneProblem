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
    categories.forEach(cat => {
        urls.push(`
          <url>
            <loc>${baseUrl}/category/${cat.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
        `)
      }),
      
      blogs.forEach(blog => {
        urls.push(`
          <url>
            <loc>${baseUrl}/blog/${blog.slug}</loc>
            <lastmod>${blog.updated_at ?? new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
          </url>
        `)
      })
      
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

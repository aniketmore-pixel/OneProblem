import { getCategories } from '@/lib/queries/categories'
import { getAllBlogs } from '@/lib/queries/blogs'

export async function GET() {
  const baseUrl = 'https://expressdeal.vercel.app' 

  const categories = await getCategories()
  const blogs = await getAllBlogs()

  const staticPages = [
    '',
    '/categories',
    '/blog',
  ]

  const urls = [
    ...staticPages.map((path) => ({
      loc: `${baseUrl}${path}`,
      lastmod: new Date().toISOString(),
      priority: path === '' ? '1.0' : '0.8',
    })),

    ...categories.map((cat) => ({
      loc: `${baseUrl}/category/${cat.slug}`,
      lastmod: cat.updated_at || cat.created_at,
      priority: '0.7',
    })),

    ...blogs.map((blog) => ({
      loc: `${baseUrl}/blog/${blog.slug}`,
      lastmod: blog.updated_at || blog.created_at,
      priority: '0.9',
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date(url.lastmod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
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

// app/sitemap.xml/route.js
import { getCategories } from '@/lib/queries/categories'
import { getAllBlogs } from '@/lib/queries/blogs'

export const dynamic = 'force-dynamic' // ensures it runs at request time

export async function GET() {
  try {
    const baseUrl = 'https://expressdeal.vercel.app'

    // fetch dynamic data inside the async function
    const categories = await getCategories()
    const blogs = await getAllBlogs()

    const urls = [
      `
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      `,
      `
      <url>
        <loc>${baseUrl}/categories</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      `,
    ]

    categories.forEach(cat => {
      urls.push(`
        <url>
          <loc>${baseUrl}/category/${cat.slug}</loc>
          <lastmod>${new Date(cat.updated_at || cat.created_at).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `)
    })

    blogs.forEach(blog => {
      urls.push(`
        <url>
          <loc>${baseUrl}/blog/${blog.slug}</loc>
          <lastmod>${new Date(blog.updated_at || blog.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `)
    })

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (err) {
    console.error('Error generating sitemap:', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}

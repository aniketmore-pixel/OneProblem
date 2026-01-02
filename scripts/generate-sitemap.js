import fs from 'fs'
import path from 'path'

// Use relative paths for Node scripts
import { getCategories } from '../lib/queries/categories.js'
import { getAllBlogs } from '../lib/queries/blogs.js'

async function generateSitemap() {
  const baseUrl = 'https://expressdeal.vercel.app'

  let categories = []
  let blogs = []

  try {
    categories = await getCategories()
  } catch (err) {
    console.error('Error fetching categories:', err)
  }

  try {
    blogs = await getAllBlogs()
  } catch (err) {
    console.error('Error fetching blogs:', err)
  }

  const urls = [
    `<url><loc>${baseUrl}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/categories</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`
  ]

  categories.forEach(cat => {
    urls.push(`<url><loc>${baseUrl}/category/${cat.slug}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`)
  })

  blogs.forEach(blog => {
    urls.push(`<url><loc>${baseUrl}/blog/${blog.slug}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`

  // Ensure correct path to public folder
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, xml)
  console.log('✅ Sitemap generated at', sitemapPath)
}

generateSitemap()

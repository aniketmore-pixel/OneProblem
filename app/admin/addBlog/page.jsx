// 'use client'

// import React, { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'

// const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

// export default function AdminAddBlogPage() {
//   const [username, setUsername] = useState(null)
//   const [blogs, setBlogs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [editingBlogId, setEditingBlogId] = useState(null)


//   // Blog fields
//   const [title, setTitle] = useState('')
//   const [summary, setSummary] = useState('')
//   const [categoryId, setCategoryId] = useState('')
//   const [featuredImage, setFeaturedImage] = useState('')

//   // ✅ Affiliate links state (up to 5)
//   const [affiliateLinks, setAffiliateLinks] = useState([
//     { title: '', url: '' },
//     { title: '', url: '' },
//     { title: '', url: '' },
//     { title: '', url: '' },
//     { title: '', url: '' },
//   ])

//   // ✅ Structured content blocks
//   const [blocks, setBlocks] = useState([])

//   const [categories, setCategories] = useState([])

//   // ---------------------------
//   // Helpers
//   // ---------------------------
//   function slugify(text) {
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//   }

//   function editBlog(blog) {
//     setEditingBlogId(blog.blog_id)
//     setTitle(blog.title)
//     setSummary(blog.summary || '')
//     setCategoryId(blog.category_id.toString())
//     setFeaturedImage(blog.featured_image || '')
//     setBlocks(blog.content?.blocks || [])
//     setAffiliateLinks([
//       { title: blog.affiliate_1_title || '', url: blog.affiliate_1_url || '' },
//       { title: blog.affiliate_2_title || '', url: blog.affiliate_2_url || '' },
//       { title: blog.affiliate_3_title || '', url: blog.affiliate_3_url || '' },
//       { title: blog.affiliate_4_title || '', url: blog.affiliate_4_url || '' },
//       { title: blog.affiliate_5_title || '', url: blog.affiliate_5_url || '' },
//     ])
//     window.scrollTo({ top: 0, behavior: 'smooth' }) // scroll to form
//   }


//   function updateAffiliateLink(index, field, value) {
//     const updated = [...affiliateLinks]
//     updated[index][field] = value
//     setAffiliateLinks(updated)
//   }

//   function addHeading(level = 2) {
//     setBlocks([...blocks, { type: 'heading', level, text: '' }])
//   }

//   function addParagraph() {
//     setBlocks([...blocks, { type: 'paragraph', text: '' }])
//   }

//   function updateBlock(index, value) {
//     const updated = [...blocks]
//     updated[index].text = value
//     setBlocks(updated)
//   }

//   function removeBlock(index) {
//     setBlocks(blocks.filter((_, i) => i !== index))
//   }

//   // ---------------------------
//   // Auth
//   // ---------------------------
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser)
//         if (parsed.user?.username) setUsername(parsed.user.username)
//       } catch { }
//     }
//   }, [])

//   useEffect(() => {
//     if (username === ADMIN_USER) {
//       fetchBlogs()
//       fetchCategories()
//     }
//   }, [username])

//   // ---------------------------
//   // Fetch
//   // ---------------------------
//   async function fetchBlogs() {
//     const { data, error } = await supabase
//       .from('blogs')
//       .select('*')
//       .order('created_at', { ascending: false })

//     if (!error) setBlogs(data)
//     setLoading(false)
//   }

//   async function fetchCategories() {
//     const { data } = await supabase.from('categories').select('*')
//     if (data) setCategories(data)
//   }

//   // ---------------------------
//   // Insert blog
//   // ---------------------------
//   async function saveBlog() {
//     if (!title.trim() || !categoryId || blocks.length === 0) {
//       alert('Title, category, and content are required')
//       return
//     }

//     const contentJson = { blocks: blocks.filter(b => b.text.trim() !== '') }

//     const payload = {
//       title: title.trim(),
//       slug: slugify(title),
//       summary: summary.trim() || null,
//       category_id: Number(categoryId),
//       featured_image: featuredImage || null,
//       content: contentJson,
//       affiliate_1_title: affiliateLinks[0].title || null,
//       affiliate_1_url: affiliateLinks[0].url || null,
//       affiliate_2_title: affiliateLinks[1].title || null,
//       affiliate_2_url: affiliateLinks[1].url || null,
//       affiliate_3_title: affiliateLinks[2].title || null,
//       affiliate_3_url: affiliateLinks[2].url || null,
//       affiliate_4_title: affiliateLinks[3].title || null,
//       affiliate_4_url: affiliateLinks[3].url || null,
//       affiliate_5_title: affiliateLinks[4].title || null,
//       affiliate_5_url: affiliateLinks[4].url || null,
//     }

//     if (editingBlogId) {
//       // UPDATE existing blog
//       const { data, error } = await supabase
//         .from('blogs')
//         .update(payload)
//         .eq('blog_id', editingBlogId)
//         .select()

//       if (error) {
//         console.error('Update error:', error)
//         alert(error.message)
//         return
//       }

//       setBlogs(prev => prev.map(b => (b.blog_id === editingBlogId ? data[0] : b)))
//       setEditingBlogId(null)
//     } else {
//       // INSERT new blog
//       const { data, error } = await supabase
//         .from('blogs')
//         .insert([payload])
//         .select()

//       if (error) {
//         console.error('Insert error:', error)
//         alert(error.message)
//         return
//       }

//       setBlogs(prev => [data[0], ...prev])
//     }

//     // Reset form
//     setTitle('')
//     setSummary('')
//     setCategoryId('')
//     setFeaturedImage('')
//     setBlocks([])
//     setAffiliateLinks([
//       { title: '', url: '' },
//       { title: '', url: '' },
//       { title: '', url: '' },
//       { title: '', url: '' },
//       { title: '', url: '' },
//     ])
//   }


//   // ---------------------------
//   // Access control
//   // ---------------------------
//   if (!username) return <p className="p-10 text-gray-500">Loading user…</p>
//   if (username !== ADMIN_USER) return <p className="p-10 text-red-500">Access Denied</p>

//   return (
//     <main className="max-w-4xl mx-auto px-6 py-20">
//       <Link href="/admin" className="flex items-center gap-2 text-green-600 mb-8">
//         <ArrowLeft size={16} /> Back
//       </Link>

//       <h1 className="text-4xl font-bold text-green-600 mb-6">Add Blog</h1>

//       {/* BLOG FORM */}
//       <div className="border p-6 rounded-xl bg-gray-50 space-y-4">
//         <input
//           placeholder="Blog title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="w-full border px-4 py-2 rounded-xl"
//         />

//         <textarea
//           placeholder="Summary"
//           value={summary}
//           onChange={e => setSummary(e.target.value)}
//           className="w-full border px-4 py-2 rounded-xl"
//         />

//         <select
//           value={categoryId}
//           onChange={e => setCategoryId(e.target.value)}
//           className="w-full border px-4 py-2 rounded-xl"
//         >
//           <option value="">Select category</option>
//           {categories.map(cat => (
//             <option key={cat.category_id} value={cat.category_id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <input
//           placeholder="Featured image URL"
//           value={featuredImage}
//           onChange={e => setFeaturedImage(e.target.value)}
//           className="w-full border px-4 py-2 rounded-xl"
//         />

//         {/* CONTENT EDITOR */}
//         <div className="border rounded-xl p-4 bg-white">
//           <div className="flex gap-2 mb-4">
//             <button onClick={() => addHeading(2)} className="border px-3 py-1 rounded">
//               + Heading
//             </button>
//             <button onClick={addParagraph} className="border px-3 py-1 rounded">
//               + Text
//             </button>
//           </div>

//           <div className="space-y-4">
//             {blocks.map((block, i) => (
//               <div key={i}>
//                 {block.type === 'heading' ? (
//                   <input
//                     placeholder={`Heading (H${block.level})`}
//                     value={block.text}
//                     onChange={e => updateBlock(i, e.target.value)}
//                     className="w-full border px-3 py-2 rounded text-lg font-semibold"
//                   />
//                 ) : (
//                   <textarea
//                     placeholder="Paragraph text…"
//                     value={block.text}
//                     onChange={e => updateBlock(i, e.target.value)}
//                     className="w-full border px-3 py-2 rounded h-24"
//                   />
//                 )}

//                 <button
//                   onClick={() => removeBlock(i)}
//                   className="text-sm text-red-500 mt-1"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* AFFILIATE LINKS */}
//         <div className="border rounded-xl p-4 bg-white mt-6">
//           <h3 className="font-semibold mb-2">Affiliate Links (optional)</h3>
//           {affiliateLinks.map((link, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input
//                 placeholder={`Affiliate ${i + 1} Title`}
//                 value={link.title}
//                 onChange={e => updateAffiliateLink(i, 'title', e.target.value)}
//                 className="w-1/2 border px-3 py-2 rounded"
//               />
//               <input
//                 placeholder={`Affiliate ${i + 1} URL`}
//                 value={link.url}
//                 onChange={e => updateAffiliateLink(i, 'url', e.target.value)}
//                 className="w-1/2 border px-3 py-2 rounded"
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={saveBlog}
//           className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 mt-4"
//         >
//           {editingBlogId ? 'Update Blog' : 'Publish Blog'}
//         </button>

//       </div>

//       {/* BLOG LIST */}
//       <h2 className="text-2xl font-semibold mt-12 mb-4">Existing Blogs</h2>
//       {loading ? (
//         <p>Loading…</p>
//       ) : (
//         <ul className="space-y-2">
//           {blogs.map(b => (
//             <li key={b.blog_id} className="border p-3 rounded-xl flex justify-between items-center">
//               <span>{b.title}</span>
//               <button
//                 onClick={() => editBlog(b)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </button>
//             </li>
//           ))}
//         </ul>

//       )}
//     </main>
//   )
// }

'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

export default function AdminAddBlogPage() {
  const [username, setUsername] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingBlogId, setEditingBlogId] = useState(null)

  // Blog fields
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [isTrending, setIsTrending] = useState(false) 

  // Affiliate links state (up to 5)
  const [affiliateLinks, setAffiliateLinks] = useState([
    { title: '', url: '' },
    { title: '', url: '' },
    { title: '', url: '' },
    { title: '', url: '' },
    { title: '', url: '' },
  ])

  // Structured content blocks
  const [blocks, setBlocks] = useState([])
  const [categories, setCategories] = useState([])

  // ---------------------------
  // Helpers
  // ---------------------------
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  function editBlog(blog) {
    setEditingBlogId(blog.blog_id)
    setTitle(blog.title)
    setSummary(blog.summary || '')
    setCategoryId(blog.category_id?.toString() || '')
    setFeaturedImage(blog.featured_image || '')
    setIsTrending(blog.is_trending || false) 
    setBlocks(blog.content?.blocks || [])
    setAffiliateLinks([
      { title: blog.affiliate_1_title || '', url: blog.affiliate_1_url || '' },
      { title: blog.affiliate_2_title || '', url: blog.affiliate_2_url || '' },
      { title: blog.affiliate_3_title || '', url: blog.affiliate_3_url || '' },
      { title: blog.affiliate_4_title || '', url: blog.affiliate_4_url || '' },
      { title: blog.affiliate_5_title || '', url: blog.affiliate_5_url || '' },
    ])
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
  }

  function updateAffiliateLink(index, field, value) {
    const updated = [...affiliateLinks]
    updated[index][field] = value
    setAffiliateLinks(updated)
  }

  function addHeading(level = 2) {
    setBlocks([...blocks, { type: 'heading', level, text: '' }])
  }

  function addParagraph() {
    setBlocks([...blocks, { type: 'paragraph', text: '' }])
  }

  // ✅ New helper to add an image block
  function addImage() {
    setBlocks([...blocks, { type: 'image', url: '', alt: '' }])
  }

  // ✅ Modified to handle any field (text, url, alt) dynamically
  function updateBlock(index, field, value) {
    const updated = [...blocks]
    updated[index][field] = value
    setBlocks(updated)
  }

  function removeBlock(index) {
    setBlocks(blocks.filter((_, i) => i !== index))
  }

  // ---------------------------
  // Auth
  // ---------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed.user?.username) setUsername(parsed.user.username)
      } catch { }
    }
  }, [])

  useEffect(() => {
    if (username === ADMIN_USER) {
      fetchBlogs()
      fetchCategories()
    }
  }, [username])

  // ---------------------------
  // Fetch
  // ---------------------------
  async function fetchBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setBlogs(data)
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*')
    if (data) setCategories(data)
  }

  // ---------------------------
  // Insert/Update blog
  // ---------------------------
  async function saveBlog() {
    if (!title.trim() || !categoryId || blocks.length === 0) {
      alert('Title, category, and content are required')
      return
    }

    // ✅ Adjusted filter so it doesn't strip out valid image blocks
    const contentJson = { 
      blocks: blocks.filter(b => {
        if (b.type === 'image') return b.url?.trim() !== ''
        return b.text?.trim() !== ''
      }) 
    }

    const payload = {
      title: title.trim(),
      slug: slugify(title),
      summary: summary.trim() || null,
      category_id: Number(categoryId),
      featured_image: featuredImage || null,
      content: contentJson,
      is_trending: isTrending, 
      affiliate_1_title: affiliateLinks[0].title || null,
      affiliate_1_url: affiliateLinks[0].url || null,
      affiliate_2_title: affiliateLinks[1].title || null,
      affiliate_2_url: affiliateLinks[1].url || null,
      affiliate_3_title: affiliateLinks[2].title || null,
      affiliate_3_url: affiliateLinks[2].url || null,
      affiliate_4_title: affiliateLinks[3].title || null,
      affiliate_4_url: affiliateLinks[3].url || null,
      affiliate_5_title: affiliateLinks[4].title || null,
      affiliate_5_url: affiliateLinks[4].url || null,
    }

    if (editingBlogId) {
      // UPDATE
      const { data, error } = await supabase
        .from('blogs')
        .update(payload)
        .eq('blog_id', editingBlogId)
        .select()

      if (error) {
        console.error('Update error:', error)
        alert(error.message)
        return
      }

      setBlogs(prev => prev.map(b => (b.blog_id === editingBlogId ? data[0] : b)))
      setEditingBlogId(null)
    } else {
      // INSERT
      const { data, error } = await supabase
        .from('blogs')
        .insert([payload])
        .select()

      if (error) {
        console.error('Insert error:', error)
        alert(error.message)
        return
      }

      setBlogs(prev => [data[0], ...prev])
    }

    // Reset form
    setTitle('')
    setSummary('')
    setCategoryId('')
    setFeaturedImage('')
    setBlocks([])
    setIsTrending(false) 
    setAffiliateLinks([
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' },
      { title: '', url: '' },
    ])
  }

  // ---------------------------
  // Access control
  // ---------------------------
  if (!username) return <p className="p-10 text-gray-500">Loading user…</p>
  if (username !== ADMIN_USER) return <p className="p-10 text-red-500">Access Denied</p>

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/admin" className="flex items-center gap-2 text-green-600 mb-8">
        <ArrowLeft size={16} /> Back
      </Link>

      <h1 className="text-4xl font-bold text-green-600 mb-6">
        {editingBlogId ? 'Edit Blog' : 'Add Blog'}
      </h1>

      {/* BLOG FORM */}
      <div className="border p-6 rounded-xl bg-gray-50 space-y-4">
        <input
          placeholder="Blog title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        />

        <textarea
          placeholder="Summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        />

        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Featured image URL"
          value={featuredImage}
          onChange={e => setFeaturedImage(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isTrending}
            onChange={e => setIsTrending(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">Mark as Trending</span>
        </label>

        {/* CONTENT EDITOR */}
        <div className="border rounded-xl p-4 bg-white">
          <div className="flex gap-2 mb-4">
            <button onClick={() => addHeading(2)} className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
              + Heading
            </button>
            <button onClick={addParagraph} className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
              + Text
            </button>
            {/* ✅ Added Image Button */}
            <button onClick={addImage} className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
              + Image
            </button>
          </div>

          <div className="space-y-4">
            {blocks.map((block, i) => (
              <div key={i} className="relative bg-gray-50 border p-3 rounded-xl shadow-sm">
                
                {block.type === 'heading' && (
                  <input
                    placeholder={`Heading (H${block.level})`}
                    value={block.text || ''}
                    onChange={e => updateBlock(i, 'text', e.target.value)}
                    className="w-full border px-3 py-2 rounded text-lg font-semibold"
                  />
                )}

                {block.type === 'paragraph' && (
                  <textarea
                    placeholder="Paragraph text…"
                    value={block.text || ''}
                    onChange={e => updateBlock(i, 'text', e.target.value)}
                    className="w-full border px-3 py-2 rounded h-24"
                  />
                )}

                {/* ✅ Added Image Block UI */}
                {block.type === 'image' && (
                  <div className="flex flex-col gap-2">
                    <input
                      placeholder="Image URL"
                      value={block.url || ''}
                      onChange={e => updateBlock(i, 'url', e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <input
                      placeholder="Alt Text (optional)"
                      value={block.alt || ''}
                      onChange={e => updateBlock(i, 'alt', e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {block.url && (
                      <div className="mt-2 bg-white border p-2 rounded">
                        <img 
                          src={block.url} 
                          alt={block.alt || 'Preview'} 
                          className="max-h-40 object-contain rounded" 
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x150?text=Invalid+Image+URL' }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-sm text-red-500 font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AFFILIATE LINKS */}
        <div className="border rounded-xl p-4 bg-white mt-6">
          <h3 className="font-semibold mb-2">Affiliate Links (optional)</h3>
          {affiliateLinks.map((link, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                placeholder={`Affiliate ${i + 1} Title`}
                value={link.title}
                onChange={e => updateAffiliateLink(i, 'title', e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              />
              <input
                placeholder={`Affiliate ${i + 1} URL`}
                value={link.url}
                onChange={e => updateAffiliateLink(i, 'url', e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveBlog}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 mt-4 font-semibold"
        >
          {editingBlogId ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>

      {/* BLOG LIST */}
      <h2 className="text-2xl font-semibold mt-12 mb-4">Existing Blogs</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="space-y-2">
          {blogs.map(b => (
            <li key={b.blog_id} className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm">
              <span className="font-medium">{b.title}</span>
              <button
                onClick={() => editBlog(b)}
                className="text-blue-600 hover:underline px-3 py-1"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
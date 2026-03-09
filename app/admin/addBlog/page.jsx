'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, List as ListIcon, Image as ImageIcon, Type, ChevronUp, ChevronDown, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

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

  // Affiliate links state
  const [affiliateLinks, setAffiliateLinks] = useState([
    { title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' },
  ])

  // Structured content blocks
  const [blocks, setBlocks] = useState([])
  const [categories, setCategories] = useState([])

  // ---------------------------
  // Helpers
  // ---------------------------
  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
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

  function addBlock(type, extra = {}) {
    const initialText = type === 'list' ? '- ' : ''
    setBlocks([...blocks, { type, text: initialText, ...extra }])
  }

  function updateBlock(index, field, value) {
    const updated = [...blocks]
    updated[index][field] = value
    setBlocks(updated)
  }

  function removeBlock(index) {
    setBlocks(blocks.filter((_, i) => i !== index))
  }

  // ✅ New helper: Move block UP
  function moveBlockUp(index) {
    if (index === 0) return // Already at the top
    const updated = [...blocks]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    setBlocks(updated)
  }

  // ✅ New helper: Move block DOWN
  function moveBlockDown(index) {
    if (index === blocks.length - 1) return // Already at the bottom
    const updated = [...blocks]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    setBlocks(updated)
  }

  // ---------------------------
  // Auth & Fetching
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

  async function fetchBlogs() {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    if (!error) setBlogs(data)
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*')
    if (data) setCategories(data)
  }

  // ---------------------------
  // Save Logic
  // ---------------------------
  async function saveBlog() {
    if (!title.trim() || !categoryId || blocks.length === 0) {
      alert('Title, category, and content are required')
      return
    }

    const contentJson = {
      blocks: blocks.filter(b => (b.type === 'image' ? b.url?.trim() : b.text?.trim()))
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

    const { data, error } = editingBlogId
      ? await supabase.from('blogs').update(payload).eq('blog_id', editingBlogId).select()
      : await supabase.from('blogs').insert([payload]).select()

    if (error) {
      alert(error.message)
      return
    }

    if (editingBlogId) {
      setBlogs(prev => prev.map(b => (b.blog_id === editingBlogId ? data[0] : b)))
      setEditingBlogId(null)
    } else {
      setBlogs(prev => [data[0], ...prev])
    }

    // Reset Form
    setTitle(''); setSummary(''); setCategoryId(''); setFeaturedImage(''); setBlocks([]); setIsTrending(false)
    setAffiliateLinks([{ title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }])
  }

  if (!username) return <p className="p-10 text-gray-500">Loading user…</p>
  if (username !== ADMIN_USER) return <p className="p-10 text-red-500">Access Denied</p>

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/admin" className="flex items-center gap-2 text-green-600 mb-8 font-medium hover:underline">
        <ArrowLeft size={16} /> Back
      </Link>

      <h1 className="text-4xl font-bold text-green-600 mb-6">{editingBlogId ? 'Edit Blog' : 'Add Blog'}</h1>

      {/* BLOG FORM */}
      <div className="border p-6 rounded-xl bg-gray-50 space-y-4 shadow-sm">
        <input placeholder="Blog title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
        <textarea placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} className="w-full border px-4 py-2 rounded-xl h-20" />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border px-4 py-2 rounded-xl">
          <option value="">Select category</option>
          {categories.map(cat => <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>)}
        </select>
        <input placeholder="Featured image URL" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} className="w-full border px-4 py-2 rounded-xl" />

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} className="w-4 h-4 accent-green-600" />
          <span className="text-sm text-gray-700 font-medium">Mark as Trending</span>
        </label>

        {/* CONTENT EDITOR */}
        <div className="border rounded-xl p-4 bg-white mt-6">
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b">
            <button onClick={() => addBlock('heading', { level: 2 })} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-200"><Type size={14}/> Heading</button>
            <button onClick={() => addBlock('paragraph')} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-200">Text</button>
            <button onClick={() => addBlock('list')} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-200"><ListIcon size={14}/> List</button>
            <button onClick={() => addBlock('image')} className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-200"><ImageIcon size={14}/> Image</button>
            
            <div className="ml-auto hidden sm:flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest">
              <span>**bold**</span>
              <span>*italic*</span>
              <span>- list</span>
            </div>
          </div>

          <div className="space-y-8">
            {blocks.map((block, i) => (
              <div key={i} className="relative group p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-all pt-6 mt-4">
                
                {/* FLOATING ACTION BAR FOR BLOCKS */}
                <div className="absolute -top-3 right-4 flex items-center bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={() => moveBlockUp(i)} 
                    disabled={i === 0}
                    className="p-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white text-gray-600"
                    title="Move Up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-gray-200"></div>
                  <button 
                    onClick={() => moveBlockDown(i)} 
                    disabled={i === blocks.length - 1}
                    className="p-1.5 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white text-gray-600"
                    title="Move Down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-gray-200"></div>
                  <button 
                    onClick={() => removeBlock(i)} 
                    className="p-1.5 hover:bg-red-50 text-red-500"
                    title="Delete Block"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* BLOCK CONTENT RENDERER */}
                {block.type === 'heading' && (
                  <input
                    placeholder="Heading text..."
                    value={block.text || ''}
                    onChange={e => updateBlock(i, 'text', e.target.value)}
                    className="w-full border-b focus:border-green-500 outline-none py-1 text-xl font-bold bg-transparent"
                  />
                )}

                {(block.type === 'paragraph' || block.type === 'list') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      placeholder={block.type === 'list' ? "- Item 1\n- Item 2" : "Write with Markdown..."}
                      value={block.text || ''}
                      onChange={e => updateBlock(i, 'text', e.target.value)}
                      className="w-full border rounded-lg p-3 text-sm min-h-[120px] focus:ring-1 focus:ring-green-500 outline-none"
                    />
                    <div className="hidden md:block prose prose-sm p-3 bg-gray-50 rounded-lg overflow-auto max-h-[120px]">
                      <ReactMarkdown>{block.text || '*Preview*'}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="space-y-2">
                    <input placeholder="Image URL" value={block.url || ''} onChange={e => updateBlock(i, 'url', e.target.value)} className="w-full border px-3 py-2 rounded text-sm" />
                    <input placeholder="Alt Text" value={block.alt || ''} onChange={e => updateBlock(i, 'alt', e.target.value)} className="w-full border px-3 py-2 rounded text-sm" />
                    {block.url && <img src={block.url} className="mt-2 max-h-40 rounded border shadow-sm" alt="preview" />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button onClick={saveBlog} className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 font-bold shadow-lg shadow-green-100 transition-all active:scale-[0.98]">
          {editingBlogId ? 'Update Blog Post' : 'Publish Blog Post'}
        </button>
      </div>

      {/* BLOG LIST */}
      <h2 className="text-2xl font-bold mt-16 mb-6">Manage Blogs</h2>
      {loading ? <p className="text-gray-400">Loading storage...</p> : (
        <div className="grid gap-3">
          {blogs.map(b => (
            <div key={b.blog_id} className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <span className="font-semibold text-gray-800">{b.title}</span>
              <button onClick={() => editBlog(b)} className="text-green-600 font-bold hover:bg-green-50 px-4 py-2 rounded-lg transition-colors border border-green-100">Edit</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import React from "react"

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [search, setSearch] = useState("")

  // Track expanded categories and their blogs
  const [expanded, setExpanded] = useState({}) // { [categoryId]: true/false }
  const [categoryBlogs, setCategoryBlogs] = useState({}) // { [categoryId]: [blogs] }

  /* ---------------- USER CHECK ---------------- */

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed.user?.username) setUsername(parsed.user.username)
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (username === ADMIN_USER) fetchCategories()
  }, [username])

  /* ---------------- FETCH ---------------- */

  async function fetchCategories() {
    setLoading(true)
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) console.error("Error fetching categories:", error)
    else setCategories(data)

    setLoading(false)
  }

  // Fetch blogs for a category
  async function fetchCategoryBlogs(categoryId) {
    if (categoryBlogs[categoryId]) return // Already fetched
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false })

    if (error) console.error("Error fetching blogs:", error)
    else setCategoryBlogs(prev => ({ ...prev, [categoryId]: data }))
  }

  /* ---------------- UTIL ---------------- */

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  /* ---------------- ADD CATEGORY ---------------- */

  async function addCategory() {
    if (!name.trim() || !slug.trim()) return

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([payload])
      .select()

    if (error) return console.error("Insert error:", error)

    setCategories(prev => [data[0], ...prev])
    setName("")
    setSlug("")
    setDescription("")
  }

  /* ---------------- DELETE ---------------- */

  async function deleteCategory(id) {
    if (!confirm("Are you sure?")) return

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", id)

    if (error) console.error("Error deleting category:", error)
    else setCategories(categories.filter(cat => cat.category_id !== id))
  }

  /* ---------------- EXPAND CATEGORY ---------------- */

  function toggleExpand(categoryId) {
    setExpanded(prev => {
      const isExpanded = !prev[categoryId]
      if (isExpanded) fetchCategoryBlogs(categoryId)
      return { ...prev, [categoryId]: isExpanded }
    })
  }

  /* ---------------- FILTERED CATEGORIES ---------------- */

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  /* ---------------- GUARDS ---------------- */

  if (!username) return <p className="text-gray-500 p-10">Loading user...</p>
  if (username !== ADMIN_USER) return <p className="text-red-500 p-10">Access Denied</p>

  /* ---------------- UI ---------------- */

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Manage Categories</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border rounded-xl w-full"
      />

      {/* FORM */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value)
            setSlug(slugify(e.target.value))
          }}
          placeholder="Category name"
          className="px-4 py-2 border rounded-xl w-full"
        />
        <input
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          placeholder="Category slug (unique)"
          className="px-4 py-2 border rounded-xl w-full"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Category description (optional)"
          rows={3}
          className="px-4 py-2 border rounded-xl w-full"
        />
        <button
          onClick={addCategory}
          className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Add Category
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredCategories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredCategories.map(cat => (
            <li
              key={cat.category_id}
              className="border rounded-xl p-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-gray-500">{cat.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleExpand(cat.category_id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    {expanded[cat.category_id] ? "Hide Blogs" : "Show Blogs"}
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.category_id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* BLOGS UNDER CATEGORY */}
              {expanded[cat.category_id] && (
                <div className="mt-2 ml-4 border-l-2 border-gray-300 pl-4 space-y-1">
                  {categoryBlogs[cat.category_id]?.length > 0 ? (
                    categoryBlogs[cat.category_id].map(blog => (
                      <p key={blog.blog_id} className="text-sm text-gray-700">
                        • {blog.title}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No blogs in this category.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

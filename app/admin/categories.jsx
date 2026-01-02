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

  /* ---------------- USER CHECK ---------------- */

  useEffect(() => {
    console.log("Attempting to read user from localStorage for Categories page...")
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        console.log("Parsed user object:", parsed)
        if (parsed.user?.username) setUsername(parsed.user.username)
      } catch (err) {
        console.error("Error parsing user:", err)
      }
    }
  }, [])

  useEffect(() => {
    console.log("username state changed:", username)
    if (username === ADMIN_USER) {
      fetchCategories()
    }
  }, [username])

  /* ---------------- FETCH ---------------- */

  async function fetchCategories() {
    console.log("Fetching categories...")
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) console.error("Error fetching categories:", error)
    else setCategories(data)

    setLoading(false)
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
    console.log("🟡 addCategory() triggered")

    if (!name.trim() || !slug.trim()) {
      console.warn("⚠️ Name or slug missing")
      return
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
    }

    console.log("🟢 Insert payload:", payload)

    try {
      const response = await supabase
        .from("categories")
        .insert([payload])
        .select()

      console.log("🟣 Raw Supabase response:", response)

      const { data, error, status } = response

      console.log("🔵 Status:", status)
      console.log("🟢 Data:", data)
      console.log("🔴 Error:", error)

      if (error) {
        console.error("❌ INSERT FAILED:", error)
        return
      }

      console.log("✅ Category inserted:", data[0])

      setCategories(prev => [data[0], ...prev])
      setName("")
      setSlug("")
      setDescription("")
    } catch (err) {
      console.error("🔥 Unexpected JS error:", err)
    }
  }

  /* ---------------- DELETE ---------------- */

  async function deleteCategory(id) {
    if (!confirm("Are you sure?")) return
    console.log("Deleting category with id:", id)

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", id)

    if (error) console.error("Error deleting category:", error)
    else setCategories(categories.filter(cat => cat.category_id !== id))
  }

  /* ---------------- GUARDS ---------------- */

  if (!username) return <p className="text-gray-500 p-10">Loading user...</p>
  if (username !== ADMIN_USER) return <p className="text-red-500 p-10">Access Denied</p>

  /* ---------------- UI ---------------- */

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Manage Categories
      </h1>

      {/* FORM */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setSlug(slugify(e.target.value))
          }}
          placeholder="Category name"
          className="px-4 py-2 border rounded-xl w-full"
        />

        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Category slug (unique)"
          className="px-4 py-2 border rounded-xl w-full"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      ) : (
        <ul className="space-y-3">
          {categories.map(cat => (
            <li
              key={cat.category_id}
              className="flex justify-between items-center p-3 border rounded-xl"
            >
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </div>

              <button
                onClick={() => deleteCategory(cat.category_id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

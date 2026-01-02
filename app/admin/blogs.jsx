"use client"

import React from "react" 
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    console.log("Reading user from localStorage for Blogs page...")
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed.user?.username) setUsername(parsed.user.username)
      } catch (err) {
        console.error("Error parsing user:", err)
      }
    }
  }, [])

  useEffect(() => {
    if (username === ADMIN_USER) {
      fetchBlogs()
    }
  }, [username])

  async function fetchBlogs() {
    console.log("Fetching blogs...")
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) console.error("Error fetching blogs:", error)
    else setBlogs(data)
    setLoading(false)
  }

  async function addBlog() {
    if (!newBlogTitle.trim()) return
    console.log("Adding blog:", newBlogTitle)
    const { data, error } = await supabase
      .from("blogs")
      .insert({ title: newBlogTitle })
      .select()
    if (error) console.error("Error adding blog:", error)
    else setBlogs([data[0], ...blogs])
    setNewBlogTitle("")
  }

  async function deleteBlog(id) {
    if (!confirm("Are you sure?")) return
    console.log("Deleting blog with id:", id)
    const { error } = await supabase.from("blogs").delete().eq("blog_id", id)
    if (error) console.error("Error deleting blog:", error)
    else setBlogs(blogs.filter(blog => blog.blog_id !== id))
  }

  if (!username) return <p className="text-gray-500 p-10">Loading user...</p>
  if (username !== ADMIN_USER) return <p className="text-red-500 p-10">Access Denied</p>

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Manage Blogs</h1>
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={newBlogTitle}
          onChange={(e) => setNewBlogTitle(e.target.value)}
          placeholder="New blog title"
          className="px-4 py-2 border rounded-xl w-full"
        />
        <button
          onClick={addBlog}
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {blogs.map(blog => (
            <li key={blog.blog_id} className="flex justify-between items-center p-3 border rounded-xl">
              <span>{blog.title}</span>
              <button
                onClick={() => deleteBlog(blog.blog_id)}
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

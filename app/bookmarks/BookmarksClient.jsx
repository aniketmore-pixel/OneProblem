'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function BookmarksClient() {
    const [blogs, setBlogs] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('[Bookmarks] Component mounted')

        const rawUser = localStorage.getItem('user')
        console.log('[Bookmarks] raw user from localStorage:', rawUser)

        if (!rawUser) {
            setLoading(false)
            return
        }

        const parsed = JSON.parse(rawUser)
        const user = parsed?.user   // ✅ FIX

        console.log('[Bookmarks] parsed user:', user)

        if (!user?.username) {
            console.warn('[Bookmarks] No user or username found')
            setLoading(false)
            return
        }

        async function fetchBookmarks() {
            console.log('[Bookmarks] Fetching bookmarks for:', user.username)
            setLoading(true)

            // 1️⃣ Get bookmark rows
            const { data: bookmarkRows, error: bookmarkError } = await supabase
                .from('bookmarks')
                .select('blog_id')
                .eq('username', user.username)
                .order('created_at', { ascending: false })

            console.log('[Bookmarks] bookmark rows:', bookmarkRows, bookmarkError)

            if (bookmarkError || !bookmarkRows?.length) {
                setBlogs([])
                setLoading(false)
                return
            }

            const blogIds = bookmarkRows.map(b => b.blog_id)


            const { data: blogsData, error: blogsError } = await supabase
                .from('blogs')
                .select(`
    blog_id,
    title,
    slug,
    summary,
    featured_image,
    content
  `)
                .in('blog_id', blogIds)


            console.log('[Bookmarks] blogs data:', blogsData, blogsError)

            if (!blogsError) {
                setBlogs(blogsData)
            }

            setLoading(false)
        }


        fetchBookmarks()
    }, [])


    const filteredBlogs = blogs.filter(blog => {
        const match = blog.title
            ?.toLowerCase()
            .includes(search.toLowerCase())

        console.log(
            '[Bookmarks] Filtering:',
            blog.title,
            'match:',
            match
        )

        return match
    })

    console.log('[Bookmarks] Final blogs:', blogs)
    console.log('[Bookmarks] Filtered blogs:', filteredBlogs)

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <Link href="/" className="inline-flex items-center gap-2 text-green-600 mb-8">
                ← Back to home
            </Link>


            <h1 className="text-4xl font-bold mb-4">
                Your <span className="text-green-600">Bookmarks</span>
            </h1>

            <p className="text-gray-600 mb-6">
                Blogs you’ve saved to read later
            </p>


            <div className="mb-10 max-w-md">
                <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            {loading ? (
                <p className="text-gray-500">Loading bookmarks...</p>

            ) : filteredBlogs.length === 0 ? (
                <p className="text-gray-500">No bookmarks found.</p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredBlogs.map(blog => (
                        <Link
                            key={blog.blog_id}
                            href={`/blog/${blog.slug}`}
                            className="group bg-white rounded-2xl p-6 border transition"
                        >
                            {blog.featured_image && (
                                <img
                                    src={blog.featured_image}
                                    alt={blog.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                            )}

                            <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                                {blog.title}
                            </h2>

                            <p className="text-sm text-gray-500">{blog.summary}</p>

                            {blog.read_time && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Read time: {blog.read_time} min
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}

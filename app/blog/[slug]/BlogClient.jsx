'use client'

import { useEffect, useState } from 'react'
import BlogContent from '@/components/BlogContent'
import { calculateReadingTime } from '@/lib/utils/readingTime'
import ShareButtons from '@/components/ShareButtons'
import AffiliateLinks from '@/components/AffiliateLinks'
import Link from 'next/link'
import { ArrowRightIcon, Calendar, ArrowLeftIcon } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'

export default function BlogClient({ blog }) {
    const [readingProgress, setReadingProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [toc, setToc] = useState([])

    const handleNavigation = (href) => {
        setLoading(true)
        // optional UX delay for loader visibility
        setTimeout(() => {
            window.location.href = href
        }, 100) // can be 100-300ms
    }

    /* 🔹 Reading progress bar */
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight
            setReadingProgress((scrollTop / docHeight) * 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* 🔹 Generate TOC after render */
    useEffect(() => {
        // only generate TOC if blog content has blocks
        const headings = document.querySelectorAll('.blog-content h2, .blog-content h3')

        const items = Array.from(headings).map((heading) => {
            const id = heading.innerText
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')

            heading.id = id

            return {
                id,
                text: heading.innerText,
                level: heading.tagName,
            }
        })

        setToc(items)
    }, [blog.content]) // regenerate TOC when content changes

    const publishedDate = blog.published_at || blog.created_at

    // ✅ Calculate reading time for blocks or fallback to string
    const readingTime = calculateReadingTime(blog.content)

    return (
        <>
            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200 z-50">
                <div
                    className="h-full bg-green-600"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <article className="bg-white pt-10">
                
                {/* ✅ FULL-WIDTH, NARROW EDGE-TO-EDGE BANNER */}
                {blog.featured_image && (
                    <div className="w-full mb-8 relative">
                        <img 
                            src={blog.featured_image} 
                            alt={blog.title || 'Blog cover image'} 
                            // Narrow responsive height, object-cover to prevent stretching, no rounded corners
                            className="w-full h-[150px] md:h-[200px] lg:h-[250px] object-cover rounded-none"
                        />
                    </div>
                )}
                
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
                    {/* CONTENT */}
                    <div>
                        {/* Back to category */}
                        <button
                            onClick={() =>
                                handleNavigation(
                                    blog.categories?.slug
                                        ? `/category/${blog.categories.slug}`
                                        : '/blog'
                                )
                            }
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
                        >
                            <ArrowLeftIcon size={16} />
                            Back to {blog.categories?.name || 'Blogs'}
                        </button>

                        <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-4">
                            {blog.categories?.name}
                        </p>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-10">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>

                            <span>⏱ {readingTime}</span>

                            <FavoriteButton blogId={blog.blog_id} />

                            <ShareButtons />
                        </div>

                        <p className="text-xl text-gray-700 mb-16 max-w-3xl leading-relaxed">
                            {blog.summary}
                        </p>

                        {/* Blog content */}
                        <div className="blog-content prose prose-lg lg:prose-xl max-w-none prose-img:max-w-[75%] prose-img:mx-auto prose-img:max-h-[500px] prose-img:object-contain prose-img:rounded-lg">
                            <BlogContent content={blog.content} />
                        </div>

                        <AffiliateLinks blog={blog} />

                        <div className="mt-24 text-center">
                            <h3 className="text-xl font-semibold mb-3">
                                Want more like this?
                            </h3>

                            <button
                                onClick={() =>
                                    handleNavigation(
                                        blog.categories?.slug
                                            ? `/category/${blog.categories.slug}`
                                            : '/blog'
                                    )
                                }
                                className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
                            >
                                Explore more from {blog.categories?.name || 'Blogs'}
                                <ArrowRightIcon size={16} />
                            </button>

                        </div>
                    </div>

                    {/* TOC */}
                    {toc.length > 0 && (
                        <aside className="hidden lg:block sticky top-32 h-fit">
                            <div className="border rounded-xl p-5 bg-gray-50/50">
                                <p className="text-sm font-semibold mb-4 text-gray-900">
                                    In this article
                                </p>

                                <ul className="space-y-3 text-sm">
                                    {toc.map((item) => (
                                        <li
                                            key={item.id}
                                            className={item.level === 'H3' ? 'ml-4 text-gray-500' : 'text-gray-700'}
                                        >
                                            <a href={`#${item.id}`} className="hover:text-green-600 transition-colors">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}

                    {loading && (
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-white text-lg font-medium">
                                Loading...
                            </p>
                        </div>
                    )}
                </div>
            </article>
        </>
    )
}
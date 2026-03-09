'use client'

import { useEffect, useState } from 'react'
import BlogContent from '@/components/BlogContent'
import { calculateReadingTime } from '@/lib/utils/readingTime'
import ShareButtons from '@/components/ShareButtons'
import AffiliateLinks from '@/components/AffiliateLinks'
import Link from 'next/link'
import { ArrowRightIcon, Calendar, ArrowLeftIcon, Plus } from 'lucide-react'
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
        }, 100)
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
    }, [blog.content])

    const publishedDate = blog.published_at || blog.created_at
    const readingTime = calculateReadingTime(blog.content)

    return (
        <>
            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200 z-50">
                <div
                    className="h-full bg-green-500"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <article className="bg-white min-h-screen">
                
                {/* 🎨 COMPACT GREEN GRADIENT HEADER */}
                <header className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white pt-12 pb-8 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-8">
                        
                        {/* Left Column: Meta, Date, and Sharing */}
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-green-600/50 pb-6 md:pb-0 md:pr-6">
                            <button
                                onClick={() =>
                                    handleNavigation(
                                        blog.categories?.slug
                                            ? `/category/${blog.categories.slug}`
                                            : '/blog'
                                    )
                                }
                                className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-white mb-6 transition-colors w-fit"
                            >
                                <ArrowLeftIcon size={16} />
                                Back
                            </button>

                            <div className="mb-4">
                                <p className="text-sm font-medium text-white mb-1">
                                    by <span className="font-bold">{blog.author || 'Editorial Team'}</span>
                                </p>
                                <div className="text-xs text-green-200 space-y-1">
                                    <p>
                                        {new Date(publishedDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p>⏱ {readingTime}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-auto">
                                <div className="flex items-center gap-3 bg-white/10 p-1.5 rounded-xl backdrop-blur-sm">
                                    <FavoriteButton blogId={blog.blog_id} />
                                    <div className="w-px h-4 bg-green-400/30"></div>
                                    <ShareButtons />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Title and Summary */}
                        <div className="flex flex-col justify-center">
                            {/* Category Tags */}
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-200 mb-4">
                                <span className="flex items-center gap-1">
                                    <Plus size={14} className="text-white" />
                                    {blog.categories?.name || 'Article'}
                                </span>
                                {blog.tags && (
                                    <span className="flex items-center gap-1">
                                        <Plus size={14} className="text-white" />
                                        {blog.tags}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white">
                                {blog.title}
                            </h1>

                            <p className="text-lg lg:text-xl text-green-50 mb-4 max-w-4xl leading-relaxed font-medium">
                                {blog.summary}
                            </p>

                            {/* <p className="text-xs italic text-green-200 max-w-2xl">
                                If you buy something from an ExpressDeal link, we may earn a commission. 
                                <a href="#" className="underline ml-1 hover:text-white transition-colors">See our ethics statement.</a>
                            </p> */}
                        </div>
                    </div>
                </header>
                
                {/* ✅ HERO IMAGE (More compact height)
                {blog.featured_image && (
                    <div className="w-full bg-green-900 border-b-4 border-gray-100">
                        <img 
                            src={blog.featured_image} 
                            alt={blog.title || 'Blog cover image'} 
                            className="w-full max-h-[300px] md:max-h-[400px] object-cover object-center"
                        />
                    </div>
                )} */}
                
                {/* 📝 MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
                    
                    {/* Content Left */}
                    <div>
                        <div className="blog-content prose prose-lg max-w-none prose-img:w-auto prose-img:max-w-[350px] sm:prose-img:max-w-[400px] prose-img:mx-auto prose-img:rounded-lg">
                            <BlogContent content={blog.content} />
                        </div>

                        <AffiliateLinks blog={blog} />

                        <div className="mt-16 border-t pt-8 text-center">
                            <h3 className="text-xl font-bold mb-4">
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
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white text-sm font-medium rounded-full hover:bg-green-800 transition-colors shadow-md shadow-green-900/10"
                            >
                                Explore more from {blog.categories?.name || 'Blogs'}
                                <ArrowRightIcon size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Content Right: TOC */}
                    {toc.length > 0 && (
                        <aside className="hidden lg:block sticky top-8 h-fit">
                            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 shadow-sm">
                                <p className="text-xs uppercase tracking-widest font-bold mb-3 text-green-800 border-b pb-2">
                                    In this article
                                </p>

                                <ul className="space-y-2.5 text-sm">
                                    {toc.map((item) => (
                                        <li
                                            key={item.id}
                                            className={item.level === 'H3' ? 'ml-3 text-gray-500 font-normal' : 'text-gray-800 font-medium'}
                                        >
                                            <a href={`#${item.id}`} className="hover:text-green-600 transition-colors block">
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
                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                        </div>
                    )}
                </div>
            </article>
        </>
    )
}
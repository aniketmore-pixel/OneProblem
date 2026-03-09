'use client'

import { useEffect, useState } from 'react'
import BlogContent from '@/components/BlogContent'
import { calculateReadingTime } from '@/lib/utils/readingTime'
import ShareButtons from '@/components/ShareButtons'
import AffiliateLinks from '@/components/AffiliateLinks'
import Link from 'next/link'
import { ArrowRightIcon, Calendar, ArrowLeftIcon, Plus, BookOpen } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'

export default function BlogClient({ blog }) {
    const [readingProgress, setReadingProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [toc, setToc] = useState([])

    const handleNavigation = (href) => {
        setLoading(true)
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
                    className="h-full bg-green-500 transition-all duration-150 ease-out"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <article className="bg-white min-h-screen">
                
                {/* 🎨 EXPANDED LIGHT-MODE HEADER */}
                <header className="relative pt-20 pb-16 px-6 overflow-hidden">
                    {/* Optional subtle decorative element in background */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-10">
                        
                        {/* Left Column: Meta, Date, and Sharing */}
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-green-200/60 pb-8 md:pb-0 md:pr-8">
                            <button
                                onClick={() =>
                                    handleNavigation(
                                        blog.categories?.slug
                                            ? `/category/${blog.categories.slug}`
                                            : '/blog'
                                    )
                                }
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-800 mb-8 transition-colors w-fit group"
                            >
                                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to {blog.categories?.name || 'Blog'}
                            </button>

                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                    <span className="w-6 h-px bg-green-500 inline-block"></span>
                                    by <span className="font-bold text-gray-900">{blog.author || 'Editorial Team'}</span>
                                </p>
                                <div className="text-sm text-gray-500 space-y-1.5 pl-8">
                                    <p className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {new Date(publishedDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <BookOpen size={14} />
                                        {readingTime} read
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-auto">
                                {/* Light-mode optimized Favorite/Share container */}
                                <div className="flex items-center gap-3 bg-white text-gray-700 p-2 rounded-xl border border-gray-200 shadow-sm">
                                    <FavoriteButton blogId={blog.blog_id} />
                                    <div className="w-px h-5 bg-gray-200"></div>
                                    <ShareButtons />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Title and Summary */}
                        <div className="flex flex-col justify-center">
                            {/* Category Tags */}
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-700 mb-5">
                                <span className="flex items-center gap-1 bg-green-100/80 px-2 py-1 rounded-md border border-green-200">
                                    {blog.categories?.name || 'Article'}
                                </span>
                                {blog.tags && (
                                    <span className="flex items-center gap-1 bg-green-100/80 px-2 py-1 rounded-md border border-green-200">
                                        {blog.tags}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.15] tracking-tight text-gray-900 max-w-5xl">
                                {blog.title}
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-700 mb-6 max-w-4xl leading-relaxed font-light">
                                {blog.summary}
                            </p>

                            <p className="text-xs italic text-gray-400 mt-4 max-w-2xl">
                                If you buy something from an ExpressDeal link, we may earn a commission. 
                                <a href="#" className="underline ml-1 hover:text-gray-600 transition-colors">See our ethics statement.</a>
                            </p>
                        </div>
                    </div>
                </header>
                
                {/* 📝 MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
                    
                    {/* Content Left */}
                    <div>
                        <div className="blog-content prose prose-lg max-w-none prose-img:w-auto prose-img:max-w-[350px] sm:prose-img:max-w-[400px] prose-img:mx-auto prose-img:rounded-xl prose-img:shadow-sm prose-headings:scroll-mt-24 text-gray-800">
                            <BlogContent content={blog.content} />
                        </div>

                        <AffiliateLinks blog={blog} />

                        <div className="mt-20 border-t border-gray-100 pt-10 text-center">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                Enjoyed this article?
                            </h3>

                            <button
                                onClick={() =>
                                    handleNavigation(
                                        blog.categories?.slug
                                            ? `/category/${blog.categories.slug}`
                                            : '/blog'
                                    )
                                }
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white text-base font-semibold rounded-full hover:bg-green-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-900/10"
                            >
                                Explore more from {blog.categories?.name || 'Blogs'}
                                <ArrowRightIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Content Right: TOC */}
                    {toc.length > 0 && (
                        <aside className="hidden lg:block sticky top-24 h-fit">
                            <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 shadow-sm">
                                <p className="text-xs uppercase tracking-widest font-bold mb-4 text-green-700 flex items-center gap-2">
                                    <BookOpen size={14} className="text-green-600" />
                                    In this article
                                </p>

                                <ul className="space-y-3 text-sm">
                                    {toc.map((item) => (
                                        <li
                                            key={item.id}
                                            className={item.level === 'H3' ? 'ml-4 text-gray-500 font-normal' : 'text-gray-800 font-medium'}
                                        >
                                            <a href={`#${item.id}`} className="hover:text-green-600 transition-colors block leading-snug">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}

                    {loading && (
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4 shadow-lg"></div>
                        </div>
                    )}
                </div>
            </article>
        </>
    )
}
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
                
                {/* 🎨 THE VERGE INSPIRED HEADER */}
                <header className="bg-violet-900 text-white pt-24 pb-16 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-10">
                        
                        {/* Left Column: Meta, Date, and Sharing */}
                        <div className="flex flex-col border-b md:border-b-0 md:border-r border-violet-700/50 pb-8 md:pb-0 md:pr-8">
                            <button
                                onClick={() =>
                                    handleNavigation(
                                        blog.categories?.slug
                                            ? `/category/${blog.categories.slug}`
                                            : '/blog'
                                    )
                                }
                                className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white mb-10 transition-colors w-fit"
                            >
                                <ArrowLeftIcon size={16} />
                                Back
                            </button>

                            <div className="mb-6">
                                <p className="text-sm font-medium text-white mb-1">
                                    by <span className="font-bold">{blog.author || 'Editorial Team'}</span>
                                </p>
                                <div className="text-xs text-violet-300 space-y-1">
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
                                {/* Wrap sharing and favorites in a container that inherits text-white if possible */}
                                <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                                    <FavoriteButton blogId={blog.blog_id} />
                                    <div className="w-px h-5 bg-violet-400/30"></div>
                                    <ShareButtons />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Title and Summary */}
                        <div className="flex flex-col justify-center">
                            {/* Category Tags */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-violet-300 mb-6">
                                <span className="flex items-center gap-1">
                                    <Plus size={14} className="text-green-400" />
                                    {blog.categories?.name || 'Article'}
                                </span>
                                {blog.tags && (
                                    <span className="flex items-center gap-1">
                                        <Plus size={14} className="text-green-400" />
                                        {blog.tags}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white">
                                {blog.title}
                            </h1>

                            <p className="text-xl lg:text-3xl text-violet-100 mb-6 max-w-4xl leading-tight font-medium">
                                {blog.summary}
                            </p>

                            <p className="text-sm italic text-violet-300 mt-2 max-w-2xl">
                                If you buy something from an ExpressDeal link, we may earn a commission. 
                                <a href="#" className="underline ml-1 hover:text-white transition-colors">See our ethics statement.</a>
                            </p>
                        </div>
                    </div>
                </header>
                
                {/* ✅ HERO IMAGE (Moved below the header, full width or contained) */}
                {blog.featured_image && (
                    <div className="w-full bg-violet-900 border-b-8 border-green-500">
                        <img 
                            src={blog.featured_image} 
                            alt={blog.title || 'Blog cover image'} 
                            className="w-full max-h-[500px] lg:max-h-[700px] object-cover object-center"
                        />
                    </div>
                )}
                
                {/* 📝 MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
                    
                    {/* Content Left */}
                    <div>
                        <div className="blog-content prose prose-lg lg:prose-xl max-w-none prose-img:w-auto prose-img:max-w-[350px] sm:prose-img:max-w-[400px] prose-img:mx-auto prose-img:rounded-lg">
                            <BlogContent content={blog.content} />
                        </div>

                        <AffiliateLinks blog={blog} />

                        <div className="mt-24 border-t pt-10 text-center">
                            <h3 className="text-2xl font-bold mb-4">
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
                                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-900 text-white font-medium rounded-full hover:bg-violet-800 transition-colors shadow-lg shadow-violet-900/20"
                            >
                                Explore more from {blog.categories?.name || 'Blogs'}
                                <ArrowRightIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Content Right: TOC */}
                    {toc.length > 0 && (
                        <aside className="hidden lg:block sticky top-10 h-fit">
                            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                                <p className="text-xs uppercase tracking-widest font-bold mb-4 text-violet-900 border-b pb-3">
                                    In this article
                                </p>

                                <ul className="space-y-3 text-sm">
                                    {toc.map((item) => (
                                        <li
                                            key={item.id}
                                            className={item.level === 'H3' ? 'ml-4 text-gray-500 font-normal' : 'text-gray-900 font-medium'}
                                        >
                                            <a href={`#${item.id}`} className="hover:text-violet-600 transition-colors block">
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
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                        </div>
                    )}
                </div>
            </article>
        </>
    )
}
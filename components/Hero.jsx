'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image"

import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import { getTrendingBlogs } from '@/lib/queries/blogs'

import { 
  ArrowRightIcon, 
  ChevronRightIcon, 
  ShoppingCart, 
  BookOpen, 
  CreditCard,
  CheckCircle2,
  X
} from 'lucide-react'

import heroImage from "@/assets/hero-image.png"

const Hero = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState([])
  const [loadingBlogId, setLoadingBlogId] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const [trendingBlogs, setTrendingBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  const router = useRouter()

  const handleNavigation = async (url) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 200)) 
    router.push(url)
  }

  const handleBlogNavigation = (slug, blogId) => {
    setLoadingBlogId(blogId)
    setTimeout(() => {
      router.push(`/blog/${slug}`)
    }, 150) 
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)
  }, [])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('release_date', { ascending: true })
          .limit(6)

        if (error) throw error
        setAnnouncements(data || [])
      } catch (err) {
        console.error('Error fetching announcements:', err)
      }
    }
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      const blogs = await getTrendingBlogs()
      setTrendingBlogs(blogs)
    }
    fetchTrendingBlogs()
  }, [])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/store/collections')
        const data = await res.json()
        setCollections(Array.isArray(data.collections) ? data.collections : [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  const handleLogin = async () => {
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Invalid credentials')
      return
    }

    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
    setShowModal(false)
    setUsername('')
    setPassword('')
  }

  const handleSignup = async () => {
    setError('')
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Signup failed')
      return
    }

    await handleLogin()
    setIsSignup(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <main className="w-full overflow-hidden bg-slate-50 text-slate-900 selection:bg-green-200">
      
      {/* HERO SECTION */}
      {/* HERO SECTION */}
<section className="relative pt-2 pb-16 md:pt-8 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Soft elegant background meshes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/60 via-slate-50 to-transparent -z-10 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-200/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-8">
            
            {/* Premium Pill Badge */}
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm text-slate-600 pl-1.5 pr-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-white hover:shadow-md cursor-default">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] shadow-inner shadow-white/20">
                New
              </span>
              Curated picks from trusted stores
              <ChevronRightIcon size={14} className="text-slate-400" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              The best products. <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 drop-shadow-sm">
                Reviewed & curated for you.
              </span>
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-xl text-balance leading-relaxed">
            We analyze the best deals across multiple platforms to help you confidently choose anything you can buy online...from products to courses and digital services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Link
                href="/categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/categories');
                }}
                className="group inline-flex justify-center items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                Explore Categories 
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              {!user && (
                <button
                  onClick={() => { setIsSignup(true); setShowModal(true); }}
                  className="inline-flex justify-center items-center px-8 py-4 rounded-2xl font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                >
                  Create Free Account
                </button>
              )}
            </div>
          </div>

          {/* Right Image Container - Floating Glassmorphism */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:ml-auto group perspective-1000">
            {/* Decorative offset background shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-200/40 to-emerald-100/40 rounded-[3rem] transform translate-x-4 translate-y-4 -rotate-3 transition-transform duration-700 group-hover:rotate-0 group-hover:translate-x-2 group-hover:translate-y-2 -z-10"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white p-6 shadow-2xl shadow-green-900/5 transition-transform duration-700 group-hover:-translate-y-2">
              <div className="bg-slate-50/50 rounded-[1.5rem] border border-slate-100 p-4">
                <Image
                  src={heroImage}
                  alt="Showcase of curated electronic and lifestyle products"
                  width={1200}
                  height={1200}
                  priority
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION - Modern Clean Cards */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Trending Reviews</h2>
              <p className="text-slate-500 font-medium text-lg">Latest insights and product breakdowns.</p>
            </div>
            <Link 
              href="/blog" 
              className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1.5 group transition-colors px-4 py-2 bg-green-50 rounded-full hover:bg-green-100"
            >
              View all articles 
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingBlogs.map(blog => (
              <article key={blog.blog_id} className="relative group h-full">
                <Link
                  href={`/blog/${blog.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if(loadingBlogId !== blog.blog_id) {
                      handleBlogNavigation(blog.slug, blog.blog_id);
                    }
                  }}
                  className={`block h-full bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 overflow-hidden flex flex-col transition-all duration-300 ${loadingBlogId === blog.blog_id ? 'pointer-events-none opacity-70' : ''}`}
                >
                  {blog.featured_image ? (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 p-2">
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <img
                          src={blog.featured_image}
                          alt={`Featured image for ${blog.title}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] bg-slate-50 flex items-center justify-center border-b border-slate-100">
                      <BookOpen className="text-slate-300 w-12 h-12" />
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {blog.summary}
                    </p>
                    
                    {blog.read_time && (
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {blog.read_time} min read
                        </span>
                      </div>
                    )}
                  </div>

                  {loadingBlogId === blog.blog_id && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                      <div className="w-8 h-8 border-4 border-slate-100 border-t-green-500 rounded-full animate-spin mb-3"></div>
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Glass Bento */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-slate-50/50 rounded-r-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 text-balance">
              Smarter shopping in 3 simple steps
            </h2>
            <p className="text-slate-500 text-lg">
              Skip the endless scrolling and fake reviews. We do the heavy lifting so you don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Browse Categories',
                desc: 'Explore meticulously sorted mobiles, gadgets, fashion & more.',
                icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
              },
              {
                title: 'Read Our Insights',
                desc: 'Gain clear, unbiased insights comparing the best products.',
                icon: <BookOpen className="w-6 h-6 text-green-600" />,
              },
              {
                title: 'Buy Confidently',
                desc: 'Get redirected immediately to trusted stores at the best prices.',
                icon: <CreditCard className="w-6 h-6 text-green-600" />,
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/40 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-green-100/50">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - Vibrant Card */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto relative group">
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
          
          <div className="relative bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl overflow-hidden">
            {/* Inner radiant gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 text-balance">
                Ready to find the right product?
              </h2>
              <p className="text-slate-300 mb-10 text-lg md:text-xl">
                Stop guessing and start comparing. Browse our curated collections today.
              </p>
              <Link
                href="/categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/categories');
                }}
                className="inline-flex justify-center items-center px-10 py-5 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/30 transition-all hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 active:scale-95 text-lg"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS & LOADERS */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md p-8 relative rounded-[2.5rem] shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-slate-500 font-medium text-sm">
                {isSignup
                  ? 'Join to save products and comparisons'
                  : 'Login to access your saved picks'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-2xl text-sm mb-6 text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 mt-4">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                />
              </div>
            </div>

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 mb-6"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-slate-500 font-medium">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button onClick={() => setIsSignup(false)} className="text-green-600 font-bold hover:text-green-700 transition-colors">
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <button onClick={() => setIsSignup(true)} className="text-green-600 font-bold hover:text-green-700 transition-colors">
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Global Page Loader */}
      {loading && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-slate-900 font-bold tracking-tight">Preparing...</p>
          </div>
        </div>
      )}

    </main>
  )
}

export default Hero
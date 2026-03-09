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
  X,
  Smartphone,
  Laptop,
  Shirt,
  Sofa,
  Monitor,
  Headphones,
  Camera,
  Gamepad2,
  Sparkles
} from 'lucide-react'

import heroImage from "@/assets/hero-image.png"

// --- Helper Data for Flipkart-style Category Strip ---
const CATEGORIES = [
  { name: 'For You', icon: Sparkles, active: true },
  { name: 'Fashion', icon: Shirt },
  { name: 'Mobiles', icon: Smartphone },
  { name: 'Electronics', icon: Laptop },
  { name: 'Home', icon: Sofa },
  { name: 'Appliances', icon: Monitor },
  { name: 'Audio', icon: Headphones },
  { name: 'Cameras', icon: Camera },
  { name: 'Gaming', icon: Gamepad2 },
]

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
    <main className="w-full min-h-screen bg-[#f1f2f4] text-slate-900 selection:bg-green-200 pb-10">
      
      {/* 1. FLIPKART STYLE CATEGORY STRIP */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex justify-between items-center overflow-x-auto hide-scrollbar gap-8 md:gap-4 px-2">
            {CATEGORIES.map((cat, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center gap-1.5 min-w-max cursor-pointer group pb-1 border-b-2 transition-colors ${cat.active ? 'border-green-600' : 'border-transparent hover:border-green-300'}`}
              >
                <div className={`p-2 rounded-full transition-colors ${cat.active ? 'bg-green-100 text-green-700' : 'bg-slate-50 text-slate-600 group-hover:bg-green-50'}`}>
                  <cat.icon size={22} strokeWidth={1.5} />
                </div>
                <span className={`text-sm font-semibold ${cat.active ? 'text-green-700' : 'text-slate-700'}`}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 mt-4 space-y-4">
        
        {/* 2. PROMOTIONAL BANNERS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Hero Banner (Takes up 8 columns) */}
          <div className="lg:col-span-8 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl overflow-hidden relative border border-green-200/60 shadow-sm flex flex-col md:flex-row items-center p-6 md:p-10 min-h-[340px]">
            {/* Background decors */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-300/20 blur-3xl rounded-full"></div>
            
            <div className="flex-1 z-10 space-y-4 mb-6 md:mb-0">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                ExpressDeal Unique
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Curated Picks <br/>
                <span className="text-green-700">From ₹999</span>
              </h1>
              <p className="text-slate-600 text-sm md:text-base max-w-sm">
                We analyze the best deals across multiple platforms to help you confidently choose anything you can buy online.
              </p>
              <div className="pt-2">
                <Link
                  href="/categories"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/categories');
                  }}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded shadow-md hover:bg-slate-800 transition-colors font-medium text-sm"
                >
                  Explore Deals <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            <div className="flex-1 relative z-10 w-full flex justify-center md:justify-end">
              <Image
                src={heroImage}
                alt="Showcase products"
                width={400}
                height={400}
                priority
                className="w-4/5 md:w-full max-w-[300px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Secondary Banners (Takes up 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="flex-1 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <h3 className="text-slate-500 font-bold text-sm tracking-widest uppercase mb-1">Samsung</h3>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Galaxy S25 FE</h2>
                <p className="text-green-600 font-bold text-xl mb-4">Just ₹54,999</p>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Read our review</span>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-slate-100 rounded-full group-hover:scale-110 transition-transform"></div>
              {/* Note: Placeholder for actual secondary image */}
              <Smartphone className="absolute right-4 bottom-4 w-20 h-20 text-slate-300 transform rotate-12" />
            </div>

            <div className="flex-1 bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <h3 className="text-slate-400 font-bold text-sm tracking-widest uppercase mb-1">Accessories</h3>
                <h2 className="text-2xl font-extrabold text-white mb-2">Premium Audio</h2>
                <p className="text-emerald-400 font-bold text-xl mb-4">Top 10 Picks</p>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Buying Guide</span>
              </div>
              <Headphones className="absolute right-4 bottom-4 w-24 h-24 text-slate-700 opacity-50 transform -rotate-12 group-hover:scale-110 transition-transform" />
            </div>

          </div>
        </section>

        {/* 3. SUGGESTED FOR YOU (TRENDING REVIEWS) */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Suggested For You</h2>
            <Link href="/blog" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm">
              <ArrowRightIcon size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingBlogs.map(blog => (
              <Link
                key={blog.blog_id}
                href={`/blog/${blog.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  if(loadingBlogId !== blog.blog_id) {
                    handleBlogNavigation(blog.slug, blog.blog_id);
                  }
                }}
                className={`group block border border-slate-100 rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden relative flex flex-col h-full bg-white ${loadingBlogId === blog.blog_id ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <div className="w-full aspect-square bg-slate-50 relative p-4 flex items-center justify-center">
                  {blog.featured_image ? (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <BookOpen className="text-slate-300 w-12 h-12" />
                  )}
                  {loadingBlogId === blog.blog_id && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                      <div className="w-6 h-6 border-2 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <div className="p-3 flex flex-col flex-grow border-t border-slate-50">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">
                    {blog.title}
                  </h3>
                  {blog.read_time && (
                    <p className="text-xs text-slate-500 mt-auto pt-2">
                      {blog.read_time} min read
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. HOW IT WORKS (Streamlined for e-commerce feel) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { title: 'Browse Categories', desc: 'Find carefully curated products.', icon: <ShoppingCart className="w-5 h-5 text-green-600" /> },
            { title: 'Read Our Insights', desc: 'Gain unbiased comparisons.', icon: <BookOpen className="w-5 h-5 text-green-600" /> },
            { title: 'Buy Confidently', desc: 'Redirect to trusted stores.', icon: <CreditCard className="w-5 h-5 text-green-600" /> },
          ].map(({ title, desc, icon }, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </section>

      </div>

      {/* MODALS & LOADERS */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm p-6 relative rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-slate-500 text-xs">
                {isSignup ? 'Join to save products and comparisons' : 'Login to access your saved picks'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded text-xs mb-4 text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full p-3 text-sm rounded border border-slate-300 text-slate-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-3 text-sm rounded border border-slate-300 text-slate-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-[#fb641b] text-white p-3 rounded font-bold shadow-sm hover:bg-[#f05a12] transition-colors mb-4 text-sm"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>

            <p className="text-xs text-center text-slate-500">
              {isSignup ? (
                <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-blue-600 font-bold hover:underline">Login</button></>
              ) : (
                <>New to ExpressDeal? <button onClick={() => setIsSignup(true)} className="text-blue-600 font-bold hover:underline">Create an account</button></>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Global Page Loader */}
      {loading && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-100 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-slate-700 text-sm font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Hide scrollbar styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  )
}

export default Hero
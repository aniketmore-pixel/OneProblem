'use client'

import { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getTrendingBlogs } from '@/lib/queries/blogs';
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import { ShoppingCart, BookOpen, CreditCard } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from "next/image";
import heroImage from "@/assets/hero-image.png"; // 1200x1200 image

const Hero = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState([]);

  const [showModal, setShowModal] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  const router = useRouter(); // add this if not already

  const handleNavigation = async (url) => {
    setLoading(true);           // show spinner
    await new Promise(r => setTimeout(r, 200)); // optional delay for UX
    router.push(url);           // navigate
  }


  // Load logged-in user
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
          .limit(6); // show top 6

        if (error) throw error;
        setAnnouncements(data || []);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };

    fetchAnnouncements();
  }, []);


  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      const blogs = await getTrendingBlogs();
      setTrendingBlogs(blogs);
    };

    fetchTrendingBlogs();
  }, []);


  // Fetch collections
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
    <div className="mx-6">
      <div className="max-w-7xl mx-auto my-16 px-4">
        <div className="bg-green-100 rounded-3xl p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: TEXT CONTENT */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 bg-green-200 text-green-700 pr-4 py-1 px-2 rounded-full text-xs sm:text-sm w-fit">
              <span className="bg-green-700 px-3 py-1 rounded-full text-white text-xs">
                CURATED
              </span>
              Handpicked products from trusted stores
              <ChevronRightIcon size={16} />
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent max-w-2xl">
              The best products — reviewed, compared, and curated for you.
            </h1>

            <p className="text-slate-700 text-lg max-w-xl">
              We analyze top products from Amazon, Flipkart, and more to help you
              make confident buying decisions.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => handleNavigation('/categories')}
                className="bg-slate-900 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
              >
                Explore Categories <ArrowRightIcon size={16} />
              </button>

            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            <Image
              src={heroImage}
              alt="Curated products"
              width={1200}
              height={1200}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Trending</h2>
          {/* <Link
      href="/blog"
      className="text-sm text-green-600 hover:underline font-medium"
    >
      View all →
    </Link> */}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingBlogs.map(blog => (
            <Link
              key={blog.blog_id}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-2xl p-6 border border-gray-650 transition"
            >
              {/* Image */}
              {blog.featured_image && (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600">
                {blog.title}
              </h3>

              {/* Summary */}
              <p className="text-sm text-gray-500">{blog.summary}</p>

              {/* Optional read time / CTA */}
              {blog.read_time && (
                <p className="text-xs text-gray-400 mt-1">
                  Read time: {blog.read_time} min
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>












      <section className="max-w-7xl mx-auto my-24 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          How it works
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Browse Categories',
              desc: 'Explore mobiles, gadgets, fashion & more',
              icon: <ShoppingCart className="w-10 h-10 text-green-600 mx-auto mb-4" />,
              bg: 'bg-green-50'
            },
            {
              title: 'Read Our Blogs',
              desc: 'Gain insights about the best products',
              icon: <BookOpen className="w-10 h-10 text-green-600 mx-auto mb-4" />,
              bg: 'bg-green-50'
            },
            {
              title: 'Buy Smart',
              desc: 'We will redirect you to trusted stores',
              icon: <CreditCard className="w-10 h-10 text-green-600 mx-auto mb-4" />,
              bg: 'bg-green-50'
            },
          ].map(({ title, desc, icon, bg }, i) => (
            <div
              key={i}
              className={`${bg} p-8 rounded-3xl border border-gray-400 transition-all`}
            >
              <div className="flex justify-center">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>




      {/* WHY TRUST US – TIMELINE */}
      <section className="max-w-7xl mx-auto my-28 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">
          Why trust our recommendations?
        </h2>

        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-20">
          Our process is simple, transparent, and repeatable — designed to put value
          ahead of hype.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-green-600/30 sm:-translate-x-1/2" />

          {[
            {
              title: "No Sponsored Rankings",
              desc: "Brands can’t pay for placement. Rankings are based purely on value and relevance.",
            },
            {
              title: "Data-Backed Comparisons",
              desc: "We compare specs, price history, and real-world performance before recommending.",
            },
            {
              title: "Regularly Updated Picks",
              desc: "As prices change and better products launch, our picks evolve too.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`relative flex flex-col sm:flex-row items-start gap-6 mb-16 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 size-4 bg-green-600 rounded-full sm:-translate-x-1/2 z-10" />

              {/* Card */}
              <div className="bg-white border rounded-xl p-6 sm:w-[45%] ml-12 sm:ml-0 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* POPULAR COMPARISONS
      <section className="bg-green-50 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Popular comparisons
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {['Best Phones Under ₹15,000', 'iQOO Z9 vs Moto G54', 'Best Laptops for Students'].map((title, i) => (
              <Link
                key={i}
                href="/compare"
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <h3 className="font-medium text-lg">{title}</h3>
                <p className="text-gray-500 text-xs mt-2">Compare now →</p>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto my-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find the right product — faster</h2>
        <p className="text-gray-600 mb-8">Browse curated collections or compare top products instantly.</p>
        <Link
          href="/categories"
          className="bg-slate-900 text-white px-10 py-4 rounded-lg hover:bg-slate-800 transition"
        >
          Start Exploring
        </Link>
      </section>

      {/* LOGIN / SIGNUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-2">
              {isSignup ? 'Create an account' : 'Welcome back'}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              {isSignup
                ? 'Join to save products and comparisons'
                : 'Login to access your saved picks'}
            </p>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full mb-3 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition mb-2"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-gray-600 mt-2">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-t-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}


    </div>
  )
}

export default Hero

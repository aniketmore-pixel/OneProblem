// 'use client'

// import { SupabaseClient } from '@supabase/supabase-js';
// import { useRouter } from 'next/navigation';

// import { supabase } from '@/lib/supabaseClient';
// import { getTrendingBlogs } from '@/lib/queries/blogs';
// import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
// import { ShoppingCart, BookOpen, CreditCard } from 'lucide-react'
// import React, { useEffect, useState } from 'react'

// import Link from 'next/link'
// import Image from "next/image";
// import heroImage from "@/assets/hero-image.png"; // 1200x1200 image

// const Hero = () => {
//   const [collections, setCollections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [announcements, setAnnouncements] = useState([]);
//   const [loadingBlogId, setLoadingBlogId] = useState(null)

//   const [showModal, setShowModal] = useState(false)
//   const [isSignup, setIsSignup] = useState(false)

//   const [trendingBlogs, setTrendingBlogs] = useState([]);

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [user, setUser] = useState(null)

//   const router = useRouter(); // add this if not already

//   const handleNavigation = async (url) => {
//     setLoading(true);           // show spinner
//     await new Promise(r => setTimeout(r, 200)); // optional delay for UX
//     router.push(url);           // navigate
//   }

//   const handleBlogNavigation = (slug, blogId) => {
//     setLoadingBlogId(blogId)
//     // optional UX delay for spinner
//     setTimeout(() => {
//       router.push(`/blog/${slug}`)
//     }, 100) // can be 100-300ms
//   }


//   // Load logged-in user
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'))
//     if (storedUser) setUser(storedUser)
//   }, [])

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('announcements')
//           .select('*')
//           .order('release_date', { ascending: true })
//           .limit(6); // show top 6

//         if (error) throw error;
//         setAnnouncements(data || []);
//       } catch (err) {
//         console.error('Error fetching announcements:', err);
//       }
//     };

//     fetchAnnouncements();
//   }, []);


//   useEffect(() => {
//     const fetchTrendingBlogs = async () => {
//       const blogs = await getTrendingBlogs();
//       setTrendingBlogs(blogs);
//     };

//     fetchTrendingBlogs();
//   }, []);


//   // Fetch collections
//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const res = await fetch('/api/store/collections')
//         const data = await res.json()
//         setCollections(Array.isArray(data.collections) ? data.collections : [])
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCollections()
//   }, [])

//   const handleLogin = async () => {
//     setError('')
//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     })
//     const data = await res.json()

//     if (!res.ok) {
//       setError(data.error || 'Invalid credentials')
//       return
//     }

//     localStorage.setItem('user', JSON.stringify(data))
//     setUser(data)
//     setShowModal(false)
//     setUsername('')
//     setPassword('')
//   }

//   const handleSignup = async () => {
//     setError('')
//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     })
//     const data = await res.json()

//     if (!res.ok) {
//       setError(data.error || 'Signup failed')
//       return
//     }

//     await handleLogin()
//     setIsSignup(false)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   return (
//     <div className="mx-6">
//       <div className="max-w-7xl mx-auto my-16 px-4">
//         <div className="bg-green-100 rounded-3xl p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//           {/* LEFT: TEXT CONTENT */}
//           <div className="flex flex-col gap-6">
//             <div className="inline-flex items-center gap-3 bg-green-200 text-green-700 pr-4 py-1 px-2 rounded-full text-xs sm:text-sm w-fit">
//               <span className="bg-green-700 px-3 py-1 rounded-full text-white text-xs">
//                 CURATED
//               </span>
//               Handpicked products from trusted stores
//               <ChevronRightIcon size={16} />
//             </div>

//             <h1 className="text-4xl sm:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent max-w-2xl">
//               The best products — reviewed, compared, and curated for you.
//             </h1>

//             <p className="text-slate-700 text-lg max-w-xl">
//               We analyze top products from Amazon, Flipkart, and more to help you
//               make confident buying decisions.
//             </p>

//             <div className="flex flex-wrap gap-4 mt-6">
//               <button
//                 onClick={() => handleNavigation('/categories')}
//                 className="bg-slate-900 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
//               >
//                 Explore Categories <ArrowRightIcon size={16} />
//               </button>

//             </div>
//           </div>

//           {/* RIGHT: IMAGE */}
//           <div className="relative w-full max-w-md mx-auto lg:max-w-none">
//             <Image
//               src={heroImage}
//               alt="Curated products"
//               width={1200}
//               height={1200}
//               priority
//               className="w-full h-auto object-contain"
//             />
//           </div>

//         </div>
//       </div>

//       <section className="max-w-7xl mx-auto py-12 px-4 relative">
//   <div className="flex items-center justify-between mb-6">
//     <h2 className="text-2xl font-semibold">Trending</h2>
//   </div>

//   <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//     {trendingBlogs.map(blog => (
//       <button
//         key={blog.blog_id}
//         onClick={() => handleBlogNavigation(blog.slug, blog.blog_id)}
//         className="group relative bg-white rounded-2xl p-6 border border-slate-900 transition text-left w-full"
//         disabled={loadingBlogId === blog.blog_id}
//       >
//         {/* Card content */}
//         {blog.featured_image && (
//           <img
//             src={blog.featured_image}
//             alt={blog.title}
//             className="w-full h-40 object-cover rounded-lg mb-4"
//           />
//         )}

//         <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600">
//           {blog.title}
//         </h3>

//         <p className="text-sm text-gray-500">
//           {loadingBlogId === blog.blog_id
//             ? 'Hold tight, redirecting you to the blog...'
//             : blog.summary}
//         </p>

//         {blog.read_time && (
//           <p className="text-xs text-gray-400 mt-1">
//             Read time: {blog.read_time} min
//           </p>
//         )}

//         {/* Card loader: styled exactly like CategoryClient */}
//         {loadingBlogId === blog.blog_id && (
//           <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-2xl">
//             <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mb-2"></div>
//             <span className="text-green-600 text-sm font-medium">
//               Hold tight, redirecting you to the blog...
//             </span>
//           </div>
//         )}
//       </button>
//     ))}
//   </div>
// </section>

      












//       <section className="max-w-7xl mx-auto my-24 text-center px-4">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-12">
//           How it works
//         </h2>

//         <div className="grid sm:grid-cols-3 gap-8">
//           {[
//             {
//               title: 'Browse Categories',
//               desc: 'Explore mobiles, gadgets, fashion & more',
//               icon: <ShoppingCart className="w-10 h-10 text-green-600 mx-auto mb-4" />,
//               bg: 'bg-green-50'
//             },
//             {
//               title: 'Read Our Blogs',
//               desc: 'Gain insights about the best products',
//               icon: <BookOpen className="w-10 h-10 text-green-600 mx-auto mb-4" />,
//               bg: 'bg-green-50'
//             },
//             {
//               title: 'Buy Smart',
//               desc: 'We will redirect you to trusted stores',
//               icon: <CreditCard className="w-10 h-10 text-green-600 mx-auto mb-4" />,
//               bg: 'bg-green-50'
//             },
//           ].map(({ title, desc, icon, bg }, i) => (
//             <div
//               key={i}
//               className={`${bg} p-8 rounded-3xl border border-gray-400 transition-all`}
//             >
//               <div className="flex justify-center">{icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{title}</h3>
//               <p className="text-gray-700">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>




//       {/* WHY TRUST US – TIMELINE */}
//       <section className="max-w-7xl mx-auto my-28 px-6">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">
//           Why trust our recommendations?
//         </h2>

//         <p className="text-slate-600 text-center max-w-2xl mx-auto mb-20">
//           Our process is simple, transparent, and repeatable — designed to put value
//           ahead of hype.
//         </p>

//         <div className="relative">
//           {/* Timeline line */}
//           <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-green-600/30 sm:-translate-x-1/2" />

//           {[
//             {
//               title: "No Sponsored Rankings",
//               desc: "Brands can’t pay for placement. Rankings are based purely on value and relevance.",
//             },
//             {
//               title: "Data-Backed Comparisons",
//               desc: "We compare specs, price history, and real-world performance before recommending.",
//             },
//             {
//               title: "Regularly Updated Picks",
//               desc: "As prices change and better products launch, our picks evolve too.",
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className={`relative flex flex-col sm:flex-row items-start gap-6 mb-16 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""
//                 }`}
//             >
//               {/* Dot */}
//               <div className="absolute left-4 sm:left-1/2 size-4 bg-green-600 rounded-full sm:-translate-x-1/2 z-10" />

//               {/* Card */}
//               <div className="bg-white border rounded-xl p-6 sm:w-[45%] ml-12 sm:ml-0 shadow-sm hover:shadow-md transition">
//                 <h3 className="font-semibold text-lg text-slate-800 mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-sm text-slate-600 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* POPULAR COMPARISONS
//       <section className="bg-green-50 py-24">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
//             Popular comparisons
//           </h2>

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {['Best Phones Under ₹15,000', 'iQOO Z9 vs Moto G54', 'Best Laptops for Students'].map((title, i) => (
//               <Link
//                 key={i}
//                 href="/compare"
//                 className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
//               >
//                 <h3 className="font-medium text-lg">{title}</h3>
//                 <p className="text-gray-500 text-xs mt-2">Compare now →</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* FINAL CTA */}
//       <section className="max-w-7xl mx-auto my-24 text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find the right product — faster</h2>
//         <p className="text-gray-600 mb-8">Browse curated collections or compare top products instantly.</p>
//         <Link
//           href="/categories"
//           className="bg-slate-900 text-white px-10 py-4 rounded-lg hover:bg-slate-800 transition"
//         >
//           Start Exploring
//         </Link>
//       </section>

//       {/* LOGIN / SIGNUP MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
//             >
//               ✕
//             </button>

//             <h3 className="text-2xl font-bold mb-2">
//               {isSignup ? 'Create an account' : 'Welcome back'}
//             </h3>
//             <p className="text-gray-500 mb-6 text-sm">
//               {isSignup
//                 ? 'Join to save products and comparisons'
//                 : 'Login to access your saved picks'}
//             </p>

//             {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//             <input
//               placeholder="Username"
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               className="w-full mb-3 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
//             />

//             <button
//               onClick={isSignup ? handleSignup : handleLogin}
//               className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition mb-2"
//             >
//               {isSignup ? 'Sign Up' : 'Sign In'}
//             </button>

//             <p className="text-sm text-center text-gray-600 mt-2">
//               {isSignup ? (
//                 <>
//                   Already have an account?{' '}
//                   <button
//                     onClick={() => setIsSignup(false)}
//                     className="text-green-600 font-medium hover:underline"
//                   >
//                     Login
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Don’t have an account?{' '}
//                   <button
//                     onClick={() => setIsSignup(true)}
//                     className="text-green-600 font-medium hover:underline"
//                   >
//                     Sign up
//                   </button>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-12 h-12 border-4 border-t-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-white text-lg font-medium">Loading...</p>
//           </div>
//         </div>
//       )}


//     </div>
//   )
// }

// export default Hero


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

import heroImage from "@/assets/hero-image.png" // 1200x1200 image

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

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)
  }, [])

  // Fetch announcements
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

  // Fetch trending blogs
  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      const blogs = await getTrendingBlogs()
      setTrendingBlogs(blogs)
    }
    fetchTrendingBlogs()
  }, [])

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

  // Auth Handlers
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
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-green-400/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 z-10">
            
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 pr-3 pl-1 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm transition-transform hover:scale-105 cursor-default">
              <span className="bg-green-600 px-3 py-1 rounded-full text-white tracking-wide">
                NEW
              </span>
              Curated picks from trusted stores
              <ChevronRightIcon size={14} className="text-slate-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance text-slate-900 leading-[1.15]">
              The best products — <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                reviewed & curated
              </span> for you.
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl text-balance leading-relaxed">
              We analyze top products from Amazon, Flipkart, and more to help you
              make confident buying decisions without the clutter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              {/* Using Link for SEO, but keeping custom navigation logic */}
              <Link
                href="/categories"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/categories');
                }}
                className="group inline-flex justify-center items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Explore Categories 
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              {!user && (
                <button
                  onClick={() => { setIsSignup(true); setShowModal(true); }}
                  className="inline-flex justify-center items-center px-8 py-4 rounded-xl font-semibold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  Create Free Account
                </button>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:ml-auto xl:scale-105 z-10">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-green-100 to-slate-100 p-8 shadow-2xl border border-white/50 backdrop-blur-sm">
              <Image
                src={heroImage}
                alt="Showcase of curated electronic and lifestyle products"
                width={1200}
                height={1200}
                priority
                className="w-full h-auto object-contain drop-shadow-xl transform transition-transform hover:scale-[1.02] duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-16 bg-white border-y border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Reviews</h2>
              <p className="text-slate-500 mt-2">Latest insights and product breakdowns.</p>
            </div>
            <Link 
              href="/blog" 
              className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 group"
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
                  className={`block h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${loadingBlogId === blog.blog_id ? 'pointer-events-none opacity-90' : ''}`}
                >
                  {blog.featured_image ? (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={blog.featured_image}
                        alt={`Featured image for ${blog.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] bg-slate-100 flex items-center justify-center">
                      <BookOpen className="text-slate-300 w-12 h-12" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                      {blog.summary}
                    </p>
                    
                    {blog.read_time && (
                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {blog.read_time} min read
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Loading Overlay */}
                  {loadingBlogId === blog.blog_id && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-3 shadow-lg"></div>
                      <span className="text-green-700 text-sm font-semibold animate-pulse">
                        Loading article...
                      </span>
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Smarter shopping in three steps
          </h2>
          <p className="text-slate-600 text-lg">
            Skip the endless scrolling and fake reviews. We do the heavy lifting so you don't have to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Decorative connector line behind cards (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-green-100 via-green-300 to-green-100 -translate-y-1/2 z-0"></div>

          {[
            {
              title: 'Browse Categories',
              desc: 'Explore meticulously sorted mobiles, gadgets, fashion & more.',
              icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
            },
            {
              title: 'Read Our Insights',
              desc: 'Gain clear, unbiased insights comparing the best products.',
              icon: <BookOpen className="w-8 h-8 text-green-600" />,
            },
            {
              title: 'Buy with Confidence',
              desc: 'Get redirected immediately to trusted stores at the best prices.',
              icon: <CreditCard className="w-8 h-8 text-green-600" />,
            },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative z-10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-green-100">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Why trust our recommendations?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our process is transparent and repeatable — designed entirely around providing value, not chasing hype.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No Sponsored Bias",
                desc: "Brands cannot pay for placement. Rankings are 100% based on value and relevance.",
              },
              {
                title: "Data-Backed",
                desc: "We analyze specs, historical pricing, and real-world benchmarks before recommending.",
              },
              {
                title: "Always Up-to-Date",
                desc: "As prices fluctuate and better alternatives launch, our top picks evolve instantly.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="font-bold text-xl text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-emerald-100 rounded-[2.5rem] p-10 md:p-16 text-center border border-green-200 shadow-lg relative overflow-hidden">
          {/* Decorative blur elements */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/40 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-300/30 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Ready to find the right product?
            </h2>
            <p className="text-slate-600 mb-10 text-lg md:text-xl max-w-xl mx-auto">
              Stop guessing and start comparing. Browse our curated collections today.
            </p>
            <Link
              href="/categories"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/categories');
              }}
              className="inline-flex justify-center items-center px-10 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-lg"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </section>

      {/* MODALS & LOADERS */}

      {/* Login / Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {isSignup ? 'Create an account' : 'Welcome back'}
              </h3>
              <p className="text-slate-500 text-sm">
                {isSignup
                  ? 'Join to save products and comparisons'
                  : 'Login to access your saved picks'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Username</label>
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                />
              </div>
            </div>

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] mb-6"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-slate-600">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-green-600 font-bold hover:text-green-700 transition-colors"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-green-600 font-bold hover:text-green-700 transition-colors"
                  >
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
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-slate-800 text-sm font-bold tracking-wide">Preparing...</p>
          </div>
        </div>
      )}

    </main>
  )
}

export default Hero
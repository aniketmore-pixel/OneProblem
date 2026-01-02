// 'use client'
// import { ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Image from 'next/image'
// import logo from '@/assets/expressdeal.png'
// import { Search, Star } from "lucide-react";

// const Navbar = () => {

//     const router = useRouter();

//     const [search, setSearch] = useState('');

//     const [results, setResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const cartCount = useSelector(state => state.cart.total)

//     useEffect(() => {
//         if (!search) {
//             setResults([]);
//             setShowDropdown(false);
//             return;
//         }

//         const fetchResults = async () => {
//             try {
//                 const res = await fetch(`/api/blogs/search?q=${encodeURIComponent(search)}`);
//                 const data = await res.json();
//                 setResults(data);
//                 setShowDropdown(true);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         // Debounce to avoid too many requests
//         const timer = setTimeout(fetchResults, 200);
//         return () => clearTimeout(timer);
//     }, [search]);


//     // Inside Navbar.jsx
//     const handleSearch = (e) => {
//         e.preventDefault(); // prevent native form submit
//         if (!search.trim()) return;
//         router.push(`/blog/search?query=${encodeURIComponent(search.trim())}`);
//         setShowDropdown(false);
//     };


//     return (
//         <nav className="relative bg-white">
//             <div className="mx-6">
//                 <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

//                     <Link href="/" className="relative inline-block">
//                         {/* Logo Image */}
//                         <Image
//                             src={logo}// replace with your logo path
//                             alt="GoCart Logo"
//                             width={85}    // adjust width as needed
//                             height={55}    // adjust height as needed
//                             className="object-contain"
//                         />
//                     </Link>

//                     {/* Desktop Menu */}
//                     <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
//                         <Link href="/">Home</Link>
//                         <Link href="/categories">Categories</Link>
//                         <Link href="/about">About</Link>
//                         <Link href="/contact">Contact</Link>

//                         <form
//                             onSubmit={handleSearch}
//                             className="relative xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
//                         >
//                             <Search size={18} className="text-slate-600" />
//                             <input
//                                 type="text"
//                                 placeholder="Search blogs..."
//                                 className="w-full bg-transparent outline-none placeholder-slate-600"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 onFocus={() => search && setShowDropdown(true)}
//                             />

//                             {/* Dropdown */}
//                             {showDropdown && results.length > 0 && (
//                                 <ul className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-50">
//                                     {results.map((blog) => (
//                                         <li key={blog.blog_id}>
//                                             <Link
//                                                 href={`/blog/${blog.slug}`}
//                                                 className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
//                                                 onClick={() => setShowDropdown(false)}
//                                             >
//                                                 {blog.featured_image && (
//                                                     <img
//                                                         src={blog.featured_image}
//                                                         alt={blog.title}
//                                                         className="w-10 h-10 object-cover rounded"
//                                                     />
//                                                 )}
//                                                 <span className="truncate">{blog.title}</span>
//                                             </Link>
//                                         </li>
//                                     ))}

//                                     {/* Enter hint */}
//                                     <li className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
//                                         Press <kbd className="bg-gray-100 px-1 rounded">Enter</kbd> to see all results
//                                     </li>
//                                 </ul>
//                             )}

//                         </form>

//                         <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
//                             <Star size={18} />
//                             Bookmarks
//                             <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
//                         </Link>

//                         <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
//                             Login
//                         </button>

//                     </div>

//                     {/* Mobile User Button  */}
//                     <div className="sm:hidden">
//                         <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <hr className="border-gray-300" />
//         </nav>
//     )
// }

// export default Navbar

// 'use client'
// import { ShoppingCart, Star } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Image from 'next/image'
// import LanguageToggle from '@/components/LanguageToggle'
// import logo from '@/assets/expressdeal.png'

// const Navbar = () => {
//     const router = useRouter();

//     const [search, setSearch] = useState('');
//     const [results, setResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     const cartCount = useSelector(state => state.cart.total);

//     // Login modal & user state
//     const [showModal, setShowModal] = useState(false);
//     const [isSignup, setIsSignup] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [user, setUser] = useState(null);

//     // Load logged-in user
//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         if (storedUser) setUser(storedUser);
//     }, []);

//     // Search effect
//     useEffect(() => {
//         if (!search) {
//             setResults([]);
//             setShowDropdown(false);
//             return;
//         }

//         const fetchResults = async () => {
//             try {
//                 const res = await fetch(`/api/blogs/search?q=${encodeURIComponent(search)}`);
//                 const data = await res.json();
//                 setResults(data);
//                 setShowDropdown(true);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         const timer = setTimeout(fetchResults, 200);
//         return () => clearTimeout(timer);
//     }, [search]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (!search.trim()) return;
//         router.push(`/blog/search?query=${encodeURIComponent(search.trim())}`);
//         setShowDropdown(false);
//     };

//     // Login / Signup handlers (same as Hero.jsx)
//     const handleLogin = async () => {
//         setError('');
//         const res = await fetch('/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await res.json();

//         if (!res.ok) {
//             setError(data.error || 'Invalid credentials');
//             return;
//         }

//         localStorage.setItem('user', JSON.stringify(data));
//         setUser(data);
//         setShowModal(false);
//         setUsername('');
//         setPassword('');
//     };

//     const handleSignup = async () => {
//         setError('');
//         const res = await fetch('/api/auth/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await res.json();

//         if (!res.ok) {
//             setError(data.error || 'Signup failed');
//             return;
//         }

//         await handleLogin();
//         setIsSignup(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         setUser(null);
//     };

//     return (
//         <nav className="relative bg-white">
//             <div className="mx-6">
//                 <div className="flex items-center justify-between max-w-7xl mx-auto py-1 transition-all">
//                     <Link href="/" className="relative inline-block">
//                         <Image
//                             src={logo}
//                             alt="GoCart Logo"
//                             width={85}
//                             height={55}
//                             className="object-contain"
//                         />
//                     </Link>

//                     {/* Desktop Menu */}
//                     <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
//                         <Link href="/">Home</Link>
//                         <Link href="/categories">Categories</Link>
//                         <Link href="/about">About</Link>
//                         <Link href="/contact">Contact</Link>

//                         {/* Search */}
//                         <form
//                             onSubmit={handleSearch}
//                             className="relative xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
//                         >
//                             <input
//                                 type="text"
//                                 placeholder="Search blogs..."
//                                 className="w-full bg-transparent outline-none placeholder-slate-600"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 onFocus={() => search && setShowDropdown(true)}
//                             />

//                             {showDropdown && results.length > 0 && (
//                                 <ul className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-50">
//                                     {results.map(blog => (
//                                         <li key={blog.blog_id}>
//                                             <Link
//                                                 href={`/blog/${blog.slug}`}
//                                                 className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
//                                                 onClick={() => setShowDropdown(false)}
//                                             >
//                                                 {blog.featured_image && (
//                                                     <img
//                                                         src={blog.featured_image}
//                                                         alt={blog.title}
//                                                         className="w-10 h-10 object-cover rounded"
//                                                     />
//                                                 )}
//                                                 <span className="truncate">{blog.title}</span>
//                                             </Link>
//                                         </li>
//                                     ))}
//                                     <li className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
//                                         Press <kbd className="bg-gray-100 px-1 rounded">Enter</kbd> to see all results
//                                     </li>
//                                 </ul>
//                             )}
//                         </form>

//                         {/* Bookmarks */}
//                         <Link href="/bookmarks" className="relative flex items-center gap-2 text-slate-600">
//                             <Star size={18} />
//                             Bookmarks

//                         </Link>

//                         <LanguageToggle />

//                         {/* Login / Logout */}
//                         {!user ? (
//                             <button
//                                 onClick={() => {
//                                     setIsSignup(false);
//                                     setShowModal(true);
//                                 }}
//                                 className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
//                             >
//                                 Login
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={handleLogout}
//                                 className="px-8 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full"
//                             >
//                                 Logout
//                             </button>
//                         )}
//                     </div>

//                     {/* Mobile User Button  */}
//                     <div className="sm:hidden">
//                         <button
//                             onClick={() => {
//                                 setIsSignup(false);
//                                 setShowModal(true);
//                             }}
//                             className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <hr className="border-gray-300" />

//             {/* LOGIN / SIGNUP MODAL */}
//             {showModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//                     <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-lg animate-fadeIn">
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
//                         >
//                             ✕
//                         </button>

//                         <h3 className="text-2xl font-bold mb-2">
//                             {isSignup ? 'Create an account' : 'Welcome back'}
//                         </h3>
//                         <p className="text-gray-500 mb-6 text-sm">
//                             {isSignup
//                                 ? 'Join to save products and comparisons'
//                                 : 'Login to access your saved picks'}
//                         </p>

//                         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//                         <input
//                             placeholder="Username"
//                             value={username}
//                             onChange={e => setUsername(e.target.value)}
//                             className="w-full mb-3 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
//                         />

//                         <button
//                             onClick={isSignup ? handleSignup : handleLogin}
//                             className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition mb-2"
//                         >
//                             {isSignup ? 'Sign Up' : 'Sign In'}
//                         </button>

//                         <p className="text-sm text-center text-gray-600 mt-2">
//                             {isSignup ? (
//                                 <>
//                                     Already have an account?{' '}
//                                     <button
//                                         onClick={() => setIsSignup(false)}
//                                         className="text-green-600 font-medium hover:underline"
//                                     >
//                                         Login
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     Don’t have an account?{' '}
//                                     <button
//                                         onClick={() => setIsSignup(true)}
//                                         className="text-green-600 font-medium hover:underline"
//                                     >
//                                         Sign up
//                                     </button>
//                                 </>
//                             )}
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;








'use client'
import { ShoppingCart, Star, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from 'next/image'
import LanguageToggle from '@/components/LanguageToggle'
import logo from '@/assets/expressdeal.png'

const Navbar = () => {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cartCount = useSelector(state => state.cart.total);

    // Login modal & user state
    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    // Load logged-in user
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
    }, []);

    // Search effect
    useEffect(() => {
        if (!search) {
            setResults([]);
            setShowDropdown(false);
            return;
        }
    
        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/blogs/search?q=${encodeURIComponent(search)}`);
                const json = await res.json();
                setResults(json.data || []);
                setShowDropdown(json.data?.length > 0); // hide if empty
            } catch (err) {
                console.error(err);
                setResults([]);
                setShowDropdown(false);
            }
        };
    
        const timer = setTimeout(fetchResults, 200);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.search-dropdown') && !e.target.closest('input')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/blog/search?query=${encodeURIComponent(search.trim())}`);
        setShowDropdown(false);
        setMobileMenuOpen(false);
    };

    const handleLogin = async () => {
        setError('');
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.error || 'Invalid credentials');
            return;
        }

        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setShowModal(false);
        setUsername('');
        setPassword('');
    };

    const handleSignup = async () => {
        setError('');
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.error || 'Signup failed');
            return;
        }

        await handleLogin();
        setIsSignup(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-2">
                    {/* Logo */}
                    <Link href="/" className="relative inline-block">
                        <Image
                            src={logo}
                            alt="ExpressDeal Logo"
                            width={85}
                            height={55}
                            className="object-contain"
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/categories">Categories</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="relative flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
                        >
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => search && setShowDropdown(true)}
                            />

                            {showDropdown && results.length > 0 && (
                                <ul className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-50">
                                    {results.map(blog => (
                                        <li key={blog.blog_id}>
                                            <Link
                                                href={`/blog/${blog.slug}`}
                                                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                {blog.featured_image && (
                                                    <img
                                                        src={blog.featured_image}
                                                        alt={blog.title}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                )}
                                                <span className="truncate">{blog.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>

                        <Link href="/bookmarks" className="flex items-center gap-2">
                            <Star size={18} />
                            Bookmarks
                        </Link>

                        <LanguageToggle />

                        {!user ? (
                            <button
                                onClick={() => {
                                    setIsSignup(false);
                                    setShowModal(true);
                                }}
                                className="px-8 py-2 bg-slate-900 hover:bg-green-600 text-white rounded-full"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="sm:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t bg-white px-6 py-6 space-y-6">

                    {/* Nav Links */}
                    <div className="flex flex-col divide-y text-slate-700">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/categories', label: 'Categories' },
                            { href: '/about', label: 'About' },
                            { href: '/contact', label: 'Contact' },
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-3 text-base font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Search */}
                    <form
                        onSubmit={handleSearch}
                        className="relative"
                    >
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="w-full bg-slate-100 px-4 py-3 rounded-full outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => search && setShowDropdown(true)}
                        />

                        {/* SEARCH DROPDOWN (MOBILE FIX) */}
                        {showDropdown && results.length > 0 && (
                            <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
                                {results.map(blog => (
                                    <li key={blog.blog_id}>
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                            onClick={() => {
                                                setShowDropdown(false);
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            {blog.featured_image && (
                                                <img
                                                    src={blog.featured_image}
                                                    alt={blog.title}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                            <span className="text-sm truncate">{blog.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>

                    {/* Bookmarks */}
                    <Link
                        href="/bookmarks"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-3 text-base font-medium text-slate-700"
                    >
                        <Star size={18} />
                        Bookmarks
                    </Link>

                    {/* Language */}
                    <div className="pt-2">
                        <LanguageToggle />
                    </div>

                    {/* Auth */}
                    {!user ? (
                        <button
                            onClick={() => {
                                setIsSignup(false);
                                setShowModal(true);
                                setMobileMenuOpen(false);
                            }}
                            className="w-full py-3 bg-slate-900 text-white rounded-full text-base font-medium"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-red-500 text-white rounded-full text-base font-medium"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}


            {/* <hr className="border-gray-300" /> */}

            {/* LOGIN / SIGNUP MODAL (UNCHANGED) */}
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
          ? 'Join to save deals and recommendations'
          : 'Login to access your saved picks'}
      </p>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
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

        </nav>
    );
};

export default Navbar;

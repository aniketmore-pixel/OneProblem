// "use client"

// import React, { useState, useEffect } from "react" 
// import Link from "next/link"
// import { ArrowLeft } from "lucide-react"

// const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

// export default function AdminDashboard() {
//   const [username, setUsername] = React.useState(null)

//   React.useEffect(() => {
//     console.log("Reading user from localStorage for Admin Dashboard...")
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser)
//         if (parsed.user?.username) {
//           setUsername(parsed.user.username)
//         }
//       } catch (err) {
//         console.error("Error parsing user:", err)
//       }
//     }
//   }, [])

//   if (!username) return <p className="text-gray-500 p-10">Loading user...</p>
//   if (username !== ADMIN_USER) return <p className="text-red-500 p-10">Access Denied</p>

//   return (
//     <main className="max-w-4xl mx-auto px-6 py-20">
//       <h1 className="text-4xl font-bold text-green-600 mb-6">Admin Dashboard</h1>
//       <p className="text-gray-600 mb-10">Welcome, {username}. Manage your platform here.</p>

//       <div className="flex gap-4">
//         <Link
//           href="/admin/categories"
//           className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
//         >
//           Manage Categories
//         </Link>
//         <Link
//           href="/admin/blogs"
//           className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
//         >
//           Manage Blogs
//         </Link>
//       </div>
//     </main>
//   )
// }



"use client"

import React, { useState, useEffect } from "react" 
import Link from "next/link"
import { useRouter } from "next/navigation" // 👈 for redirect
import { ArrowLeft } from "lucide-react"

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER

export default function AdminDashboard() {
  const [username, setUsername] = useState(null)
  const router = useRouter() // 👈 Next.js router

  useEffect(() => {
    console.log("Reading user from localStorage for Admin Dashboard...")
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed.user?.username) {
          setUsername(parsed.user.username)
        } else {
          router.replace("/") // redirect if no username
        }
      } catch (err) {
        console.error("Error parsing user:", err)
        router.replace("/") // redirect on error
      }
    } else {
      router.replace("/") // redirect if nothing in localStorage
    }
  }, [router])

  // Redirect non-admins
  useEffect(() => {
    if (username && username !== ADMIN_USER) {
      router.replace("/")
    }
  }, [username, router])

  if (!username) return <p className="text-gray-500 p-10">Loading user...</p>

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-10">Welcome, {username}. Manage your platform here.</p>

      <div className="flex gap-4">
        <Link
          href="/admin/categories"
          className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/blogs"
          className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Manage Blogs
        </Link>
      </div>
    </main>
  )
}

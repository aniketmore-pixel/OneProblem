// app/admin/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Load environment variables (you already have these in lib/supabase)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // e.g., set in .env.local

export default async function AdminDashboard() {
  if (!ADMIN_EMAIL) {
    return <p className="text-red-500 p-10">Admin email not configured</p>;
  }

  // Fetch all users using Service Role Key
  const { data: users, error } = await supabase.auth.admin.listUsers();

  if (error) return <p className="text-red-500 p-10">Error fetching users: {error.message}</p>;

  // Find the admin user by email from env
  const user = users.find(u => u.email === ADMIN_EMAIL);

  if (!user || user.user_metadata.role !== "admin") {
    return <p className="text-red-500 p-10">Access Denied</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline mb-10"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <h1 className="text-4xl font-bold text-green-600 mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Welcome, {user.email}. Manage categories and blogs from here.
      </p>

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
  );
}

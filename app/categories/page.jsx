import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCategories } from '@/lib/queries/categories'
import CategoriesClient from './CategoriesClient'

export const metadata = {
  title: 'Categories | ExpressDeal',
  description: 'Browse blogs by category',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-20">

      {/* BACK BUTTON */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline mb-10"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      {/* HEADER */}
      <div className="max-w-3xl mb-14">
        <span className="text-sm font-semibold text-green-600 tracking-wide">
          CATEGORIES
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-3">
          Browse by{' '}
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            category
          </span>
        </h1>

        <div className="h-1 w-20 bg-green-600 rounded-full mt-6" />
      </div>

      {/* CLIENT SEARCH + GRID */}
      <CategoriesClient categories={categories} />
    </section>
  )
}

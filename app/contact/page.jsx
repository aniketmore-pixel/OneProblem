import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, User } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | Smart Product Recommendations',
  description:
    'Have questions, feedback, or suggestions? Get in touch with us and we’ll get back to you soon.',
}

export default function ContactPage() {
  return (
    <main className="relative max-w-7xl mx-auto px-4 py-20">

      {/* BACK BUTTON */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline mb-10"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      {/* HERO */}
      <section className="max-w-3xl mb-24">
        <span className="text-sm font-semibold text-green-600 tracking-wide">
          CONTACT US
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-3 mb-6">
          Let’s talk about{' '}
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            better buying
          </span>
          .
        </h1>

        <p className="text-lg text-gray-600">
          Have a question, feedback, or a product you want us to review?
          Drop us a message — we’d love to hear from you.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="grid lg:grid-cols-2 gap-16 mb-28">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
          <div className="h-1 w-20 bg-green-600 rounded-full mb-8" />

          <p className="text-gray-600 mb-10 max-w-md">
            Whether it’s a suggestion, partnership inquiry, or feedback —
            we read every message carefully.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="text-green-600 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600 text-sm">
                  expressdealhelp@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageSquare className="text-green-600 mt-1" />
              <div>
                <p className="font-medium">Response time</p>
                <p className="text-gray-600 text-sm">
                  Usually within 24–48 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border-l-4 border-green-500">
          <h3 className="text-2xl font-semibold mb-6">
            Send us a message
          </h3>

          <form
            action="https://formspree.io/f/xdakeqyr"
            method="POST"
            className="space-y-5"
          >
            {/* Optional email subject */}
            <input
              type="hidden"
              name="_subject"
              value="New Contact Message — ExpressDeal"
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Your name
              </label>
              <div className="relative mt-1">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what’s on your mind…"
                className="w-full mt-1 p-4 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-green-50 rounded-3xl p-14">
        <h3 className="text-2xl font-bold mb-4">
          Want buying advice right now?
        </h3>
        <p className="text-gray-700 mb-8">
          Browse our expert blogs and curated product picks.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/categories"
            className="px-7 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Browse Categories
          </Link>

          <Link
            href="/blog"
            className="px-7 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
          >
            Read Blogs
          </Link>
        </div>
      </section>

    </main>
  )
}

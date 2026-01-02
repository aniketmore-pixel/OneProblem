import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'

export const metadata = {
    title: 'About Us | Smart Product Recommendations',
    description:
        'Learn how we help you discover the best products through unbiased reviews, comparisons, and expert insights.',
}

export default function AboutPage() {
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
                    ABOUT US
                </span>

                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-3 mb-6">
                    Helping you buy{' '}
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        smarter
                    </span>
                    , not harder.
                </h1>

                <p className="text-lg text-gray-600">
                    We analyze products, compare features, and publish honest insights so
                    you can make confident buying decisions — without wasting hours
                    researching.
                </p>
            </section>

            {/* WHAT WE DO */}
            <section className="grid md:grid-cols-3 gap-10 mb-28">
                {[
                    {
                        title: 'Curated Picks',
                        desc:
                            'Handpicked products across mobiles, laptops, audio, and more — only what actually matters.',
                    },
                    {
                        title: 'In-depth Blogs',
                        desc:
                            'Clear, no-BS blogs explaining specs, real-world usage, and buying advice.',
                    },
                    {
                        title: 'Smart Comparisons',
                        desc:
                            'Side-by-side comparisons so you instantly know which product fits your needs.',
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="relative bg-white p-8 rounded-3xl shadow hover:shadow-xl transition border-l-4 border-green-500"
                    >
                        <h3 className="text-xl font-semibold mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </section>

            {/* WHY TRUST US */}
            <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 mb-28">
                <h2 className="text-3xl font-bold mb-8">
                    Why trust us?
                </h2>

                <ul className="space-y-5 text-gray-700">
                    {[
                        'No paid rankings or sponsored placements',
                        'Data-backed comparisons and research',
                        'Regularly updated recommendations',
                        'Built for real buyers, not advertisers',
                    ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="text-green-600 font-bold">✔</span>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* MISSION */}
            <section className="max-w-3xl mb-28">
                <h2 className="text-3xl font-bold mb-4">
                    Our mission
                </h2>

                <div className="h-1 w-20 bg-green-600 rounded-full mb-6" />

                <p className="text-gray-600 leading-relaxed">
                    Online shopping should be simple and transparent. Our mission is to
                    cut through marketing noise and help you choose products based on what
                    actually matters — performance, value, and reliability.
                </p>

                {/* <p className="mt-8 flex items-center gap-3 text-base sm:text-lg text-gray-700 bg-gray-50 px-6 py-4 rounded-xl">
  <MapPin size={18} className="text-green-600 shrink-0" />
  <span>
    <span className="font-semibold text-gray-900">ExpressDeal</span> was founded in{' '}
    <span className="font-medium">2025</span> by{' '}
    <span className="font-semibold text-gray-900">Satvik More</span> and{' '}
    <span className="font-semibold text-gray-900">Aniket More</span> in{' '}
    <span className="font-medium">Mumbai, Maharashtra, India</span>.
  </span>

  

</p>

<p className="mt-8 flex items-center gap-3 text-base sm:text-lg text-gray-700 bg-gray-50 px-6 py-4 rounded-xl">
  <MapPin size={18} className="text-green-600 shrink-0" />
<span>
  <span className="font-semibold text-gray-900">एक्सप्रेसडील</span> ची स्थापना{' '}
  <span className="font-medium">2025</span> मध्ये{' '}
  <span className="font-semibold text-gray-900">सत्विक मोरे</span> आणि{' '}
  <span className="font-semibold text-gray-900">अनिकेत मोरे</span> यांनी{' '}
  <span className="font-medium">मुंबई, महाराष्ट्र, भारत</span> येथे केली.
</span>


</p> */}


            </section>

            {/* CTA */}
            <section className="text-center bg-green-600 rounded-3xl p-14 text-white">
                <h3 className="text-3xl font-bold mb-4">
                    Ready to find your next product?
                </h3>
                <p className="text-green-100 mb-8">
                    Explore curated collections, read expert blogs, or compare top
                    products instantly.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                        href="/categories"
                        className="px-7 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition"
                    >
                        Browse Categories
                    </Link>

                    <Link
                        href="/"
                        className="px-7 py-3 border border-white rounded-lg hover:bg-white/10 transition"
                    >
                        Read Blogs
                    </Link>


                </div>
            </section>
        </main>
    )
}

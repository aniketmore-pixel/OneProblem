    'use client'

export default function AffiliateLinks({ blog }) {
  const links = [
    { title: blog.affiliate_1_title, url: blog.affiliate_1_url },
    { title: blog.affiliate_2_title, url: blog.affiliate_2_url },
    { title: blog.affiliate_3_title, url: blog.affiliate_3_url },
    { title: blog.affiliate_4_title, url: blog.affiliate_4_url },
    { title: blog.affiliate_5_title, url: blog.affiliate_5_url },
  ].filter(link => link.title && link.url)

  if (links.length === 0) return null

  return (
    <div className="my-16 rounded-2xl border bg-gray-50 p-6">
      <h3 className="text-lg font-semibold mb-4">
        🔗 Where to buy
      </h3>

      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="px-5 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            {link.title}
          </a>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Some links may be affiliate links. We may earn a small commission at no extra cost to you.
      </p>
    </div>
  )
}

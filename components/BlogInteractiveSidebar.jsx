'use client'
import { useState, useEffect } from 'react'

export default function BlogInteractiveSidebar({ content }) {
  const [toc, setToc] = useState([])

  useEffect(() => {
    if (!content?.blocks) return
    const headings = content.blocks
      .filter(b => b.type === 'heading' && b.data?.text)
      .map((b, i) => ({ id: `heading-${i}`, text: b.data.text }))
    setToc(headings)
  }, [content])

  return (
    <aside className="sticky top-20 hidden lg:block w-64 ml-12">
      <div className="p-4 bg-gray-50 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Contents</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {toc.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="hover:text-green-600">{item.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

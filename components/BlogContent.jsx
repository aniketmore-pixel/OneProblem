// 'use client'

// import React from 'react'
// import ReactMarkdown from 'react-markdown'

// export default function BlogContent({ content }) {
//   // Case 1: Old Markdown string content
//   if (typeof content === 'string') {
//     return <ReactMarkdown>{content}</ReactMarkdown>
//   }

//   // Case 2: New JSON structure with blocks
//   if (content?.blocks && Array.isArray(content.blocks)) {
//     return (
//       <>
//         {content.blocks.map((block, i) => {
//           if (!block || !block.type) return null

//           // Ensure text blocks have text, and image blocks have a URL
//           if (block.type === 'image' && !block.url?.trim()) return null
//           if (block.type !== 'image' && !block.text?.trim()) return null

//           switch (block.type) {
//             case 'heading': {
//               // Generate id for heading (for TOC) *only* if it's a heading
//               const id = block.text
//                 .toLowerCase()
//                 .replace(/\s+/g, '-')
//                 .replace(/[^\w-]/g, '')

//               const Tag = `h${block.level || 2}` // default to h2 if level missing
//               return (
//                 <Tag
//                   key={i}
//                   id={id}
//                   className={`scroll-mt-24 mt-12 mb-4 font-bold ${
//                     block.level === 2 ? 'text-3xl' : 'text-2xl'
//                   }`}
//                 >
//                   {block.text}
//                 </Tag>
//               )
//             }

//             case 'paragraph':
//               return (
//                 <p key={i} className="mb-6 text-gray-700">
//                   {block.text}
//                 </p>
//               )

//             case 'image':
//               return (
//                 <figure key={i} className="my-8 flex flex-col items-center">
//                   <img
//                     src={block.url}
//                     alt={block.alt || 'Blog image'}
//                     className="w-full max-w-[300px] h-auto rounded-2xl shadow-sm object-contain"
//                     loading="lazy"
//                   />
//                   {block.alt && (
//                     <figcaption className="text-center text-sm text-gray-500 mt-2">
//                       {block.alt}
//                     </figcaption>
//                   )}
//                 </figure>
//               )

//             default:
//               return null
//           }
//         })}
//       </>
//     )
//   }

//   // Fallback: render nothing
//   return null
// }

'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function BlogContent({ content }) {
  if (typeof content === 'string') {
    return <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
  }

  if (content?.blocks && Array.isArray(content.blocks)) {
    return (
      <article className="prose prose-slate max-w-none">
        {content.blocks.map((block, i) => {
          if (!block || !block.type) return null
          
          // Image validation
          if (block.type === 'image' && !block.url?.trim()) return null
          // Text validation (paragraphs/headings/lists)
          if (block.type !== 'image' && !block.text?.trim()) return null

          switch (block.type) {
            case 'heading': {
              const id = block.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
              const Tag = `h${block.level || 2}`
              return (
                <Tag key={i} id={id} className={`scroll-mt-24 mt-12 mb-4 font-bold ${block.level === 2 ? 'text-3xl' : 'text-2xl'}`}>
                   {/* We use ReactMarkdown even for headings to support bold/italic in titles */}
                  <ReactMarkdown components={{ p: React.Fragment }}>{block.text}</ReactMarkdown>
                </Tag>
              )
            }

            case 'paragraph':
              return (
                <div key={i} className="mb-6 text-gray-700 leading-relaxed">
                  <ReactMarkdown>{block.text}</ReactMarkdown>
                </div>
              )

            case 'list': // NEW CASE: Handles bullet points/numbered lists via Markdown
              return (
                <div key={i} className="mb-6 ml-6 text-gray-700">
                  <ReactMarkdown>{block.text}</ReactMarkdown>
                </div>
              )

            case 'image':
              return (
                <figure key={i} className="my-8 flex flex-col items-center">
                  <img src={block.url} alt={block.alt || 'Blog image'} className="w-full max-w-[600px] h-auto rounded-2xl shadow-sm" loading="lazy" />
                  {block.alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{block.alt}</figcaption>}
                </figure>
              )

            default:
              return null
          }
        })}
      </article>
    )
  }

  return null
}
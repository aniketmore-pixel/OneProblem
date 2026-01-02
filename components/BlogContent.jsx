// export default function BlogContent({ content, toc }) {
//     if (!content || !content.blocks || !Array.isArray(content.blocks)) {
//       return <p className="text-gray-500">No content available.</p>
//     }
  
//     let headingIndex = 0
  
//     return (
//       <div className="prose prose-lg prose-slate max-w-none">
//         {content.blocks.map((block, i) => {
//           switch (block.type) {
//             case 'heading':
//               const id = `heading-${headingIndex}`
//               headingIndex++
//               return (
//                 <h2 key={i} id={id} className="text-3xl font-bold mt-12 mb-4 scroll-mt-24">
//                   {block.data.text}
//                 </h2>
//               )
  
//             case 'paragraph':
//               return (
//                 <p key={i} className="text-gray-700 leading-relaxed my-4">
//                   {block.data.text}
//                 </p>
//               )
  
//             case 'list':
//               return block.data.items && Array.isArray(block.data.items) ? (
//                 <ul
//                   key={i}
//                   className="list-disc list-inside my-4 space-y-1 text-gray-700"
//                 >
//                   {block.data.items.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               ) : null
  
//             case 'image':
//               return block.data.src ? (
//                 <img
//                   key={i}
//                   src={block.data.src}
//                   alt={block.data.alt || ''}
//                   className="rounded-xl my-8 w-full object-cover shadow-md"
//                 />
//               ) : null
  
//             case 'highlight':
//               return block.data.text ? (
//                 <div
//                   key={i}
//                   className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg my-6 text-gray-800"
//                 >
//                   {block.data.text}
//                 </div>
//               ) : null
  
//             default:
//               return null
//           }
//         })}
//       </div>
//     )

//   }
  

'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function BlogContent({ content }) {
  // Case 1: Old Markdown string content
  if (typeof content === 'string') {
    return <ReactMarkdown>{content}</ReactMarkdown>
  }

  // Case 2: New JSON structure with blocks
  if (content?.blocks && Array.isArray(content.blocks)) {
    return (
      <>
        {content.blocks.map((block, i) => {
          if (!block || !block.type || !block.text?.trim()) return null

          // Generate id for heading (for TOC)
          const id = block.text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')

          switch (block.type) {
            case 'heading':
              const Tag = `h${block.level || 2}` // default to h2 if level missing
              return (
                <Tag
                  key={i}
                  id={id}
                  className={`scroll-mt-24 mt-12 mb-4 font-bold ${
                    block.level === 2 ? 'text-3xl' : 'text-2xl'
                  }`}
                >
                  {block.text}
                </Tag>
              )

            case 'paragraph':
              return (
                <p key={i} className="mb-6 text-gray-700">
                  {block.text}
                </p>
              )

            default:
              return null
          }
        })}
      </>
    )
  }

  // Fallback: render nothing
  return null
}

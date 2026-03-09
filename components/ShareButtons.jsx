'use client'

import { useEffect, useRef, useState } from 'react'
import Toast from './Toast'

export default function ShareButtons() {
  const [open, setOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const menuRef = useRef(null)

  const url =
    typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setShowToast(true)
    setOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <div className="relative inline-flex" ref={menuRef}>
        {/* SHARE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2.5 border rounded-full text-sm font-medium hover:bg-white/10 transition-colors group flex items-center gap-2"
        >
          🔗 Share
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

            <button
              onClick={copyLink}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
                Copy link
            </button>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              className="block px-4 py-3 hover:bg-gray-50 text-sm"
              onClick={() => setOpen(false)}
            >
              Share on Twitter
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              className="block px-4 py-3 hover:bg-gray-50 text-sm"
              onClick={() => setOpen(false)}
            >
              Share on WhatsApp
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              className="block px-4 py-3 hover:bg-gray-50 text-sm"
              onClick={() => setOpen(false)}
            >
              Share on Facebook
            </a>

            <button
              onClick={copyLink}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
              Share on Instagram
            </button>
          </div>
        )}
      </div>

      {/* TOAST */}
      <Toast
        message="Link copied!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

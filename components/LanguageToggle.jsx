// 'use client'

// import { useState } from 'react'

// export default function LanguageToggle() {
//   const [active, setActive] = useState('en')

//   function setLanguage(lang) {
//     console.log('🌐 Language clicked:', lang)
//     setActive(lang)

//     // --- SWITCH BACK TO ENGLISH ---
//     if (lang === 'en') {
//       console.log('🔄 Resetting to English')

//       document.cookie =
//         'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

//       document.cookie =
//         'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' +
//         window.location.hostname

//       window.location.reload()
//       return
//     }

//     // --- SWITCH TO MARATHI ---
//     const select = document.querySelector('.goog-te-combo')

//     if (!select) {
//       console.error('❌ Google Translate dropdown not found')
//       return
//     }

//     console.log('✅ Switching to Marathi')
//     select.value = 'mr'
//     select.dispatchEvent(new Event('change'))
//   }

//   return (
//     <div className="relative flex items-center w-44 h-10 bg-gray-100 rounded-full p-1 shadow-inner">
//       {/* Sliding pill */}
//       <div
//         className={`absolute top-1 left-1 h-8 w-1/2 rounded-full bg-green-500 transition-transform duration-300 ease-out ${
//           active === 'mr' ? 'translate-x-full' : ''
//         }`}
//       />

//       {/* English */}
//       <button
//         onClick={() => setLanguage('en')}
//         className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${
//           active === 'en' ? 'text-white' : 'text-gray-600'
//         }`}
//       >
//         English
//       </button>

//       {/* Marathi */}
//       <button
//         onClick={() => setLanguage('mr')}
//         className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${
//           active === 'mr' ? 'text-white' : 'text-gray-600'
//         }`}
//       >
//         मराठी
//       </button>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'

export default function LanguageToggle() {
  const [active, setActive] = useState('en')

  // 🔁 Detect Google Translate bar close (❌)
  useEffect(() => {
    const interval = setInterval(() => {
      const hasTranslateCookie = document.cookie.includes('googtrans=')

      // If user closed translate bar → cookie gone → reload
      if (active === 'mr' && !hasTranslateCookie) {
        console.log('❌ Google Translate closed — reloading')
        window.location.reload()
      }
    }, 800)

    return () => clearInterval(interval)
  }, [active])

  function setLanguage(lang) {
    console.log('🌐 Language clicked:', lang)
    setActive(lang)

    // --- SWITCH BACK TO ENGLISH ---
    if (lang === 'en') {
      console.log('🔄 Resetting to English')

      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' +
        window.location.hostname

      window.location.reload()
      return
    }

    // --- SWITCH TO MARATHI ---
    const select = document.querySelector('.goog-te-combo')

    if (!select) {
      console.error('❌ Google Translate dropdown not found')
      return
    }

    console.log('✅ Switching to Marathi')
    select.value = 'mr'
    select.dispatchEvent(new Event('change'))
  }

  return (
    <div className="relative flex items-center w-44 h-10 bg-gray-100 rounded-full p-1 shadow-inner">
      {/* Sliding pill */}
      <div
        className={`absolute top-1 left-1 h-8 w-1/2 rounded-full bg-green-500 transition-transform duration-300 ease-out ${
          active === 'mr' ? 'translate-x-full' : ''
        }`}
      />

      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${
          active === 'en' ? 'text-white' : 'text-gray-600'
        }`}
      >
        English
      </button>

      <button
        onClick={() => setLanguage('mr')}
        className={`relative z-10 w-1/2 text-sm font-medium transition-colors ${
          active === 'mr' ? 'text-white' : 'text-gray-600'
        }`}
      >
        मराठी
      </button>
    </div>
  )
}

// // import { Outfit } from "next/font/google";
// // import { Toaster } from "react-hot-toast";
// // import StoreProvider from "@/app/StoreProvider";
// // import "./globals.css";
// // import Footer from "@/components/Footer";
// // import { SessionProvider } from "next-auth/react";

// // const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

// // export const metadata = {
// //     title: "GoCart. - Shop smarter",
// //     description: "GoCart. - Shop smarter",
// // };

// // export default function RootLayout({ children }) {
// //     return (

// //         <html lang="en">
// //             <body className={`${outfit.className} antialiased`}>
// //                 <StoreProvider>
// //                     <Toaster />
// //                     {children}
// //                     <Footer/>
// //                 </StoreProvider>
// //             </body>
// //         </html>

// //     );
// // }



// import { Outfit } from 'next/font/google'
// import './globals.css'
// import Footer from '@/components/Footer'
// import Providers from './providers'

// const outfit = Outfit({
//   subsets: ['latin'],
//   weight: ['400', '500', '600'],
// })

// export const metadata = {
//   title: 'ExpressDeal - shop smarter',
//   description: 'ExpressDeal - shop smarter',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${outfit.className} antialiased`}>
//         <Providers>
//           {children}
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   )
// }

import { Outfit } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Footer from '@/components/Footer'
import Providers from './providers'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata = {
  title: 'ExpressDeal - shop smarter',
  description: 'ExpressDeal - shop smarter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <body className={`${outfit.className} antialiased`}>
     
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HX12PCXF3D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HX12PCXF3D');
</script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
      document.addEventListener('DOMContentLoaded', () => {
        const observer = new MutationObserver(() => {
          const banner = document.querySelector('iframe.goog-te-banner-frame')
          if (banner) banner.remove()
        })
        observer.observe(document.body, { childList: true, subtree: true })
      })
    `,
          }}
        />


        {/* 🔹 Hidden Google Translate container (required) */}
        <div
          id="google_translate_element"
          style={{ display: 'none' }}
        />

        {/* 🔹 Google Translate loader */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateInit"
          strategy="afterInteractive"
        />

        {/* 🔹 Google Translate init */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
        >
          {`
            function googleTranslateInit() {
              if (!window.google || !window.google.translate) {
                console.error('❌ Google Translate failed to load');
                return;
              }

              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,mr',
                  autoDisplay: false,
                  multilanguagePage: true
                },
                'google_translate_element'
              );

              console.log('✅ Google Translate widget initialized');
            }
          `}
        </Script>

        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}




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
  title: 'OneProblem',
  description: 'One coding problem every day. Consistency is the key to mastery.',
  openGraph: {
    title: 'OneProblem',
    description: 'One coding problem every day. Consistency is the key to mastery.',
    url: 'https://expressdeal.vercel.app',
    siteName: 'OneProblem', 
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>

        {/* 🔹 Website Schema (JSON-LD) to force Google Site Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ExpressDeal",
              "alternateName": ["Express Deal", "ExpressDeal.in"],
              "url": "https://expressdeal.vercel.app/"
            })
          }}
        />

        {/* 🔹 Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HX12PCXF3D"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HX12PCXF3D', { page_path: window.location.pathname });
            `,
          }}
        />

        {/* 🔹 Google Translate remove banner */}
        <Script
          id="google-translate-banner-remove"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const observer = new MutationObserver(() => {
                  const banner = document.querySelector('iframe.goog-te-banner-frame');
                  if (banner) banner.remove();
                });
                observer.observe(document.body, { childList: true, subtree: true });
              });
            `,
          }}
        />

        {/* 🔹 Hidden Google Translate container */}
        <div id="google_translate_element" style={{ display: 'none' }} />

        {/* 🔹 Google Translate loader */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
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
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
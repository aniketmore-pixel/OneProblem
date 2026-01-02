'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import StoreProvider from '@/app/StoreProvider'

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <Toaster />
        {children}
      </StoreProvider>
    </SessionProvider>
  )
}

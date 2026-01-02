'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { makeStore } from '../lib/store'

export default function StoreProvider({ children }) {
  const storeRef = useRef()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </SessionProvider>
  )
}

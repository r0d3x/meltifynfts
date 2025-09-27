'use client'

import { WalletProvider as SuietWalletProvider } from '@suiet/wallet-kit'
import '@suiet/wallet-kit/style.css'

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuietWalletProvider>
      {children}
    </SuietWalletProvider>
  )
} 
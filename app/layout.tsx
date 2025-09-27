import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { NFTProvider } from '@/context/NFTContext'

export const metadata: Metadata = {
  title: 'NFT Test',
  description: 'Simple NFT testing app on Sui blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <NFTProvider>
            {children}
          </NFTProvider>
        </WalletProvider>
      </body>
    </html>
  )
} 
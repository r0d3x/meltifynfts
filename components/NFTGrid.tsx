'use client'

import { motion } from 'framer-motion'
import NFTCard from './NFTCard'

interface NFT {
  name: string
  description: string
  image_url: string
  rarity: string
  price: string
}

interface NFTGridProps {
  nfts: NFT[]
  loading: boolean
  onMintNFT: (nft: NFT) => void
}

export default function NFTGrid({ nfts, loading, onMintNFT }: NFTGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="bg-sui-gray-200 h-48 rounded-sui mb-4"></div>
            <div className="bg-sui-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-sui-gray-200 h-3 rounded mb-4"></div>
            <div className="bg-sui-gray-200 h-10 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <NFTCard nft={nft} onMint={() => onMintNFT(nft)} />
        </motion.div>
      ))}
    </div>
  )
} 
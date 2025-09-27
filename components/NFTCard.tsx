'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'
import { useWallet } from '@suiet/wallet-kit'

interface NFT {
  name: string
  description: string
  image_url: string
  rarity: string
  price: string
}

interface NFTCardProps {
  nft: NFT
  onMint: () => void
}

const rarityColors = {
  Common: 'bg-sui-gray-500',
  Rare: 'bg-blue-500',
  Epic: 'bg-purple-500',
  Legendary: 'bg-yellow-500'
}

const rarityIcons = {
  Common: null,
  Rare: <Sparkles size={14} />,
  Epic: <Sparkles size={14} />,
  Legendary: <Zap size={14} />
}

export default function NFTCard({ nft, onMint }: NFTCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [minting, setMinting] = useState(false)
  const wallet = useWallet()

  const handleMint = async () => {
    setMinting(true)
    try {
      await onMint()
    } finally {
      setMinting(false)
    }
  }

  return (
    <motion.div 
      className="nft-card group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-square relative bg-sui-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-spinner w-8 h-8 border-2 border-sui-blue border-t-transparent rounded-full"></div>
            </div>
          )}
          <img
            src={nft.image_url}
            alt={nft.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Rarity Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-xs font-medium flex items-center space-x-1 ${
            rarityColors[nft.rarity as keyof typeof rarityColors] || rarityColors.Common
          }`}>
            {rarityIcons[nft.rarity as keyof typeof rarityIcons]}
            <span>{nft.rarity}</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-medium text-sui-gray-900 mb-2 text-lg">{nft.name}</h3>
          <p className="text-sui-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-sui-gray-500 uppercase tracking-wide">Price</p>
              <p className="font-medium text-sui-blue text-lg">{nft.price}</p>
            </div>
          </div>
          
          <button
            onClick={handleMint}
            disabled={!wallet.connected || minting}
            className={`w-full py-3 px-4 rounded-sui font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              !wallet.connected
                ? 'bg-sui-gray-200 text-sui-gray-500 cursor-not-allowed'
                : minting
                ? 'bg-sui-blue/50 text-white cursor-not-allowed'
                : 'bg-sui-blue text-white hover:bg-sui-blue-dark shadow-sui hover:shadow-sui-hover'
            }`}
          >
            {minting ? (
              <>
                <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Minting...</span>
              </>
            ) : !wallet.connected ? (
              <span>Connect Wallet</span>
            ) : (
              <span>Mint NFT</span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
} 
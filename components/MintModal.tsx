'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Zap } from 'lucide-react'
import { useWallet } from '@suiet/wallet-kit'

interface NFT {
  name: string
  description: string
  image_url: string
  rarity: string
  price: string
}

interface MintModalProps {
  nfts: NFT[]
  onClose: () => void
  onMint: (nft: NFT) => void
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

export default function MintModal({ nfts, onClose, onMint }: MintModalProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [minting, setMinting] = useState(false)
  const wallet = useWallet()

  const handleMint = async () => {
    if (!selectedNFT || !wallet.connected) return
    
    setMinting(true)
    try {
      await onMint(selectedNFT)
      onClose()
    } catch (error) {
      console.error('Mint failed:', error)
    } finally {
      setMinting(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-sui shadow-sui-hover max-w-4xl w-full max-h-[80vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-sui-gray-200">
            <h2 className="text-2xl font-medium text-sui-gray-900">Mint NFT</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sui-gray-100 rounded-sui transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <p className="text-sui-gray-600 mb-6">
              Choose an NFT to mint. Each NFT costs 0.01 SUI and will be transferred to your wallet.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nfts.map((nft, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`card p-0 overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedNFT === nft
                      ? 'ring-2 ring-sui-blue shadow-sui-hover'
                      : 'hover:shadow-sui-hover'
                  }`}
                  onClick={() => setSelectedNFT(nft)}
                >
                  <div className="aspect-square relative bg-sui-gray-100">
                    <img
                      src={nft.image_url}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Rarity Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-xs font-medium flex items-center space-x-1 ${
                      rarityColors[nft.rarity as keyof typeof rarityColors] || rarityColors.Common
                    }`}>
                      {rarityIcons[nft.rarity as keyof typeof rarityIcons]}
                      <span>{nft.rarity}</span>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedNFT === nft && (
                      <div className="absolute inset-0 bg-sui-blue/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-sui-blue rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-sui-gray-900 mb-1">{nft.name}</h3>
                    <p className="text-sui-gray-600 text-sm mb-3 line-clamp-2">{nft.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sui-blue">{nft.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-sui-gray-200 bg-sui-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-sui-gray-600">
                {selectedNFT ? (
                  <>Selected: <span className="font-medium">{selectedNFT.name}</span></>
                ) : (
                  'Select an NFT to mint'
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleMint}
                  disabled={!selectedNFT || !wallet.connected || minting}
                  className={`btn-primary flex items-center space-x-2 ${
                    (!selectedNFT || !wallet.connected || minting) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {minting ? (
                    <>
                      <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Minting...</span>
                    </>
                  ) : (
                    <span>Mint NFT</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 
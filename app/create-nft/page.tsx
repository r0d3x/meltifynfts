'use client'

import { useState } from 'react'
import { useWallet } from '@suiet/wallet-kit'
import { ConnectButton } from '@suiet/wallet-kit'
import { ArrowLeft, Plus, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function CreateNFTPage() {
  const wallet = useWallet()
  const [nftForm, setNftForm] = useState({
    name: '',
    description: '',
    image_url: '',
    rarity: 'Common'
  })
  const [minting, setMinting] = useState(false)

  const handleMintNFT = async () => {
    if (!wallet.connected || !nftForm.name || !nftForm.image_url) return
    
    setMinting(true)
    try {
      // TODO: Implement NFT minting with your deployed contract
      console.log('Minting NFT:', nftForm)
      // Simulate minting
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`NFT "${nftForm.name}" created successfully!`)
      setNftForm({ name: '', description: '', image_url: '', rarity: 'Common' })
    } catch (error) {
      console.error('Minting failed:', error)
      alert('Failed to create NFT. Please try again.')
    } finally {
      setMinting(false)
    }
  }

  if (!wallet.connected) {
    return (
      <div className="min-h-screen bg-sui-dark-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-sui-dark-800 rounded-sui-lg flex items-center justify-center mx-auto mb-8 border border-sui-dark-700">
            <Plus className="w-12 h-12 text-sui-blue" />
          </div>
          <h2 className="text-3xl text-white mb-6">Connect to Create NFTs</h2>
          <p className="text-sui-dark-300 mb-8">Connect your wallet to start creating unique NFTs</p>
          <ConnectButton className="!w-full !py-4 !bg-sui-blue !text-black !text-lg !rounded-sui hover:!bg-sui-blue-light !transition-all !duration-200">
            Connect Wallet
          </ConnectButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sui-dark-900">
      {/* Header */}
      <header className="border-b border-sui-dark-700/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sui-blue to-sui-blue-light rounded-lg flex items-center justify-center">
                  <span className="text-black text-sm">🍫</span>
                </div>
                <h1 className="text-xl text-white">MeltyFi</h1>
              </Link>
              
              <div className="flex items-center space-x-2 text-sui-dark-300">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Create NFT</span>
              </div>
            </div>

            <ConnectButton className="!bg-sui-blue !text-black !px-6 !py-3 !rounded-sui !text-sm hover:!bg-sui-blue-light !transition-colors !duration-200">
              {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Wallet'}
            </ConnectButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Create Your NFT</h1>
          <p className="text-xl text-sui-dark-300">Design unique digital assets to use in MeltyFi lotteries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white mb-3">
                NFT Name *
              </label>
              <input
                type="text"
                value={nftForm.name}
                onChange={(e) => setNftForm({ ...nftForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                placeholder="e.g., 'Cosmic Dragon'"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-3">
                Description
              </label>
              <textarea
                value={nftForm.description}
                onChange={(e) => setNftForm({ ...nftForm, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your NFT..."
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-3">
                Image URL *
              </label>
              <input
                type="url"
                value={nftForm.image_url}
                onChange={(e) => setNftForm({ ...nftForm, image_url: e.target.value })}
                className="w-full px-4 py-3 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/image.png"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-3">
                Rarity
              </label>
              <select
                value={nftForm.rarity}
                onChange={(e) => setNftForm({ ...nftForm, rarity: e.target.value })}
                className="w-full px-4 py-3 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
              >
                <option value="Common">Common</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>

            <button
              onClick={handleMintNFT}
              disabled={minting || !nftForm.name || !nftForm.image_url}
              className="w-full py-4 bg-sui-blue text-black text-lg rounded-sui hover:bg-sui-blue-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sui-dark hover:shadow-lg"
            >
              {minting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating NFT...</span>
                </div>
              ) : (
                'Create NFT (0.01 SUI)'
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-6">
              <h3 className="text-lg text-white mb-4">Preview</h3>
              
              <div className="aspect-square relative bg-sui-dark-900 rounded-sui overflow-hidden mb-4">
                {nftForm.image_url ? (
                  <img
                    src={nftForm.image_url}
                    alt={nftForm.name || 'NFT Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-sui-dark-500" />
                  </div>
                )}
                
                {nftForm.rarity && (
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${
                      nftForm.rarity === 'Common' ? 'bg-gray-600' :
                      nftForm.rarity === 'Rare' ? 'bg-blue-600' :
                      nftForm.rarity === 'Epic' ? 'bg-purple-600' : 'bg-yellow-600'
                    }`}>
                      {nftForm.rarity}
                    </span>
                  </div>
                )}
              </div>

              <h4 className="text-white mb-2">{nftForm.name || 'Untitled NFT'}</h4>
              {nftForm.description && (
                <p className="text-sui-dark-300 text-sm mb-4">{nftForm.description}</p>
              )}
              <p className="text-sm text-sui-blue">0.01 SUI</p>
            </div>

            {/* Next Steps */}
            <div className="mt-6 p-4 bg-sui-blue/10 border border-sui-blue/20 rounded-sui">
              <h4 className="text-sui-blue text-sm mb-2">💡 What's next?</h4>
              <p className="text-sui-dark-300 text-sm">After creating your NFT, you can use it to create a lottery and get instant liquidity!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

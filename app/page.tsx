'use client'

import { useState } from 'react'
import { ConnectButton, useWallet } from '@suiet/wallet-kit'
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client'
import { Plus, Image, FolderPlus } from 'lucide-react'
import Link from 'next/link'
import { mintNFT, mintFreeNFT, batchMintFreeNFTs } from '@/utils/mintNFT'
import { useNFTs } from '@/context/NFTContext'
import { useCollections, useCollectionNames } from '@/hooks/useCollections'

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x...'
const MARKETPLACE_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || '0x...'

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [nftForm, setNftForm] = useState({
    name: '',
    description: '',
    image_url: '',
    rarity: 'Common',
    collection: '',
    createNewCollection: false
  })
  const [minting, setMinting] = useState(false)
  const [freeMinting, setFreeMinting] = useState(false)
  const [batchMinting, setBatchMinting] = useState(false)
  const wallet = useWallet()
  const { nfts, refreshNFTs } = useNFTs()
  const { totalCollections, totalNFTs } = useCollections()
  const collectionNames = useCollectionNames()

  const suiClient = new SuiClient({
    url: getFullnodeUrl('testnet'),
  })

  const handleMintNFT = async () => {
    if (!wallet.connected) {
      alert('Connect wallet first')
      return
    }

    if (!nftForm.name || !nftForm.image_url) {
      alert('Name and image URL are required')
      return
    }

    if (nftForm.createNewCollection && !nftForm.collection) {
      alert('Please enter a collection name')
      return
    }

    setMinting(true)
    try {
      // Check if contract is deployed
      if (PACKAGE_ID === '0x...' || MARKETPLACE_ID === '0x...') {
        // Demo mode
        console.log('Would mint NFT:', nftForm)
        await new Promise(resolve => setTimeout(resolve, 2000))
        alert(`NFT "${nftForm.name}" created successfully! (Demo mode - deploy contract to actually mint)`)
      } else {
        // Real minting
        const result = await mintNFT(wallet, nftForm, PACKAGE_ID, MARKETPLACE_ID)
        console.log('Mint successful:', result)
        alert(`NFT "${nftForm.name}" minted successfully!`)
        // Refresh NFTs after successful minting
        await refreshNFTs()
      }
      
      setShowCreateModal(false)
      setNftForm({ 
        name: '', 
        description: '', 
        image_url: '', 
        rarity: 'Common',
        collection: '',
        createNewCollection: false
      })
    } catch (error) {
      console.error('Mint failed:', error)
      alert('Mint failed: ' + (error as any).message)
    } finally {
      setMinting(false)
    }
  }

  const handleBatchMint = async () => {
    if (!wallet.connected) {
      alert('Connect wallet first')
      return
    }

    setBatchMinting(true)
    try {
      if (PACKAGE_ID === '0x...' || MARKETPLACE_ID === '0x...') {
        // Demo mode
        console.log('Would batch mint 10 free NFTs')
        await new Promise(resolve => setTimeout(resolve, 3000))
        alert('10 Free Random Ape NFTs created! (Demo mode - deploy contract to actually mint)')
      } else {
        // Real batch minting
        const result = await batchMintFreeNFTs(wallet, 10, PACKAGE_ID, MARKETPLACE_ID)
        console.log('Batch mint successful:', result)
        alert('10 Free Random Ape NFTs minted successfully!')
        // Refresh NFTs after successful minting
        await refreshNFTs()
      }
    } catch (error) {
      console.error('Batch mint failed:', error)
      alert('Batch mint failed: ' + (error as any).message)
    } finally {
      setBatchMinting(false)
    }
  }

  const handleFreeMint = async () => {
    if (!wallet.connected) {
      alert('Connect wallet first')
      return
    }

    setFreeMinting(true)
    try {
      if (PACKAGE_ID === '0x...' || MARKETPLACE_ID === '0x...') {
        // Demo mode
        console.log('Would mint free NFT')
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert('Free Random Ape NFT created! (Demo mode - deploy contract to actually mint)')
      } else {
        // Real free minting
        const result = await mintFreeNFT(wallet, PACKAGE_ID, MARKETPLACE_ID)
        console.log('Free mint successful:', result)
        alert('Free Random Ape NFT minted successfully!')
        // Refresh NFTs after successful minting
        await refreshNFTs()
      }
    } catch (error) {
      console.error('Free mint failed:', error)
      alert('Free mint failed: ' + (error as any).message)
    } finally {
      setFreeMinting(false)
    }
  }

  const handleBatchMint = async () => {
    if (!wallet.connected) {
      alert('Connect wallet first')
      return
    }

    setBatchMinting(true)
    try {
      if (PACKAGE_ID === '0x...' || MARKETPLACE_ID === '0x...') {
        // Demo mode
        console.log('Would batch mint 10 free NFTs')
        await new Promise(resolve => setTimeout(resolve, 3000))
        alert('10 Free Random Ape NFTs created! (Demo mode - deploy contract to actually mint)')
      } else {
        // Real batch minting
        const result = await batchMintFreeNFTs(wallet, 10, PACKAGE_ID, MARKETPLACE_ID)
        console.log('Batch mint successful:', result)
        alert('10 Free Random Ape NFTs minted successfully!')
        // Refresh NFTs after successful minting
        await refreshNFTs()
      }
    } catch (error) {
      console.error('Batch mint failed:', error)
      alert('Batch mint failed: ' + (error as any).message)
    } finally {
      setBatchMinting(false)
    }
  }

  return (
    <div className="min-h-screen bg-sui-dark-900">
      {/* Header */}
      <header className="border-b border-sui-dark-700/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Sui Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sui-blue to-sui-blue-light flex items-center justify-center">
                  <span className="text-black font-medium text-sm">S</span>
                </div>
                <h1 className="text-xl font-medium text-white">Sui</h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/my-nfts" 
                  className="flex items-center space-x-2 text-sui-dark-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  <Image size={16} />
                  <span>My NFTs</span>
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-sui-blue text-black font-medium text-sm rounded-sui hover:bg-sui-blue-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sui-dark"
                disabled={!wallet.connected}
              >
                <Plus size={16} />
                <span>Create NFT</span>
              </button>
              <button
                onClick={handleFreeMint}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-green-600 text-white font-medium text-sm rounded-sui hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sui-dark"
                disabled={!wallet.connected || freeMinting}
              >
                {freeMinting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                <span>{freeMinting ? 'Minting...' : 'Quick Mint'}</span>
              </button>
              <button
                onClick={handleBatchMint}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-purple-600 text-white font-medium text-sm rounded-sui hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sui-dark"
                disabled={!wallet.connected || batchMinting}
              >
                {batchMinting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )}
                <span>{batchMinting ? 'Minting 10...' : 'Quick Mint 10'}</span>
              </button>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {!wallet.connected ? (
          <div className="text-center py-32">
            <div className="max-w-lg mx-auto">
              <div className="w-24 h-24 bg-sui-dark-800 rounded-sui-lg flex items-center justify-center mx-auto mb-10 border border-sui-dark-700">
                <svg className="w-12 h-12 text-sui-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-4xl font-medium text-white mb-6">Connect your wallet</h2>
              <p className="text-xl text-sui-dark-300 mb-12 leading-relaxed max-w-md mx-auto">
                Connect your Sui wallet to create and manage NFTs on the fastest blockchain
              </p>
              <div className="inline-block">
                <ConnectButton />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="max-w-3xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-sui-blue to-sui-blue-light rounded-sui-lg flex items-center justify-center mx-auto mb-10 shadow-sui-dark">
                <Plus className="w-12 h-12 text-black" />
              </div>
              <h1 className="text-5xl font-medium text-white mb-8 leading-tight">
                Create unique NFTs on{' '}
                <span className="bg-gradient-to-r from-sui-blue to-sui-blue-light bg-clip-text text-transparent">Sui</span>
              </h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
                  <div className="text-3xl font-medium text-sui-blue mb-2">{nfts.length}</div>
                  <div className="text-sm text-sui-dark-300 font-medium">Your NFTs</div>
                </div>
                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
                  <div className="text-3xl text-sui-blue mb-2">{totalCollections}</div>
                  <div className="text-sm text-sui-dark-300 font-medium">Collections</div>
                </div>
                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6 col-span-2 md:col-span-1">
                  <div className="text-3xl font-medium text-sui-blue mb-2">~400ms</div>
                  <div className="text-sm text-sui-dark-300 font-medium">Time to finality</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-sui-blue text-black font-medium text-lg rounded-sui hover:bg-sui-blue-light transition-all duration-200 shadow-sui-dark hover:shadow-lg"
                >
                  <Plus size={20} />
                  <span>Create your first NFT</span>
                </button>
                <button
                  onClick={handleFreeMint}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-green-600 text-white font-medium text-lg rounded-sui hover:bg-green-700 transition-all duration-200 shadow-sui-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={freeMinting}
                >
                  {freeMinting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  <span>{freeMinting ? 'Minting Free NFT...' : 'Quick Mint (Free!)'}</span>
                </button>
                <button
                  onClick={handleBatchMint}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white font-medium text-lg rounded-sui hover:bg-purple-700 transition-all duration-200 shadow-sui-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={batchMinting}
                >
                  {batchMinting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  <span>{batchMinting ? 'Minting 10 NFTs...' : 'Quick Mint 10 (Free!)'}</span>
                </button>
                <Link 
                  href="/my-nfts"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-sui-dark-800 text-sui-dark-200 font-medium text-lg rounded-sui hover:bg-sui-dark-700 border border-sui-dark-700 transition-all duration-200"
                >
                  <Image size={20} />
                  <span>View collection</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create NFT Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 w-full max-w-lg shadow-sui-dark max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-white">Create NFT</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 flex items-center justify-center text-sui-dark-400 hover:text-white hover:bg-sui-dark-700 rounded-lg transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Base Name *
                </label>
                <input
                  type="text"
                  value={nftForm.name}
                  onChange={(e) => setNftForm({ ...nftForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-sui-dark-900 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                  placeholder="e.g., 'CyberPunk' "
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Description
                </label>
                <textarea
                  value={nftForm.description}
                  onChange={(e) => setNftForm({ ...nftForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-sui-dark-900 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your NFT (optional)"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={nftForm.image_url}
                  onChange={(e) => setNftForm({ ...nftForm, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-sui-dark-900 border border-sui-dark-600 rounded-sui text-white placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Rarity
                </label>
                <select
                  value={nftForm.rarity}
                  onChange={(e) => setNftForm({ ...nftForm, rarity: e.target.value })}
                  className="w-full px-4 py-3 bg-sui-dark-900 border border-sui-dark-600 rounded-sui text-white focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                >
                  <option value="Common" className="bg-sui-dark-900">Common</option>
                  <option value="Rare" className="bg-sui-dark-900">Rare</option>
                  <option value="Epic" className="bg-sui-dark-900">Epic</option>
                  <option value="Legendary" className="bg-sui-dark-900">Legendary</option>
                </select>
              </div>

              {/* Collection Section */}
              <div className="bg-sui-dark-900 border border-sui-dark-600 rounded-sui p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FolderPlus className="w-5 h-5 text-sui-blue" />
                  <label className="text-sm font-medium text-white">
                    Collection (Optional)
                  </label>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="no-collection"
                      name="collection-option"
                      checked={!nftForm.createNewCollection && !nftForm.collection}
                      onChange={() => setNftForm({ ...nftForm, createNewCollection: false, collection: '' })}
                      className="w-4 h-4 text-sui-blue bg-sui-dark-800 border-sui-dark-600 focus:ring-sui-blue focus:ring-2"
                    />
                    <label htmlFor="no-collection" className="text-sm text-sui-dark-300">
                      No collection
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="radio"
                        id="existing-collection"
                        name="collection-option"
                        checked={!nftForm.createNewCollection && !!nftForm.collection}
                        onChange={() => setNftForm({ ...nftForm, createNewCollection: false })}
                        className="w-4 h-4 text-sui-blue bg-sui-dark-800 border-sui-dark-600 focus:ring-sui-blue focus:ring-2"
                      />
                      <label htmlFor="existing-collection" className="text-sm text-sui-dark-300">
                        Add to existing collection
                      </label>
                    </div>
                    {!nftForm.createNewCollection && (
                      <select
                        value={nftForm.collection}
                        onChange={(e) => setNftForm({ ...nftForm, collection: e.target.value })}
                        className="w-full px-4 py-2 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white text-sm focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                        disabled={nftForm.createNewCollection}
                      >
                        <option value="" className="bg-sui-dark-800">Select a collection</option>
                        {collectionNames.map((collection: string) => (
                          <option key={collection} value={collection} className="bg-sui-dark-800">
                            {collection}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="radio"
                        id="new-collection"
                        name="collection-option"
                        checked={nftForm.createNewCollection}
                        onChange={() => setNftForm({ ...nftForm, createNewCollection: true, collection: '' })}
                        className="w-4 h-4 text-sui-blue bg-sui-dark-800 border-sui-dark-600 focus:ring-sui-blue focus:ring-2"
                      />
                      <label htmlFor="new-collection" className="text-sm text-sui-dark-300">
                        Create new collection
                      </label>
                    </div>
                    {nftForm.createNewCollection && (
                      <input
                        type="text"
                        value={nftForm.collection}
                        onChange={(e) => setNftForm({ ...nftForm, collection: e.target.value })}
                        className="w-full px-4 py-2 bg-sui-dark-800 border border-sui-dark-600 rounded-sui text-white text-sm placeholder-sui-dark-400 focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                        placeholder="Enter collection name"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Preview */}
              {nftForm.image_url && (
                <div className="bg-sui-dark-900 border border-sui-dark-600 rounded-sui p-6">
                  <label className="block text-sm font-medium text-white mb-4">
                    Preview
                  </label>
                  <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-4 text-center">
                    <img
                      src={nftForm.image_url}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-sui mx-auto mb-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <p className="font-medium text-white mb-1">
                      {nftForm.name ? `${nftForm.name} #[auto]` : 'BaseName #[auto]'}
                    </p>
                    {(nftForm.collection || nftForm.createNewCollection) && (
                      <p className="text-xs text-sui-dark-400 mb-1">
                        Collection: {nftForm.collection || 'New Collection'}
                      </p>
                    )}
                    <p className="text-sm text-sui-blue font-medium">0.01 SUI</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleMintNFT}
                  disabled={minting || !nftForm.name || !nftForm.image_url}
                  className="w-full py-4 bg-sui-blue text-black font-medium text-lg rounded-sui hover:bg-sui-blue-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sui-dark hover:shadow-lg"
                >
                  {minting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Minting NFT...</span>
                    </div>
                  ) : (
                    'Mint NFT for 0.01 SUI'
                  )}
                </button>
                <button
                  onClick={handleFreeMint}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-green-600 text-white font-medium text-lg rounded-sui hover:bg-green-700 transition-all duration-200 shadow-sui-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={freeMinting}
                >
                  {freeMinting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  <span>{freeMinting ? 'Minting Free NFT...' : 'Quick Mint (Free!)'}</span>
                </button>
                <button
                  onClick={handleBatchMint}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white font-medium text-lg rounded-sui hover:bg-purple-700 transition-all duration-200 shadow-sui-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={batchMinting}
                >
                  {batchMinting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                  <span>{batchMinting ? 'Minting 10 NFTs...' : 'Quick Mint 10 (Free!)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
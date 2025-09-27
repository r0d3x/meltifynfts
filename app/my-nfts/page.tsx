'use client'

import { ConnectButton, useWallet } from '@suiet/wallet-kit'
import { ArrowLeft, ExternalLink, Folder } from 'lucide-react'
import Link from 'next/link'
import { useNFTs } from '@/context/NFTContext'
import { useCollections } from '@/hooks/useCollections'

export default function MyNFTs() {
  const { loading } = useNFTs()
  const { totalCollections, totalNFTs, collectionGroups, uncollectedNFTs } = useCollections()
  const wallet = useWallet()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500'
      case 'Epic': return 'bg-gradient-to-r from-purple-400 to-pink-500'
      case 'Rare': return 'bg-gradient-to-r from-blue-400 to-indigo-500'
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-sui-dark-900">
      {/* Header */}
      <header className="border-b border-sui-dark-700/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="flex items-center space-x-3 text-sui-dark-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to Create</span>
              </Link>
              <div className="h-6 w-px bg-sui-dark-600"></div>
              <h1 className="text-xl font-medium text-white">My NFTs</h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {!wallet.connected ? (
          <div className="text-center py-32">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-sui-dark-800 rounded-sui-lg flex items-center justify-center mx-auto mb-8 border border-sui-dark-700">
                <svg className="w-10 h-10 text-sui-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white mb-4">Connect your wallet</h2>
              <p className="text-sui-dark-300 mb-10 leading-relaxed">
                Connect your Sui wallet to view and manage your NFT collection
              </p>
              <ConnectButton />
            </div>
          </div>
        ) : loading ? (
          <div className="py-32">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg mb-8">
                <div className="w-8 h-8 border-2 border-sui-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">Loading your NFTs</h2>
              <p className="text-sui-dark-300">Fetching your collection from the blockchain...</p>
            </div>
          </div>
        ) : totalNFTs === 0 ? (
          <div className="text-center py-32">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-sui-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white mb-4">No NFTs yet</h2>
              <p className="text-sui-dark-300 mb-10 leading-relaxed">
                You haven't minted any NFTs yet. Create your first NFT to get started.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-sui-blue text-black font-medium rounded-sui hover:bg-sui-blue-light transition-colors duration-200 shadow-sui-dark"
              >
                Create your first NFT
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Stats */}
            <div className="mb-16">
              <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-medium text-sui-blue mb-3">{totalNFTs}</div>
                    <div className="text-sui-dark-300 font-medium">Total NFTs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-sui-blue mb-3">{totalCollections}</div>
                    <div className="text-sui-dark-300 font-medium">Collections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-medium text-sui-blue mb-3">
                      {(totalNFTs * 0.01).toFixed(2)}
                    </div>
                    <div className="text-sui-dark-300 font-medium">SUI Invested</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collections */}
            <div className="space-y-12">
              {collectionGroups.map((collection) => (
                <div key={collection.name} className="space-y-6">
                  {/* Collection Header */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sui-blue rounded-lg flex items-center justify-center">
                      <Folder className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium text-white">{collection.name}</h2>
                      <p className="text-sui-dark-300 text-sm">{collection.count} NFTs</p>
                    </div>
                  </div>

                  {/* Collection NFTs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collection.nfts.map((nft) => (
                      <div
                        key={nft.objectId}
                        className="group bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg overflow-hidden hover:shadow-sui-dark hover:border-sui-dark-600 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-square relative bg-sui-dark-900 overflow-hidden">
                          {nft.image_url ? (
                            <img
                              src={nft.image_url}
                              alt={nft.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-12 h-12 text-sui-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          <div className="absolute top-3 right-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getRarityColor(nft.rarity)}`}>
                              {nft.rarity}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{nft.name}</h3>
                          {nft.collection && (
                            <p className="text-xs text-sui-blue font-medium mb-2">
                              {nft.collection}
                            </p>
                          )}
                          {nft.description && (
                            <p className="text-sui-dark-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                              {nft.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-sui-dark-400">
                              ID: {nft.objectId.slice(0, 8)}...
                            </div>
                            <button 
                              onClick={() => window.open(`https://testnet.suivision.xyz/object/${nft.objectId}`, '_blank')}
                              className="inline-flex items-center space-x-1 text-xs text-sui-blue hover:text-sui-blue-light font-medium transition-colors duration-200"
                            >
                              <span>View</span>
                              <ExternalLink size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Uncollected NFTs */}
              {uncollectedNFTs.count > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sui-dark-600 rounded-lg flex items-center justify-center">
                      <Folder className="w-4 h-4 text-sui-dark-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-medium text-white">Uncollected</h2>
                      <p className="text-sui-dark-300 text-sm">{uncollectedNFTs.count} NFTs</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {uncollectedNFTs.nfts.map((nft) => (
                      <div
                        key={nft.objectId}
                        className="group bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg overflow-hidden hover:shadow-sui-dark hover:border-sui-dark-600 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-square relative bg-sui-dark-900 overflow-hidden">
                          {nft.image_url ? (
                            <img
                              src={nft.image_url}
                              alt={nft.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-12 h-12 text-sui-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          <div className="absolute top-3 right-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getRarityColor(nft.rarity)}`}>
                              {nft.rarity}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{nft.name}</h3>
                          {nft.description && (
                            <p className="text-sui-dark-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                              {nft.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-sui-dark-400">
                              ID: {nft.objectId.slice(0, 8)}...
                            </div>
                            <button 
                              onClick={() => window.open(`https://testnet.suivision.xyz/object/${nft.objectId}`, '_blank')}
                              className="inline-flex items-center space-x-1 text-xs text-sui-blue hover:text-sui-blue-light font-medium transition-colors duration-200"
                            >
                              <span>View</span>
                              <ExternalLink size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 
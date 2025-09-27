'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useWallet } from '@suiet/wallet-kit'
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client'

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x...'

// Also check for NFTs from previous contract versions
const PREVIOUS_PACKAGE_IDS = [
  '0x19c3e8cee413b0801567f415389541f7084060a4fd6abc6c0e3b3aa5567e99b5', // Original contract
  '0x83fcc9c8e5132d26fb918ab49271681af8b85a2d29dd123fbf435ae1d8e3a7b8', // Old contract
]

interface NFT {
  objectId: string
  name: string
  description: string
  image_url: string
  rarity: string
  creator: string
  collection?: string
}

interface NFTContextType {
  nfts: NFT[]
  loading: boolean
  collections: string[]
  refreshNFTs: () => Promise<void>
  addNFT: (nft: NFT) => void
}

const NFTContext = createContext<NFTContextType | undefined>(undefined)

export function NFTProvider({ children }: { children: ReactNode }) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState<string[]>([])
  const wallet = useWallet()

  const suiClient = new SuiClient({
    url: getFullnodeUrl('testnet'),
  })

  const fetchNFTs = async () => {
    if (!wallet.address) {
      setNfts([])
      setCollections([])
      setLoading(false)
      return
    }
    
    const walletAddress = wallet.address // Store address in a variable to ensure type safety
    setLoading(true)
    try {
      // Fetch NFTs from current contract
      const currentObjects = await suiClient.getOwnedObjects({
        owner: walletAddress,
        filter: {
          StructType: `${PACKAGE_ID}::nft_marketplace::NFT`
        },
        options: {
          showContent: true,
          showDisplay: true,
        }
      })

      // Fetch NFTs from previous contracts
      const previousObjects = await Promise.all(
        PREVIOUS_PACKAGE_IDS.map(packageId =>
          suiClient.getOwnedObjects({
            owner: walletAddress,
            filter: {
              StructType: `${packageId}::nft_marketplace::NFT`
            },
            options: {
              showContent: true,
              showDisplay: true,
            }
          })
        )
      )

      // Combine all NFTs
      const allObjects = [
        ...currentObjects.data,
        ...previousObjects.flatMap(result => result.data)
      ]

      const nftData = allObjects
        .filter(obj => obj.data?.content && obj.data.content.dataType === 'moveObject')
        .map(obj => {
          const content = obj.data?.content as any
          const display = obj.data?.display?.data || {}
          
          return {
            objectId: obj.data?.objectId || '',
            name: display.name || content?.fields?.name || 'Unnamed NFT',
            description: display.description || content?.fields?.description || '',
            image_url: display.image_url || content?.fields?.image_url || '',
            rarity: display.rarity || content?.fields?.rarity || 'Common',
            creator: content?.fields?.creator || '',
            collection: (display.collection_name || content?.fields?.collection_name) ? (display.collection_name || content?.fields?.collection_name) : undefined,
          }
        })

      console.log('Fetched NFTs:', nftData) // Debug log
      setNfts(nftData)
      
      // Extract unique collections
      const uniqueCollections = Array.from(new Set(nftData.map(nft => nft.collection).filter(Boolean)))
      setCollections(uniqueCollections)
    } catch (error) {
      console.error('Failed to fetch NFTs:', error)
      setNfts([])
      setCollections([])
    } finally {
      setLoading(false)
    }
  }

  const refreshNFTs = async () => {
    await fetchNFTs()
  }

  const addNFT = (nft: NFT) => {
    setNfts(prev => [...prev, nft])
  }

  useEffect(() => {
    if (wallet.connected && wallet.address) {
      fetchNFTs()
    } else {
      setNfts([])
      setLoading(false)
    }
  }, [wallet.connected, wallet.address])

  return (
    <NFTContext.Provider value={{ nfts, loading, collections, refreshNFTs, addNFT }}>
      {children}
    </NFTContext.Provider>
  )
}

export function useNFTs() {
  const context = useContext(NFTContext)
  if (context === undefined) {
    throw new Error('useNFTs must be used within an NFTProvider')
  }
  return context
} 
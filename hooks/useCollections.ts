import { useMemo } from 'react'
import { useNFTs } from '@/context/NFTContext'

interface CollectionGroup {
  name: string
  nfts: Array<{
    objectId: string
    name: string
    description: string
    image_url: string
    rarity: string
    creator: string
    collection?: string
  }>
  count: number
}

interface CollectionStats {
  totalCollections: number
  totalNFTs: number
  collectionGroups: CollectionGroup[]
  uncollectedNFTs: CollectionGroup
}

export function useCollections(): CollectionStats {
  const { nfts } = useNFTs()

  return useMemo(() => {
    // Group NFTs by collection
    const collectionMap = new Map<string, CollectionGroup>()
    const uncollectedNFTs: typeof nfts = []

    nfts.forEach(nft => {
      if (nft.collection && nft.collection.trim() !== '') {
        const collectionName = nft.collection
        
        if (!collectionMap.has(collectionName)) {
          collectionMap.set(collectionName, {
            name: collectionName,
            nfts: [],
            count: 0
          })
        }
        
        const collection = collectionMap.get(collectionName)!
        collection.nfts.push(nft)
        collection.count = collection.nfts.length
      } else {
        uncollectedNFTs.push(nft)
      }
    })

    const collectionGroups = Array.from(collectionMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    )

    return {
      totalCollections: collectionGroups.length,
      totalNFTs: nfts.length,
      collectionGroups,
      uncollectedNFTs: {
        name: 'Uncollected',
        nfts: uncollectedNFTs,
        count: uncollectedNFTs.length
      }
    }
  }, [nfts])
}

// Hook to get collection names for dropdown
export function useCollectionNames(): string[] {
  const { collections } = useNFTs()
  
  return useMemo(() => {
    // Return meaningful collection names
    const meaningfulNames = collections.filter(name => 
      name && 
      name.trim() !== '' && 
      name !== 'undefined' && 
      name !== 'null'
    )
    
    // Return only actual collections, no hardcoded suggestions
    return meaningfulNames.sort()
  }, [collections])
} 
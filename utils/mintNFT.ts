import { Transaction } from '@mysten/sui/transactions'

interface NFTData {
  name: string
  description: string
  image_url: string
  rarity: string
  collection?: string
}

export async function mintNFT(
  wallet: any,
  nftData: NFTData,
  packageId: string,
  marketplaceId: string
) {
  if (!wallet.connected) {
    throw new Error('Wallet not connected')
  }

  const tx = new Transaction()

  // Split coins for payment (0.01 SUI = 10,000,000 MIST)
  const [coin] = tx.splitCoins(tx.gas, [10_000_000])

  // Prepare collection parameter - use Option type
  const collectionParam = nftData.collection && nftData.collection.trim() !== '' 
    ? tx.pure.option('string', nftData.collection)
    : tx.pure.option('string', null)

  // Call the mint function with collection parameter and base name
  tx.moveCall({
    target: `${packageId}::nft_marketplace::mint_nft`,
    arguments: [
      tx.object(marketplaceId),
      tx.pure.string(nftData.name), // This is now the base_name
      tx.pure.string(nftData.description),
      tx.pure.string(nftData.image_url),
      tx.pure.string(nftData.rarity),
      collectionParam,
      coin,
    ],
  })

  // Sign and execute the transaction
  const result = await wallet.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  })

  return result
} 
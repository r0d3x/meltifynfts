'use client'

import { useState } from 'react'
import { useWallet } from '@suiet/wallet-kit'
import { ConnectButton } from '@suiet/wallet-kit'
import { ArrowLeft, Timer, Users, Coins, Ticket, Zap } from 'lucide-react'
import Link from 'next/link'

// Mock lottery data - replace with real data from blockchain
const mockLotteries = [
  {
    id: '1',
    nft: {
      name: 'Cosmic Dragon #1234',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rarity: 'Legendary'
    },
    creator: '0x1234...5678',
    ticketPrice: '0.1',
    totalTickets: 100,
    soldTickets: 67,
    timeLeft: '2h 34m',
    instantPayout: '9.5'
  },
  {
    id: '2',
    nft: {
      name: 'Neon Cat #567',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      rarity: 'Epic'
    },
    creator: '0x5678...9012',
    ticketPrice: '0.05',
    totalTickets: 50,
    soldTickets: 23,
    timeLeft: '5h 12m',
    instantPayout: '2.4'
  },
  {
    id: '3',
    nft: {
      name: 'Abstract Waves #89',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      rarity: 'Rare'
    },
    creator: '0x9012...3456',
    ticketPrice: '0.02',
    totalTickets: 200,
    soldTickets: 145,
    timeLeft: '1h 45m',
    instantPayout: '3.8'
  }
]

export default function LotteriesPage() {
  const wallet = useWallet()
  const [selectedLottery, setSelectedLottery] = useState<string | null>(null)
  const [ticketAmount, setTicketAmount] = useState(1)

  const handleBuyTickets = async (lotteryId: string) => {
    if (!wallet.connected) return
    
    try {
      // TODO: Implement ticket buying logic
      console.log(`Buying ${ticketAmount} tickets for lottery ${lotteryId}`)
      alert(`Successfully bought ${ticketAmount} tickets!`)
      setSelectedLottery(null)
      setTicketAmount(1)
    } catch (error) {
      console.error('Failed to buy tickets:', error)
      alert('Failed to buy tickets. Please try again.')
    }
  }

  if (!wallet.connected) {
    return (
      <div className="min-h-screen bg-sui-dark-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-sui-dark-800 rounded-sui-lg flex items-center justify-center mx-auto mb-8 border border-sui-dark-700">
            <Ticket className="w-12 h-12 text-sui-blue" />
          </div>
          <h2 className="text-3xl text-white mb-6">Connect to Browse Lotteries</h2>
          <p className="text-sui-dark-300 mb-8">Connect your wallet to participate in NFT lotteries</p>
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
                <span className="text-sm">Active Lotteries</span>
              </div>
            </div>

            <ConnectButton className="!bg-sui-blue !text-black !px-6 !py-3 !rounded-sui !text-sm hover:!bg-sui-blue-light !transition-colors !duration-200">
              {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Wallet'}
            </ConnectButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Active NFT Lotteries</h1>
          <p className="text-xl text-sui-dark-300">Buy tickets and win amazing NFTs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6 text-center">
            <div className="text-3xl text-sui-blue mb-2">{mockLotteries.length}</div>
            <div className="text-sm text-sui-dark-300">Active Lotteries</div>
          </div>
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6 text-center">
            <div className="text-3xl text-sui-blue mb-2">235</div>
            <div className="text-sm text-sui-dark-300">Total Tickets Sold</div>
          </div>
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6 text-center">
            <div className="text-3xl text-sui-blue mb-2">15.7 SUI</div>
            <div className="text-sm text-sui-dark-300">Total Volume</div>
          </div>
        </div>

        {/* Lotteries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockLotteries.map((lottery) => (
            <div key={lottery.id} className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg overflow-hidden hover:shadow-sui-dark hover:border-sui-dark-600 transition-all duration-300">
              {/* NFT Image */}
              <div className="aspect-square relative bg-sui-dark-900 overflow-hidden">
                <img
                  src={lottery.nft.image}
                  alt={lottery.nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${
                    lottery.nft.rarity === 'Common' ? 'bg-gray-600' :
                    lottery.nft.rarity === 'Rare' ? 'bg-blue-600' :
                    lottery.nft.rarity === 'Epic' ? 'bg-purple-600' : 'bg-yellow-600'
                  }`}>
                    {lottery.nft.rarity}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="bg-black/70 backdrop-blur-sm rounded-sui px-3 py-1 flex items-center space-x-1">
                    <Timer className="w-3 h-3 text-sui-blue" />
                    <span className="text-xs text-white">{lottery.timeLeft}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg text-white mb-2 line-clamp-1">{lottery.nft.name}</h3>
                <p className="text-xs text-sui-dark-400 mb-4">by {lottery.creator}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-sui-dark-300">Progress</span>
                    <span className="text-white">{lottery.soldTickets}/{lottery.totalTickets}</span>
                  </div>
                  <div className="w-full bg-sui-dark-900 rounded-full h-2">
                    <div 
                      className="bg-sui-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(lottery.soldTickets / lottery.totalTickets) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sui-blue text-lg">{lottery.ticketPrice} SUI</div>
                    <div className="text-sui-dark-400 text-xs">Per Ticket</div>
                  </div>
                  <div>
                    <div className="text-sui-blue text-lg">{lottery.instantPayout} SUI</div>
                    <div className="text-sui-dark-400 text-xs">Instant Payout</div>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => setSelectedLottery(lottery.id)}
                  className="w-full py-3 bg-sui-blue text-black rounded-sui hover:bg-sui-blue-light transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Buy Tickets</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockLotteries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sui-dark-800 rounded-sui-lg flex items-center justify-center mx-auto mb-8 border border-sui-dark-700">
              <Timer className="w-12 h-12 text-sui-dark-500" />
            </div>
            <h3 className="text-2xl text-white mb-4">No Active Lotteries</h3>
            <p className="text-sui-dark-300 mb-8">Be the first to create an NFT lottery!</p>
            <Link href="/" className="inline-flex items-center space-x-2 px-6 py-3 bg-sui-blue text-black rounded-sui hover:bg-sui-blue-light transition-colors duration-200">
              <Zap className="w-4 h-4" />
              <span>Create Lottery</span>
            </Link>
          </div>
        )}
      </main>

      {/* Buy Tickets Modal */}
      {selectedLottery && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 w-full max-w-md">
            <h3 className="text-2xl text-white mb-6">Buy Lottery Tickets</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white mb-3">Number of Tickets</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={ticketAmount}
                  onChange={(e) => setTicketAmount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="w-full px-4 py-3 bg-sui-dark-900 border border-sui-dark-600 rounded-sui text-white focus:outline-none focus:ring-2 focus:ring-sui-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="bg-sui-dark-900 border border-sui-dark-600 rounded-sui p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-sui-dark-300">Tickets</span>
                  <span className="text-white">{ticketAmount}x</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-sui-dark-300">Price per ticket</span>
                  <span className="text-white">0.1 SUI</span>
                </div>
                <div className="border-t border-sui-dark-600 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-white">Total</span>
                    <span className="text-sui-blue text-lg">{(ticketAmount * 0.1).toFixed(1)} SUI</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedLottery(null)}
                  className="flex-1 py-3 bg-sui-dark-700 text-sui-dark-200 rounded-sui hover:bg-sui-dark-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuyTickets(selectedLottery)}
                  className="flex-1 py-3 bg-sui-blue text-black rounded-sui hover:bg-sui-blue-light transition-colors duration-200"
                >
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

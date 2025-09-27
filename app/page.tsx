'use client'

import { useState } from 'react'
import { useWallet } from '@suiet/wallet-kit'
import { ConnectButton } from '@suiet/wallet-kit'
import { Plus, Zap, Gift, TrendingUp, ArrowRight, Coins, Timer, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const wallet = useWallet()
  const [showOnboarding, setShowOnboarding] = useState(!wallet.connected)

  if (!wallet.connected) {
    return (
      <div className="min-h-screen bg-sui-dark-900">
        {/* Hero Section for New Users */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sui-blue/20 to-sui-blue-light/10"></div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-24">
            <div className="text-center">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-sui-blue to-sui-blue-light rounded-sui-lg flex items-center justify-center">
                  <span className="text-black text-xl">🍫</span>
                </div>
                <h1 className="text-3xl text-white">MeltyFi</h1>
              </div>

              <h2 className="text-5xl text-white mb-6 leading-tight max-w-4xl mx-auto">
                Turn your NFTs into 
                <span className="bg-gradient-to-r from-sui-blue to-sui-blue-light bg-clip-text text-transparent"> instant liquidity</span>
              </h2>
              
              <p className="text-xl text-sui-dark-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Create NFT lotteries and get paid immediately. Others buy tickets, you get liquidity now. 
                It's like selling your NFT but keeping the upside potential.
              </p>

              {/* How It Works - Simple Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 text-center">
                  <div className="w-16 h-16 bg-sui-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Gift className="w-8 h-8 text-sui-blue" />
                  </div>
                  <h3 className="text-xl text-white mb-4">1. Deposit NFT</h3>
                  <p className="text-sui-dark-300">Put your valuable NFT into a lottery as the prize</p>
                </div>

                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 text-center">
                  <div className="w-16 h-16 bg-sui-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-sui-blue" />
                  </div>
                  <h3 className="text-xl text-white mb-4">2. Get Paid Now</h3>
                  <p className="text-sui-dark-300">Receive 95% of potential funds immediately</p>
                </div>

                <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 text-center">
                  <div className="w-16 h-16 bg-sui-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-sui-blue" />
                  </div>
                  <h3 className="text-xl text-white mb-4">3. Others Buy Tickets</h3>
                  <p className="text-sui-dark-300">People buy lottery tickets, winner gets your NFT</p>
                </div>
              </div>

              {/* Connect Wallet CTA */}
              <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8 max-w-md mx-auto">
                <h3 className="text-2xl text-white mb-4">Ready to start?</h3>
                <p className="text-sui-dark-300 mb-6">Connect your Sui wallet to create your first NFT lottery</p>
                <ConnectButton className="!w-full !py-4 !bg-sui-blue !text-black !text-lg !rounded-sui hover:!bg-sui-blue-light !transition-all !duration-200 !shadow-sui-dark hover:!shadow-lg">
                  Connect Wallet to Start
                </ConnectButton>
              </div>
            </div>
          </div>
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
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sui-blue to-sui-blue-light rounded-lg flex items-center justify-center">
                  <span className="text-black text-sm">🍫</span>
                </div>
                <h1 className="text-xl text-white">MeltyFi</h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/lotteries" className="flex items-center space-x-2 text-sui-dark-300 hover:text-white transition-colors duration-200 text-sm">
                  <Timer className="w-4 h-4" />
                  <span>Active Lotteries</span>
                </Link>
                <Link href="/create-nft" className="flex items-center space-x-2 text-sui-dark-300 hover:text-white transition-colors duration-200 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Create NFT</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <ConnectButton className="!bg-sui-blue !text-black !px-6 !py-3 !rounded-sui !text-sm hover:!bg-sui-blue-light !transition-colors !duration-200 !shadow-sui-dark">
                {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Wallet'}
              </ConnectButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome Back */}
        <div className="text-center mb-16">
          <h1 className="text-4xl text-white mb-4">Welcome back to MeltyFi</h1>
          <p className="text-xl text-sui-dark-300">Your NFT liquidity dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
            <div className="text-3xl text-sui-blue mb-2">0</div>
            <div className="text-sm text-sui-dark-300">Active Lotteries</div>
          </div>
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
            <div className="text-3xl text-sui-blue mb-2">0 SUI</div>
            <div className="text-sm text-sui-dark-300">Total Earned</div>
          </div>
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
            <div className="text-3xl text-sui-blue mb-2">0</div>
            <div className="text-sm text-sui-dark-300">Tickets Bought</div>
          </div>
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui p-6">
            <div className="text-3xl text-sui-blue mb-2">0</div>
            <div className="text-sm text-sui-dark-300">NFTs Won</div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Create Lottery */}
          <div className="bg-gradient-to-br from-sui-blue/10 to-sui-blue-light/5 border border-sui-blue/20 rounded-sui-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-sui-blue rounded-sui flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-2xl text-white mb-2">Create NFT Lottery</h3>
                <p className="text-sui-dark-300">Get instant liquidity from your NFTs</p>
              </div>
            </div>
            <button className="w-full py-4 bg-sui-blue text-black text-lg rounded-sui hover:bg-sui-blue-light transition-all duration-200 shadow-sui-dark hover:shadow-lg flex items-center justify-center space-x-2">
              <span>Start Lottery</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Browse Lotteries */}
          <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-sui-dark-700 rounded-sui flex items-center justify-center">
                <Users className="w-6 h-6 text-sui-blue" />
              </div>
              <div>
                <h3 className="text-2xl text-white mb-2">Browse Lotteries</h3>
                <p className="text-sui-dark-300">Buy tickets and win amazing NFTs</p>
              </div>
            </div>
            <Link href="/lotteries" className="w-full py-4 bg-sui-dark-700 text-white text-lg rounded-sui hover:bg-sui-dark-600 transition-all duration-200 flex items-center justify-center space-x-2 border border-sui-dark-600">
              <span>Explore Lotteries</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick NFT Creation */}
        <div className="bg-sui-dark-800 border border-sui-dark-700 rounded-sui-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl text-white mb-2">Don't have NFTs yet?</h3>
              <p className="text-sui-dark-300">Create your own NFTs first, then turn them into lotteries</p>
            </div>
            <Link href="/create-nft" className="inline-flex items-center space-x-2 px-6 py-3 bg-sui-dark-700 text-sui-blue rounded-sui hover:bg-sui-dark-600 transition-colors duration-200 border border-sui-dark-600">
              <Plus className="w-4 h-4" />
              <span>Create NFT</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

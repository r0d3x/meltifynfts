'use client'

import { ConnectButton, useWallet } from '@suiet/wallet-kit'
import { Wallet, Plus, Home, User } from 'lucide-react'

interface HeaderProps {
  onMintClick: () => void
}

export default function Header({ onMintClick }: HeaderProps) {
  const wallet = useWallet()

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-sui-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">S</span>
              </div>
              <h1 className="text-xl font-medium text-sui-gray-900">SuiNFT</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="flex items-center space-x-2 text-sui-gray-600 hover:text-sui-blue transition-colors">
                <Home size={18} />
                <span>Marketplace</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-sui-gray-600 hover:text-sui-blue transition-colors">
                <User size={18} />
                <span>My NFTs</span>
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onMintClick}
              className="btn-primary flex items-center space-x-2"
              disabled={!wallet.connected}
            >
              <Plus size={18} />
              <span>Mint NFT</span>
            </button>
            
            <div className="relative">
              <ConnectButton className="!bg-sui-blue !text-white !px-6 !py-3 !rounded-sui !font-medium hover:!bg-sui-blue-dark !transition-colors !duration-200 !shadow-sui hover:!shadow-sui-hover">
                {wallet.connected ? (
                  <div className="flex items-center space-x-2">
                    <Wallet size={18} />
                    <span>{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Wallet size={18} />
                    <span>Connect Wallet</span>
                  </div>
                )}
              </ConnectButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 
# 🧪 Simple NFT Testing App

A minimal, clean NFT testing app on Sui blockchain.

## ✅ What It Does

- **Connect Wallet** - Connect your Sui wallet
- **Create NFTs** - Simple form to create NFTs with image URL
- **Test Minting** - Demo mode until contract is deployed
- **Clean Design** - Minimal, focused interface

## 🚀 Quick Start

1. **Run the app**:
   ```bash
   npm run dev
   ```
   
2. **Open** `http://localhost:3000`

3. **Connect** your Sui wallet

4. **Create NFT**:
   - Click "Create NFT"
   - Enter name and image URL
   - Choose rarity
   - Click "Mint NFT"

## 📋 Current Status

- ✅ **Frontend**: Working
- ✅ **Wallet**: Connect/disconnect working
- ✅ **Form**: Create NFT form working
- 🔄 **Minting**: Demo mode (shows success message)
- ⏳ **Contract**: Deploy to enable real minting

## 🔧 To Enable Real Minting

1. **Deploy contract**:
   ```bash
   ./scripts/deploy.sh
   ```

2. **Update .env.local** with contract addresses

3. **Restart app** - Real minting will work automatically

## 🎨 Features

- **Simple UI** - Just wallet connect and create button
- **Small Form** - Minimal fields (name, image URL, rarity)
- **Preview** - Shows small preview of NFT
- **Demo Mode** - Works without contract deployment
- **Clean Design** - Focused on testing, not marketing

## 📝 NFT Fields

- **Name** *(required)* - NFT name
- **Description** *(optional)* - NFT description  
- **Image URL** *(required)* - Direct link to image
- **Rarity** - Common, Rare, Epic, Legendary

## 🎯 Perfect For

- Testing NFT creation
- Wallet integration testing
- Smart contract development
- Quick prototyping

---

**Simple. Clean. Functional. 🧪** 
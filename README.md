

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

### Blockchain
- **Sui Blockchain** - Fast and secure blockchain platform
- **Move Language** - Smart contract development
- **@mysten/sui.js** - Sui JavaScript SDK
- **@suiet/wallet-kit** - Wallet integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Sui CLI installed
- A Sui wallet (Sui Wallet, Suiet, etc.)
- Some SUI tokens for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nft-marketplace-sui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Deploy the Move contract**
   ```bash
   sui move build
   sui client publish --gas-budget 20000000
   ```

4. **Update environment variables**
   - Copy `.env.local` and update the contract addresses from deployment
   - Update `NEXT_PUBLIC_PACKAGE_ID` and `NEXT_PUBLIC_MARKETPLACE_ID`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Smart Contract Deployment

### Build and Deploy

```bash
# Build the Move package
sui move build

# Publish to testnet
sui client publish --gas-budget 20000000

# Note the Package ID and Marketplace object ID from the output
```

### Update Configuration

After deployment, update `.env.local` with:
- Package ID from the publish transaction
- Marketplace object ID from the created objects

## Usage

1. **Connect Wallet** - Click "Connect Wallet" and choose your Sui wallet
2. **Browse NFTs** - View the 4 available NFT designs
3. **Mint NFT** - Click "Mint NFT" button and select your desired NFT
4. **Confirm Transaction** - Approve the transaction in your wallet
5. **View Your NFT** - The NFT will appear in your wallet

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── NFTCard.tsx        # Individual NFT card
│   ├── NFTGrid.tsx        # NFT grid layout
│   ├── MintModal.tsx      # Mint selection modal
│   └── WalletProvider.tsx # Wallet context
├── sources/               # Move smart contracts
│   └── nft_marketplace.move
├── Move.toml             # Move package configuration
└── package.json          # Node.js dependencies
```

## Smart Contract Functions

### Core Functions

- `mint_nft()` - Mint a new NFT for 0.01 SUI
- `transfer_nft()` - Transfer NFT to another address
- `get_nft_info()` - Get NFT metadata
- `get_marketplace_stats()` - Get marketplace statistics

### Events

- `NFTMinted` - Emitted when an NFT is minted
- `NFTTransferred` - Emitted when an NFT is transferred

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Move Commands

```bash
sui move build              # Build Move package
sui move test              # Run Move tests
sui client publish         # Deploy to network
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sui Foundation for the amazing blockchain platform
- Mysten Labs for the excellent developer tools
- Unsplash for the beautiful NFT artwork
- The Sui community for inspiration and support

---

**Happy Minting! 🎨✨** 
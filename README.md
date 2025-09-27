# NFT Marketplace

A minimal NFT marketplace on Sui blockchain with dynamic naming and collections.

## Quick Start

```bash
npm install
npm run dev
```

**Contract already deployed!** Create `.env.local`:
```bash
NEXT_PUBLIC_PACKAGE_ID=0xba155c090e939e90b68268f80d54b4625b463f17dd527373535d7c54563d8b87
NEXT_PUBLIC_MARKETPLACE_ID=0x0c2327468385612f4d3138dda442b8cd36a79d51ca8b0b00c596dd3b0e1c8ad6
```

## Features

- **Quick Mint (Free!)**: One-click free NFT minting
- **Quick Mint 10 (Free!)**: Batch mint 10 random NFTs at once
- Dynamic NFT names (`BaseName #1234`)
- Collection management
- Sui wallet integration
- Clean Sui design system

## Quick Mint Details

The Quick Mint buttons create free NFTs with:
- Random names (Ape, Monkey, Chimp, Gorilla, Baboon, etc.)
- [Hand-drawn ape illustration](https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg)
- Automatic "Random" collection assignment
- No payment required!

**Batch Minting**: The "Quick Mint 10" button creates 10 unique NFTs in a single transaction with different random names.

## Tech Stack

- Next.js + TypeScript
- Sui Move
- Tailwind CSS
- @mysten/sui

## Deploy Your Own (Optional)

If you want to deploy your own contract:
```bash
sui move build
sui client publish --gas-budget 100000000
```

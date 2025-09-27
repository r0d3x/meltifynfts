# NFT Marketplace

A minimal NFT marketplace on Sui blockchain with dynamic naming and collections.

## Quick Start

```bash
npm install
npm run dev
```

**Contract already deployed!** Create `.env.local`:
```bash
NEXT_PUBLIC_PACKAGE_ID=0x8f91eccb11d07685a0d2818a92a1ffea48f224366ed013a751a18dca1799854b
NEXT_PUBLIC_MARKETPLACE_ID=0x69524647a65cfeeda70a9a02308c413b85020881afd05ba21da971590245312b
```

## Features

- **Quick Mint (Free!)**: One-click free NFT minting with random ape artwork
- Dynamic NFT names (`BaseName #1234`)
- Collection management
- Sui wallet integration
- Clean Sui design system

## Quick Mint Details

The "Quick Mint" button creates free NFTs with:
- Random names (Ape #1, Monkey #2, etc.)
- [Hand-drawn ape illustration](https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg)
- Automatic "Random" collection assignment
- No payment required!

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

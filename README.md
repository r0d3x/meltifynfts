# NFT Marketplace

A minimal NFT marketplace on Sui blockchain with dynamic naming and collections.

## Quick Start

```bash
npm install
npm run dev
```

**Contract already deployed!** Create `.env.local`:
```bash
NEXT_PUBLIC_PACKAGE_ID=0xf26823e22a284a2fc425ec96c01624e3649b163c0cf1b45685f40adb780e6b47
NEXT_PUBLIC_MARKETPLACE_ID=0x78a1ce654a2156dfe5f710183251f9e6664bbc97d7b409e3762fc43053340b4c
```

## Features

- Dynamic NFT names (`BaseName #1234`)
- Collection management
- Sui wallet integration
- Clean Sui design system

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

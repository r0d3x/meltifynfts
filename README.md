# NFT Marketplace

A minimal NFT marketplace on Sui blockchain with dynamic naming and collections.

## Setup

```bash
npm install
npm run dev
```

## Deploy Contract

```bash
sui move build
sui client publish --gas-budget 100000000
```

Create `.env.local`:
```
NEXT_PUBLIC_PACKAGE_ID=your_package_id
NEXT_PUBLIC_MARKETPLACE_ID=your_marketplace_id
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
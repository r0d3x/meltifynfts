#!/bin/bash

echo "🔧 Setting up SuiNFT Marketplace..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    echo "❌ Sui CLI is not installed. Please install Sui CLI first."
    echo "Visit: https://docs.sui.io/guides/developer/getting-started/sui-install"
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    exit 1
fi

echo "✅ Dependencies installed!"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your contract addresses after deployment."
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run './scripts/deploy.sh' to deploy the smart contract"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser" 
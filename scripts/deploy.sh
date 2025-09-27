#!/bin/bash

echo "🚀 Deploying NFT Marketplace to Sui Testnet..."

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    echo "❌ Sui CLI is not installed!"
    echo "Please install Sui CLI first:"
    echo "1. Visit: https://docs.sui.io/guides/developer/getting-started/sui-install"
    echo "2. Or run: curl -fLJO https://github.com/MystenLabs/sui/releases/download/testnet-v1.14.2/sui-testnet-v1.14.2-macos-x86_64.tgz"
    echo "3. Extract and add to PATH"
    exit 1
fi

# Build the Move package
echo "📦 Building Move package..."
sui move build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    echo "Make sure you have a valid Move.toml and sources directory"
    exit 1
fi

echo "✅ Build successful!"

# Check if connected to testnet
echo "🌐 Checking Sui client configuration..."
ACTIVE_ENV=$(sui client active-env)
echo "Active environment: $ACTIVE_ENV"

if [[ "$ACTIVE_ENV" != *"testnet"* ]]; then
    echo "⚠️  Warning: Not connected to testnet. Current environment: $ACTIVE_ENV"
    echo "To switch to testnet run: sui client switch --env testnet"
    echo "Or add testnet: sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443"
fi

# Check gas balance
echo "💰 Checking SUI balance..."
BALANCE=$(sui client balance --json | jq -r '.totalBalance // 0')
echo "Current balance: $BALANCE MIST"

if [ "$BALANCE" -lt 100000000 ]; then
    echo "⚠️  Low balance detected. You might need more SUI for deployment."
    echo "Get testnet SUI from: https://docs.sui.io/guides/developer/getting-started/get-coins"
fi

# Deploy to testnet
echo "🌐 Publishing to testnet..."
sui client publish --gas-budget 100000000 --json > deployment.json

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    echo "Check your gas balance and network connection"
    exit 1
fi

echo "✅ Deployment successful!"

# Extract package ID and marketplace ID
if command -v jq &> /dev/null; then
    PACKAGE_ID=$(jq -r '.objectChanges[] | select(.type == "published") | .packageId' deployment.json)
    MARKETPLACE_ID=$(jq -r '.objectChanges[] | select(.objectType | contains("Marketplace")) | .objectId' deployment.json)
else
    echo "⚠️  jq not found. Please extract Package ID and Marketplace ID manually from deployment.json"
    echo "📄 Deployment details saved to deployment.json"
    cat deployment.json
    exit 0
fi

echo "📋 Deployment Details:"
echo "Package ID: $PACKAGE_ID"
echo "Marketplace ID: $MARKETPLACE_ID"

# Create .env.local file
echo "📝 Creating .env.local file..."
cat > .env.local << EOF
# Sui Network Configuration
NEXT_PUBLIC_NETWORK=testnet

# Smart Contract Addresses
NEXT_PUBLIC_PACKAGE_ID=$PACKAGE_ID
NEXT_PUBLIC_MARKETPLACE_ID=$MARKETPLACE_ID

# RPC Configuration
NEXT_PUBLIC_SUI_RPC_URL=https://fullnode.testnet.sui.io:443
EOF

echo "✅ .env.local created with deployment addresses!"
echo ""
echo "🎉 Deployment complete!"
echo "📝 Next steps:"
echo "1. Copy the Package ID and Marketplace ID above"
echo "2. Run 'npm run dev' to start the frontend"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Connect your wallet and start minting NFTs!"
echo ""
echo "🔗 Useful links:"
echo "- Sui Explorer: https://testnet.suivision.xyz/package/$PACKAGE_ID"
echo "- Get testnet SUI: https://docs.sui.io/guides/developer/getting-started/get-coins" 
# ProfileNFT DApp

A decentralized application for creating and minting personalized profile cards as NFTs using Thirdweb.

## Setup Instructions

### 1. Get Thirdweb Client ID
1. Go to [Thirdweb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project
3. Copy your Client ID
4. Add it to `.env.local`

### 2. Deploy NFT Contract
1. Go to [Thirdweb Deploy](https://thirdweb.com/deploy)
2. Deploy the `ProfileNFT.sol` contract
3. Copy the contract address
4. Update `NFT_CONTRACT_ADDRESS` in `components/mint-section.tsx`

### 3. Configure Chain
- Default is set to Sepolia testnet
- Change the chain in `app/page.tsx` and other components as needed
- Supported chains: Ethereum, Polygon, Arbitrum, Optimism, etc.

### 4. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

## Features

- **Wallet Connection**: Connect with MetaMask, WalletConnect, Coinbase Wallet, etc.
- **Real Balance Display**: Shows actual wallet balance using Thirdweb
- **Profile Customization**: Add nickname and generate profile cards
- **NFT Minting**: Mint profile cards as NFTs on-chain
- **Responsive Design**: Works on all devices
- **Blockchain Integration**: Full Web3 functionality with Thirdweb

## Smart Contract Features

- **Soulbound NFTs**: Profile NFTs are non-transferable (optional)
- **Profile Updates**: Update profile data after minting
- **One Per Address**: Each address can only mint one profile NFT
- **On-chain Metadata**: Profile data stored on blockchain

## Customization

- Update colors in `tailwind.config.ts`
- Modify profile data fields in the smart contract
- Add more wallet connection options
- Integrate with IPFS for metadata storage
























![tw-banner](https://github.com/thirdweb-example/next-starter/assets/57885104/20c8ce3b-4e55-4f10-ae03-2fe4743a5ee8)

# thirdweb-next-starter

Starter template to build an onchain react native app with [thirdweb](https://thirdweb.com/) and [next](https://nextjs.org/).

## Installation

Install the template using [thirdweb create](https://portal.thirdweb.com/cli/create)

```bash
  npx thirdweb create app --next
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`CLIENT_ID`

To learn how to create a client ID, refer to the [client documentation](https://portal.thirdweb.com/typescript/v5/client).

## Run locally

Install dependencies

```bash
yarn
```

Start development server

```bash
yarn dev
```

Create a production build

```bash
yarn build
```

Preview the production build

```bash
yarn start
```

## Resources

- [Documentation](https://portal.thirdweb.com/typescript/v5)
- [Templates](https://thirdweb.com/templates)
- [YouTube](https://www.youtube.com/c/thirdweb)
- [Blog](https://blog.thirdweb.com)

## Need help?

For help or feedback, please [visit our support site](https://thirdweb.com/support)

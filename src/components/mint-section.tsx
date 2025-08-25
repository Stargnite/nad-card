"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Download, ExternalLink, AlertCircle } from "lucide-react"
import { useSendTransaction, useActiveAccount } from "thirdweb/react"
import { getContract } from "thirdweb"
import { client } from "@/lib/client"
import type { Chain } from "thirdweb/chains"

interface MintSectionProps {
  walletAddress: string
  nickname: string
  profileData: {
    transactionCount: number
    accountAge: number
    nftCount: number
  }
  chain: Chain
}

export function MintSection({ walletAddress, nickname, profileData, chain }: MintSectionProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const [tokenId, setTokenId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const account = useActiveAccount()
  const { mutate: sendTransaction } = useSendTransaction()

  // Replace with your actual NFT contract address
  const NFT_CONTRACT_ADDRESS = "0x..." // You'll need to deploy this contract first

  const contract = getContract({
    client,
    chain,
    address: NFT_CONTRACT_ADDRESS,
  })

  const generateMetadata = () => {
    return {
      name: `${nickname}'s Profile`,
      description: `Blockchain profile for ${nickname} (${walletAddress})`,
      image: "ipfs://...", // You'll need to upload the profile card image to IPFS
      attributes: [
        {
          trait_type: "Nickname",
          value: nickname,
        },
        {
          trait_type: "Wallet Address",
          value: walletAddress,
        },
        {
          trait_type: "Transaction Count",
          value: profileData.transactionCount,
        },
        {
          trait_type: "Account Age (Days)",
          value: profileData.accountAge,
        },
        {
          trait_type: "NFT Count",
          value: profileData.nftCount,
        },
      ],
    }
  }

  const handleMint = async () => {
    if (!account) return

    setIsMinting(true)
    setError(null)

    try {
      // Generate metadata
      const metadata = generateMetadata()

      // In a real implementation, you would:
      // 1. Upload the profile card image to IPFS
      // 2. Upload the metadata to IPFS
      // 3. Call the mint function with the metadata URI

      // For now, we'll simulate the minting process
      // Replace this with actual contract call:
      /*
      const transaction = prepareContractCall({
        contract,
        method: "mintTo",
        params: [account.address, "ipfs://metadata-uri"]
      })
      
      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Mint successful:", result)
          setTokenId(Math.floor(Math.random() * 10000).toString())
          setIsMinted(true)
          setIsMinting(false)
        },
        onError: (error) => {
          console.error("Mint failed:", error)
          setError("Failed to mint NFT. Please try again.")
          setIsMinting(false)
        }
      })
      */

      // Simulate minting for demo
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const mockTokenId = Math.floor(Math.random() * 10000).toString()
      setTokenId(mockTokenId)
      setIsMinted(true)
      setIsMinting(false)
    } catch (err) {
      console.error("Minting error:", err)
      setError("Failed to mint NFT. Please try again.")
      setIsMinting(false)
    }
  }

  const handleDownload = () => {
    // This would generate and download the profile card as an image
    console.log("Downloading profile card...")
  }

  const viewOnExplorer = () => {
    if (tokenId) {
      // Open the NFT on the blockchain explorer
      const explorerUrl = `https://sepolia.etherscan.io/token/${NFT_CONTRACT_ADDRESS}?a=${tokenId}`
      window.open(explorerUrl, "_blank")
    }
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <CardTitle className="text-white">Mint Your Profile NFT</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          Transform your profile into a unique NFT on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contract Setup Notice */}
        {NFT_CONTRACT_ADDRESS === "0x..." && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-semibold">Setup Required</span>
            </div>
            <p className="text-orange-200 text-sm">
              Deploy your NFT contract using Thirdweb and update the contract address in the code.
            </p>
          </div>
        )}

        {/* Profile Summary */}
        <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
          <h4 className="text-white font-semibold">Profile Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-300">Nickname:</div>
            <div className="text-white">{nickname}</div>
            <div className="text-gray-300">Address:</div>
            <div className="text-white font-mono text-xs">{walletAddress.slice(0, 10)}...</div>
            <div className="text-gray-300">Transactions:</div>
            <div className="text-white">{profileData.transactionCount}</div>
            <div className="text-gray-300">Account Age:</div>
            <div className="text-white">{profileData.accountAge} days</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Mint Status */}
        {isMinted && tokenId && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Minted Successfully</Badge>
            </div>
            <p className="text-green-300 text-sm">Token ID: #{tokenId}</p>
            <div className="flex space-x-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownload}
                className="border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={viewOnExplorer}
                className="border-green-500/30 text-green-300 hover:bg-green-500/10 bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
            </div>
          </div>
        )}

        {/* Mint Button */}
        {!isMinted && (
          <Button
            onClick={handleMint}
            disabled={isMinting || !account || NFT_CONTRACT_ADDRESS === "0x..."}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
          >
            {isMinting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Minting NFT...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Mint Profile NFT</span>
              </div>
            )}
          </Button>
        )}

        {/* Mint Info */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Gas fees will be calculated automatically</p>
          <p>• Your NFT metadata will be stored on IPFS</p>
          <p>• Metadata includes all profile information</p>
        </div>
      </CardContent>
    </Card>
  )
}

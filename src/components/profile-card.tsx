"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Hash, Calendar, ImageIcon } from "lucide-react"
import { generateAvatar } from "@/lib/utils"
import { useWalletBalance } from "thirdweb/react"
import { client } from "@/lib/client"
import type { Chain } from "thirdweb/chains"

interface ProfileCardProps {
  walletAddress: string | undefined
  nickname: string
  profileData: {
    transactionCount: number
    accountAge: number
    nftCount: number
  } | null
  chain: Chain
}

export function ProfileCard({ walletAddress, nickname, profileData, chain }: ProfileCardProps) {
  const { data: balance } = useWalletBalance({
    client,
    chain,
    address: walletAddress,
  })

  if (!walletAddress) return null

  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  const avatar = generateAvatar(walletAddress)
  const formattedBalance = balance ? Number.parseFloat(balance.displayValue).toFixed(4) : "0.0000"

  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-slate-800 to-purple-900/50 border-purple-500/30 backdrop-blur-sm overflow-hidden">
      {/* Header with gradient */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 relative">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <CardContent className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-12 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-slate-800 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-2xl font-bold text-white">
            {avatar}
          </div>
        </div>

        <div className="pt-12 space-y-4">
          {/* Name and Address */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{nickname || "Anonymous User"}</h3>
            <p className="text-gray-400 text-sm font-mono">{shortAddress}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Wallet className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Balance</span>
              </div>
              <p className="text-white font-semibold">
                {formattedBalance} {balance?.symbol || "ETH"}
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Hash className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Transactions</span>
              </div>
              <p className="text-white font-semibold">{profileData?.transactionCount || 0}</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Account Age</span>
              </div>
              <p className="text-white font-semibold">{profileData?.accountAge || 0}d</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <ImageIcon className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-400">NFTs</span>
              </div>
              <p className="text-white font-semibold">{profileData?.nftCount || 0}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Verified
            </Badge>
            {(profileData?.transactionCount || 0) > 100 && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Active Trader
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

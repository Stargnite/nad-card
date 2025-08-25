"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Zap } from "lucide-react"
import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { defineChain } from "thirdweb/chains"

const chain = defineChain(11155111) // Sepolia testnet

export function WalletConnection() {
  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Connect Wallet</CardTitle>
        <CardDescription className="text-gray-300">
          Connect your wallet to create your Nad Card
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-300">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Secure connection</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>Instant profile generation</span>
          </div>
        </div>

        <div className="w-full">
          <ConnectButton
            client={client}
            chain={chain}
            connectButton={{
              label: "Connect Wallet",
              className:
                "!w-full !bg-gradient-to-r !from-blue-600 !to-purple-600 hover:!from-blue-700 hover:!to-purple-700 !text-white !font-semibold !py-3 !rounded-md !border-0",
            }}
            connectModal={{
              size: "wide",
              title: "Connect to ProfileNFT",
              showThirdwebBranding: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { useActiveAccount, useDisconnect } from "thirdweb/react"

export function Header() {
  const account = useActiveAccount()
  const { disconnect } = useDisconnect()

  return (
    <header className="border-b border-purple-800/30 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">NadCard</span>
        </div>

        {account && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 font-mono">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </span>
            <Button
              onClick={() => disconnect}
              variant="outline"
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

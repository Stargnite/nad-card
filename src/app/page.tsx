"use client"

import { useState, useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"
import { WalletConnection } from "@/components/wallet-connection"
import { ProfileCard } from "@/components/profile-card"
import { NicknameInput } from "@/components/nickname-input"
import { MintSection } from "@/components/mint-section"
import { Header } from "@/components/header"
import { defineChain } from "thirdweb/chains"

// You can change this to your preferred chain
const chain = defineChain(11155111) // Sepolia testnet

export default function Home() {
  const account = useActiveAccount()
  const [nickname, setNickname] = useState("")
  const [showNicknameInput, setShowNicknameInput] = useState(false)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (account?.address) {
      setShowNicknameInput(true)
      // Simulate fetching additional profile data
      // In a real app, you might fetch this from your backend or blockchain
      setProfileData({
        transactionCount: Math.floor(Math.random() * 1000) + 50,
        accountAge: Math.floor(Math.random() * 365) + 30, // days
        nftCount: Math.floor(Math.random() * 50) + 5,
      })
    } else {
      setShowNicknameInput(false)
      setNickname("")
      setProfileData(null)
    }
  }, [account?.address])

  const handleNicknameSubmit = (inputNickname: string) => {
    setNickname(inputNickname)
    setShowNicknameInput(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Create Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              NadCard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect wallet, customize your profile, and mint it as a unique NFT ID card on Monad
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!account ? (
            <div className="flex justify-center">
              <WalletConnection />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                {showNicknameInput && <NicknameInput onSubmit={handleNicknameSubmit} />}

                {nickname && profileData && (
                  <MintSection
                    walletAddress={account.address}
                    nickname={nickname}
                    profileData={profileData}
                    chain={chain}
                  />
                )}
              </div>

              <div className="flex justify-center lg:justify-end">
                <ProfileCard
                  walletAddress={account.address}
                  nickname={nickname}
                  profileData={profileData}
                  chain={chain}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

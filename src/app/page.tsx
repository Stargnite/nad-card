"use client";

import {
  Alchemy,
  Network,
  AssetTransfersCategory,
  SortingOrder,
} from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { WalletConnection } from "@/components/wallet-connection";
import { ProfileCard } from "@/components/profile-card";
import { NicknameInput } from "@/components/nickname-input";
import { MintSection } from "@/components/mint-section";
import { Header } from "@/components/header";
import { defineChain } from "thirdweb/chains";

import { getRpcClient } from "thirdweb";
import { client } from "@/lib/client";
import { alchemy } from "@/lib/alchemy";

// You can change this to your preferred chain
const chain = defineChain(10143); // Monad testnet

interface ProfileDataProps {
  transactionCount: number;
  accountAge: number;
  nftCount: number;
}

export default function Home() {
  const account = useActiveAccount();
  const [nickname, setNickname] = useState("");
  const [profileData, setProfileData] = useState<ProfileDataProps | null>(null);
  const [txCount, setTxCount] = useState<number | null>(null);
  const [accountAge, setAccountAge] = useState(0);
  const [showNicknameInput, setShowNicknameInput] = useState(false);

  const rpc = getRpcClient({ client, chain });

  // FOR GETTING TRANSACTIONS COUNT
  useEffect(() => {
    const fetchTxCount = async () => {
      if (!account?.address) return;

      const countHex = await rpc({
        method: "eth_getTransactionCount",
        params: [account.address, "latest"],
      });

      setTxCount(parseInt(countHex, 16)); // hex → number
    };

    fetchTxCount();
  }, [account?.address]);

  // FOR GETTING ACCOUNT AGE
  async function getWalletAge(address: string) {
    // Get the first transaction involving the wallet
    const transfers = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
      ],
      order: SortingOrder.ASCENDING, // oldest → newest
      maxCount: 1, // only need the first one
    });
    console.log(transfers)

    if (!transfers.transfers.length) {
      return null;
    }

    const firstTx = transfers.transfers[0];
    const blockNumber = firstTx.blockNum;

    // Get block timestamp
    const block = await alchemy.core.getBlock(parseInt(blockNumber, 16));
    const firstTxTimestamp = block.timestamp * 1000; // ms

    // Calculate age
    const ageMs = Date.now() - firstTxTimestamp;
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

    if (ageDays) {
      setAccountAge(ageDays);
    }

    return {
      firstTxDate: new Date(firstTxTimestamp),
      ageDays,
    };
  }

  // useEffect(()=> {
  //   if (account?.address) {
  //    getWalletAge(account?.address);
  //    console.log(accountAge)
  //   }
  // }, [])

  // FOR SUBMITTING THE COMPLETE DATA
  useEffect(() => {
    if (account?.address) {
      setShowNicknameInput(true);
      getWalletAge(account?.address);
      // Simulate fetching additional profile data
      // In a real app, you might fetch this from your backend or blockchain
      if (txCount !== null) {
        setProfileData({
          transactionCount: txCount,
          // Math.floor(Math.random() * 1000) + 50,
          accountAge: accountAge, // days
          nftCount: Math.floor(Math.random() * 50) + 5,
        });
      }
    } else {
      setShowNicknameInput(false);
      setNickname("");
      setProfileData(null);
    }
  }, [account?.address, txCount]);

  const handleNicknameSubmit = (inputNickname: string) => {
    setNickname(inputNickname);
    setShowNicknameInput(false);
  };

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
            Connect wallet, customize your profile, and mint it as a unique NFT
            ID card on Monad
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
                <NicknameInput onSubmit={handleNicknameSubmit} />

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
  );
}

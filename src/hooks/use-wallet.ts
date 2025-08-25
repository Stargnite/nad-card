'use client'

import { useState, useCallback } from 'react'

interface WalletState {
  isConnected: boolean
  walletAddress: string | null
  balance: string
  isConnecting: boolean
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    walletAddress: null,
    balance: '0.00',
    isConnecting: false,
  })

  const connect = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }))
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock wallet data
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
      const mockBalance = (Math.random() * 10).toFixed(2)
      
      setWalletState({
        isConnected: true,
        walletAddress: mockAddress,
        balance: mockBalance,
        isConnecting: false,
      })
    } catch (error) {
      setWalletState(prev => ({ ...prev, isConnecting: false }))
      console.error('Failed to connect wallet:', error)
    }
  }, [])

  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      walletAddress: null,
      balance: '0.00',
      isConnecting: false,
    })
  }, [])

  return {
    ...walletState,
    connect,
    disconnect,
  }
}

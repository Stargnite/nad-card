import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(address: string): string {
  // Generate a simple avatar based on wallet address
  const emojis = ["🚀", "🎯", "💎", "⚡", "🔥", "🌟", "🎨", "🎭", "🎪", "🎲"]
  const index = Number.parseInt(address.slice(-2), 16) % emojis.length
  return emojis[index]
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatBalance(balance: string): string {
  const num = Number.parseFloat(balance)
  if (num < 0.001) return "< 0.001"
  return num.toFixed(3)
}



// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

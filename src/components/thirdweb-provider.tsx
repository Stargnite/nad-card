"use client"

import type React from "react"

import { ThirdwebProvider as Provider } from "thirdweb/react"

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}

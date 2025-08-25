"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface NicknameInputProps {
  onSubmit: (nickname: string) => void
}

export function NicknameInput({ onSubmit }: NicknameInputProps) {
  const [nickname, setNickname] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname.trim()) {
      onSubmit(nickname.trim())
    }
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-purple-400" />
          <CardTitle className="text-white">Customize Your Profile</CardTitle>
        </div>
        <CardDescription className="text-gray-300">Add a nickname to personalize your profile card</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
            maxLength={20}
          />
          <Button
            type="submit"
            disabled={!nickname.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

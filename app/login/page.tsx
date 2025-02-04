"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-lg border border-gray-800 bg-[#020817]/50 backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-white mb-2">Login</h1>
        <p className="text-gray-400 mb-6">Enter your email and password to login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm text-gray-400">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="text-sm">
            <span className="text-gray-400">Forgot Password? </span>
            <a href="#" className="text-violet-500 hover:text-violet-400">
              Click here
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-md transition-colors"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
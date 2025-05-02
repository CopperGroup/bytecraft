"use client"

import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"

interface AuthPromoBannerProps {
  setShowAuthModal: (value: boolean) => void
}

export const AuthPromoBanner = ({ setShowAuthModal }: AuthPromoBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-4 sm:p-8 rounded-3xl text-white mb-6 sm:mb-8 shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8 backdrop-blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
          <div className="bg-white/30 p-3 rounded-full backdrop-blur-md shadow-inner border border-white/40 mx-auto sm:mx-0">
            <Tag className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-medium mb-2">Отримайте знижку 10% на ваше замовлення!</h3>
            <p className="text-gray-200 mb-4 sm:mb-5 opacity-90 text-sm sm:text-base">
              Зареєструйтеся або увійдіть, щоб отримати знижку 10% на ваше перше замовлення.
            </p>
            <Button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full shadow-md px-6 py-2.5 h-auto font-medium transition-all duration-200 hover:shadow-lg w-full sm:w-auto"
            >
              Зареєструватися та отримати знижку
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

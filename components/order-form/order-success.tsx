"use client"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface OrderSuccessProps {
  orderId: string | null
  windowSize: { width: number; height: number }
}

export const OrderSuccess = ({ orderId, windowSize }: OrderSuccessProps) => {
  const router = useRouter()

  return (
    <div className="relative w-full flex flex-col items-center pt-8 sm:pt-0">
      <div className="bg-white/80 backdrop-blur-md rounded-full p-6 sm:p-8 mb-6 sm:mb-8 overflow-hidden shadow-lg">
        <Package className="w-12 sm:w-16 h-12 sm:h-16 text-gray-900" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
          Замовлення створено успішно!
        </h1>
        <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto px-4 sm:px-0">
          Дякуємо за ваше замовлення. Ми вже почали готувати його до відправлення.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
          <Button
            onClick={() => router.push(`/myOrders/${orderId}`)}
            className="bg-gray-900 hover:bg-black text-white px-6 sm:px-8 py-3 h-auto rounded-full text-base font-medium transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-md"
          >
            {windowSize.width > 380 ? "Переглянути деталі замовлення" : "Переглянути деталі"}
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-6 sm:px-8 py-3 h-auto rounded-full text-base font-medium border-gray-300 hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
          >
            Повернутися до магазину
          </Button>
        </div>
        <div className="mt-10 sm:mt-12 text-lg font-medium text-gray-900">Дякуємо за покупку!</div>
      </div>
    </div>
  )
}

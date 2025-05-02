"use client"

import Image from "next/image"
import { Store } from "@/constants/store"
import { ShoppingCart, Shield } from "lucide-react"

type CartProduct = {
  id: string
  name: string
  image: string
  price: number
  priceWithoutDiscount: number
  quantity: number
}

interface OrderSummaryProps {
  cartData: CartProduct[]
  originalPrice: number
  formattedPriceToPay: string
  appliedPromo: { code: string; discount: number } | null
  discountAmount: string
}

export const OrderSummary = ({
  cartData,
  originalPrice,
  formattedPriceToPay,
  appliedPromo,
  discountAmount,
}: OrderSummaryProps) => {
  return (
    <>
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-100/20 rounded-full blur-3xl"></div>

        <div className="p-4 sm:p-6 bg-white/30 backdrop-blur-xl relative z-10">
          <h2 className="text-lg sm:text-xl font-medium flex items-center text-gray-900">
            <ShoppingCart className="w-5 h-5 mr-2 text-gray-900" />
            Ваше замовлення
          </h2>
        </div>

        <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-4 sm:p-6 relative z-10">
          {cartData.map((item: CartProduct, index: number) => (
            <div
              key={index}
              className="flex items-center mb-4 pb-4 border-b border-gray-100/50 last:border-b-0 last:pb-0 last:mb-0 group"
            >
              <div className="min-w-16 w-16 sm:min-w-24 sm:w-24 h-16 sm:h-24 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center mr-3 sm:mr-4 overflow-hidden shadow-sm">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">Кількість: {item.quantity}</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
                  {item.price.toFixed(2)}
                  {Store.currency_sign}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 relative z-10">
          <FreeDeliveryProgress currentAmount={Number.parseFloat(formattedPriceToPay)} threshold={Store.freeDelivery} />
        </div>

        <div className="p-4 sm:p-6 bg-white/30 backdrop-blur-xl relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm sm:text-base text-gray-700">Підсумок:</span>
            <span className="text-sm sm:text-base font-medium text-gray-900">
              {originalPrice.toFixed(2)}
              {Store.currency_sign}
            </span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm sm:text-base text-gray-700">Знижка ({appliedPromo.discount}%):</span>
              <span className="text-sm sm:text-base font-medium text-green-600">
                -{discountAmount}
                {Store.currency_sign}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-700">Доставка:</span>
            <span className="text-sm sm:text-base font-medium text-gray-900">Безкоштовно</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-center">
            <span className="text-base sm:text-lg font-medium text-gray-900">Загальна сума:</span>
            <span className="text-lg sm:text-xl font-medium text-gray-900">
              {formattedPriceToPay}
              {Store.currency_sign}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 bg-white/40 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-100/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 flex items-center text-gray-900">
            <Shield className="w-5 h-5 mr-2 text-gray-900" />
            Гарантія безпеки
          </h3>
          <p className="text-sm sm:text-base text-gray-700">
            Ваші особисті дані в безпеці, ми використовуємо найновіші технології шифрування і не зберігаємо інформації
            про рахунки клієнтів.
          </p>
        </div>
      </div>
    </>
  )
}

const FreeDeliveryProgress = ({ currentAmount, threshold }: { currentAmount: number; threshold: number }) => {
  const progress = Math.min((currentAmount / threshold) * 100, 100)
  const remaining = threshold - currentAmount

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-3 sm:p-4 mb-4 border border-white/40 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-900">Безкоштовна доставка</span>
        <span className="text-xs sm:text-sm text-gray-500">
          {currentAmount.toFixed(0)} / {threshold} {Store.currency_sign}
        </span>
      </div>
      <div className="h-2 bg-gray-200/70 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {remaining > 0 ? (
        <p className="text-xs mt-2">
          Додайте ще {remaining.toFixed(0)} {Store.currency_sign} для безкоштовної доставки
        </p>
      ) : (
        <p className="text-xs font-medium text-gray-900 mt-2">Ви отримали безкоштовну доставку!</p>
      )}
    </div>
  )
}

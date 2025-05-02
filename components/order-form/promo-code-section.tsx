"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Store } from "@/constants/store"

interface PromoCodeSectionProps {
  promocode: string
  setPromocode: (value: string) => void
  handleApplyPromocode: () => void
  handleRemovePromocode: () => void
  isApplyingPromo: boolean
  promoError: string
  appliedPromo: { code: string; discount: number } | null
  discountAmount: string
  isSubmitting: boolean
  isDeliveryMethodSelected: boolean
  email: string
  setShowAuthModal: (value: boolean) => void
}

export const PromoCodeSection = ({
  promocode,
  setPromocode,
  handleApplyPromocode,
  handleRemovePromocode,
  isApplyingPromo,
  promoError,
  appliedPromo,
  discountAmount,
  isSubmitting,
  isDeliveryMethodSelected,
  email,
  setShowAuthModal,
}: PromoCodeSectionProps) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-100/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-gray-900" />
          Промокод
        </h2>

        {appliedPromo ? (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/40 shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="font-medium text-gray-900">{appliedPromo.code}</p>
                  <p className="text-sm text-gray-500">Знижка {appliedPromo.discount}% застосована</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePromocode}
                className="text-gray-500 hover:text-gray-900"
              >
                Видалити
              </Button>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Знижка:</span>
              <span className="font-medium text-green-600">
                -{discountAmount} {Store.currency_sign}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Введіть промокод"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
                className="rounded-2xl border-gray-200/50 shadow-sm h-12 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                disabled={isApplyingPromo || isSubmitting || !isDeliveryMethodSelected}
              />
              <Button
                type="button"
                onClick={handleApplyPromocode}
                disabled={!promocode || isApplyingPromo || isSubmitting || !isDeliveryMethodSelected}
                className="bg-gray-900 hover:bg-black text-white rounded-2xl shadow-sm h-12"
              >
                {isApplyingPromo ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Перевірка...
                  </>
                ) : (
                  "Застосувати"
                )}
              </Button>
            </div>

            {promoError && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{promoError}</span>
              </div>
            )}

            {!email && (
              <div className="text-sm text-gray-500 mt-2">
                <p>Зареєструйтеся, щоб отримати промокод на знижку 10% на перше замовлення.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

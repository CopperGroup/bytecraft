import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import type { Control } from "react-hook-form"
import type { z } from "zod"
import type { OrderValidation } from "@/lib/validations/order"

interface CommentSectionProps {
  control: Control<z.infer<typeof OrderValidation>>
  isSubmitting: boolean
  isDeliveryMethodSelected: boolean
}

export const CommentSection = ({ control, isSubmitting, isDeliveryMethodSelected }: CommentSectionProps) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-100/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-900" />
          Коментар
        </h2>
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Коментар до замовлення</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className="rounded-2xl border-gray-200/50 shadow-sm transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                  disabled={isSubmitting || !isDeliveryMethodSelected}
                  placeholder="Додаткова інформація щодо замовлення"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

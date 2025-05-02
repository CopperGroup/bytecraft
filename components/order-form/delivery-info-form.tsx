"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck } from "lucide-react"
import type { Control } from "react-hook-form"
import type { z } from "zod"
import type { OrderValidation } from "@/lib/validations/order"
import { CitySelect } from "@/components/interface/nova/city-select"
import { WarehouseSelect } from "@/components/interface/nova/warehouse-select"
import type { UseFormSetValue, UseFormWatch } from "react-hook-form"

interface DeliveryInfoFormProps {
  control: Control<z.infer<typeof OrderValidation>>
  isSubmitting: boolean
  watch: UseFormWatch<z.infer<typeof OrderValidation>>
  setValue: UseFormSetValue<z.infer<typeof OrderValidation>>
  register: any
}

export const DeliveryInfoForm = ({ control, isSubmitting, watch, setValue, register }: DeliveryInfoFormProps) => {
  const isDeliveryMethodSelected = !!watch("deliveryMethod")

  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-100/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-gray-900" />
          Доставка
        </h2>
        <FormField
          control={control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem className="mb-4 sm:mb-6">
              <FormLabel className="text-sm font-medium text-gray-700">Спосіб доставки *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger className="rounded-2xl border-gray-200/50 shadow-sm h-12 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg">
                    <SelectValue placeholder="Виберіть спосіб доставки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-2xl shadow-md bg-white/90 backdrop-blur-xl border border-white/50">
                  <SelectItem value="Нова пошта (У відділення)">Нова пошта (У відділення)</SelectItem>
                  <SelectItem value="Нова пошта (Поштомат)">Нова пошта (Поштомат)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        {/* City field - always required */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="mb-4 sm:mb-6">
              <FormLabel className="text-sm font-medium text-gray-700">Місто *</FormLabel>
              <CitySelect
                value={field.value}
                onChange={(value, ref) => {
                  field.onChange(value)
                  setValue("cityRef", ref)
                  // Reset warehouse when city changes
                  setValue("warehouseRef", "")
                  setValue("warehouseIndex", "")
                }}
                disabled={isSubmitting}
              />
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        {/* Warehouse select for Nova Poshta office/poshtomat */}
        {isDeliveryMethodSelected && (
          <FormField
            control={control}
            name="warehouseRef"
            render={({ field }) => {
              const deliveryMethod = watch("deliveryMethod") || ""
              const warehouseType = deliveryMethod.includes("Поштомат") ? "Postomat" : "Branch"

              return (
                <FormItem className="mb-4 sm:mb-6">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {deliveryMethod.includes("Поштомат") ? "Поштомат" : "Відділення"} *
                  </FormLabel>
                  <WarehouseSelect
                    cityRef={watch("cityRef")}
                    value={field.value}
                    onChange={(value, ref, index) => {
                      field.onChange(ref)
                      if (index) setValue("warehouseIndex", index)
                    }}
                    disabled={isSubmitting || !watch("cityRef")}
                    type={warehouseType}
                  />
                  <FormMessage className="text-sm" />
                </FormItem>
              )
            }}
          />
        )}

        <input type="hidden" {...register("cityRef")} />
        <input type="hidden" {...register("warehouseRef")} />
        <input type="hidden" {...register("warehouseIndex")} />
      </div>
    </div>
  )
}

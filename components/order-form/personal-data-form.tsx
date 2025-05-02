import { Mail, Phone, User } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PersonalDataFormProps {
  control: any
  isSubmitting: boolean
}

export const PersonalDataForm = ({ control, isSubmitting }: PersonalDataFormProps) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-3xl border border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-100/20 rounded-full blur-3xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
          <User className="w-5 h-5 mr-2 text-gray-900" />
          Особисті дані
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Ім&apos;я *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="rounded-2xl border-gray-200/50 shadow-sm h-12 px-4 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Прізвище *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="rounded-2xl border-gray-200/50 shadow-sm h-12 px-4 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Номер телефону *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      className="pl-10 rounded-2xl border-gray-200/50 shadow-sm h-12 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                      disabled={isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      className="pl-10 rounded-2xl border-gray-200/50 shadow-sm h-12 transition-all focus:border-gray-400 focus:ring focus:ring-gray-100 focus:ring-opacity-50 bg-white/70 backdrop-blur-lg"
                      disabled={isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

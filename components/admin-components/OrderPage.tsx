"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CreditCard,
  Truck,
  Tag,
  Percent,
  FileText,
  Loader2,
  Eye,
} from "lucide-react"
import OrderedProductCard from "@/components/cards/OrderedProductCard"
import ChangeOrdersStatuses from "../interface/ChangeOrdersStatuses"
import { useToast } from "@/hooks/use-toast"
import { generateInvoice } from "@/lib/actions/order.actions"
import InvoiceModal from "./orders/InvoiceModal"

interface Product {
  product: {
    _id: string
    id: string
    name: string
    images: string[]
    priceToShow: number
    articleNumber: string
    params: {
      name: string
      value: string
    }[]
  }
  amount: number
}

// Update the invoice prop type to match the Nova Poshta API response
interface OrderProps {
  order: {
    id: string
    name: string
    surname: string
    adress: string
    city: string
    postalCode: string
    deliveryMethod: string
    paymentType: string
    phoneNumber: string
    email: string
    comment: string
    products: Product[]
    value: number
    paymentStatus: "Pending" | "Declined" | "Success"
    deliveryStatus: "Proceeding" | "Indelivery" | "Canceled" | "Fulfilled"
    promocode?: string
    discount?: string
    invoice?: {
      Ref: string
      CostOnSite: string
      EstimatedDeliveryDate: string
      IntDocNumber: string
      TypeDocument: string
      Printed: string
      DateTime: string
      Weight: string
      SeatsAmount: string
      Cost: string
      CitySender: string
      CityRecipient: string
      SenderAddress: string
      RecipientAddress: string
      StateName: string
      StateId: number
      RecipientFullName: string
      RecipientDateTime?: string
      PayerType: string
      PaymentMethod: string
      WarehouseRecipient?: string
      DatePayedKeeping?: string
      RedeliveryString?: string
    }
  }
}

export default function OrderPage({ orderJson }: { orderJson: string }) {
  const order = JSON.parse(orderJson)
  const { toast } = useToast()
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  // Use a consistent formatter that will work the same on server and client
  const formatCurrency = (value: number) => {
    return (
      new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value) + " грн"
    )
  }

  // Calculate original price if discount is applied
  const hasDiscount = order.discount && Number.parseFloat(order.discount) > 0
  const discountPercentage = hasDiscount ? Number.parseFloat(order.discount) : 0
  const originalPrice = hasDiscount ? order.value / (1 - discountPercentage / 100) : order.value
  const discountAmount = hasDiscount ? originalPrice - order.value : 0

  // Update the handleGenerateInvoice function to handle the Nova Poshta API response
  const handleGenerateInvoice = async () => {
    setIsGeneratingInvoice(true)
    try {
      const result = await generateInvoice(order._id)
      toast({
        title: "Накладну сформовано",
        description: `Накладну №${result.IntDocNumber} успішно сформовано`,
      })
      // Refresh the page to show the updated invoice
      window.location.reload()
    } catch (error) {
      console.error("Error generating invoice:", error)
      toast({
        title: "Помилка",
        description: "Не вдалося сформувати накладну. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingInvoice(false)
    }
  }

  return (
    <>
      <div className="max-w-full justify-center overflow-x-hidden pb-12">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-heading1-bold">Замовлення №{order.id}</h1>

            {order.invoice ? (
              <Button
                onClick={() => setIsInvoiceModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Переглянути накладну
              </Button>
            ) : (
              <Button
                onClick={handleGenerateInvoice}
                disabled={isGeneratingInvoice}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                {isGeneratingInvoice ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Формування...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Сформувати накладну
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-heading4-medium font-semibold">Інформація про клієнта</h2>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Ім&apos;я:</span> {order.name} {order.surname}
              </p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${order.adress}, ${order.city}, ${order.postalCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sky-600 hover:text-sky-800"
              >
                <MapPin size={16} />
                <span>
                  {order.city}, {order.adress}, {order.postalCode}
                </span>
              </Link>
              <Link
                href={`tel:${order.phoneNumber}`}
                className="flex items-center gap-2 text-sky-600 hover:text-sky-800"
              >
                <Phone size={16} />
                <span>{order.phoneNumber}</span>
              </Link>
              <Link href={`mailto:${order.email}`} className="flex items-center gap-2 text-sky-600 hover:text-sky-800">
                <Mail size={16} />
                <span>{order.email}</span>
              </Link>
              {order.comment && (
                <div className="flex items-start gap-2">
                  <MessageSquare size={16} className="mt-1 flex-shrink-0" />
                  <p>{order.comment}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-heading4-medium font-semibold">Деталі замовлення</h2>
              <p className="flex items-center gap-2">
                <Truck size={16} />
                <span>Метод доставки: {order.deliveryMethod}</span>
              </p>
              <p className="flex items-center gap-2">
                <CreditCard size={16} />
                <span>Метод оплати: {order.paymentType}</span>
              </p>
              {order.promocode && (
                <p className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>
                    Промокод: <span className="font-medium">{order.promocode}</span>
                  </span>
                </p>
              )}
              {order.discount && Number.parseFloat(order.discount) > 0 && (
                <p className="flex items-center gap-2">
                  <Percent size={16} />
                  <span>
                    Знижка: <span className="font-medium text-green-600">{order.discount}%</span>
                  </span>
                </p>
              )}
              {order.invoice && (
                <p className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>
                    Трек-номер: <span className="font-medium">{order.invoice.Ref}</span>
                  </span>
                </p>
              )}
              <ChangeOrdersStatuses
                _id={order._id}
                id={order.id}
                paymentStatus={order.paymentStatus}
                deliveryStatus={order.deliveryStatus}
              />
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-12" />

        <div className="w-full">
          <h2 className="text-heading4-medium sm:text-heading3-bold font-semibold mb-4">Замовлена продукція</h2>
          <div className="w-full space-y-4 max-h-[700px] overflow-y-auto">
            {order.products.map((product: Product) => (
              <OrderedProductCard
                key={product.product.id}
                _id={product.product._id}
                id={product.product.id}
                name={product.product.name}
                image={product.product.images[0]}
                priceToShow={product.product.priceToShow}
                articleNumber={product.product.articleNumber}
                amount={product.amount}
              />
            ))}
          </div>
          <div className="flex flex-col items-end mt-6 space-y-1">
            {hasDiscount && (
              <>
                <p className="text-body-medium text-slate-600">
                  Початкова вартість: <span className="line-through">{formatCurrency(originalPrice)}</span>
                </p>
                <p className="text-body-medium text-green-600">
                  Знижка ({order.discount}%): -{formatCurrency(discountAmount)}
                </p>
              </>
            )}
            <p className="text-heading4-medium font-semibold">
              Загальна вартість:{" "}
              <span className="text-body-semibold text-green-600">{formatCurrency(order.value)}</span>
            </p>
          </div>
        </div>
      </div>

      {order.invoice && (
        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoice={order.invoice}
          orderId={order.id}
          customerEmail={order.email}
          customerName={`${order.name} ${order.surname}`}
        />
      )}
    </>
  )
}

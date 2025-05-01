"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Printer, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Update the InvoiceDetails interface to match the Nova Poshta API response
interface InvoiceDetails {
  // Nova Poshta API response fields
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
  // Additional fields for the modal
  status?: string
  statusCode?: number
  scheduledDeliveryDate?: string
  documentWeight?: string
}

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: InvoiceDetails
  orderId: string
  customerEmail: string
  customerName: string
}

// Update the modal content to use the Nova Poshta API response fields
const InvoiceModal = ({ isOpen, onClose, invoice, orderId, customerEmail, customerName }: InvoiceModalProps) => {
  const { toast } = useToast()
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  // Format currency
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === "string" ? Number.parseFloat(value) : value
    return (
      new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numValue) + " грн"
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get status color
  const getStatusColor = (stateId: number) => {
    switch (stateId) {
      case 9: // Delivered
        return "text-green-600"
      case 8: // In transit
      case 5:
      case 6:
        return "text-blue-600"
      case 2: // Processing
      case 3:
      case 4:
        return "text-yellow-600"
      case 10: // Cancelled
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  const handleSendEmail = async () => {
    setIsSendingEmail(true)
    try {
    //   await sendInvoiceEmail({
    //     orderId,
    //     email: customerEmail,
    //     name: customerName,
    //     trackingNumber: invoice.Ref,
    //     invoiceNumber: invoice.IntDocNumber,
    //   })
      toast({
        title: "Лист відправлено",
        description: `Інформацію про накладну відправлено на ${customerEmail}`,
      })
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося відправити лист. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Накладна №{invoice.IntDocNumber}</span>
            <span className={`text-sm font-medium ${getStatusColor(invoice.StateId)}`}>{invoice.StateName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6 print:text-black">
          {/* Tracking information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Інформація про відправлення</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm text-slate-500">Трек-номер</p>
                <p className="font-medium">{invoice.Ref}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Дата створення</p>
                <p>{formatDate(invoice.DateTime)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Очікувана дата доставки</p>
                <p>{formatDate(invoice.EstimatedDeliveryDate)}</p>
              </div>
              {invoice.RecipientDateTime && (
                <div>
                  <p className="text-sm text-slate-500">Фактична дата доставки</p>
                  <p>{formatDate(invoice.RecipientDateTime)}</p>
                </div>
              )}
              {invoice.DatePayedKeeping && (
                <div>
                  <p className="text-sm text-slate-500">Дата оплати</p>
                  <p>{formatDate(invoice.DatePayedKeeping)}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Recipient information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Інформація про одержувача</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm text-slate-500">Одержувач</p>
                <p className="font-medium">{invoice.RecipientFullName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Місто</p>
                <p>{invoice.CityRecipient}</p>
              </div>
              {invoice.WarehouseRecipient && (
                <div className="col-span-2">
                  <p className="text-sm text-slate-500">Відділення / Поштомат</p>
                  <p>{invoice.WarehouseRecipient}</p>
                </div>
              )}
              <div className="col-span-2">
                <p className="text-sm text-slate-500">Адреса</p>
                <p>{invoice.RecipientAddress}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Інформація про посилку</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-sm text-slate-500">Вага</p>
                <p>{invoice.Weight} кг</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Оголошена вартість</p>
                <p>{formatCurrency(invoice.CostOnSite)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Спосіб оплати</p>
                <p>{invoice.PaymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Платник</p>
                <p>{invoice.PayerType === "Sender" ? "Відправник" : "Одержувач"}</p>
              </div>
              {invoice.RedeliveryString && (
                <div className="col-span-2">
                  <p className="text-sm text-slate-500">Післяплата</p>
                  <p>{formatCurrency(invoice.RedeliveryString)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Друк
            </Button>
            <Button variant="outline" onClick={handleSendEmail} disabled={isSendingEmail}>
              <Send className="mr-2 h-4 w-4" />
              {isSendingEmail ? "Відправка..." : "Відправити"}
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Завантажити
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InvoiceModal

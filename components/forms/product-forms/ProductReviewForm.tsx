"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Upload, X, AlertCircle, Loader2, Percent, Mail } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"
import { fetchUserByEmail } from "@/lib/actions/user.actions"
import { getTop3ProductsBySales, leaveReview } from "@/lib/actions/product.actions"
import { sendThankYouForReviewEmail } from "@/lib/email/thank-you-for-review"

// Loading placeholder for discount offer
const DiscountOfferLoading = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md animate-pulse">
        <div className="flex items-center">
          <div className="bg-gray-700 rounded-full p-2 mr-3 flex items-center justify-center w-8 h-8"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductReviewForm({
  productId,
  productName,
  userEmail,
}: {
  productId: string
  productName: string
  userEmail: string
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [pros, setPros] = useState("")
  const [cons, setCons] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState(userEmail)
  const [id, setId] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [userDiscount, setUserDiscount] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isVerifyingUser, setIsVerifyingUser] = useState(!!userEmail)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // UploadThing integration
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const urls = res.map((file) => file.url)
      setAttachmentUrls((prev) => [...prev, ...urls])
      setIsUploading(false)
      toast({
        title: "Файли завантажено",
        description: `${res.length} ${res.length === 1 ? "файл завантажено" : "файли завантажено"} успішно`,
      })
    },
    onUploadError: (error) => {
      setIsUploading(false)
      toast({
        title: "Помилка завантаження",
        description: error.message,
        variant: "destructive",
      })
    },
    onUploadBegin: () => {
      setIsUploading(true)
    },
  })

  // Check for user email and fetch user data
  useEffect(() => {
    if (userEmail) {
      setIsVerifyingUser(true)

      const checkUser = async () => {
        let user = null

        try {
          const result = await fetchUserByEmail({ email: userEmail }, "json")
          user = JSON.parse(result)
        } catch (error) {
          console.log("User not found")
        } finally {
          setIsVerifyingUser(false)
        }

        if (user) {
          setUserLoggedIn(true)
          setUserDiscount(true)
          setUserName(user.name || "")
          setId(user._id)
        }
      }

      checkUser()
    }
  }, [userEmail])

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files)
    if (attachments.length + newFiles.length > 5) {
      setError("Ви можете завантажити максимум 5 зображень")
      return
    }

    setAttachments((prev) => [...prev, ...newFiles])

    // Upload files using UploadThing
    try {
      startUpload(newFiles)
    } catch (err) {
      console.error("Upload error:", err)
      setError("Помилка при завантаженні файлів. Спробуйте ще раз.")
    }
  }

  const removeAttachment = (index: number) => {
    // Remove from attachments array
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)

    // Remove from URLs array
    const newUrls = [...attachmentUrls]
    newUrls.splice(index, 1)
    setAttachmentUrls(newUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (rating === 0) {
      setError("Будь ласка, оберіть рейтинг")
      return
    }

    if (reviewText.trim() === "") {
      setError("Будь ласка, напишіть текст відгуку")
      return
    }

    if (userName.trim() === "") {
      setError("Будь ласка, вкажіть ваше ім'я")
      return
    }

    if (email.trim() === "") {
      setError("Будь ласка, вкажіть ваш email")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Будь ласка, вкажіть коректний email")
      return
    }

    // Don't submit if uploads are still in progress
    if (isUploading) {
      setError("Зачекайте, поки завершиться завантаження зображень")
      return
    }

    setIsSubmitting(true)
    setError("")
    setSubmissionStatus("loading")

    try {
      // Format review text with pros and cons if provided
      let formattedReview = reviewText
      if (pros.trim()) {
        formattedReview += `\n\nПереваги: ${pros}`
      }
      if (cons.trim()) {
        formattedReview += `\n\nНедоліки: ${cons}`
      }

      // Submit the review using the leaveReview function
      const result = await leaveReview({
        productId,
        userId: userLoggedIn ? id : undefined,
        name: userName,
        email,
        text: formattedReview,
        rating,
        attachmentsUrls: attachmentUrls,
      })

      // If a promo code was returned, store it and send email
      if (result) {
        setPromoCode(result)

        // Send thank you email with promo code
        setIsSendingEmail(true)
        try {
          const topProductsStringified  = await getTop3ProductsBySales("json");

          await sendThankYouForReviewEmail(email, result, productName, userName.split(" ")[0], topProductsStringified)
        } catch (emailError) {
          console.error("Error sending thank you email:", emailError)
          // We don't want to fail the whole submission if just the email fails
        } finally {
          setIsSendingEmail(false)
        }
      }

      // Update status and show success message
      setSubmissionStatus("success")
      setShowSuccess(true)

      // If user is eligible for discount, store this information
      if (userDiscount && userLoggedIn) {
        localStorage.setItem("hasDiscount", "true")
      }
    } catch (err: any) {
      console.error("Error submitting review:", err)
      setError(err.message || "Сталася помилка при відправці відгуку. Спробуйте ще раз.")
      setSubmissionStatus("error")

      toast({
        title: "Помилка відправки",
        description: err.message || "Не вдалося відправити відгук. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    // Redirect back to product page - updated to use catalog path
    router.push(`/catalog/${productId}`)
  }

  // Get file size limit from UploadThing config
  const fileSize = permittedFileInfo?.config?.image?.maxFileSize ?? "5MB"

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Discount Notice with Loading State */}
        {userEmail &&
          (isVerifyingUser ? (
            <DiscountOfferLoading />
          ) : (
            userDiscount &&
            userLoggedIn && (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-md">
                  <div className="flex items-center">
                    <div className="bg-emerald-900 rounded-full p-2 mr-3 flex items-center justify-center">
                      <Percent size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Спеціальна пропозиція</p>
                      <p className="text-sm text-emerald-400">Знижка 5% на наступне замовлення</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}

        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating" className="text-base font-medium">
            Ваша оцінка <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 sm:p-1.5 focus:outline-none"
              >
                <Star
                  className={`size-8 max-sm:size-6 ${
                    value <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0
                ? rating === 5
                  ? "Відмінно"
                  : rating === 4
                    ? "Дуже добре"
                    : rating === 3
                      ? "Добре"
                      : rating === 2
                        ? "Задовільно"
                        : "Погано"
                : "Оберіть оцінку"}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <Label htmlFor="review" className="text-base font-medium">
            Ваш відгук <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Розкажіть про ваш досвід використання товару..."
            className="min-h-[150px] resize-y"
            required
          />
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="pros" className="text-base font-medium">
              Переваги
            </Label>
            <Textarea
              id="pros"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="Що вам сподобалось у товарі?"
              className="min-h-[80px] md:min-h-[100px] resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cons" className="text-base font-medium">
              Недоліки
            </Label>
            <Textarea
              id="cons"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="Що можна було б покращити?"
              className="min-h-[80px] md:min-h-[100px] resize-y"
            />
          </div>
        </div>

        {/* Photo Attachments */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Фото (необов&apos;язково)</Label>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
            {attachmentUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Attachment ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                >
                  <X size={12} className="text-gray-700" />
                </button>
              </div>
            ))}

            {isUploading && (
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Loader2 size={20} className="text-gray-400 animate-spin" />
              </div>
            )}

            {attachmentUrls.length < 5 && !isUploading && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors p-0.5"
              >
                <Upload size={16} className="text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">Додати фото</span>
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-1">Максимум 5 фото. Формати: JPG, PNG. Розмір до {fileSize}.</p>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Ваше ім&apos;я <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ваше ім'я або нікнейм"
              required
              className="h-10 sm:h-11"
              disabled={isVerifyingUser}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="h-10 sm:h-11"
              disabled={isVerifyingUser}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-md">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 sm:pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isUploading || isVerifyingUser}
            className="w-full md:w-auto py-5 sm:py-6 px-8 sm:px-12 h-auto rounded-full text-base font-medium"
          >
            {isVerifyingUser ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Перевірка користувача...
              </span>
            ) : submissionStatus === "loading" ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Відправка...
              </span>
            ) : isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Завантаження...
              </span>
            ) : (
              "Відправити відгук"
            )}
          </Button>
        </div>
      </form>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Дякуємо за ваш відгук!</AlertDialogTitle>
            <AlertDialogDescription>
              Ваш відгук успішно відправлено та буде опубліковано після перевірки модератором.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {userDiscount && userLoggedIn && (
            <div className="my-4">
              <div className="flex items-center bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-md">
                <div className="flex items-center">
                  {/* <div className="bg-blue-900 rounded-full p-2 mr-3 flex items-center justify-center">
                    <Mail size={16} className="text-blue-400" />
                  </div> */}
                  <div>
                    <p className="font-medium text-white">Перевірте вашу пошту</p>
                    <p className="text-sm text-gray-300">
                      Ми надіслали вам промокод на знижку 5% на наступне замовлення на адресу{" "}
                      <span className="text-blue-400">{email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessClose} className="rounded-full">
              Повернутися до товару
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

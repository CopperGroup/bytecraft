"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, User2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Store } from "@/constants/store"

const testimonials = [
  {
    id: 1,
    name: "Марія Бригіна",
    role: "Любляча дівчина",
    avatar: "/assets/t1.jpg",
    rating: 5,
    text: `Подарувала клавіатуру хлопцю, дуже класне звучання. Кремовий звук, гарний колір і якість. Він задоволений. Дякую☺️.`,
  },
  {
    id: 2,
    name: "Сергій Мурза",
    role: "Постійний покупець",
    avatar: "/assets/t2.jpg",
    rating: 5,
    text: `Відправили клавіатуру через один день після замовлення, коробка приїхала ціла. Задоволений роботою магазину, та спілкуванням з менеджер`,
  },
  {
    id: 3,
    name: "Максим Юськів",
    role: "Геймер",
    avatar: "/assets/t3.jpg",
    rating: 5,
    text: `Клавіатура супер тайпінг кремовий отулік клавіш швидкий рекомендую`,
  },
  {
    id: 4,
    name: "Дммтро Шубін",
    role: "Досвідчений Геймер",
    avatar: "/assets/t4.jpg",
    rating: 5,
    text: `Швидко приїхало, якісно супер! :DD Не брак`,
  },
  {
    id: 5,
    name: "Денис Оліферчук",
    role: "Постійний покупець",
    avatar: "",
    rating: 5,
    text: `Дякую клавіатура дуже сподобалась і всім рекомендую класна за свою ціну`,
  },
  {
    id: 6,
    name: "Владислава Кулик Юріївна",
    role: "Мама",
    avatar: "",
    rating: 5,
    text: `Дуже дякуємо за гарне обслуговування!`,
  },
  {
    id: 7,
    name: "Андрій Красенко",
    role: "Геймер початківець",
    avatar: "",
    rating: 5,
    text: `Клавиатура бомба минусов нет одни плюсы`,
  },
  {
    id: 8,
    name: "Богдан Катунин",
    role: "Постійний покупець",
    avatar: "",
    rating: 5,
    text: `Все гарно, товар прийшов швидко, дуже задоволений`,
  },
  {
    id: 8,
    name: "Сергій Рудікевич",
    role: "Постійний покупець",
    avatar: "",
    rating: 5,
    text: `Клава очеень крутая, спасибо!`,
  },
  {
    id: 8,
    name: "Тарас Білінський Богданович",
    role: "Досвідчений Геймер",
    avatar: "",
    rating: 5,
    text: `Все дуже швидко. Товар дуже якісний. Рекомендую`,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Adjust visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1
      return 3
    }
    return 3 // Default for SSR
  }

  const [visibleTestimonials, setVisibleTestimonials] = useState(getVisibleTestimonials())

  // Update visible testimonials on window resize
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setVisibleTestimonials(getVisibleTestimonials())
    })
  }

  const maxIndex = testimonials.length - visibleTestimonials

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex < maxIndex) {
      setDirection(1)
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-24 bg-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Відгуки наших клієнтів</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Дізнайтеся, що говорять наші клієнти про досвід використання техніки {Store.name} та нашу підтримку
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md transition-all",
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
              )}
              aria-label="Попередній відгук"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md transition-all",
                activeIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
              )}
              aria-label="Наступний відгук"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out py-1"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleTestimonials)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="bg-[#f5f5f7] p-8 rounded-2xl h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <User2Icon className="w-full h-full p-2 text-gray-500"/>
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating ? "text-gray-900 fill-gray-900" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-base text-gray-700 flex-grow">{testimonial.text}</p>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Підтверджений покупець</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md mx-2",
                activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
              )}
              aria-label="Попередній відгук"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            {/* Pagination indicators */}
            <div className="flex items-center mx-2">
              {Array.from({ length: testimonials.length - (visibleTestimonials - 1) }).map((_, index) => (
                <div
                  key={index}
                  className={cn("w-2 h-2 mx-1 rounded-full", activeIndex === index ? "bg-gray-900" : "bg-gray-300")}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={activeIndex === maxIndex}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md mx-2",
                activeIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
              )}
              aria-label="Наступний відгук"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

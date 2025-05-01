"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Store } from "@/constants/store"

const milestones = [
  { year: 2024, month: 'Червень', event: `Заснування ${Store.name} — Створення магазину для геймерів` },
  { year: 2024, month: 'Серпень', event: "Запуск онлайн-магазину для геймерської спільноти" },
  { year: 2024, month: 'Жовтень', event: "Розширення асортименту — нові топові пристрої для геймерів" },
  { year: 2025, month: 'Січень', event: "Партнерство з провідними брендами у світі геймерських технологій" },
  { year: 2025, month: 'Квітень', event: "Досягнення нових вершин — понад 10000 задоволених геймерів по всій Україні" },
]

export default function History() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-24 bg-[#f5f5f7]"
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
          <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Наш Шлях до Геймерського Лідерства</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Від створення онлайн-магазину до топового вибору для геймерів по всій Україні
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <span className="text-base font-medium">{milestone.year}</span>
                </div>
                <div className="pt-3">
                  <p className="text-lg font-medium text-gray-900">{milestone.event}</p>
                  {index < milestones.length - 1 && (
                    <div className="h-[1px] w-full bg-gray-200 mt-6 hidden md:block"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/assets/history-image.jpg"
                alt={`${Store.name} крізь роки інновацій`}
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
              <p className="text-lg font-medium text-gray-900">Від стартапу до лідера України</p>
              <p className="text-base text-gray-500 mt-2">
              Наша місія — зробити найкращі геймерські пристрої звичкою для кожного
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

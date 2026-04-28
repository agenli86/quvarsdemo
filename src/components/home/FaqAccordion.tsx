'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import type { Faq } from '@/lib/types'

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  if (!items || items.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        {items.map((faq) => {
          const open = openId === faq.id
          return (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                open ? 'border-lavender-300 shadow-soft' : 'border-lavender-100 hover:border-lavender-200'
              }`}
            >
              <button
                onClick={() => setOpenId(open ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                aria-expanded={open}
              >
                <span className="text-base md:text-lg font-medium text-lavender-900 flex-1">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  open ? 'bg-gradient-quvars text-white rotate-180' : 'bg-lavender-50 text-lavender-700'
                }`}>
                  <ChevronDown size={18} />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

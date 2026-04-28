'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Sparkles, Award, Calendar } from 'lucide-react'

const stats = [
  { icon: Users, end: 2000, suffix: '+', label: 'Mutlu Müşteri' },
  { icon: Sparkles, end: 15, suffix: '+', label: 'Hizmet Çeşidi' },
  { icon: Award, end: 5, suffix: '+', label: 'Yıl Tecrübe' },
  { icon: Calendar, end: 10000, suffix: '+', label: 'Tamamlanan Seans' },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1800
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {val.toLocaleString('tr-TR')}
      {suffix}
    </span>
  )
}

export default function StatsBanner() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-lavender-900/95 via-lavender-800/90 to-rose-900/85" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-light text-white leading-tight">
            Yılların{' '}
            <span className="italic font-medium bg-gradient-to-r from-lavender-200 to-rose-200 bg-clip-text text-transparent">
              güveni ve deneyimi
            </span>
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Kayseri'de güzellik dünyasının yeni adresi olarak rakamlarla ifade etmeye çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="text-center p-6 md:p-8 rounded-3xl glass-dark border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 duration-500"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-lavender-300/30 to-rose-300/30 backdrop-blur-sm">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-3xl md:text-5xl font-heading font-medium text-white mb-1 tabular-nums">
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

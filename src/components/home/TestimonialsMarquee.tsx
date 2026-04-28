import { Star, Quote } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function TestimonialsMarquee() {
  const supabase = createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const items = data && data.length > 0 ? data : []
  if (items.length === 0) return null

  // Duplicate for seamless loop
  const looped = [...items, ...items]

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Star size={12} className="fill-rose-500 text-rose-500" />
            <span>Müşteri Yorumları</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Müşterilerimizin{' '}
            <span className="text-gradient italic">deneyimleri</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-rose-400 text-rose-400" />
              ))}
            </div>
            <span className="font-semibold text-lavender-900">4.8</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600 text-sm">91 Google yorumu</span>
          </div>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative">
        <div className="flex gap-6 marquee-track">
          {looped.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="flex-shrink-0 w-[320px] md:w-[400px] p-6 md:p-8 bg-white rounded-3xl shadow-soft border border-lavender-100"
            >
              <Quote size={32} className="text-rose-300 mb-3" />
              <p className="text-gray-700 leading-relaxed mb-5 text-sm md:text-base line-clamp-4">
                "{t.comment}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lavender-900">{t.name}</div>
                  {t.location && <div className="text-xs text-gray-500">{t.location}</div>}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-rose-400 text-rose-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 50s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

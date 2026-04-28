import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/constants'

export default async function CampaignBanner() {
  const supabase = createClient()
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  // Anasayfa içerik bloğundan da fallback alabiliriz
  const { data: fallback } = await supabase
    .from('homepage_content')
    .select('*')
    .eq('section_key', 'cta_banner')
    .single()

  const c = data || (fallback ? {
    title: fallback.title,
    description: fallback.content,
    image_url: fallback.image_url,
    cta_text: 'Detaylı Bilgi',
    cta_link: '/iletisim',
    badge_text: 'Yeni Müşteri Hediyesi',
  } : null)

  if (!c) return null

  const img = c.image_url
    ? getImageUrl(c.image_url)
    : 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80'

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-quvars-dark shadow-soft-lg">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-lavender-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text */}
            <div className="p-8 md:p-12 lg:p-16 text-white">
              {c.badge_text && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 glass-dark border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider">
                  <Tag size={12} className="text-rose-300" />
                  <span>{c.badge_text}</span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium leading-tight mb-4">
                {c.title}
              </h2>
              {c.description && (
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6 max-w-lg">
                  {c.description}
                </p>
              )}
              <Link
                href={c.cta_link || '/iletisim'}
                className="inline-flex items-center gap-2 px-7 py-4 bg-white text-lavender-800 text-base font-semibold rounded-full shadow-soft hover:shadow-glow transition-all group"
              >
                <Sparkles size={18} className="text-rose-500" />
                <span>{c.cta_text || 'Detaylı Bilgi'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-full min-h-[320px] lg:min-h-[420px]">
              <Image
                src={img}
                alt={c.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-lavender-900/40 to-transparent lg:from-lavender-900/80 lg:via-lavender-900/30 lg:to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

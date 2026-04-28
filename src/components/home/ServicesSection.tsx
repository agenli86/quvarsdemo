import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Sparkles, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getIcon } from '@/lib/icons'
import { getImageUrl } from '@/lib/constants'

export default async function ServicesSection() {
  const supabase = createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(6)

  if (!services || services.length === 0) return null

  const defaultImages: Record<string, string> = {
    'lazer-epilasyon': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'cilt-bakimi': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'bolgesel-incelme': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'nail-art': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'kas-kirpik': 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=800&q=80',
    'cilt-lekeleri': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
  }

  return (
    <section className="py-20 md:py-28 relative bg-gradient-quvars-soft" id="hizmetler">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Kayseri Güzellik Merkezi · Hizmetlerimiz</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
              Kayseri lazer epilasyon &{' '}
              <span className="text-gradient italic">cilt bakım hizmetlerimiz</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              Kocasinan'ın merkezinde, her ihtiyacınız için uzmanlaşmış güzellik hizmetleri. Profesyonel ekibimiz ve modern cihazlarımızla bakımınız emin ellerde.
            </p>
          </div>
          <Link
            href="/hizmetler"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 hover:text-rose-600 transition-colors group whitespace-nowrap"
          >
            <span>Tüm Hizmetler</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            const img = service.image_url
              ? getImageUrl(service.image_url)
              : defaultImages[service.slug] || defaultImages['cilt-bakimi']
            const featured = i === 0
            return (
              <Link
                key={service.id}
                href={`/hizmetler/${service.slug}`}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-500 ${
                  featured ? 'md:col-span-2 md:row-span-2 min-h-[420px]' : 'min-h-[280px]'
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={img}
                    alt={`${service.name} - Kayseri Quvars Beauty Studio`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/95 via-lavender-900/40 to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
                        <Icon size={20} className="text-white" />
                      </div>
                      <h3 className={`font-heading font-medium text-white mb-2 leading-tight ${
                        featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                      }`}>
                        {service.name}
                      </h3>
                      <p className={`text-white/80 leading-relaxed ${
                        featured ? 'text-base md:text-lg' : 'text-sm'
                      }`}>
                        {service.short_description}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-xs flex-wrap">
                        {service.duration_text && (
                          <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 border border-white/20">
                            {service.duration_text}
                          </span>
                        )}
                        {/* FİYAT GİZLENDİ — yerine "Fiyat Al" rozeti */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/40 backdrop-blur-sm text-white border border-rose-300/50 font-semibold">
                          <Tag size={11} />
                          Fiyat Al
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-rose-400 group-hover:scale-110 transition-all">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-lavender-700 font-semibold rounded-full shadow-soft border border-lavender-200"
          >
            <span>Tüm Hizmetler</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

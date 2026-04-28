import Link from 'next/link'
import Image from 'next/image'
import { Camera, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/constants'

export default async function GallerySection() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(8)

  // Demo görseller (panel henüz boşsa)
  const demoImages = [
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=800&q=80',
  ]

  const display = items && items.length > 0
    ? items.map((i) => ({ url: getImageUrl(i.image_url), alt: i.alt_text || i.title || 'Galeri', title: i.title }))
    : demoImages.map((url, i) => ({ url, alt: `Quvars Beauty Studio ${i + 1}`, title: null }))

  return (
    <section className="py-20 md:py-28 bg-gradient-quvars-soft">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
              <Camera size={12} />
              <span>Galeri</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
              Çalışmalarımıza{' '}
              <span className="text-gradient italic">göz atın</span>
            </h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
              Ortamımızdan ve gerçek müşteri sonuçlarımızdan kareler.
            </p>
          </div>
          <Link
            href="/galeri"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-lavender-700 hover:text-rose-600 transition-colors group whitespace-nowrap"
          >
            <span>Tüm Galeri</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry-like grid with varying heights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {display.slice(0, 8).map((img, i) => {
            // Varied heights for masonry feel
            const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]']
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl ${heights[i]} ${
                  i === 0 || i === 5 ? 'md:row-span-2 md:aspect-[3/5]' : ''
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {img.title && (
                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

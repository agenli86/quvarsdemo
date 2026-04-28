import { Metadata } from 'next'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { getImageUrl, SITE_URL } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('galeri')
  return {
    title: seo?.meta_title || 'Galeri',
    description: seo?.meta_description || '',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/galeri` },
  }
}

export default async function GalleryPage() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const demoImages = [
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
  ]

  const display = items && items.length > 0
    ? items.map((i) => ({ url: getImageUrl(i.image_url), alt: i.alt_text || i.title || 'Galeri', title: i.title }))
    : demoImages.map((url, i) => ({ url, alt: `Quvars galeri ${i + 1}`, title: null }))

  return (
    <SiteLayout>
      <PageHeader
        badge="Galeri"
        title="Çalışmalarımıza yakından bakın"
        subtitle="Atmosferimiz ve sonuçlarımız"
        description="Salon ortamımızdan kareler, hizmetlerimizin sonuçları ve kadromuzun çalışmaları."
        breadcrumbs={[{ label: 'Galeri' }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {display.length === 0 ? (
            <div className="text-center py-12">
              <Camera size={48} className="text-lavender-300 mx-auto mb-4" />
              <p className="text-gray-500">Henüz galeri görseli yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {display.map((img, i) => {
                // Random heights for masonry feel
                const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]']
                return (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl ${heights[i % 4]}`}
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
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60

import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Tag } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { getImageUrl, SITE_URL } from '@/lib/constants'
import { getIcon } from '@/lib/icons'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('hizmetler')
  return {
    title: seo?.meta_title || 'Hizmetlerimiz - Kayseri Güzellik Merkezi',
    description: seo?.meta_description || 'Kayseri Kocasinan\'da lazer epilasyon, cilt bakımı, bölgesel incelme, nail art ve daha fazlası.',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/hizmetler` },
    openGraph: {
      title: seo?.meta_title || 'Hizmetlerimiz',
      description: seo?.meta_description || '',
      images: seo?.og_image ? [seo.og_image] : [],
    },
  }
}

export default async function ServicesPage() {
  const supabase = createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const defaultImages: Record<string, string> = {
    'lazer-epilasyon': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'cilt-bakimi': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'bolgesel-incelme': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'nail-art': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'kas-kirpik': 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=800&q=80',
    'cilt-lekeleri': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
  }

  return (
    <SiteLayout>
      <PageHeader
        badge="Kayseri Güzellik Merkezi"
        title="Hizmetlerimiz"
        subtitle="Modern teknoloji, uzman dokunuş"
        description="Kayseri Kocasinan'da lazer epilasyondan cilt bakımına, nail art'tan bölgesel inceltmeye geniş hizmet yelpazemizle bakımınız emin ellerde. Detaylı bilgi ve fiyat için hizmet detayına tıklayın."
        breadcrumbs={[{ label: 'Hizmetler' }]}
        bgImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {!services || services.length === 0 ? (
            <p className="text-center text-gray-500">Henüz hizmet eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((s) => {
                const Icon = getIcon(s.icon)
                const img = s.image_url ? getImageUrl(s.image_url) : (defaultImages[s.slug] || defaultImages['cilt-bakimi'])
                return (
                  <Link
                    key={s.id}
                    href={`/hizmetler/${s.slug}`}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img}
                        alt={s.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/60 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl glass-dark border border-white/30 flex items-center justify-center">
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-lavender-900 mb-2 group-hover:text-rose-600 transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {s.short_description}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {s.duration_text && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-lavender-50 text-lavender-700">
                              {s.duration_text}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                            <Tag size={10} />
                            Fiyat Al
                          </span>
                        </div>
                        <ArrowUpRight size={18} className="text-lavender-400 group-hover:text-rose-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                    </div>
                  </Link>
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

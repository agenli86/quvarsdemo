import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Users, ArrowUpRight } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { getImageUrl, SITE_URL } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('uzmanlar')
  return {
    title: seo?.meta_title || 'Uzmanlarımız',
    description: seo?.meta_description || '',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/uzmanlar` },
  }
}

export default async function SpecialistsPage() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <SiteLayout>
      <PageHeader
        badge="Uzmanlarımız"
        title="Tanışın, güvenle bakım alın"
        subtitle="Sertifikalı, deneyimli, ilgili"
        description="Kadromuzun her bir üyesi alanında uzman. Hijyen ve müşteri memnuniyetini en üst seviyede tutarak size en iyi deneyimi sunmak için buradayız."
        breadcrumbs={[{ label: 'Uzmanlar' }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {!items || items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lavender-50 flex items-center justify-center">
                <Users size={32} className="text-lavender-500" />
              </div>
              <h3 className="text-xl font-heading font-medium text-lavender-900 mb-2">Uzmanlarımız çok yakında</h3>
              <p className="text-gray-500">Kadromuzu güncellemek üzere çalışıyoruz.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((s) => (
                <Link
                  key={s.id}
                  href={`/uzmanlar/${s.slug}`}
                  className="group relative overflow-hidden rounded-3xl bg-lavender-100 aspect-[3/4] block"
                >
                  <Image
                    src={s.image_url ? getImageUrl(s.image_url) : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80'}
                    alt={s.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/95 via-lavender-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                      {s.name}
                    </h3>
                    {s.title && <p className="text-sm text-rose-200 italic">{s.title}</p>}
                    {s.specialties && s.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {s.specialties.slice(0, 2).map((sp: string) => (
                          <span key={sp} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 border border-white/20">
                            {sp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {s.instagram_url && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-dark border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Instagram size={16} className="text-white" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Tag, Phone, MessageCircle, Sparkles } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getImageUrl, SITE_URL, COMPANY } from '@/lib/constants'
import { getIcon } from '@/lib/icons'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createAdminClient()
  const result = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .single()

  const data = result.data
  if (!data) return { title: 'Hizmet bulunamadi' }

  const titleVal = data.title || data.name
  const descVal = data.meta_description || data.short_description || ''

  return {
    title: titleVal,
    description: descVal,
    alternates: { canonical: SITE_URL + '/hizmetler/' + data.slug },
    openGraph: {
      title: titleVal,
      description: descVal,
      images: data.image_url ? [getImageUrl(data.image_url)] : [],
    },
  }
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const result = await supabase.from('services').select('slug').eq('is_active', true)
  return (result.data || []).map(function(s) { return { slug: s.slug } })
}

export default async function ServiceDetailPage({ params }: Props) {
  const supabase = createClient()
  const result = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  const service = result.data
  if (!service) notFound()

  const relatedResult = await supabase
    .from('services')
    .select('id, name, slug, short_description, image_url, icon')
    .eq('is_active', true)
    .neq('id', service.id)
    .limit(3)

  const related = relatedResult.data
  const Icon = getIcon(service.icon)
  const heroImg = service.image_url ? getImageUrl(service.image_url) : 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80'
  const waText = encodeURIComponent('Merhaba, ' + service.name + ' hizmeti icin fiyat bilgisi almak istiyorum.')
  const whatsappLink = 'https://wa.me/' + COMPANY.whatsapp + '?text=' + waText

  return (
    <SiteLayout>
      <PageHeader
        badge={service.title || 'Hizmet'}
        title={service.name}
        description={service.short_description || ''}
        breadcrumbs={[
          { label: 'Hizmetler', href: '/hizmetler' },
          { label: service.name },
        ]}
        bgImage={heroImg}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-quvars-soft flex items-center justify-center">
                  <Icon size={24} className="text-lavender-700" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-lavender-600 font-semibold">Hizmet Detayi</div>
                  <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 leading-tight">
                    {service.name}
                  </h2>
                </div>
              </div>

              {service.content ? (
                <div className="prose-quvars" dangerouslySetInnerHTML={{ __html: service.content }} />
              ) : (
                <p className="text-gray-600 leading-relaxed text-lg">{service.short_description}</p>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-white rounded-3xl shadow-soft border border-lavender-100">
                  <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-4">
                    Hizmet Bilgileri
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {service.duration_text && (
                      <li className="flex items-start gap-3">
                        <Clock size={18} className="text-rose-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Seans Suresi</div>
                          <div className="font-medium text-lavender-900">{service.duration_text}</div>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <Tag size={18} className="text-rose-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Fiyat</div>
                        <div className="font-medium text-lavender-900">Bilgi icin iletisime gecin</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-soft-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <MessageCircle size={32} className="text-white mb-3" />
                  <h3 className="text-xl font-heading font-medium mb-1">Fiyat Bilgisi Al</h3>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                    Anlik guncel fiyatlar ve kisiye ozel paket teklifleri icin WhatsApp uzerinden bize yazin.
                  </p>
                  
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-green-700 text-sm font-semibold rounded-full shadow hover:shadow-lg transition-all w-full justify-center"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp uzerinden Yaz</span>
                  </a>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-quvars-dark text-white shadow-soft-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <Sparkles size={28} className="text-rose-300 mb-3" />
                  <h3 className="text-xl font-heading font-medium mb-2">Randevu Almak Ister Misiniz?</h3>
                  <p className="text-sm text-white/80 mb-5">Uzman ekibimizden ucretsiz konsultasyon icin iletisime gecin.</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={'/randevu?hizmet=' + service.slug}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-lavender-800 text-sm font-semibold rounded-full shadow-soft"
                    >
                      <Calendar size={16} />
                      <span>Randevu Al</span>
                    </Link>
                    
                      href={'tel:' + COMPANY.phoneE164}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white/80 text-sm font-medium hover:text-white transition-colors"
                    >
                      <Phone size={14} />
                      <span>{COMPANY.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {related && related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-8 text-center">
                Diger Hizmetlerimiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const RIcon = getIcon(r.icon)
                  return (
                    <Link
                      key={r.id}
                      href={'/hizmetler/' + r.slug}
                      className="group p-6 bg-white rounded-3xl shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1 duration-500 border border-lavender-100"
                    >
                      <div className="w-12 h-12 mb-4 rounded-2xl bg-gradient-quvars-soft flex items-center justify-center group-hover:bg-gradient-quvars transition-all duration-500">
                        <RIcon size={20} className="text-lavender-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-2 group-hover:text-rose-600 transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{r.short_description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60

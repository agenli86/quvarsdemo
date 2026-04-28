import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Phone, MessageCircle, Sparkles, Tag } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import { createClient } from '@/lib/supabase/server'
import { getImageUrl, SITE_URL, COMPANY } from '@/lib/constants'
import { getIcon } from '@/lib/icons'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Hizmet bulunamadı' }

  return {
    title: data.title || `${data.name} - Kayseri`,
    description: data.meta_description || data.short_description,
    alternates: { canonical: `${SITE_URL}/hizmetler/${data.slug}` },
    openGraph: {
      title: data.title || data.name,
      description: data.meta_description || data.short_description || '',
      images: data.image_url ? [getImageUrl(data.image_url)] : [],
    },
  }
}

export async function generateStaticParams() {
  const supabase = createClient()
  const { data } = await supabase.from('services').select('slug').eq('is_active', true)
  return (data || []).map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const supabase = createClient()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!service) notFound()

  const { data: related } = await supabase
    .from('services')
    .select('id, name, slug, short_description, image_url, icon')
    .eq('is_active', true)
    .neq('id', service.id)
    .limit(3)

  const Icon = getIcon(service.icon)
  const heroImg = service.image_url ? getImageUrl(service.image_url) : 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80'

  // WhatsApp fiyat sorma mesajı
  const whatsappMsg = `Merhaba, ${service.name} hizmeti hakkında fiyat ve detay bilgisi almak istiyorum.`
  const whatsappLink = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <SiteLayout>
      <PageHeader
        badge={service.title || 'Hizmet Detayı'}
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
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-quvars-soft flex items-center justify-center">
                  <Icon size={24} className="text-lavender-700" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-lavender-600 font-semibold">Hizmet Detayı</div>
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

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick info card — fiyat YOK */}
                <div className="p-6 bg-white rounded-3xl shadow-soft border border-lavender-100">
                  <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-4">
                    Hizmet Bilgileri
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {service.duration_text && (
                      <li className="flex items-start gap-3">
                        <Clock size={18} className="text-rose-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500">Seans Süresi</div>
                          <div className="font-medium text-lavender-900">{service.duration_text}</div>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <Tag size={18} className="text-rose-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Fiyat</div>
                        <div className="font-medium text-lavender-900">
                          Bilgi için iletişime geçin
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* WhatsApp CTA — fiyat sorma odaklı */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-soft-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <MessageCircle size={32} className="text-white mb-3" />
                  <h3 className="text-xl font-heading font-medium mb-1">Fiyat Bilgisi Al</h3>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                    Anlık güncel fiyatlar ve kişiye özel paket teklifleri için WhatsApp'tan bize yazın.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-5 py-3 bg-white text-green-700 text-sm font-bold rounded-full shadow-soft hover:bg-green-50 transition-all"
                  >
                    WhatsApp ile Fiyat Al
                  </a>
                </div>

                {/* Randevu CTA */}
                <div className="p-6 rounded-3xl bg-gradient-quvars-dark text-white shadow-soft-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                  <Sparkles size={28} className="text-rose-300 mb-3" />
                  <h3 className="text-xl font-heading font-medium mb-2">Randevu Al</h3>
                  <p className="text-sm text-white/80 mb-5">Uzman ekibimizden ücretsiz konsültasyon için randevu oluşturun.</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/randevu?hizmet=${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-lavender-800 text-sm font-semibold rounded-full shadow-soft"
                    >
                      <Calendar size={16} />
                      <span>Randevu Al</span>
                    </Link>
                    <a
                      href={`tel:${COMPANY.phoneE164}`}
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

          {/* Related */}
          {related && related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-8 text-center">
                Diğer Hizmetlerimiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const RIcon = getIcon(r.icon)
                  return (
                    <Link
                      key={r.id}
                      href={`/hizmetler/${r.slug}`}
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

import { Metadata } from 'next'
import { Suspense } from 'react'
import { CheckCircle, Phone, MessageCircle, Calendar } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { createClient } from '@/lib/supabase/server'
import { getPageSeo } from '@/lib/settings'
import { SITE_URL, COMPANY } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('randevu')
  return {
    title: seo?.meta_title || 'Online Randevu',
    description: seo?.meta_description || '',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/randevu` },
  }
}

export default async function AppointmentPage() {
  const supabase = createClient()
  const { data: services } = await supabase
    .from('services')
    .select('slug, name')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <SiteLayout>
      <PageHeader
        badge="Randevu"
        title="Bize özel randevunuzu alın"
        subtitle="Pratik, hızlı, kolay"
        description="Aşağıdaki formu doldurun, en kısa sürede sizi arayarak randevunuzu kesinleştirelim."
        breadcrumbs={[{ label: 'Randevu' }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-10 bg-white rounded-3xl shadow-soft border border-lavender-100">
              <Suspense fallback={<div className="text-gray-500">Form yükleniyor...</div>}>
                <AppointmentForm services={services || []} />
              </Suspense>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-quvars-soft border border-lavender-100">
                <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-4">
                  Hızlı İletişim
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${COMPANY.phoneE164}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-soft transition-all border border-lavender-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-quvars flex items-center justify-center">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Telefon</div>
                      <div className="font-semibold text-lavender-900">{COMPANY.phone}</div>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow-soft transition-all border border-lavender-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                      <MessageCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">WhatsApp</div>
                      <div className="font-semibold text-lavender-900">Hemen Yaz</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-lavender-100 shadow-soft">
                <h3 className="text-lg font-heading font-semibold text-lavender-900 mb-4">
                  Nasıl Çalışır?
                </h3>
                <ol className="space-y-3 text-sm">
                  {[
                    'Formu doldurup gönderin',
                    'Sizi arayıp randevunuzu kesinleştirelim',
                    'Belirlenen saatte salonumuza buyrun',
                    'Profesyonel bakım deneyiminizi yaşayın',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-quvars text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-gray-700 leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-quvars-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <CheckCircle size={28} className="text-rose-300 mb-3" />
                <h3 className="text-lg font-heading font-medium mb-2">Yeni Müşterilerimize</h3>
                <p className="text-sm text-white/80 mb-1">İlk randevunuzda</p>
                <div className="text-2xl font-heading font-semibold mb-3">%20 indirim</div>
                <p className="text-xs text-white/70">Detaylar için bizi arayın.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60

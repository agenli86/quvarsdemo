import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/forms/ContactForm'
import { getPageSeo, getSettings } from '@/lib/settings'
import { SITE_URL, COMPANY } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('iletisim')
  return {
    title: seo?.meta_title || 'İletişim - Kayseri Güzellik Merkezi',
    description: seo?.meta_description || 'Kayseri\'nin merkezi Kocasinan\'da, Quvars Beauty Studio güzellik merkezine ulaşın.',
    alternates: { canonical: seo?.canonical_url || `${SITE_URL}/iletisim` },
  }
}

export default async function ContactPage() {
  const settings = await getSettings()
  const phone = settings.phone || COMPANY.phone
  const email = settings.email || COMPANY.email
  const address = settings.address || COMPANY.address
  const hours = settings.working_hours || COMPANY.workingHours

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <SiteLayout>
      <PageHeader
        badge="İletişim"
        title="Bize ulaşın"
        subtitle="Kayseri Kocasinan güzellik merkezi"
        description="Telefon, WhatsApp, e-posta veya formu kullanarak iletişime geçebilirsiniz. Randevu için en kısa yol WhatsApp."
        breadcrumbs={[{ label: 'İletişim' }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-10 bg-white rounded-3xl shadow-soft border border-lavender-100">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-2">
                  Mesajınızı bırakın
                </h2>
                <p className="text-gray-600">En kısa sürede size dönüş yapacağız.</p>
              </div>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-quvars-dark text-white">
                <h3 className="text-xl font-heading font-medium mb-5">İletişim Bilgileri</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-rose-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Adres</div>
                      <span className="text-white/90 leading-relaxed">{address}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={18} className="text-rose-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Telefon</div>
                      <a href={`tel:${COMPANY.phoneE164}`} className="text-white hover:text-rose-200 font-medium">{phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={18} className="text-rose-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">E-posta</div>
                      <a href={`mailto:${email}`} className="text-white/90 hover:text-rose-200">{email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={18} className="text-rose-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">Çalışma Saatleri</div>
                      <span className="text-white/90">{hours}</span>
                    </div>
                  </li>
                  {settings.instagram && (
                    <li className="flex items-start gap-3">
                      <Instagram size={18} className="text-rose-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/60 mb-0.5">Instagram</div>
                        <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-rose-200">@quvarsbeauty</a>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden shadow-soft-lg aspect-[16/9] md:aspect-[21/9]">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Quvars Beauty Studio konumu"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export const revalidate = 60
